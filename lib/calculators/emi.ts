export interface EMIInputs {
  principal: number;
  annualRate: number;
  years: number;
  prepayment?: number;       // optional annual prepayment
  prepaymentFrequency?: "annual" | "monthly";
}

export interface EMIYearData {
  year: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  totalPaid: number;
}

export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
  interestPercent: number;   // interest as % of total payment
  effectiveTenure: number;   // in months (may be less if prepayment)
  yearlyBreakdown: EMIYearData[];
}

// EMI = P × r × (1+r)^n / [(1+r)^n – 1]
export function calculateEMI(inputs: EMIInputs): EMIResult {
  const { principal, annualRate, years } = inputs;
  const r = annualRate / 12 / 100;
  const n = years * 12;

  let emi = 0;
  if (r === 0) {
    emi = principal / n;
  } else {
    emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const yearlyBreakdown = buildEMIBreakdown(principal, r, emi, years, inputs.prepayment ?? 0);
  const lastRow = yearlyBreakdown[yearlyBreakdown.length - 1];
  const totalAmount = lastRow.totalPaid;
  const totalInterest = totalAmount - principal;

  // Find effective tenure
  let effectiveTenure = n;
  for (let i = 0; i < yearlyBreakdown.length; i++) {
    if (yearlyBreakdown[i].balance <= 0) {
      effectiveTenure = i < yearlyBreakdown.length - 1 ? (i + 1) * 12 : n;
      break;
    }
  }

  return {
    emi,
    totalAmount,
    totalInterest,
    principalAmount: principal,
    interestPercent: totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0,
    effectiveTenure,
    yearlyBreakdown,
  };
}

function buildEMIBreakdown(
  principal: number,
  r: number,
  emi: number,
  years: number,
  annualPrepayment: number
): EMIYearData[] {
  const rows: EMIYearData[] = [];
  let balance = principal;
  let totalPaid = 0;

  for (let yr = 1; yr <= years; yr++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const princ = Math.min(emi - interest, balance);
      yearInterest += interest;
      yearPrincipal += princ;
      balance -= princ;
      totalPaid += emi;
    }

    // Annual prepayment
    if (annualPrepayment > 0 && balance > 0) {
      const actualPrepay = Math.min(annualPrepayment, balance);
      balance -= actualPrepay;
      yearPrincipal += actualPrepay;
      totalPaid += actualPrepay;
    }

    rows.push({
      year: yr,
      emi,
      principal: yearPrincipal,
      interest: yearInterest,
      balance: Math.max(balance, 0),
      totalPaid,
    });

    if (balance <= 0) break;
  }
  return rows;
}

// Insight: savings from prepayment
export function calculatePrepaymentSavings(
  base: EMIInputs,
  prepaymentAmount: number
): { savedInterest: number; savedMonths: number } {
  const baseResult = calculateEMI(base);
  const prepResult = calculateEMI({ ...base, prepayment: prepaymentAmount });
  return {
    savedInterest: baseResult.totalInterest - prepResult.totalInterest,
    savedMonths: baseResult.effectiveTenure - prepResult.effectiveTenure,
  };
}
