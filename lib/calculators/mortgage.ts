export interface MortgageInputs {
  homePrice: number;
  downPayment: number;       // absolute amount
  annualRate: number;        // %
  termYears: number;
}

export interface MortgageYearData {
  year: number;
  principal: number;         // cumulative principal paid
  interest: number;          // cumulative interest paid
  balance: number;           // remaining balance
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  downPaymentPct: number;
  yearlyBreakdown: MortgageYearData[];
}

// Standard amortization: M = P[r(1+r)^n] / [(1+r)^n - 1]
export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const { homePrice, downPayment, annualRate, termYears } = inputs;
  const loanAmount = Math.max(homePrice - downPayment, 0);
  const r = annualRate / 100 / 12;
  const n = termYears * 12;

  let monthlyPayment = 0;
  if (r === 0) {
    monthlyPayment = loanAmount / n;
  } else {
    monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - loanAmount;
  const downPaymentPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  // Year-by-year amortization
  const yearlyBreakdown: MortgageYearData[] = [];
  let balance = loanAmount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  for (let yr = 1; yr <= termYears; yr++) {
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const interestPayment = balance * r;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
      cumulativeInterest += interestPayment;
      cumulativePrincipal += principalPayment;
      balance = Math.max(balance - principalPayment, 0);
    }
    yearlyBreakdown.push({
      year: yr,
      principal: cumulativePrincipal,
      interest: cumulativeInterest,
      balance,
    });
  }

  return { loanAmount, monthlyPayment, totalPayment, totalInterest, downPaymentPct, yearlyBreakdown };
}
