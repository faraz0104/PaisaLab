// FY 2025-26 Income Tax (AY 2026-27)

export interface TaxInputs {
  grossIncome: number;
  ageGroup?: "below60" | "60to79" | "above80";
  basicSalary?: number;             // for HRA calc; defaults to 40% of gross
  otherIncome?: number;             // FD interest, rental income, etc.
  // Old regime deductions
  hraReceived?: number;
  rentPaid?: number;
  metroCity?: boolean;
  section80C?: number;              // max 1.5L
  section80D?: number;              // max 25K (50K for seniors)
  homeLoanInterest?: number;        // 24(b) max 2L
  npsEmployer?: number;             // 80CCD(2) up to 14% of basic
  npsEmployee?: number;             // 80CCD(1B) max 50K
  savingsInterest?: number;         // 80TTA max 10K / 80TTB max 50K for seniors
  educationLoanInterest?: number;   // 80E no limit
  donations80G?: number;            // 50% deductible (qualifying donations)
  professionalTax?: number;         // max 2500
  rentPaidNoHRA?: number;           // 80GG (only if not receiving HRA)
}

export interface TaxSlab {
  from: number;
  to: number;
  rate: number;
}

export interface RegimeTaxResult {
  grossIncome: number;
  totalIncome: number;
  deductions: number;
  taxableIncome: number;
  baseTax: number;
  rebate87A: number;
  marginalRelief: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  inHandMonthly: number;
  slabBreakdown: { slab: string; amount: number; rate: number; tax: number }[];
}

export interface TaxComparisonResult {
  old: RegimeTaxResult;
  new: RegimeTaxResult;
  betterRegime: "old" | "new";
  savings: number;
  optimizer: {
    additional80C: number;
    taxSaving80C: number;
  };
}

// New regime slabs FY 2025-26 (same for all age groups)
const NEW_SLABS: TaxSlab[] = [
  { from: 0,        to: 400000,   rate: 0  },
  { from: 400000,   to: 800000,   rate: 5  },
  { from: 800000,   to: 1200000,  rate: 10 },
  { from: 1200000,  to: 1600000,  rate: 15 },
  { from: 1600000,  to: 2000000,  rate: 20 },
  { from: 2000000,  to: 2400000,  rate: 25 },
  { from: 2400000,  to: Infinity, rate: 30 },
];

// Old regime — General (below 60)
const OLD_SLABS_GENERAL: TaxSlab[] = [
  { from: 0,        to: 250000,   rate: 0  },
  { from: 250000,   to: 500000,   rate: 5  },
  { from: 500000,   to: 1000000,  rate: 20 },
  { from: 1000000,  to: Infinity, rate: 30 },
];

// Old regime — Senior Citizen (60–79)
const OLD_SLABS_SENIOR: TaxSlab[] = [
  { from: 0,        to: 300000,   rate: 0  },
  { from: 300000,   to: 500000,   rate: 5  },
  { from: 500000,   to: 1000000,  rate: 20 },
  { from: 1000000,  to: Infinity, rate: 30 },
];

// Old regime — Super Senior Citizen (80+)
const OLD_SLABS_SUPER: TaxSlab[] = [
  { from: 0,        to: 500000,   rate: 0  },
  { from: 500000,   to: 1000000,  rate: 20 },
  { from: 1000000,  to: Infinity, rate: 30 },
];

function getOldSlabs(ageGroup: string): TaxSlab[] {
  if (ageGroup === "above80") return OLD_SLABS_SUPER;
  if (ageGroup === "60to79")  return OLD_SLABS_SENIOR;
  return OLD_SLABS_GENERAL;
}

