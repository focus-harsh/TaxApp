"use client";

import { useWizardStore } from '@/store/useWizardStore';

export default function Step3Deductions() {
  const deductions = useWizardStore((state) => state.deductions);
  const updateDeductions = useWizardStore((state) => state.updateDeductions);

  const handlePFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateDeductions({ employeePF: value ? parseInt(value, 10) : 0 });
  };

  const handlePTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateDeductions({ professionalTax: value ? parseInt(value, 10) : 0 });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Provident Fund (EPF/VPF)</h2>
        <p className="text-slate-500 mb-6">Enter your annual employee contribution. This is usually deducted from your salary.</p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 text-xl font-medium">₹</span>
          </div>
          <input 
            type="text" 
            inputMode="numeric"
            value={deductions.employeePF || ''}
            onChange={handlePFChange}
            placeholder="0" 
            className="block w-full pl-10 pr-4 py-5 text-2xl text-slate-900 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white shadow-sm placeholder-slate-300 font-medium" 
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Tax</h2>
        <p className="text-slate-500 mb-6">Enter your annual professional tax deducted by your employer (Max ₹2,500).</p>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 text-xl font-medium">₹</span>
          </div>
          <input 
            type="text" 
            inputMode="numeric"
            value={deductions.professionalTax || ''}
            onChange={handlePTChange}
            placeholder="0" 
            className="block w-full pl-10 pr-4 py-5 text-2xl text-slate-900 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white shadow-sm placeholder-slate-300 font-medium" 
          />
        </div>
      </div>
    </div>
  );
}
