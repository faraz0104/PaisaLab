export interface PPFInputs {
  yearlyDeposit: number;    // ₹500 – ₹1,50,000
  interestRate: number;     // default 7.1%
  tenure: number;           // 15 years base, extendable to 20 or 25
}

export interface PPFYearRow {
  year: number;
  openingBalance: number;
  deposit: number;
  interest: number;
  closingBalance: number;
}

export interface PPFResult {
  maturityAmount: number;
  totalDeposited: number;
  totalInterest: number;
  taxSavingEstimate: number; // 30% tax bracket saving on 80C deposits
  yearlyBreakdown: PPFYearRow[];
}

export function calculatePPF(inputs: PPFInputs): PPFResult {
  const { yearlyDeposit, interestRate, tenure } = inputs;
  const rate = interestRate / 100;
  const rows: PPFYearRow[] = [];
  let balance = 0;

  for (let year = 1; year <= tenure; year++) {
    const opening = balance;
    const deposit = yearlyDeposit;
    // Interest on (opening + deposit), assuming deposit at start of year
    const interest = Math.round((opening + deposit) * rate);
    balance = opening + deposit + interest;
    rows.push({ year, openingBalance: opening, deposit, interest, closingBalance: balance });
  }

  const totalDeposited = yearlyDeposit * tenure;
  const totalInterest = balance - totalDeposited;

  return {
    maturityAmount: Math.round(balance),
    totalDeposited,
    totalInterest: Math.round(totalInterest),
    taxSavingEstimate: Math.round(Math.min(yearlyDeposit, 150000) * 0.30), // 30% slab saving
    yearlyBreakdown: rows,
  };
}
