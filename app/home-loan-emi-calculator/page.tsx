import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("home-loan-emi-calculator");

const FAQS = [
  { question: "What is the current home loan interest rate in India?", answer: "As of 2025, home loan interest rates range from 8.25% to 9.5% depending on the lender and your CIBIL score. SBI, HDFC, ICICI, and Axis Bank are major lenders. A higher CIBIL score (750+) typically secures lower rates." },
  { question: "How much home loan can I get on my salary?", answer: "Typically, banks sanction home loans up to 60× your monthly gross salary. For a ₹1L/month salary, you could get up to ₹60L. EMI should not exceed 40-50% of your monthly income." },
  { question: "Should I prepay my home loan?", answer: "Yes, prepayment makes financial sense if your home loan rate exceeds the returns from safe investments. Prepaying ₹1L extra annually can save you lakhs in interest and reduce your tenure significantly. Use the prepayment option above to see the impact." },
];

const CONTENT = (
  <>
    <h2>Home Loan EMI Calculator</h2>
    <p>Calculate your home loan EMI for any loan amount from ₹10L to ₹5 crore. This calculator also supports prepayment scenarios — see exactly how much interest you save and how many years you cut off your loan by making extra payments.</p>
    <h2>Home Loan Eligibility</h2>
    <p>Banks typically sanction 75–90% of the property value (LTV ratio). The remaining amount is your down payment. Your EMI should not exceed 40–50% of your monthly take-home pay to maintain a healthy EMI-to-income ratio.</p>
    <h2>Home Loan Tax Benefits</h2>
    <ul>
      <li><strong>Section 24(b):</strong> Deduction on home loan interest up to ₹2 lakh/year for self-occupied property</li>
      <li><strong>Section 80C:</strong> Principal repayment included within ₹1.5 lakh 80C limit</li>
      <li><strong>Section 80EEA:</strong> Additional ₹1.5L deduction for first-time homebuyers (stamp duty ≤ ₹45L)</li>
    </ul>
  </>
);

export default function HomeLoanEMIPage() {
  return (
    <CalculatorShell
      slug="home-loan-emi-calculator"
      h1="Home Loan EMI Calculator — Calculate Housing Loan EMI"
      faqs={FAQS}
      content={CONTENT}
      relatedSlugs={["emi-calculator", "car-loan-emi-calculator", "sip-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <EMICalculator loanType="home" />
      </Suspense>
    </CalculatorShell>
  );
}
