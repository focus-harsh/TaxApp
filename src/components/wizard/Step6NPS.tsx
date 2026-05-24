"use client";

import { useWizardStore } from '@/store/useWizardStore';

export default function Step6NPS() {
  const nps = useWizardStore((state) => state.nps);
  const updateNps = useWizardStore((state) => state.updateNps);

  const handleChange = (field: keyof typeof nps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateNps({ [field]: value ? parseInt(value, 10) : 0 });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">National Pension System (NPS)</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-4">Extra tax savings over and above the ₹1.5L limit of 80C.</p>
      </div>

      <div className="space-y-6">
        <div className="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-400 transition-colors">
          <div className="mb-4">
            <p className="font-semibold text-slate-800 dark:text-slate-200">Voluntary Contribution [80CCD(1B)]</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Max ₹50,000 allowed in Old Regime.</p>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-500 dark:text-slate-450 text-lg font-medium">₹</span>
            </div>
            <input 
              type="text" 
              inputMode="numeric"
              value={nps.npsVoluntary || ''}
              onChange={handleChange('npsVoluntary')}
              placeholder="0" 
              className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-650" 
            />
          </div>
        </div>

        <div className="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-400 transition-colors">
          <div className="mb-4">
            <p className="font-semibold text-slate-800 dark:text-slate-200">Employer Contribution [80CCD(2)]</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Allowed in BOTH Old and New Regimes! Up to 10% (14% for Govt) of Basic + DA.</p>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-500 dark:text-slate-450 text-lg font-medium">₹</span>
            </div>
            <input 
              type="text" 
              inputMode="numeric"
              value={nps.npsEmployer || ''}
              onChange={handleChange('npsEmployer')}
              placeholder="0" 
              className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white dark:bg-slate-900 shadow-sm placeholder-slate-300 dark:placeholder-slate-650" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
