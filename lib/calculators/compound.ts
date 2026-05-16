export interface CompoundInputs {
  principal: number;
  annualRate: number;
  years: number;
  compoundFreq: number;       // periods per year: 1, 2, 4, 12, 365
  monthlyContribution: number;
}

export interface CompoundYearData {
  year: number;
  invested: number;   // cumulative principal + contributions
  interest: number;   // cumulative interest earned
  total: number;      // balance
}

export interface CompoundResult {
  principal: number;
  totalContributions: number;
  totalInvested: number;
  totalInterest: number;
  totalValue: number;
  absoluteReturn: number;
  yearlyBreakdown: CompoundYearData[];
}

export function calculateCompound(inputs: CompoundInputs): CompoundResult {
  const { principal, annualRate, years, compoundFreq, monthlyContribution } = inputs;
  const rPerPeriod = annualRate / 100 / compoundFreq;
  const totalPeriods = years * compoundFreq;
  // Monthly contribution spread across compounding periods
  const contribPerPeriod = monthlyContribution * (12 / compoundFreq);

  let balance = principal;
  let totalContributions = 0;
  const yearlyBreakdown: CompoundYearData[] = [];

  for (let period = 1; period <= totalPeriods; period++) {
    balance = balance * (1 + rPerPeriod) + contribPerPeriod;
    totalContributions += contribPerPeriod;

    if (period % compoundFreq === 0) {
      const year = period / compoundFreq;
      const totalInvestedSoFar = principal + totalContributions;
      yearlyBreakdown.push({
        year,
        invested: totalInvestedSoFar,
        interest: balance - totalInvestedSoFar,
        total: balance,
      });
    }
  }

  const totalInvested = principal + totalContributions;
  const totalInterest = balance - totalInvested;

  return {
    principal,
    totalContributions,
    totalInvested,
    totalInterest,
    totalValue: balance,
    absoluteReturn: totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0,
    yearlyBreakdown,
  };
}
