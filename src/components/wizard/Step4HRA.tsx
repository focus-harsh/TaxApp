"use client";

import { useWizardStore } from '@/store/useWizardStore';

export default function Step4HRA() {
  const hra = useWizardStore((state) => state.hra);
  const updateHra = useWizardStore((state) => state.updateHra);

  const handleToggleRent = () => {
    updateHra({ isRented: !hra.isRented });
  };

  const handleToggleMetro = () => {
    updateHra({ isMetro: !hra.isMetro });
  };

  const handleChange = (field: keyof typeof hra) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateHra({ [field]: value ? parseInt(value, 10) : 0 });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Do you pay rent?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">If you pay rent and receive HRA, you can claim exemptions under the Old Regime.</p>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => updateHra({ isRented: true })}
            className={`flex-1 py-4 px-6 rounded-2xl border-2 font-semibold transition-all cursor-pointer ${hra.isRented ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-slate-700'}`}
          >
            Yes, I pay rent
          </button>
          <button
            onClick={() => updateHra({ isRented: false, monthlyRent: 0, hraReceived: 0, basicSalary: 0 })}
            className={`flex-1 py-4 px-6 rounded-2xl border-2 font-semibold transition-all cursor-pointer ${!hra.isRented ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-200 dark:hover:border-slate-700'}`}
          >
            No, I don't
          </button>
        </div>

        {hra.isRented && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monthly Rent Paid</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-450 text-lg font-medium">₹</span>
                </div>
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={hra.monthlyRent || ''}
                  onChange={handleChange('monthlyRent')}
                  placeholder="0" 
                  className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-650" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Annual Basic Salary (From your payslip)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-450 text-lg font-medium">₹</span>
                </div>
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={hra.basicSalary || ''}
                  onChange={handleChange('basicSalary')}
                  placeholder="0" 
                  className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-650" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Annual HRA Received (From your payslip)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-450 text-lg font-medium">₹</span>
                </div>
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={hra.hraReceived || ''}
                  onChange={handleChange('hraReceived')}
                  placeholder="0" 
                  className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-650" 
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3 cursor-pointer p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                <input 
                  type="checkbox" 
                  checked={hra.isMetro}
                  onChange={handleToggleMetro}
                  className="w-5 h-5 text-blue-600 dark:text-blue-500 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Do you live in a Metro City? (Delhi, Mumbai, Chennai, Kolkata)</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
