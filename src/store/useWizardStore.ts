import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AgeCategory } from '@/tax-engine/taxEngine';

export type EmployeeType = 'private' | 'government' | 'pensioner';

export interface ProfileState {
  ageCategory: AgeCategory;
  employeeType: EmployeeType;
}

export interface SalaryState {
  monthlyInHand: number;
  bonus: number;
}

export interface DeductionsState {
  employeePF: number;
  professionalTax: number;
}

export interface HraState {
  isRented: boolean;
  monthlyRent: number;
  isMetro: boolean;
  basicSalary: number;
  hraReceived: number;
}

export interface Investments80CState {
  elss: number;
  ppf: number;
  lifeInsurance: number;
  other80C: number;
}

export interface NpsState {
  npsVoluntary: number; // 80CCD(1B)
  npsEmployer: number; // 80CCD(2)
}

export interface MedicalState {
  healthSelfFamily: number; // 80D
  healthParents: number; // 80D
  preventiveCheckup: number; // 80D limit 5000
}

export interface HomeLoanState {
  interestSelfOccupied: number; // Section 24(b)
  interestLetOut: number; // Section 24(b)
}

export interface OtherDeductionsState {
  savingsInterest: number; // 80TTA/TTB
  educationLoanInterest: number; // 80E
  donations: number; // 80G
}

export interface WizardState {
  profile: ProfileState;
  salary: SalaryState;
  deductions: DeductionsState;
  hra: HraState;
  investments80C: Investments80CState;
  nps: NpsState;
  medical: MedicalState;
  homeLoan: HomeLoanState;
  otherDeductions: OtherDeductionsState;
  
  // Actions
  updateProfile: (profile: Partial<ProfileState>) => void;
  updateSalary: (salary: Partial<SalaryState>) => void;
  updateDeductions: (deductions: Partial<DeductionsState>) => void;
  updateHra: (hra: Partial<HraState>) => void;
  updateInvestments80C: (investments: Partial<Investments80CState>) => void;
  updateNps: (nps: Partial<NpsState>) => void;
  updateMedical: (medical: Partial<MedicalState>) => void;
  updateHomeLoan: (homeLoan: Partial<HomeLoanState>) => void;
  updateOtherDeductions: (other: Partial<OtherDeductionsState>) => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
  profile: {
    ageCategory: 'below60',
    employeeType: 'private',
  },
  salary: {
    monthlyInHand: 0,
    bonus: 0,
  },
  deductions: {
    employeePF: 0,
    professionalTax: 0,
  },
  hra: {
    isRented: false,
    monthlyRent: 0,
    isMetro: false,
    basicSalary: 0,
    hraReceived: 0,
  },
  investments80C: {
    elss: 0,
    ppf: 0,
    lifeInsurance: 0,
    other80C: 0,
  },
  nps: {
    npsVoluntary: 0,
    npsEmployer: 0,
  },
  medical: {
    healthSelfFamily: 0,
    healthParents: 0,
    preventiveCheckup: 0,
  },
  homeLoan: {
    interestSelfOccupied: 0,
    interestLetOut: 0,
  },
  otherDeductions: {
    savingsInterest: 0,
    educationLoanInterest: 0,
    donations: 0,
  },
  
  updateProfile: (newProfile) => 
    set((state) => ({ 
      profile: { ...state.profile, ...newProfile } 
    })),
    
  updateSalary: (newSalary) => 
    set((state) => ({ 
      salary: { ...state.salary, ...newSalary } 
    })),

  updateDeductions: (newDeductions) => 
    set((state) => ({ 
      deductions: { ...state.deductions, ...newDeductions } 
    })),

  updateHra: (newHra) => 
    set((state) => ({ 
      hra: { ...state.hra, ...newHra } 
    })),

  updateInvestments80C: (newInvestments) => 
    set((state) => ({ 
      investments80C: { ...state.investments80C, ...newInvestments } 
    })),

  updateNps: (newNps) => 
    set((state) => ({ nps: { ...state.nps, ...newNps } })),

  updateMedical: (newMedical) => 
    set((state) => ({ medical: { ...state.medical, ...newMedical } })),

  updateHomeLoan: (newHomeLoan) => 
    set((state) => ({ homeLoan: { ...state.homeLoan, ...newHomeLoan } })),

  updateOtherDeductions: (newOther) => 
    set((state) => ({ otherDeductions: { ...state.otherDeductions, ...newOther } })),
    }),
    {
      name: 'taxwise-storage', // name of the item in the storage (must be unique)
    }
  )
);
