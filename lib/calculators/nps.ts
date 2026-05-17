export interface NPSInputs {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  employerContribution: number; // monthly, 0 if self-employed
  expectedReturn: number;       // annual %, default 10
  annuityRate: number;          // annuity return %, default 6
  annuityPct: number;           // % of corpus used for annuity (min 40)
}

export interface NPSResult {
  totalCorpus: number;
  totalInvested: number;
  totalReturns: number;
  annuityCorpus: number;       // portion used for annuity
  lumpSumWithdrawal: number;   // tax-free (60%)
  estimatedMonthlyPension: number;
  yearsToRetirement: number;
  taxBenefit80CCD1: number;    // up to ₹1.5L (part of 80C)
  taxBenefit80CCD1B: number;   // additional ₹50K under 80CCD(1B)
  taxBenefit80CCD2: number;    // employer contribution (10% of basic)
  annualContribution: number;
}

export function calculateNPS(inputs: NPSInputs): NPSResult {
  const {
    currentAge,
    retirementAge,
    monthlyContribution,
    employerContribution,
    expectedReturn,
    annuityRate,
    annuityPct,
  } = inputs;

  const years = Math.max(0, retirementAge - currentAge);
  const months = years * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonthly = monthlyContribution + employerContribution;

  let totalCorpus = 0;
  if (monthlyRate > 0 && months > 0) {
    totalCorpus = totalMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  } else {
    totalCorpus = totalMonthly * months;
  }

  const totalInvested = totalMonthly * months;
  const totalReturns = totalCorpus - totalInvested;

  const annuityFraction = Math.max(0.4, annuityPct / 100);
  const annuityCorpus = totalCorpus * annuityFraction;
  const lumpSumWithdrawal = totalCorpus - annuityCorpus; // 60% tax-free

  const estimatedMonthlyPension = (annuityCorpus * annuityRate / 100) / 12;

  const annualContribution = monthlyContribution * 12;
  // 80CCD(1): up to 10% of salary or ₹1.5L (part of 80C limit)
  const taxBenefit80CCD1 = Math.min(annualContribution, 150000);
  // 80CCD(1B): additional ₹50K over 80C limit
  const taxBenefit80CCD1B = Math.min(Math.max(0, annualContribution - 150000), 50000);
  // 80CCD(2): employer contribution up to 10% of basic (tax-free for employee)
  const taxBenefit80CCD2 = employerContribution * 12;

  return {
    totalCorpus,
    totalInvested,
    totalReturns,
    annuityCorpus,
    lumpSumWithdrawal,
    estimatedMonthlyPension,
    yearsToRetirement: years,
    taxBenefit80CCD1,
    taxBenefit80CCD1B,
    taxBenefit80CCD2,
    annualContribution,
  };
}
