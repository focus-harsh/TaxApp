import { describe, it, expect } from 'vitest';
import { calculateSlabTax, calculateRebate, calculateMarginalRelief, calculateNewRegimeTax, calculateOldRegimeTax } from './taxEngine';
import { TAX_CONFIG } from '@/constants/tax';

describe('taxEngine Utility Functions', () => {
  
  describe('calculateSlabTax', () => {
    it('calculates tax correctly for 0 income', () => {
      const tax = calculateSlabTax(0, TAX_CONFIG.newRegime.slabs);
      expect(tax).toBe(0);
    });

    it('calculates tax correctly for income within 1st slab (New Regime)', () => {
      const tax = calculateSlabTax(300000, TAX_CONFIG.newRegime.slabs);
      expect(tax).toBe(0); // 0-4L is 0%
    });

    it('calculates tax correctly for income within 2nd slab (New Regime)', () => {
      const tax = calculateSlabTax(600000, TAX_CONFIG.newRegime.slabs);
      // 0-4L: 0
      // 4L-6L (2L): 5% = 10000
      expect(tax).toBe(10000);
    });

    it('calculates tax correctly for income in highest slab (New Regime)', () => {
      const tax = calculateSlabTax(2500000, TAX_CONFIG.newRegime.slabs);
      // 0-4L: 0
      // 4L-8L (4L): 5% = 20k
      // 8L-12L (4L): 10% = 40k
      // 12L-16L (4L): 15% = 60k
      // 16L-20L (4L): 20% = 80k
      // 20L-24L (4L): 25% = 100k
      // >24L (1L): 30% = 30k
      // Total = 20+40+60+80+100+30 = 330k
      expect(tax).toBe(330000);
    });
  });

  describe('calculateRebate', () => {
    it('applies full rebate if tax is below max and income is within target', () => {
      const rebate = calculateRebate(20000, 1100000, 1200000, 60000);
      expect(rebate).toBe(20000);
    });

    it('caps rebate at max allowed amount', () => {
      const rebate = calculateRebate(80000, 1100000, 1200000, 60000);
      expect(rebate).toBe(60000);
    });

    it('gives 0 rebate if income exceeds target', () => {
      const rebate = calculateRebate(50000, 1300000, 1200000, 60000);
      expect(rebate).toBe(0);
    });
  });

  describe('calculateMarginalRelief', () => {
    it('gives no relief if income is below threshold', () => {
      const relief = calculateMarginalRelief(20000, 1100000, 1200000);
      expect(relief).toBe(0);
    });

    it('calculates correct relief when income slightly exceeds threshold', () => {
      // Income = 12,05,000, Threshold = 12L
      // Excess = 5,000
      // Tax without rebate = 60,750
      // Since 60,750 > 5,000, relief = 60,750 - 5,000 = 55,750
      const relief = calculateMarginalRelief(60750, 1205000, 1200000);
      expect(relief).toBe(55750);
    });
  });

  describe('calculateNewRegimeTax', () => {
    it('returns 0 tax for income exactly at rebate limit', () => {
      const result = calculateNewRegimeTax(1200000);
      // Tax on 12L:
      // 4L * 0% = 0
      // 4L * 5% = 20k
      // 4L * 10% = 40k
      // Total tax = 60k
      // Rebate limit 12L, max rebate 60k, so tax is 0.
      expect(result.taxBeforeRebate).toBe(60000);
      expect(result.rebate).toBe(60000);
      expect(result.finalTax).toBe(0);
    });

    it('applies marginal relief correctly just above rebate limit', () => {
      const result = calculateNewRegimeTax(1205000);
      // Excess income = 5k. Tax without rebate = 60,750.
      // After relief, tax is restricted to excess income = 5,000.
      // Cess = 5000 * 0.04 = 200. Final = 5200.
      expect(result.marginalRelief).toBe(55750);
      expect(result.taxAfterRelief).toBe(5000);
      expect(result.finalTax).toBe(5200);
    });

    it('calculates tax for high income', () => {
      const result = calculateNewRegimeTax(2500000);
      // Tax on 25L is 330k (from earlier)
      expect(result.taxBeforeRebate).toBe(330000);
      expect(result.rebate).toBe(0);
      expect(result.finalTax).toBe(330000 + 330000 * 0.04);
    });
  });

  describe('calculateOldRegimeTax', () => {
    it('returns 0 tax for below 60 within rebate limit', () => {
      const result = calculateOldRegimeTax(490000, 'below60');
      // Tax: 2.5L * 5% = 12000
      expect(result.taxBeforeRebate).toBe(12000);
      expect(result.rebate).toBe(12000);
      expect(result.finalTax).toBe(0);
    });

    it('calculates tax for senior citizens', () => {
      const result = calculateOldRegimeTax(600000, 'senior');
      // 0-3L: 0
      // 3L-5L: 5% = 10000
      // 5L-6L: 20% = 20000
      // Total: 30000
      expect(result.taxBeforeRebate).toBe(30000);
      expect(result.finalTax).toBe(30000 + 30000 * 0.04);
    });
  });
});