function applySlabs(income: number, slabs: TaxSlab[]): {
  tax: number;
  breakdown: { slab: string; amount: number; rate: number; tax: number }[];
} {
  let tax = 0;
  const breakdown: { slab: string; amount: number; rate: number; tax: number }[] = [];
  for (const slab of slabs) {
    if (income <= slab.from) break;
    const taxable = Math.min(income, slab.to) - slab.from;
    const slabTax = (taxable * slab.rate) / 100;
    tax += slabTax;
    if (taxable > 0 && slab.rate > 0) {
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

function calcSurcharge(taxableIncome: number, baseTax: number, isNewRegime = false): number {
  if (taxableIncome <= 5000000)  return 0;
  if (taxableIncome <= 10000000) return baseTax * 0.10;
  if (taxableIncome <= 20000000) return baseTax * 0.15;
  if (taxableIncome <= 50000000) return baseTax * 0.25;
  // New regime: surcharge capped at 25% from FY 2023-24
  return baseTax * (isNewRegime ? 0.25 : 0.37);
}

function applyRebateAndRelief(
  baseTax: number,
  taxableIncome: number,
  threshold: number
): { effectiveTax: number; rebate87A: number; marginalRelief: number } {
  if (taxableIncome <= threshold) {
    return { effectiveTax: 0, rebate87A: baseTax, marginalRelief: 0 };
  }
  const excess = taxableIncome - threshold;
  if (baseTax > excess) {
    return { effectiveTax: excess, rebate87A: 0, marginalRelief: baseTax - excess };
  }
  return { effectiveTax: baseTax, rebate87A: 0, marginalRelief: 0 };
}

function calcNewRegime(inputs: TaxInputs): RegimeTaxResult {
  const { grossIncome, npsEmployer = 0, otherIncome = 0 } = inputs;
  const totalIncome = grossIncome + otherIncome;

  const stdDeduction = 75000;
  const npsEmployerDeduction = Math.min(npsEmployer, grossIncome * 0.14);
  const deductions = stdDeduction + npsEmployerDeduction;
  const taxableIncome = Math.max(0, totalIncome - deductions);

  const { tax: baseTax, breakdown } = applySlabs(taxableIncome, NEW_SLABS);

  // 87A rebate at ₹12L + marginal relief
  const { effectiveTax, rebate87A, marginalRelief } = applyRebateAndRelief(baseTax, taxableIncome, 1200000);

  const surcharge = calcSurcharge(taxableIncome, effectiveTax, true);
  const cess = (effectiveTax + surcharge) * 0.04;
  const totalTax = effectiveTax + surcharge + cess;

  return {
    grossIncome,
    totalIncome,
    deductions,
    taxableIncome,
    baseTax,
    rebate87A,
    marginalRelief,
    surcharge,
    cess,
    totalTax,
    effectiveRate: totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0,
    inHandMonthly: (totalIncome - totalTax) / 12,
    slabBreakdown: breakdown,
  };
}

function calcOldRegime(inputs: TaxInputs): RegimeTaxResult {
  const {
    grossIncome,
    ageGroup = "below60",
    otherIncome = 0,
    basicSalary,
    hraReceived = 0,
    rentPaid = 0,
    metroCity = false,
    section80C = 0,
    section80D = 0,
    homeLoanInterest = 0,
    npsEmployer = 0,
    npsEmployee = 0,
    savingsInterest = 0,
    educationLoanInterest = 0,
    donations80G = 0,
    professionalTax = 0,
    rentPaidNoHRA = 0,
  } = inputs;

  const totalIncome = grossIncome + otherIncome;
  const basic = basicSalary ?? grossIncome * 0.4;

  // HRA exemption — least of 3 conditions
  const hraExempt = hraReceived > 0 && rentPaid > 0
    ? Math.max(0, Math.min(
        hraReceived,
        rentPaid - basic * 0.1,
        basic * (metroCity ? 0.5 : 0.4)
      ))
    : 0;

  // 80GG: only if not receiving HRA
  const deduction80GG = hraReceived === 0 && rentPaidNoHRA > 0
    ? Math.min(
        60000,                                            // ₹5K/month cap
        totalIncome * 0.25,                               // 25% of total income
        Math.max(0, rentPaidNoHRA - totalIncome * 0.1)   // rent − 10% of income
      )
    : 0;

  // 80TTA (general: savings interest up to 10K) / 80TTB (seniors: all interest up to 50K)
  const interestDeduction = ageGroup !== "below60"
    ? Math.min(savingsInterest, 50000)
    : Math.min(savingsInterest, 10000);

  // 80D — higher limit for senior citizens
  const max80D = ageGroup !== "below60" ? 50000 : 25000;

  const totalDeductions =
    50000 +                                     // standard deduction
    hraExempt +
    deduction80GG +
    Math.min(section80C, 150000) +
    Math.min(section80D, max80D) +
    Math.min(homeLoanInterest, 200000) +
    Math.min(npsEmployee, 50000) +
    Math.min(npsEmployer, grossIncome * 0.14) +
    interestDeduction +
    educationLoanInterest +                     // 80E: no limit
    donations80G * 0.5 +                        // 80G: 50% of qualifying donation
    Math.min(professionalTax, 2500);

  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  const slabs = getOldSlabs(ageGroup);
  const { tax: baseTax, breakdown } = applySlabs(taxableIncome, slabs);

  // 87A rebate at ₹5L + marginal relief
  const { effectiveTax, rebate87A, marginalRelief } = applyRebateAndRelief(baseTax, taxableIncome, 500000);

  const surcharge = calcSurcharge(taxableIncome, effectiveTax);
  const cess = (effectiveTax + surcharge) * 0.04;
  const totalTax = effectiveTax + surcharge + cess;

  return {
    grossIncome,
    totalIncome,
    deductions: totalDeductions,
    taxableIncome,
    baseTax,
    rebate87A,
    marginalRelief,
    surcharge,
    cess,
    totalTax,
    effectiveRate: totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0,
    inHandMonthly: (totalIncome - totalTax) / 12,
    slabBreakdown: breakdown,
  };
}

export function calculateTax(inputs: TaxInputs): TaxComparisonResult {
  const newResult = calcNewRegime(inputs);
  const oldResult = calcOldRegime(inputs);
  const betterRegime = newResult.totalTax <= oldResult.totalTax ? "new" : "old";
  const savings = Math.abs(newResult.totalTax - oldResult.totalTax);

  // Optimizer: how much tax saved by maxing out 80C under old regime
  const current80C = Math.min(inputs.section80C ?? 0, 150000);
  const additional80C = Math.max(0, 150000 - current80C);
  let taxSaving80C = 0;
  if (additional80C > 0) {
    const optimized = calcOldRegime({ ...inputs, section80C: 150000 });
    taxSaving80C = Math.max(0, oldResult.totalTax - optimized.totalTax);
  }

  return { old: oldResult, new: newResult, betterRegime, savings, optimizer: { additional80C, taxSaving80C } };
}
