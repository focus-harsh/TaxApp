import { TAX_CONFIG, TaxSlab } from '@/constants/tax';

/**
 * Calculates tax based on given income and tax slabs.
 */
export function calculateSlabTax(income: number, slabs: TaxSlab[]): number {
  if (income <= 0) return 0;

  let totalTax = 0;

  for (const slab of slabs) {
    if (income > slab.min) {
      const taxableInThisSlab = slab.max ? Math.min(income, slab.max) - slab.min : income - slab.min;
      totalTax += taxableInThisSlab * slab.rate;
    }
  }

  return totalTax;
}

/**
 * Calculates the rebate based on income and regime configuration.
 */
export function calculateRebate(tax: number, income: number, maxIncomeTarget: number, maxRebateAmount: number): number {
  if (income <= maxIncomeTarget) {
    return Math.min(tax, maxRebateAmount);
  }
  return 0;
}

/**
 * Calculates marginal relief if income slightly exceeds the rebate threshold.
 */
export function calculateMarginalRelief(taxBeforeRelief: number, income: number, threshold: number): number {
  if (income <= threshold) return 0;
  
  const excessIncome = income - threshold;
  
  // If the tax is greater than the excess income, the tax should be restricted to the excess income.
  // The marginal relief is the difference.
  if (taxBeforeRelief > excessIncome) {
    return taxBeforeRelief - excessIncome;
  }
  return 0;
}

export type AgeCategory = 'below60' | 'senior' | 'superSenior';

export function getOldRegimeSlabs(ageCategory: AgeCategory): TaxSlab[] {
  return TAX_CONFIG.oldRegime.slabs[ageCategory];
}

export type TaxCalculationResult = {
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  marginalRelief: number;
  taxAfterRelief: number;
  cess: number;
  finalTax: number;
};

/**
 * Calculates total tax under the new regime.
 */
export function calculateNewRegimeTax(taxableIncome: number): TaxCalculationResult {
  const { slabs, rebate } = TAX_CONFIG.newRegime;
  
  const taxBeforeRebate = calculateSlabTax(taxableIncome, slabs);
  const rebateAmount = calculateRebate(taxBeforeRebate, taxableIncome, rebate.maxIncomeTarget, rebate.maxRebateAmount);
  
  let taxAfterRebate = taxBeforeRebate - rebateAmount;
  let marginalRelief = 0;

  // Apply marginal relief if income is slightly above the rebate limit
  if (taxableIncome > rebate.maxIncomeTarget && taxAfterRebate > 0) {
    marginalRelief = calculateMarginalRelief(taxAfterRebate, taxableIncome, rebate.maxIncomeTarget);
    taxAfterRebate -= marginalRelief;
  }

  const cess = taxAfterRebate * TAX_CONFIG.cessRate;
  const finalTax = Math.round(taxAfterRebate + cess);

  return {
    taxableIncome,
    taxBeforeRebate,
    rebate: rebateAmount,
    marginalRelief,
    taxAfterRelief: taxAfterRebate,
    cess,
    finalTax
  };
}

/**
 * Calculates total tax under the old regime.
 */
export function calculateOldRegimeTax(taxableIncome: number, ageCategory: AgeCategory = 'below60'): TaxCalculationResult {
  const slabs = getOldRegimeSlabs(ageCategory);
  const { rebate } = TAX_CONFIG.oldRegime;
  
  const taxBeforeRebate = calculateSlabTax(taxableIncome, slabs);
  const rebateAmount = calculateRebate(taxBeforeRebate, taxableIncome, rebate.maxIncomeTarget, rebate.maxRebateAmount);
  
  let taxAfterRebate = taxBeforeRebate - rebateAmount;
  let marginalRelief = 0;

  // Marginal relief under old regime for 87A rebate is generally applicable
  if (taxableIncome > rebate.maxIncomeTarget && taxAfterRebate > 0) {
    marginalRelief = calculateMarginalRelief(taxAfterRebate, taxableIncome, rebate.maxIncomeTarget);
    taxAfterRebate -= marginalRelief;
  }

  const cess = taxAfterRebate * TAX_CONFIG.cessRate;
  const finalTax = Math.round(taxAfterRebate + cess);

  return {
    taxableIncome,
    taxBeforeRebate,
    rebate: rebateAmount,
    marginalRelief,
    taxAfterRelief: taxAfterRebate,
    cess,
    finalTax
  };
}
