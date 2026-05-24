"use client";

import { useWizardStore } from '@/store/useWizardStore';
import { AgeCategory } from '@/tax-engine/taxEngine';
import { EmployeeType } from '@/store/useWizardStore';

export default function Step1Profile() {
  const profile = useWizardStore((state) => state.profile);
  const updateProfile = useWizardStore((state) => state.updateProfile);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What is your age?</h2>
        <div className="space-y-4">
          {(
            [
              { value: 'below60', label: 'Below 60' },
              { value: 'senior', label: '60 to 79' },
              { value: 'superSenior', label: '80+' },
            ] as const
          ).map((option) => (
            <label 
              key={option.value} 
              className={`flex items-center p-5 border rounded-2xl cursor-pointer transition-all shadow-sm
                ${profile.ageCategory === option.value 
                  ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
            >
              <input 
                type="radio" 
                name="age" 
                value={option.value}
                checked={profile.ageCategory === option.value}
                onChange={() => updateProfile({ ageCategory: option.value as AgeCategory })}
                className="h-5 w-5 text-blue-600 dark:text-blue-500 border-slate-300 dark:border-slate-700 focus:ring-blue-600 dark:focus:ring-blue-500" 
              />
              <span className="ml-4 text-lg font-medium text-slate-700 dark:text-slate-200">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What type of salaried person are you?</h2>
        <div className="space-y-4">
          {(
            [
              { value: 'private', label: 'Private employee' },
              { value: 'government', label: 'Government employee' },
              { value: 'pensioner', label: 'Pensioner' },
            ] as const
          ).map((option) => (
            <label 
              key={option.value} 
              className={`flex items-center p-5 border rounded-2xl cursor-pointer transition-all shadow-sm
                ${profile.employeeType === option.value 
                  ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-1 ring-blue-600 dark:ring-blue-500' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
            >
              <input 
                type="radio" 
                name="empType" 
                value={option.value}
                checked={profile.employeeType === option.value}
                onChange={() => updateProfile({ employeeType: option.value as EmployeeType })}
                className="h-5 w-5 text-blue-600 dark:text-blue-500 border-slate-300 dark:border-slate-700 focus:ring-blue-600 dark:focus:ring-blue-500" 
              />
              <span className="ml-4 text-lg font-medium text-slate-700 dark:text-slate-200">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
