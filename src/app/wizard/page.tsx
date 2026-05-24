"use client";

import { motion, AnimatePresence } from 'framer-motion';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Step1Profile from '@/components/wizard/Step1Profile';
import Step2Salary from '@/components/wizard/Step2Salary';
import Step3Deductions from '@/components/wizard/Step3Deductions';
import Step4HRA from '@/components/wizard/Step4HRA';
import Step580C from '@/components/wizard/Step580C';
import Step6NPS from '@/components/wizard/Step6NPS';
import Step7Health from '@/components/wizard/Step7Health';
import Step8HomeLoan from '@/components/wizard/Step8HomeLoan';
import Step9Other from '@/components/wizard/Step9Other';
import ResultsSummary from '@/components/wizard/ResultsSummary';
import AnimatedNumber from '@/components/wizard/AnimatedNumber';
import { useWizardStore } from '@/store/useWizardStore';
import { calculateNewRegimeTax, calculateOldRegimeTax } from '@/tax-engine/taxEngine';
import { TAX_CONFIG, TaxSlab } from '@/constants/tax';

function getMarginalSlabRate(taxableIncome: number, slabs: TaxSlab[]) {
  if (taxableIncome <= 0) return 0;
  let highestRate = 0;
  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      highestRate = slab.rate;
    }
  }
  return highestRate * 100;
}

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [breakdownRegime, setBreakdownRegime] = useState<'old' | 'new'>('old');
  const totalSteps = 9; // Phase 7: 9 steps

  const handleNext = () => {
    if (currentStep <= totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Connect state to the right panel
  const salary = useWizardStore((state) => state.salary);
  const profile = useWizardStore((state) => state.profile);
  const deductions = useWizardStore((state) => state.deductions);
  const hra = useWizardStore((state) => state.hra);
  const investments80C = useWizardStore((state) => state.investments80C);
  const nps = useWizardStore((state) => state.nps);
  const medical = useWizardStore((state) => state.medical);
  const homeLoan = useWizardStore((state) => state.homeLoan);
  const otherDeductions = useWizardStore((state) => state.otherDeductions);
  
  const estimatedGross = useMemo(() => {
    return (salary.monthlyInHand * 12) + salary.bonus;
  }, [salary]);

  const oldRegimeDeductions = useMemo(() => {
    const standardDeduction = TAX_CONFIG.oldRegime.standardDeduction;
    const professionalTax = Math.min(deductions.professionalTax || 0, 2500);

    let hraExemption = 0;
    if (hra.isRented && hra.basicSalary > 0 && hra.hraReceived > 0 && hra.monthlyRent > 0) {
      const annualRent = hra.monthlyRent * 12;
      const rentMinus10PercentBasic = Math.max(0, annualRent - (0.1 * hra.basicSalary));
      const percentageOfBasic = hra.isMetro ? 0.5 * hra.basicSalary : 0.4 * hra.basicSalary;
      hraExemption = Math.min(hra.hraReceived, rentMinus10PercentBasic, percentageOfBasic);
    }

    const total80C = (investments80C.elss || 0) + (investments80C.ppf || 0) + (investments80C.lifeInsurance || 0) + (investments80C.other80C || 0) + (deductions.employeePF || 0);
    const capped80C = Math.min(total80C, TAX_CONFIG.deductions.max80C);

    const npsVoluntary = Math.min(nps.npsVoluntary || 0, 50000);
    
    // Medical (80D) - simplified limits
    const maxMedicalSelf = profile.ageCategory === 'below60' ? 25000 : 50000;
    const medicalSelf = Math.min((medical.healthSelfFamily || 0) + (medical.preventiveCheckup || 0), maxMedicalSelf);
    const medicalParents = Math.min(medical.healthParents || 0, 50000);
    const totalMedical = medicalSelf + medicalParents;

    const totalHomeLoan = Math.min((homeLoan.interestSelfOccupied || 0) + (homeLoan.interestLetOut || 0), 200000);

    const maxSavings = profile.ageCategory === 'below60' ? 10000 : 50000;
    const savingsInterest = Math.min(otherDeductions.savingsInterest || 0, maxSavings);
    
    const otherMisc = (otherDeductions.educationLoanInterest || 0) + (otherDeductions.donations || 0);

    return {
      standardDeduction,
      professionalTax,
      hraExemption,
      capped80C,
      npsVoluntary,
      totalMedical,
      totalHomeLoan,
      savingsInterest,
      otherMisc,
      total: standardDeduction + professionalTax + hraExemption + capped80C + npsVoluntary + totalMedical + totalHomeLoan + savingsInterest + otherMisc
    };
  }, [deductions, hra, investments80C, nps, medical, homeLoan, otherDeductions, profile.ageCategory]);

  const taxEstimates = useMemo(() => {
    if (estimatedGross === 0) {
      return { 
        oldTax: 0, 
        newTax: 0,
        taxableIncomeOld: 0,
        taxableIncomeNew: 0,
        marginalRateOld: 0,
        marginalRateNew: 0,
        savingsDifference: 0,
        winner: 'old' as const
      };
    }

    const taxableIncomeNew = Math.max(0, estimatedGross - TAX_CONFIG.newRegime.standardDeduction - (nps.npsEmployer || 0));
    const taxableIncomeOld = Math.max(0, estimatedGross - oldRegimeDeductions.total - (nps.npsEmployer || 0));

    const newTaxResult = calculateNewRegimeTax(taxableIncomeNew);
    const oldTaxResult = calculateOldRegimeTax(taxableIncomeOld, profile.ageCategory);

    const oldSlabs = TAX_CONFIG.oldRegime.slabs[profile.ageCategory] || TAX_CONFIG.oldRegime.slabs.below60;
    const newSlabs = TAX_CONFIG.newRegime.slabs;

    const marginalRateOld = getMarginalSlabRate(taxableIncomeOld, oldSlabs);
    const marginalRateNew = getMarginalSlabRate(taxableIncomeNew, newSlabs);

    return { 
      oldTax: oldTaxResult.finalTax, 
      newTax: newTaxResult.finalTax,
      taxableIncomeOld,
      taxableIncomeNew,
      marginalRateOld,
      marginalRateNew,
      savingsDifference: Math.abs(oldTaxResult.finalTax - newTaxResult.finalTax),
      winner: oldTaxResult.finalTax <= newTaxResult.finalTax ? 'old' : 'new'
    };
  }, [estimatedGross, profile.ageCategory, oldRegimeDeductions, nps.npsEmployer]);

  if (currentStep > totalSteps) {
    return <ResultsSummary />;
  }

  return (
    <div className="flex-grow flex bg-slate-50 dark:bg-[#0b0f19] min-h-[calc(100vh-64px)] max-w-screen-2xl mx-auto w-full transition-colors duration-300">
      {/* 1. Left Sidebar: Calculator Steps (Hidden on mobile) */}
      <div className="hidden xl:block w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0b0f19]/60 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-widest">Calculator Steps</p>
        <div className="space-y-1 relative before:absolute before:inset-y-0 before:left-[15px] before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {[
            { step: 1, label: 'Personal Details' },
            { step: 2, label: 'Income Details' },
            { step: 3, label: 'Deductions (80C, 80D)' },
            { step: 4, label: 'HRA' },
            { step: 5, label: 'Investments' },
            { step: 6, label: 'NPS' },
            { step: 7, label: 'Health' },
            { step: 8, label: 'Home Loan' },
            { step: 9, label: 'Other' },
          ].map((item) => (
            <div key={item.step} className="relative z-10 flex items-center gap-4 group cursor-pointer" onClick={() => item.step < currentStep && setCurrentStep(item.step)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep === item.step ? 'bg-blue-600 text-white shadow-md' :
                currentStep > item.step ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'
              }`}>
                {item.step}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                currentStep === item.step ? 'text-blue-600 dark:text-blue-400 font-bold' :
                currentStep > item.step ? 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-slate-400 dark:text-slate-650'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-green-50 dark:bg-green-950/20 rounded-2xl p-4 border border-green-100 dark:border-green-900/30 flex items-start gap-3">
           <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
           </svg>
           <div>
             <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">100% Secure & Private</p>
             <p className="text-[10px] text-green-700 dark:text-green-400 leading-tight">Your data is encrypted and never stored or shared.</p>
           </div>
        </div>
      </div>

      {/* 2. Main Content Area: Questions */}
      <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col pb-40">
        <div className="flex-grow max-w-2xl mx-auto w-full">
          {/* Premium Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Step {currentStep} of {totalSteps}</p>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentStep === 1 && "Personal Details"}
                  {currentStep === 2 && "Income Details"}
                  {currentStep === 3 && "Deductions"}
                  {currentStep === 4 && "HRA Configuration"}
                  {currentStep === 5 && "80C Investments"}
                  {currentStep === 6 && "NPS Contributions"}
                  {currentStep === 7 && "Health Insurance"}
                  {currentStep === 8 && "Home Loan Interest"}
                  {currentStep === 9 && "Other Deductions"}
                </h2>
              </div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full">
                {Math.round((currentStep / totalSteps) * 100)}% Completed
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <Step1Profile />}
              {currentStep === 2 && <Step2Salary />}
              {currentStep === 3 && <Step3Deductions />}
              {currentStep === 4 && <Step4HRA />}
              {currentStep === 5 && <Step580C />}
              {currentStep === 6 && <Step6NPS />}
              {currentStep === 7 && <Step7Health />}
              {currentStep === 8 && <Step8HomeLoan />}
              {currentStep === 9 && <Step9Other />}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Spacer for sticky bottom bar */}
        <div className="h-28"></div>
        
        {/* Sticky Bottom Summary Bar */}
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 lg:right-[400px] xl:right-[450px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/80 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.3)] z-40 p-4 px-6 md:px-10 flex justify-between items-center transition-all duration-300">
          <div className="flex gap-8 hidden md:flex">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Monthly Take-Home</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">₹<AnimatedNumber value={Math.round((estimatedGross - taxEstimates.newTax)/12)} /></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Annual Income (Est.)</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">₹<AnimatedNumber value={estimatedGross} /></p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`text-sm font-bold transition-colors ${currentStep === 1 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              {currentStep === totalSteps ? 'See Results' : 'Continue to Next Step'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Right Sidebar: Live Preview */}
      <div className="hidden lg:flex w-[400px] xl:w-[450px] bg-white dark:bg-[#0b0f19]/60 border-l border-slate-200 dark:border-slate-800/80 p-5 flex-col relative sticky top-16 h-[calc(100vh-64px)] overflow-y-auto shadow-sm pb-24 transition-colors duration-300">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Tax Estimate
          </h3>
          <div className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md flex text-[10px] font-semibold">
            <button className="px-2 py-1 bg-white dark:bg-slate-900 shadow-sm rounded text-slate-800 dark:text-slate-200">Annual</button>
            <button className="px-2 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">Monthly</button>
          </div>
        </div>
        <p className="text-[9px] text-slate-400 dark:text-slate-500 mb-4">Values update in real-time as you answer</p>

        {/* New 3-Card Layout matching Reference */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="col-span-1 bg-slate-50 dark:bg-[#0b0f19]/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Old Regime</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">₹<AnimatedNumber value={taxEstimates.oldTax} /></p>
            {taxEstimates.winner === 'old' && <div className="mt-2.5 inline-block bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md">BEST CHOICE</div>}
          </div>
          
          <div className="col-span-1 bg-slate-50 dark:bg-[#0b0f19]/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">New Regime</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">₹<AnimatedNumber value={taxEstimates.newTax} /></p>
            {taxEstimates.winner === 'new' && <div className="mt-2.5 inline-block bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md">BEST CHOICE</div>}
          </div>

          <div className="col-span-2 bg-slate-900 dark:bg-blue-950/30 rounded-2xl p-5 text-white border border-transparent dark:border-blue-900/30 relative overflow-hidden shadow-lg mt-1">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
            <p className="text-xs font-bold text-blue-300 dark:text-blue-200 uppercase tracking-wider mb-1.5">
              You Save ({taxEstimates.winner === 'new' ? 'New' : 'Old'} Regime)
            </p>
            <p className="text-4xl font-black text-green-400 dark:text-green-300 mb-2 leading-none">₹<AnimatedNumber value={taxEstimates.savingsDifference} /></p>
            <p className="text-xs text-slate-300 dark:text-slate-400 flex items-center gap-1.5 font-medium">
               <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               Maximum Savings
            </p>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Detailed Breakdown</h4>
            <div className="flex bg-slate-100 dark:bg-slate-850 rounded-lg text-xs font-semibold overflow-hidden p-0.5 border border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setBreakdownRegime('old')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${breakdownRegime === 'old' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                Old
              </button>
              <button 
                onClick={() => setBreakdownRegime('new')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${breakdownRegime === 'new' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                New
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-[#0b0f19]/30 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/40">
                  <th className="text-left font-bold text-slate-650 dark:text-slate-350 p-2.5 pl-4 uppercase tracking-wider text-[10px]">Income Details</th>
                  <th className="text-right font-bold text-slate-650 dark:text-slate-350 p-2.5 pr-4 uppercase tracking-wider text-[10px]">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="p-2.5 pl-4 text-slate-600 dark:text-slate-300 font-medium">Gross Annual Income</td>
                  <td className="p-2.5 pr-4 text-right font-bold text-slate-900 dark:text-white text-sm">₹{estimatedGross.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td className="p-2.5 pl-4 text-slate-600 dark:text-slate-300 font-medium">Less: Standard Deduction</td>
                  <td className="p-2.5 pr-4 text-right font-bold text-red-600 dark:text-red-400 text-sm">- ₹{(breakdownRegime === 'new' ? 75000 : 50000).toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-white dark:bg-[#0b0f19]/40 font-bold border-t border-slate-200 dark:border-slate-800">
                  <td className="p-2.5 pl-4 text-slate-900 dark:text-white text-sm">Net Taxable Income</td>
                  <td className="p-2.5 pr-4 text-right text-slate-900 dark:text-white text-base font-extrabold">₹{(breakdownRegime === 'new' ? taxEstimates.taxableIncomeNew : taxEstimates.taxableIncomeOld).toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-100/50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800">
                  <th className="text-left font-bold text-slate-650 dark:text-slate-350 p-2.5 pl-4 uppercase tracking-wider text-[10px]">Tax Calculation</th>
                  <th className="text-right font-bold text-slate-650 dark:text-slate-350 p-2.5 pr-4 uppercase tracking-wider text-[10px]">Amount (₹)</th>
                </tr>
                <tr>
                  <td className="p-2.5 pl-4 text-slate-600 dark:text-slate-300 font-medium">Total Tax Before Rebate</td>
                  <td className="p-2.5 pr-4 text-right font-bold text-slate-900 dark:text-white text-sm">Calculated</td>
                </tr>
                <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold border-t border-slate-200 dark:border-slate-800">
                  <td className="p-2.5 pl-4 text-blue-900 dark:text-blue-300 text-sm">Total Tax Liability</td>
                  <td className="p-2.5 pr-4 text-right text-blue-600 dark:text-blue-400 text-base font-extrabold">₹{(breakdownRegime === 'new' ? taxEstimates.newTax : taxEstimates.oldTax).toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Regime is Better */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded-xl p-4 shadow-sm">
           <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5">Why {taxEstimates.winner === 'new' ? 'New' : 'Old'} Regime is Better</h4>
           <ul className="space-y-2 text-xs text-green-800 dark:text-green-300">
             <li className="flex items-start gap-2 font-medium">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Lower tax rates across slabs</span>
             </li>
             <li className="flex items-start gap-2 font-medium">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Saves you ₹{taxEstimates.savingsDifference.toLocaleString('en-IN')} compared to {taxEstimates.winner === 'new' ? 'Old' : 'New'} Regime</span>
             </li>
           </ul>
        </div>
        
      </div>
    </div>
  );
}
