import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FDCalculator from "@/components/fd/FDCalculator";

export const metadata: Metadata = buildMetadata("fd-calculator");

const FAQS = [
  { question: "Is FD interest taxable?", answer: "Yes. FD interest is fully taxable as 'Income from Other Sources' at your slab rate. Banks deduct TDS @10% if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/15H if your total income is below the taxable limit to avoid TDS." },
  { question: "What is the best FD rate currently?", answer: "As of 2025, small finance banks offer 8–9% on FDs, while major banks like SBI, HDFC, ICICI offer 6.5–7.5%. Senior citizens get 0.25–0.5% extra. Post Office Time Deposits offer 6.9–7.5%. Tax-saver FDs (5-year lock-in) qualify for 80C deduction." },
  { question: "Can I break an FD before maturity?", answer: "Yes, most FDs can be broken prematurely with a penalty (typically 0.5–1% reduction in interest rate). Some banks offer penalty-free premature withdrawal for medical emergencies. Tax-saver FDs (5-year) cannot be broken before maturity." },
];

const CONTENT = (
  <>
    <h2>FD Calculator — Fixed Deposit Maturity Amount</h2>
    <p>Calculate the exact maturity amount for your fixed deposit. Compare interest from different banks using our bank-wise rate table. This calculator uses the standard quarterly compounding formula used by Indian banks: A = P × (1 + r/n)^(nt).</p>
    <h2>FD vs Mutual Fund: Which is Better?</h2>
    <p>FD offers guaranteed returns and capital protection — ideal for short-term goals and risk-averse investors. Mutual funds offer potentially higher long-term returns but with market risk. For amounts you can&apos;t afford to lose or need within 3 years, FD wins. For 5+ year goals, diversified equity mutual funds have historically outperformed FDs significantly.</p>
    <h2>FD Tax Treatment</h2>
    <p>FD interest is taxed at your marginal rate. At the 30% slab, a 7% FD yields only ~4.9% post-tax. Debt mutual funds (with 3-year holding) were taxed at 20% with indexation — but post-2023, that benefit was removed and debt MF gains are now taxed at slab rate too.</p>
  </>
);

export default function FDPage() {
  return (
    <CalculatorShell
      slug="fd-calculator"
      h1="FD Calculator — Calculate Fixed Deposit Maturity Amount"
      faqs={FAQS}
      content={CONTENT}
      relatedSlugs={["rd-calculator", "sip-calculator", "income-tax-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <FDCalculator mode="fd" />
      </Suspense>
    </CalculatorShell>
  );
}
