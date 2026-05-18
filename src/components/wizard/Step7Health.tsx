"use client";

import { useWizardStore } from '@/store/useWizardStore';

export default function Step7Health() {
  const medical = useWizardStore((state) => state.medical);
  const updateMedical = useWizardStore((state) => state.updateMedical);

  const handleChange = (field: keyof typeof medical) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateMedical({ [field]: value ? parseInt(value, 10) : 0 });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Health Insurance (Section 80D)</h2>
        <p className="text-slate-500 mb-4">Premiums paid for yourself, family, and parents in the Old Regime.</p>
      </div>

      <div className="space-y-4">
        {[
          { id: 'healthSelfFamily', label: 'Self, Spouse & Children', desc: 'Max ₹25,000 (₹50,000 if Senior Citizen)' },
          { id: 'healthParents', label: 'Parents', desc: 'Max ₹25,000 (₹50,000 if Senior Citizen)' },
          { id: 'preventiveCheckup', label: 'Preventive Health Checkup', desc: 'Max ₹5,000 (Includes cash payments)' },
        ].map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-2xl bg-white hover:border-blue-200 transition-colors">
            <div className="mb-3 sm:mb-0">
              <p className="font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
            <div className="relative w-full sm:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-500 text-lg font-medium">₹</span>
              </div>
              <input 
                type="text" 
                inputMode="numeric"
                value={medical[item.id as keyof typeof medical] || ''}
                onChange={handleChange(item.id as keyof typeof medical)}
                placeholder="0" 
                className="block w-full pl-10 pr-4 py-3 text-lg text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder-slate-300" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
