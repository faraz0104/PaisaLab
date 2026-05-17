export interface SalaryInputs {
  annualCTC: number;
  basicPct: number;         // % of CTC that is basic salary (default 40)
  isMetro: boolean;
  taxRegime: "new" | "old";
  pfOptIn: boolean;         // employee PF contribution (default true)
}

export interface SalaryBreakdown {
  // CTC components (annual)
  annualCTC: number;
  basic: number;
  hra: number;
  specialAllowance: number;
  employerPF: number;
  gratuity: number;

  // Gross salary (what you actually earn — CTC minus employer contributions)
  annualGross: number;

  // Deductions (annual)
  employeePF: number;
  professionalTax: number;
  incomeTax: number;
  totalDeductions: number;

  // Take-home
  annualTakeHome: number;
  monthlyTakeHome: number;
  monthlyGross: number;

  effectiveTaxRate: number;
}

export function calculateSalary(inputs: SalaryInputs): SalaryBreakdown {
  const { annualCTC, basicPct, isMetro, taxRegime, pfOptIn } = inputs;

  // Salary component breakdown
  const basic          = Math.round(annualCTC * basicPct / 100);
  const hra            = Math.round(basic * (isMetro ? 0.5 : 0.4));
  const employerPF     = Math.round(Math.min(basic * 0.12, 21600)); // capped at ₹1,800/mo
  const gratuity       = Math.round(basic * 0.0481);                // 4.81% of basic

  // Special allowance = CTC - all other components
  const specialAllowance = Math.max(0, annualCTC - basic - hra - employerPF - gratuity);

  // Gross = CTC minus employer-side contributions (what appears in salary slip)
  const annualGross = annualCTC - employerPF - gratuity;

  // Employee deductions
  const employeePF     = pfOptIn ? Math.round(Math.min(basic * 0.12, 21600)) : 0;
  const professionalTax = 2400; // ₹200/month, standard across most states

  // Income tax — import calculateTax inline to avoid circular dependency
  // Taxable income under new regime: gross - std deduction (75K) - employeePF (80C)
  // Taxable income under old regime: gross - std deduction (50K) - employeePF (80C) - HRA exemption
  let taxableIncome: number;
  let incomeTax: number;

  if (taxRegime === "new") {
    taxableIncome = Math.max(0, annualGross - 75000 - employeePF);
    incomeTax = calcNewRegimeTax(taxableIncome);
  } else {
    // Old regime: HRA exemption = min(HRA, rent - 10% basic, 50%/40% of basic)
    // Assume user pays rent equal to HRA received for max exemption
    const hraExempt = Math.min(hra, hra - basic * 0.1, basic * (isMetro ? 0.5 : 0.4));
    taxableIncome = Math.max(0, annualGross - 50000 - Math.max(0, hraExempt) - employeePF);
    incomeTax = calcOldRegimeTax(taxableIncome);
  }

  const totalDeductions = employeePF + professionalTax + incomeTax;
  const annualTakeHome  = annualGross - totalDeductions;

  return {
    annualCTC,
    basic,
    hra,
    specialAllowance,
    employerPF,
    gratuity,
    annualGross,
    employeePF,
    professionalTax,
    incomeTax: Math.round(incomeTax),
    totalDeductions: Math.round(totalDeductions),
    annualTakeHome: Math.round(annualTakeHome),
    monthlyTakeHome: Math.round(annualTakeHome / 12),
    monthlyGross: Math.round(annualGross / 12),
    effectiveTaxRate: annualGross > 0 ? (incomeTax / annualGross) * 100 : 0,
  };
}

// ── Inline tax helpers (avoids importing tax.ts to keep bundle small) ──

const NEW_SLABS = [
  [0, 400000, 0], [400000, 800000, 5], [800000, 1200000, 10],
  [1200000, 1600000, 15], [1600000, 2000000, 20],
  [2000000, 2400000, 25], [2400000, Infinity, 30],
] as const;

const OLD_SLABS = [
  [0, 250000, 0], [250000, 500000, 5],
  [500000, 1000000, 20], [1000000, Infinity, 30],
] as const;

function applySlabs(income: number, slabs: readonly (readonly [number, number, number])[]): number {
  let tax = 0;
  for (const [from, to, rate] of slabs) {
    if (income <= from) break;
    tax += (Math.min(income, to) - from) * rate / 100;
  }
  return tax;
}

function withRebateAndCess(baseTax: number, taxableIncome: number, threshold: number): number {
  let effective = taxableIncome <= threshold ? 0 : Math.min(baseTax, taxableIncome - threshold);
  return effective * 1.04; // 4% cess
}

function calcNewRegimeTax(taxableIncome: number): number {
  const base = applySlabs(taxableIncome, NEW_SLABS);
  return withRebateAndCess(base, taxableIncome, 1200000);
}

function calcOldRegimeTax(taxableIncome: number): number {
  const base = applySlabs(taxableIncome, OLD_SLABS);
  return withRebateAndCess(base, taxableIncome, 500000);
}
