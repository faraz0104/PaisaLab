// FY 2025-26 Income Tax (AY 2026-27)

export interface TaxInputs {
  grossIncome: number;
  // Old regime deductions
  basicSalary?: number;
  hraReceived?: number;
  rentPaid?: number;
  metroCity?: boolean;
  section80C?: number;      // max 1.5L
  section80D?: number;      // health insurance max 25K/50K
  homeLoanInterest?: number; // 24(b) max 2L
  npsEmployer?: number;     // 80CCD(2) no limit
  npsEmployee?: number;     // 80CCD(1B) max 50K
  otherDeductions?: number;
}

export interface TaxSlab {
  from: number;
  to: number;
  rate: number;
}

export interface RegimeTaxResult {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  baseTax: number;
  surcharge: number;
  cess: number;           // 4% health & education cess
  totalTax: number;
  effectiveRate: number;  // %
  inHandMonthly: number;
  slabBreakdown: { slab: string; amount: number; rate: number; tax: number }[];
}

export interface TaxComparisonResult {
  old: RegimeTaxResult;
  new: RegimeTaxResult;
  betterRegime: "old" | "new";
  savings: number;
}

// New regime slabs FY 2025-26
const NEW_SLABS: TaxSlab[] = [
  { from: 0, to: 400000, rate: 0 },
  { from: 400000, to: 800000, rate: 5 },
  { from: 800000, to: 1200000, rate: 10 },
  { from: 1200000, to: 1600000, rate: 15 },
  { from: 1600000, to: 2000000, rate: 20 },
  { from: 2000000, to: 2400000, rate: 25 },
  { from: 2400000, to: Infinity, rate: 30 },
];

// Old regime slabs
const OLD_SLABS: TaxSlab[] = [
  { from: 0, to: 250000, rate: 0 },
  { from: 250000, to: 500000, rate: 5 },
  { from: 500000, to: 1000000, rate: 20 },
  { from: 1000000, to: Infinity, rate: 30 },
];

function applySlabs(income: number, slabs: TaxSlab[]): { tax: number; breakdown: { slab: string; amount: number; rate: number; tax: number }[] } {
  let tax = 0;
  const breakdown = [];
  for (const slab of slabs) {
    if (income <= slab.from) break;
    const taxable = Math.min(income, slab.to) - slab.from;
    const slabTax = (taxable * slab.rate) / 100;
    tax += slabTax;
    if (taxable > 0) {
      breakdown.push({
        slab: slab.to === Infinity
          ? `Above ₹${(slab.from / 100000).toFixed(0)}L`
          : `₹${(slab.from / 100000).toFixed(0)}L – ₹${(slab.to / 100000).toFixed(0)}L`,
        amount: taxable,
        rate: slab.rate,
        tax: slabTax,
      });
    }
  }
  return { tax, breakdown };
}

function calcSurcharge(taxableIncome: number, baseTax: number): number {
  if (taxableIncome <= 5000000) return 0;
  if (taxableIncome <= 10000000) return baseTax * 0.10;
  if (taxableIncome <= 20000000) return baseTax * 0.15;
  if (taxableIncome <= 50000000) return baseTax * 0.25;
  return baseTax * 0.37;
}

// Marginal relief so tax doesn't exceed income above threshold
function applyRebate87A(taxableIncome: number, baseTax: number, regime: "old" | "new"): number {
  const limit = regime === "new" ? 700000 : 500000;
  if (taxableIncome <= limit) return 0;
  return baseTax;
}

function calcNewRegime(inputs: TaxInputs): RegimeTaxResult {
  const { grossIncome, npsEmployer = 0 } = inputs;
  // Standard deduction ₹75,000 + 80CCD(2) only
  const stdDeduction = 75000;
  const deductions = stdDeduction + Math.min(npsEmployer, grossIncome * 0.14);
  const taxableIncome = Math.max(0, grossIncome - deductions);

  const { tax: baseTax, breakdown } = applySlabs(taxableIncome, NEW_SLABS);

  // Section 87A rebate (income ≤ 12L → zero tax after marginal relief)
  let effectiveTax = baseTax;
  if (taxableIncome <= 1200000) effectiveTax = 0;

  const surcharge = calcSurcharge(taxableIncome, effectiveTax);
  const cess = (effectiveTax + surcharge) * 0.04;
  const totalTax = effectiveTax + surcharge + cess;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    grossIncome,
    deductions,
    taxableIncome,
    baseTax: effectiveTax,
    surcharge,
    cess,
    totalTax,
    effectiveRate,
    inHandMonthly: (grossIncome - totalTax) / 12,
    slabBreakdown: breakdown,
  };
}

function calcOldRegime(inputs: TaxInputs): RegimeTaxResult {
  const {
    grossIncome,
    basicSalary = grossIncome * 0.4,
    hraReceived = 0,
    rentPaid = 0,
    metroCity = false,
    section80C = 0,
    section80D = 0,
    homeLoanInterest = 0,
    npsEmployer = 0,
    npsEmployee = 0,
    otherDeductions = 0,
  } = inputs;

  const stdDeduction = 50000;

  // HRA exemption
  const hraExempt = hraReceived > 0 && rentPaid > 0
    ? Math.min(
        hraReceived,
        rentPaid - basicSalary * 0.1,
        basicSalary * (metroCity ? 0.5 : 0.4)
      )
    : 0;

  const totalDeductions =
    stdDeduction +
    Math.max(0, hraExempt) +
    Math.min(section80C, 150000) +
    Math.min(section80D, 50000) +
    Math.min(homeLoanInterest, 200000) +
    Math.min(npsEmployee, 50000) +
    npsEmployer +
    otherDeductions;

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  const { tax: baseTax, breakdown } = applySlabs(taxableIncome, OLD_SLABS);

  // 87A rebate for ≤ 5L
  let effectiveTax = baseTax;
  if (taxableIncome <= 500000) effectiveTax = 0;

  const surcharge = calcSurcharge(taxableIncome, effectiveTax);
  const cess = (effectiveTax + surcharge) * 0.04;
  const totalTax = effectiveTax + surcharge + cess;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    grossIncome,
    deductions: totalDeductions,
    taxableIncome,
    baseTax: effectiveTax,
    surcharge,
    cess,
    totalTax,
    effectiveRate,
    inHandMonthly: (grossIncome - totalTax) / 12,
    slabBreakdown: breakdown,
  };
}

export function calculateTax(inputs: TaxInputs): TaxComparisonResult {
  const newResult = calcNewRegime(inputs);
  const oldResult = calcOldRegime(inputs);
  const betterRegime = newResult.totalTax <= oldResult.totalTax ? "new" : "old";
  const savings = Math.abs(newResult.totalTax - oldResult.totalTax);
  return { old: oldResult, new: newResult, betterRegime, savings };
}
