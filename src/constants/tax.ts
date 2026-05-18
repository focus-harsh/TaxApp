export type TaxSlab = {
  min: number;
  max: number | null;
  rate: number;
};

export const TAX_CONFIG = {
  fy: '2025-26',
  
  newRegime: {
    standardDeduction: 75000,
    rebate: {
      maxIncomeTarget: 1200000, // Section 87A: Up to ₹12 Lakhs
      maxRebateAmount: 60000,
    },
    slabs: [
      { min: 0, max: 400000, rate: 0 },
      { min: 400000, max: 800000, rate: 0.05 },
      { min: 800000, max: 1200000, rate: 0.10 },
      { min: 1200000, max: 1600000, rate: 0.15 },
      { min: 1600000, max: 2000000, rate: 0.20 },
      { min: 2000000, max: 2400000, rate: 0.25 },
      { min: 2400000, max: null, rate: 0.30 },
    ] as TaxSlab[],
  },
  
  oldRegime: {
    standardDeduction: 50000,
    rebate: {
      maxIncomeTarget: 500000,
      maxRebateAmount: 12500,
    },
    slabs: {
      below60: [
        { min: 0, max: 250000, rate: 0 },
        { min: 250000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ] as TaxSlab[],
      senior: [
        { min: 0, max: 300000, rate: 0 },
        { min: 300000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ] as TaxSlab[],
      superSenior: [
        { min: 0, max: 500000, rate: 0 },
        { min: 500000, max: 1000000, rate: 0.20 },
        { min: 1000000, max: null, rate: 0.30 },
      ] as TaxSlab[],
    }
  },
  
  deductions: {
    max80C: 150000,
    max80CCD1B: 50000, // Employee NPS
    max80TTA: 10000, // Savings interest for non-senior
    max80TTB: 50000, // Savings interest for senior
    maxHomeLoanInterestSelfOccupied: 200000,
  },
  
  cessRate: 0.04,
};
