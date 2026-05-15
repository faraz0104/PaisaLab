import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("emi-calculator");

const FAQS = [
  { question: "What is an EMI?", answer: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It includes both principal and interest components." },
  { question: "How is EMI calculated?", answer: "EMI = P × r × (1+r)^n / [(1+r)^n – 1] where P is the loan amount, r is the monthly interest rate, and n is the number of months." },
  { question: "Does prepayment reduce EMI or tenure?", answer: "Prepayment can either reduce your EMI (keeping tenure same) or reduce your tenure (keeping EMI same). Most banks recommend reducing tenure as it saves more on total interest." },
];

const CONTENT = (
  <>
    <h2>What is an EMI Calculator?</h2>
    <p>An EMI (Equated Monthly Installment) calculator tells you exactly how much you need to pay every month for a loan. Enter the loan amount, interest rate, and tenure — get the monthly EMI, total interest payable, and year-by-year amortization schedule.</p>
    <h2>EMI Formula</h2>
    <p>EMI = P × r × (1+r)^n / [(1+r)^n – 1] where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the loan tenure in months.</p>
    <h2>How to Reduce Your EMI</h2>
    <ul>
      <li>Make a larger down payment to reduce the principal</li>
      <li>Negotiate a lower interest rate (improve CIBIL score first)</li>
      <li>Choose a longer tenure (note: more total interest)</li>
      <li>Make periodic prepayments to reduce outstanding principal</li>
    </ul>
  </>
);

export default function EMIPage() {
  return (
    <CalculatorShell
      slug="emi-calculator"
      h1="EMI Calculator — Calculate Loan EMI Online"
      faqs={FAQS}
      content={CONTENT}
      relatedSlugs={["home-loan-emi-calculator", "car-loan-emi-calculator", "personal-loan-emi-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <EMICalculator loanType="general" />
      </Suspense>
    </CalculatorShell>
  );
}
