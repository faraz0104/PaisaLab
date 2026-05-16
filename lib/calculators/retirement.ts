export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;        // % during accumulation
  inflationRate: number;       // %
  monthlyExpenses: number;     // today's money — desired monthly spend in retirement
}

export interface RetirementYearData {
  age: number;
  year: number;
  savings: number;
  contributions: number;
  growth: number;
}

export interface RetirementResult {
  yearsToRetirement: number;
  corpusAtRetirement: number;
  corpusNeeded: number;         // inflation-adjusted target
  isSufficient: boolean;
  surplusOrShortfall: number;
  inflationAdjustedExpenses: number;  // monthly expenses at retirement in future money
  safeMonthlyIncome: number;          // 4% rule annual / 12
  yearlyBreakdown: RetirementYearData[];
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const {
    currentAge, retirementAge, currentSavings,
    monthlyContribution, annualReturn, inflationRate, monthlyExpenses,
  } = inputs;

  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;

  // Future value of current savings
  const fvSavings = currentSavings * Math.pow(1 + annualReturn / 100, yearsToRetirement);

  // Future value of monthly contributions
  let fvContributions = 0;
  if (monthlyRate > 0) {
    fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  } else {
    fvContributions = monthlyContribution * totalMonths;
  }

  const corpusAtRetirement = fvSavings + fvContributions;

  // Inflation-adjusted monthly expenses at retirement
  const inflationAdjustedExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);

  // Corpus needed: 25× annual expenses (4% rule / 25x rule)
  const annualExpensesAtRetirement = inflationAdjustedExpenses * 12;
  const corpusNeeded = annualExpensesAtRetirement * 25;

  const isSufficient = corpusAtRetirement >= corpusNeeded;
  const surplusOrShortfall = corpusAtRetirement - corpusNeeded;

  // Safe monthly income from corpus (4% withdrawal rate)
  const safeMonthlyIncome = (corpusAtRetirement * 0.04) / 12;

  // Year-by-year accumulation breakdown
  const yearlyBreakdown: RetirementYearData[] = [];
  let balance = currentSavings;
  let totalContributions = 0;

  for (let yr = 1; yr <= yearsToRetirement; yr++) {
    const startBalance = balance;
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalContributions += monthlyContribution;
    }
    yearlyBreakdown.push({
      age: currentAge + yr,
      year: yr,
      savings: balance,
      contributions: totalContributions,
      growth: balance - currentSavings - totalContributions,
    });
    void startBalance;
  }

  return {
    yearsToRetirement,
    corpusAtRetirement,
    corpusNeeded,
    isSufficient,
    surplusOrShortfall,
    inflationAdjustedExpenses,
    safeMonthlyIncome,
    yearlyBreakdown,
  };
}
