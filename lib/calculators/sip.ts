export interface SIPInputs {
  monthlyAmount: number;  // ₹ per month
  annualRate: number;     // % per year
  years: number;
}

export interface SIPYearData {
  year: number;
  invested: number;
  returns: number;
  total: number;
}

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  absoluteReturn: number;   // % gain
  xirr: number;             // approx XIRR
  yearlyBreakdown: SIPYearData[];
}

export interface StepUpSIPInputs extends SIPInputs {
  annualStepUp: number;  // % increase each year
}

// Standard SIP: M = P × {[(1+i)^n – 1] / i} × (1+i)
export function calculateSIP(inputs: SIPInputs): SIPResult {
  const { monthlyAmount, annualRate, years } = inputs;
  const i = annualRate / 12 / 100;
  const n = years * 12;
  const investedAmount = monthlyAmount * n;

  let totalValue = 0;
  if (i === 0) {
    totalValue = investedAmount;
  } else {
    totalValue = monthlyAmount * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  }

  const estimatedReturns = totalValue - investedAmount;
  const absoluteReturn = investedAmount > 0 ? (estimatedReturns / investedAmount) * 100 : 0;

  const yearlyBreakdown = buildYearlyBreakdown(monthlyAmount, i, years);

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
    absoluteReturn,
    xirr: annualRate,
    yearlyBreakdown,
  };
}

function buildYearlyBreakdown(
  monthly: number,
  monthlyRate: number,
  years: number
): SIPYearData[] {
  const rows: SIPYearData[] = [];
  let runningValue = 0;

  for (let yr = 1; yr <= years; yr++) {
    const monthsStart = (yr - 1) * 12;
    const monthsEnd = yr * 12;
    // Value at end of year yr
    if (monthlyRate === 0) {
      runningValue = monthly * monthsEnd;
    } else {
      runningValue =
        monthly * (((Math.pow(1 + monthlyRate, monthsEnd) - 1) / monthlyRate) * (1 + monthlyRate));
    }
    const invested = monthly * monthsEnd;
    rows.push({
      year: yr,
      invested,
      returns: runningValue - invested,
      total: runningValue,
    });
  }
  return rows;
}

// Step-up SIP: SIP amount increases by stepUp% each year
export function calculateStepUpSIP(inputs: StepUpSIPInputs): SIPResult {
  const { monthlyAmount, annualRate, years, annualStepUp } = inputs;
  const monthlyRate = annualRate / 12 / 100;
  const stepUpFactor = 1 + annualStepUp / 100;

  let totalValue = 0;
  let investedAmount = 0;
  const yearlyBreakdown: SIPYearData[] = [];
  let runningValue = 0;

  for (let yr = 1; yr <= years; yr++) {
    const sip = monthlyAmount * Math.pow(stepUpFactor, yr - 1);
    investedAmount += sip * 12;

    // Add 12 months of this year's SIP on top of existing corpus
    for (let m = 0; m < 12; m++) {
      runningValue = runningValue * (1 + monthlyRate) + sip;
    }
    yearlyBreakdown.push({
      year: yr,
      invested: investedAmount,
      returns: runningValue - investedAmount,
      total: runningValue,
    });
  }

  totalValue = runningValue;
  const estimatedReturns = totalValue - investedAmount;
  const absoluteReturn = investedAmount > 0 ? (estimatedReturns / investedAmount) * 100 : 0;

  return {
    investedAmount,
    estimatedReturns,
    totalValue,
    absoluteReturn,
    xirr: annualRate,
    yearlyBreakdown,
  };
}

// SWP: Systematic Withdrawal Plan
export interface SWPInputs {
  initialInvestment: number;
  monthlyWithdrawal: number;
  annualRate: number;
  years: number;
}

export interface SWPResult {
  totalWithdrawal: number;
  finalCorpus: number;
  totalReturnsEarned: number;
  monthsUntilDepleted: number | null;  // null = corpus survives
  yearlyBreakdown: { year: number; withdrawn: number; corpus: number; returns: number }[];
}

export function calculateSWP(inputs: SWPInputs): SWPResult {
  const { initialInvestment, monthlyWithdrawal, annualRate, years } = inputs;
  const monthlyRate = annualRate / 12 / 100;
  let corpus = initialInvestment;
  let totalWithdrawal = 0;
  let monthsUntilDepleted: number | null = null;
  const yearlyBreakdown = [];

  for (let yr = 1; yr <= years; yr++) {
    let yearlyWithdrawn = 0;
    for (let m = 0; m < 12; m++) {
      const totalMonths = (yr - 1) * 12 + m + 1;
      if (corpus <= 0) {
        if (monthsUntilDepleted === null) monthsUntilDepleted = totalMonths - 1;
        continue;
      }
      corpus = corpus * (1 + monthlyRate) - monthlyWithdrawal;
      yearlyWithdrawn += monthlyWithdrawal;
      totalWithdrawal += monthlyWithdrawal;
      if (corpus < 0) {
        if (monthsUntilDepleted === null) monthsUntilDepleted = totalMonths;
        corpus = 0;
      }
    }
    yearlyBreakdown.push({
      year: yr,
      withdrawn: yearlyWithdrawn,
      corpus: Math.max(corpus, 0),
      returns: 0, // filled below
    });
  }

  const finalCorpus = Math.max(corpus, 0);
  const totalReturnsEarned = totalWithdrawal + finalCorpus - initialInvestment;

  return {
    totalWithdrawal,
    finalCorpus,
    totalReturnsEarned,
    monthsUntilDepleted,
    yearlyBreakdown,
  };
}
