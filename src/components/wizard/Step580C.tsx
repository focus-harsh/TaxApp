"use client";

import { useWizardStore } from '@/store/useWizardStore';

export default function Step580C() {
  const investments80C = useWizardStore((state) => state.investments80C);
  const deductions = useWizardStore((state) => state.deductions);
  const updateInvestments80C = useWizardStore((state) => state.updateInvestments80C);

  const handleChange = (field: keyof typeof investments80C) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateInvestments80C({ [field]: value ? parseInt(value, 10) : 0 });
  };

  const total80C = investments80C.elss + investments80C.ppf + investments80C.lifeInsurance + investments80C.other80C + (deductions.employeePF || 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Section 80C Investments</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-4">Max deduction allowed is ₹1.5 Lakhs in the Old Regime. Note: EPF from Step 3 is already included.</p>
        <div className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 font-semibold px-4 py-3 rounded-lg border border-blue-100 dark:border-blue-900/30 mb-6 transition-colors duration-300">
          Total 80C Claimed: ₹{total80C.toLocaleString('en-IN')} {total80C > 150000 && <span className="text-red-500 text-sm ml-2 font-normal">(Capped at ₹1.5L)</span>}
        </div>
      </div>

      <div className="space-y-4">
        {[
          { id: 'elss', label: 'ELSS Mutual Funds', desc: 'Equity Linked Savings Scheme' },
          { id: 'ppf', label: 'PPF (Public Provident Fund)', desc: 'Voluntary PPF contributions' },
          { id: 'lifeInsurance', label: 'Life Insurance', desc: 'Annual premium paid' },
          { id: 'other80C', label: 'Others (Tuition fees, Principal, etc.)', desc: 'Any other 80C eligible' },
        ].map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-400 transition-colors">
            <div className="mb-3 sm:mb-0">
              <p className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
            <div className="relative w-full sm:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-500 dark:text-slate-450 text-lg font-medium">₹</span>
              </div>
              <input 
                type="text" 
                inputMode="numeric"
                value={investments80C[item.id as keyof typeof investments80C] || ''}
                onChange={handleChange(item.id as keyof typeof investments80C)}
                placeholder="0" 
                className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-650" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
