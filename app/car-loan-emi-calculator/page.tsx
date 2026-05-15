import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("car-loan-emi-calculator");

const CONTENT = (
  <>
    <h2>Car Loan EMI Calculator</h2>
    <p>Calculate your car loan EMI before visiting the showroom. Know your exact monthly payment, total interest cost, and compare different loan amounts and tenures. Car loan rates in India typically range from 8.5% to 13% depending on the lender, car model, and your credit score.</p>
    <h2>Car Loan vs Buying Outright</h2>
    <p>If you can afford to pay cash, compare the total interest cost against the return you&apos;d earn investing that money. At 9.5% car loan rate vs 12% equity returns, financing the car and investing the lump sum can be financially sensible — especially for long tenure loans.</p>
    <h2>Tips to Get a Lower Car Loan Rate</h2>
    <ul>
      <li>Maintain a CIBIL score above 750 — negotiate aggressively</li>
      <li>Make a larger down payment (30–40% of car value)</li>
      <li>Choose 3–5 year tenure (lenders offer lower rates)</li>
      <li>Compare offers from banks before accepting dealer financing</li>
    </ul>
  </>
);

export default function CarLoanEMIPage() {
  return (
    <CalculatorShell
      slug="car-loan-emi-calculator"
      h1="Car Loan EMI Calculator — Calculate Auto Loan EMI Online"
      content={CONTENT}
      relatedSlugs={["emi-calculator", "home-loan-emi-calculator", "personal-loan-emi-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <EMICalculator loanType="car" />
      </Suspense>
    </CalculatorShell>
  );
}
