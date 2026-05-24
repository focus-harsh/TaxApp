"use client";

import { useMemo } from 'react';
import Link from 'next/link';
import { useWizardStore } from '@/store/useWizardStore';
import { calculateNewRegimeTax, calculateOldRegimeTax } from '@/tax-engine/taxEngine';
import { TAX_CONFIG } from '@/constants/tax';

export default function ResultsSummary() {
  const { salary, profile, deductions, hra, investments80C, nps, medical, homeLoan, otherDeductions } = useWizardStore();

  const estimatedGross = useMemo(() => (salary.monthlyInHand * 12) + salary.bonus, [salary]);

  const currentOldDeductions = useMemo(() => {
    const std = TAX_CONFIG.oldRegime.standardDeduction;
    const pt = Math.min(deductions.professionalTax || 0, 2500);
    let hraEx = 0;
    if (hra.isRented && hra.basicSalary > 0 && hra.hraReceived > 0 && hra.monthlyRent > 0) {
      const annualRent = hra.monthlyRent * 12;
      const rentMinus10PercentBasic = Math.max(0, annualRent - (0.1 * hra.basicSalary));
      const percentageOfBasic = hra.isMetro ? 0.5 * hra.basicSalary : 0.4 * hra.basicSalary;
      hraEx = Math.min(hra.hraReceived, rentMinus10PercentBasic, percentageOfBasic);
    }
    const total80C = (investments80C.elss || 0) + (investments80C.ppf || 0) + (investments80C.lifeInsurance || 0) + (investments80C.other80C || 0) + (deductions.employeePF || 0);
    const cap80C = Math.min(total80C, TAX_CONFIG.deductions.max80C);
    const npsVol = Math.min(nps.npsVoluntary || 0, 50000);
    
    const maxMedicalSelf = profile.ageCategory === 'below60' ? 25000 : 50000;
    const medSelf = Math.min((medical.healthSelfFamily || 0) + (medical.preventiveCheckup || 0), maxMedicalSelf);
    const medParents = Math.min(medical.healthParents || 0, 50000);
    const totalMed = medSelf + medParents;

    const hl = Math.min((homeLoan.interestSelfOccupied || 0) + (homeLoan.interestLetOut || 0), 200000);
    const maxSavings = profile.ageCategory === 'below60' ? 10000 : 50000;
    const savInt = Math.min(otherDeductions.savingsInterest || 0, maxSavings);
    const otherMisc = (otherDeductions.educationLoanInterest || 0) + (otherDeductions.donations || 0);

    return {
      total: std + pt + hraEx + cap80C + npsVol + totalMed + hl + savInt + otherMisc,
      cap80C,
      npsVol,
      totalMed
    };
  }, [deductions, hra, investments80C, nps, medical, homeLoan, otherDeductions, profile.ageCategory]);

  const { oldTax, newTax, optimizedOldTax } = useMemo(() => {
    if (estimatedGross === 0) return { oldTax: 0, newTax: 0, optimizedOldTax: 0 };

    const taxIncNew = Math.max(0, estimatedGross - TAX_CONFIG.newRegime.standardDeduction - (nps.npsEmployer || 0));
    const taxIncOld = Math.max(0, estimatedGross - currentOldDeductions.total - (nps.npsEmployer || 0));

    const newT = calculateNewRegimeTax(taxIncNew).finalTax;
    const oldT = calculateOldRegimeTax(taxIncOld, profile.ageCategory).finalTax;

    // What if they max out 80C and NPS?
    const maxOptimizedDeductions = currentOldDeductions.total 
      + Math.max(0, 150000 - currentOldDeductions.cap80C) 
      + Math.max(0, 50000 - currentOldDeductions.npsVol);
    
    const taxIncOldOptimized = Math.max(0, estimatedGross - maxOptimizedDeductions - (nps.npsEmployer || 0));
    const optOldT = calculateOldRegimeTax(taxIncOldOptimized, profile.ageCategory).finalTax;

    return { oldTax: oldT, newTax: newT, optimizedOldTax: optOldT };
  }, [estimatedGross, currentOldDeductions, nps.npsEmployer, profile.ageCategory]);

  const recommendations = useMemo(() => {
    const recs = [];
    
    if (newTax < oldTax) {
      recs.push({
        title: 'Opt for the New Tax Regime',
        desc: `You save ₹${(oldTax - newTax).toLocaleString('en-IN')} by choosing the new regime. It offers lower tax rates and a higher standard deduction.`,
        type: 'winner',
        color: 'indigo'
      });

      if (optimizedOldTax < newTax && (currentOldDeductions.cap80C < 150000 || currentOldDeductions.npsVol < 50000)) {
        recs.push({
          title: 'Wait! The Old Regime could be better.',
          desc: `If you max out your 80C (₹1.5L) and NPS (₹50k), your Old Regime tax would drop to ₹${optimizedOldTax.toLocaleString('en-IN')}, beating the New Regime by ₹${(newTax - optimizedOldTax).toLocaleString('en-IN')}!`,
          type: 'insight',
          color: 'emerald'
        });
      }
    } else if (oldTax < newTax) {
      recs.push({
        title: 'Stick to the Old Tax Regime',
        desc: `Your current tax deductions make the Old Regime better for you. You are saving ₹${(newTax - oldTax).toLocaleString('en-IN')}.`,
        type: 'winner',
        color: 'emerald'
      });
    } else {
      recs.push({
        title: 'Both regimes result in the same tax',
        desc: 'Since both regimes give you the same tax liability, the New Regime is recommended for its simplicity and less paperwork.',
        type: 'winner',
        color: 'blue'
      });
    }

    if (currentOldDeductions.cap80C < 150000) {
      recs.push({
        title: 'Maximize 80C Investments',
        desc: `You have ₹${(150000 - currentOldDeductions.cap80C).toLocaleString('en-IN')} limit remaining in Section 80C. Invest in ELSS or PPF to reduce taxable income.`,
        type: 'action',
        color: 'amber'
      });
    }

    if (currentOldDeductions.npsVol < 50000) {
      recs.push({
        title: 'Open an NPS Account',
        desc: `Invest up to ₹50,000 extra in NPS under Section 80CCD(1B) to get an additional deduction over and above 80C.`,
        type: 'action',
        color: 'amber'
      });
    }

    return recs;
  }, [oldTax, newTax, optimizedOldTax, currentOldDeductions]);

  // Chart
  const maxTax = Math.max(oldTax, newTax, 100);
  const oldHeight = Math.max(8, (oldTax / maxTax) * 100);
  const newHeight = Math.max(8, (newTax / maxTax) * 100);
  const savings = Math.abs(oldTax - newTax);
  const winner = newTax <= oldTax ? 'new' : 'old';

  const handlePrintReport = () => {
    const gross = estimatedGross;
    const deductTotal = currentOldDeductions.total;
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Your Tax Calculator – Tax Report FY 2025-26</title>
  <style>
    body { font-family: Arial, sans-serif; color: #0f172a; background: #f8fafc; margin: 0; padding: 24px; }
    h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; }
    .sub { color: #64748b; font-size: 14px; margin-bottom: 32px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }
    .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
    .amount { font-size: 28px; font-weight: 800; }
    .old-color { color: #dc2626; }
    .new-color { color: #16a34a; }
    .save-card { background: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 16px; padding: 20px; margin-bottom: 24px; text-align: center; }
    .save-label { font-size: 12px; color: #15803d; margin-bottom: 4px; }
    .save-amount { font-size: 36px; font-weight: 900; color: #15803d; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    th { background: #f1f5f9; padding: 10px 14px; text-align: left; font-size: 11px; color: #64748b; text-transform: uppercase; }
    td { padding: 10px 14px; border-top: 1px solid #f1f5f9; }
    .rec { border-radius: 12px; padding: 14px 18px; margin-bottom: 12px; font-size: 13px; }
    .rec-title { font-weight: 700; margin-bottom: 4px; }
    .footer { margin-top: 32px; font-size: 11px; color: #94a3b8; text-align: center; }
    @media print { body { background: white; } }
  </style>
</head>
<body>
  <h1>Your Tax Report</h1>
  <p class="sub">Your Tax Calculator &bull; FY 2025-26 (AY 2026-27) &bull; Generated ${new Date().toLocaleDateString('en-IN')}</p>

  <div class="save-card">
    <div class="save-label">${winner === 'new' ? '✅ New Regime is Better — You Save' : '✅ Old Regime is Better — You Save'}</div>
    <div class="save-amount">₹${savings.toLocaleString('en-IN')}</div>
  </div>

  <div class="grid">
    <div class="card"><div class="label">Old Regime Tax</div><div class="amount old-color">₹${oldTax.toLocaleString('en-IN')}</div></div>
    <div class="card"><div class="label">New Regime Tax</div><div class="amount new-color">₹${newTax.toLocaleString('en-IN')}</div></div>
  </div>

  <table>
    <thead><tr><th>Income & Deduction Summary</th><th style="text-align:right">Amount (₹)</th></tr></thead>
    <tbody>
      <tr><td>Gross Annual Income</td><td style="text-align:right;font-weight:600">₹${gross.toLocaleString('en-IN')}</td></tr>
      <tr><td>Total Deductions (Old Regime)</td><td style="text-align:right;color:#dc2626">− ₹${deductTotal.toLocaleString('en-IN')}</td></tr>
      <tr><td>Standard Deduction (New Regime)</td><td style="text-align:right;color:#dc2626">− ₹75,000</td></tr>
      <tr><td style="font-weight:700">Recommended Regime</td><td style="text-align:right;font-weight:700;color:#2563eb">${winner === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}</td></tr>
    </tbody>
  </table>

  <div class="footer">This report is for informational purposes only. Please consult a CA for final tax filing.</div>
</body>
</html>`;
    const w = window.open('', '_blank', 'width=800,height=600');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(() => { w.print(); }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/wizard" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Start Over
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">Your Tax Report</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Based on the details provided for FY 2025-26, here is our smart analysis and recommendation for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Charts & Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Premium Bar Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-md transition-colors duration-300">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-450 uppercase tracking-widest mb-5 text-center">Tax Liability Comparison</h3>

              {/* Savings callout */}
              {savings > 0 && (
                <div className={`rounded-2xl px-4 py-3 mb-5 text-center text-sm font-bold transition-colors ${
                  winner === 'new' ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300' : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
                }`}>
                  You save <span className="text-lg">₹{savings.toLocaleString('en-IN')}</span> with {winner === 'new' ? 'New' : 'Old'} Regime
                </div>
              )}

              <div className="flex justify-center items-end gap-6 mb-4" style={{ height: '180px' }}>
                {/* Old Regime Bar */}
                <div className="flex flex-col items-center gap-0 w-24">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-350 mb-1">₹{oldTax.toLocaleString('en-IN')}</div>
                  <div className="w-full rounded-t-xl overflow-hidden flex items-end bg-slate-100 dark:bg-slate-800" style={{ height: '150px' }}>
                    <div
                      className="w-full rounded-t-xl transition-all duration-1000 ease-out"
                      style={{
                        height: `${oldHeight}%`,
                        background: winner === 'old'
                          ? 'linear-gradient(to top, #059669, #34d399)'
                          : 'linear-gradient(to top, #64748b, #94a3b8)'
                      }}
                    />
                  </div>
                  <div className={`mt-2 text-center px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    winner === 'old' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450'
                  }`}>
                    Old Regime
                    {winner === 'old' && <span className="ml-1">✓</span>}
                  </div>
                </div>

                {/* New Regime Bar */}
                <div className="flex flex-col items-center gap-0 w-24">
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">₹{newTax.toLocaleString('en-IN')}</div>
                  <div className="w-full rounded-t-xl overflow-hidden flex items-end bg-blue-50 dark:bg-blue-950/10" style={{ height: '150px' }}>
                    <div
                      className="w-full rounded-t-xl transition-all duration-1000 ease-out"
                      style={{
                        height: `${newHeight}%`,
                        background: winner === 'new'
                          ? 'linear-gradient(to top, #2563eb, #60a5fa)'
                          : 'linear-gradient(to top, #3b82f6, #93c5fd)'
                      }}
                    />
                  </div>
                  <div className={`mt-2 text-center px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    winner === 'new' ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400' : 'bg-blue-50 dark:bg-blue-950/10 text-blue-400 dark:text-blue-500'
                  }`}>
                    New Regime
                    {winner === 'new' && <span className="ml-1">✓</span>}
                  </div>
                </div>
              </div>

              {/* Effective rate row */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Effective Rate</p>
                  <p className="text-base font-extrabold text-slate-700 dark:text-slate-350">
                    {estimatedGross > 0 ? ((oldTax / estimatedGross) * 100).toFixed(1) : '0.0'}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Effective Rate</p>
                  <p className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                    {estimatedGross > 0 ? ((newTax / estimatedGross) * 100).toFixed(1) : '0.0'}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Input Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Gross Salary</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">₹{estimatedGross.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total Deductions (Old)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">₹{currentOldDeductions.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              Smart Recommendations
            </h2>
            
            <div className="grid gap-4">
              {recommendations.map((rec, idx) => {
                const colors = {
                  indigo: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-900 dark:text-blue-200',
                  emerald: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-200',
                  amber: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-900 dark:text-amber-200',
                  blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-900 dark:text-blue-200',
                };
                const iconColors = {
                  indigo: 'text-blue-500 dark:text-blue-400',
                  emerald: 'text-emerald-500 dark:text-emerald-400',
                  amber: 'text-amber-500 dark:text-amber-400',
                  blue: 'text-blue-500 dark:text-blue-400',
                };

                return (
                  <div key={idx} className={`p-6 rounded-3xl border-2 shadow-sm transition-colors ${colors[rec.color as keyof typeof colors]}`}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {rec.type === 'winner' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColors[rec.color as keyof typeof iconColors]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )}
                        {rec.type === 'action' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColors[rec.color as keyof typeof iconColors]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        )}
                        {rec.type === 'insight' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColors[rec.color as keyof typeof iconColors]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{rec.title}</h4>
                        <p className="text-base font-medium opacity-80 leading-relaxed">{rec.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-3xl p-8 text-center shadow-xl">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to file your returns?</h3>
              <p className="text-blue-100 text-sm mb-6">Download a clean PDF copy of this report to share with your CA or keep for records.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePrintReport}
                  className="px-7 py-3 bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download PDF Report
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
