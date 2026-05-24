"use client";

import { useWizardStore } from '@/store/useWizardStore';

export default function Step2Salary() {
  const salary = useWizardStore((state) => state.salary);
  const updateSalary = useWizardStore((state) => state.updateSalary);

  const handleMonthlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateSalary({ monthlyInHand: value ? parseInt(value, 10) : 0 });
  };

  const handleBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateSalary({ bonus: value ? parseInt(value, 10) : 0 });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How much salary usually comes into your bank account every month?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Use your average monthly salary after deductions.</p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 dark:text-slate-450 text-xl font-medium">₹</span>
          </div>
          <input 
            type="text" 
            inputMode="numeric"
            value={salary.monthlyInHand || ''}
            onChange={handleMonthlyChange}
            placeholder="0" 
            className="block w-full pl-10 pr-4 py-5 text-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-600 font-medium" 
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Do you receive bonus, incentives, or variable pay?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Enter the total annual amount. Leave as 0 if none.</p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 dark:text-slate-450 text-xl font-medium">₹</span>
          </div>
          <input 
            type="text" 
            inputMode="numeric"
            value={salary.bonus || ''}
            onChange={handleBonusChange}
            placeholder="0" 
            className="block w-full pl-10 pr-4 py-5 text-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-600 font-medium" 
          />
        </div>
      </div>
    </div>
  );
}
