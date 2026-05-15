export type CompoundFrequency = "monthly" | "quarterly" | "half-yearly" | "yearly";

export interface FDInputs {
  principal: number;
  annualRate: number;
  years: number;
  months?: number;
  frequency: CompoundFrequency;
}

export interface FDResult {
  maturityAmount: number;
  totalInterest: number;
  effectiveRate: number;  // annual effective rate
  yearlyBreakdown: { year: number; invested: number; interest: number; total: number }[];
}

const frequencyMap: Record<CompoundFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  "half-yearly": 2,
  yearly: 1,
};

// A = P × (1 + r/n)^(n×t)
export function calculateFD(inputs: FDInputs): FDResult {
  const { principal, annualRate, years, months = 0, frequency } = inputs;
  const r = annualRate / 100;
  const n = frequencyMap[frequency];
  const t = years + months / 12;

  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = maturityAmount - principal;
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

  const yearlyBreakdown = [];
  const totalYears = Math.ceil(t);
  for (let yr = 1; yr <= totalYears; yr++) {
    const tYr = Math.min(yr, t);
    const val = principal * Math.pow(1 + r / n, n * tYr);
    yearlyBreakdown.push({
      year: yr,
      invested: principal,
      interest: val - principal,
      total: val,
    });
  }

  return { maturityAmount, totalInterest, effectiveRate, yearlyBreakdown };
}

export interface RDInputs {
  monthlyDeposit: number;
  annualRate: number;
  years: number;
}

export interface RDResult {
  investedAmount: number;
  maturityAmount: number;
  totalInterest: number;
  yearlyBreakdown: { year: number; invested: number; interest: number; total: number }[];
}

// RD maturity: M = R × [(1 + i)^n – 1] / (1 – (1+i)^(-1/3))
// Simplified: quarterly compounding standard for Indian banks
export function calculateRD(inputs: RDInputs): RDResult {
  const { monthlyDeposit, annualRate, years } = inputs;
  const r = annualRate / 400; // quarterly rate
  const n = years * 12;
  const investedAmount = monthlyDeposit * n;

  // Each deposit grows for remaining tenure with quarterly compounding
  let maturityAmount = 0;
  for (let m = 1; m <= n; m++) {
    const quartersRemaining = ((n - m + 1) / 3);
    maturityAmount += monthlyDeposit * Math.pow(1 + r, quartersRemaining);
  }

  const totalInterest = maturityAmount - investedAmount;

  const yearlyBreakdown = [];
  for (let yr = 1; yr <= years; yr++) {
    const monthsElapsed = yr * 12;
    let val = 0;
    for (let m = 1; m <= monthsElapsed; m++) {
      const quartersRemaining = ((n - m + 1) / 3);
      val += monthlyDeposit * Math.pow(1 + r, quartersRemaining);
    }
    yearlyBreakdown.push({
      year: yr,
      invested: monthlyDeposit * monthsElapsed,
      interest: val - monthlyDeposit * monthsElapsed,
      total: val,
    });
  }

  return { investedAmount, maturityAmount, totalInterest, yearlyBreakdown };
}

export const BANK_FD_RATES: { bank: string; rate1yr: number; rate3yr: number; rate5yr: number; seniorRate: number }[] = [
  { bank: "SBI", rate1yr: 6.80, rate3yr: 6.75, rate5yr: 6.50, seniorRate: 7.30 },
  { bank: "HDFC Bank", rate1yr: 6.60, rate3yr: 7.00, rate5yr: 7.00, seniorRate: 7.50 },
  { bank: "ICICI Bank", rate1yr: 6.70, rate3yr: 7.00, rate5yr: 7.00, seniorRate: 7.50 },
  { bank: "Axis Bank", rate1yr: 6.70, rate3yr: 7.10, rate5yr: 7.00, seniorRate: 7.60 },
  { bank: "Kotak Bank", rate1yr: 7.10, rate3yr: 7.10, rate5yr: 6.20, seniorRate: 7.60 },
  { bank: "Yes Bank", rate1yr: 7.25, rate3yr: 7.25, rate5yr: 7.25, seniorRate: 7.75 },
  { bank: "Post Office", rate1yr: 6.90, rate3yr: 7.10, rate5yr: 7.50, seniorRate: 7.50 },
];
