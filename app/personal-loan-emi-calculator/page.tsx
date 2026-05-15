import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("personal-loan-emi-calculator");

const CONTENT = (
  <>
    <h2>Personal Loan EMI Calculator</h2>
    <p>Personal loans are the most expensive form of borrowing — rates range from 10.5% to 24% per annum. Use this calculator to see the true cost of a personal loan before applying. Understanding the total interest cost often encourages better financial decisions.</p>
    <h2>When Should You Avoid a Personal Loan?</h2>
    <ul>
      <li>For discretionary purchases (gadgets, vacations) that you can save for instead</li>
      <li>When your EMI-to-income ratio exceeds 50%</li>
      <li>When alternatives like gold loan (9–11%), LAP (9–12%), or BNPL are available</li>
    </ul>
    <h2>Personal Loan Interest Rates 2025 (Top Banks)</h2>
    <p>HDFC Bank: 10.5–21% | ICICI Bank: 10.85–16% | Axis Bank: 10.49–22% | SBI: 11–15% | Bajaj Finserv: 12–26% (NBFCs tend to be higher)</p>
  </>
);

export default function PersonalLoanEMIPage() {
  return (
    <CalculatorShell
      slug="personal-loan-emi-calculator"
      h1="Personal Loan EMI Calculator — Instant Calculation"
      content={CONTENT}
      relatedSlugs={["emi-calculator", "home-loan-emi-calculator", "income-tax-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <EMICalculator loanType="personal" />
      </Suspense>
    </CalculatorShell>
  );
}
