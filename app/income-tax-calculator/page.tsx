import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import TaxCalculator from "@/components/tax/TaxCalculator";

export const metadata: Metadata = buildMetadata("income-tax-calculator");

const FAQS = [
  { question: "What are the new tax regime slabs for FY 2025-26?", answer: "New regime slabs: 0% up to ₹4L, 5% from ₹4L–8L, 10% from ₹8L–12L, 15% from ₹12L–16L, 20% from ₹16L–20L, 25% from ₹20L–24L, 30% above ₹24L. Section 87A rebate makes income up to ₹12L effectively tax-free." },
  { question: "Which tax regime is better for me?", answer: "New regime is better if you have fewer deductions. Old regime benefits those with significant 80C investments, home loan, HRA, or NPS contributions. For income above ₹15L with maximum deductions, old regime often wins. Our calculator compares both automatically." },
  { question: "Is income up to ₹12 lakh tax-free in 2025-26?", answer: "Yes. Under the new tax regime, if your taxable income (after ₹75,000 standard deduction) is ₹12 lakh or less, Section 87A rebate eliminates all tax. So gross salary up to ~₹12.75 lakh is effectively zero tax." },
  { question: "What deductions are available under the old regime?", answer: "Old regime allows: Section 80C (₹1.5L — ELSS, PPF, EPF, LIC, home loan principal), 80D (₹25K–50K health insurance), 24(b) (₹2L home loan interest), 80CCD(1B) (₹50K NPS), HRA exemption, and more." },
];

const CONTENT = (
  <>
    <h2>Income Tax Calculator FY 2025-26</h2>
    <p>Calculate your exact income tax liability for FY 2025-26 (AY 2026-27) under both old and new tax regimes. Enter your salary and applicable deductions — the calculator compares both regimes and tells you which one saves more tax.</p>
    <h2>New Tax Regime — Key Changes in Budget 2025</h2>
    <ul>
      <li>Standard deduction increased to ₹75,000 (from ₹50,000)</li>
      <li>Section 87A rebate extended to cover income up to ₹12 lakh (new regime)</li>
      <li>New slab structure with more gradual progression</li>
      <li>NPS employer contribution (80CCD-2) still allowed in new regime</li>
    </ul>
    <h2>Old Regime vs New Regime at a Glance</h2>
    <p>The new regime has lower tax rates but fewer deductions. The old regime allows deductions like 80C, HRA, home loan interest, 80D, and others that can significantly reduce taxable income for those who actively invest and plan taxes.</p>
  </>
);

export default function IncomeTaxPage() {
  return (
    <>
      <JsonLd data={webAppSchema("income-tax-calculator", "Income Tax Calculator", "Calculate income tax for FY 2025-26")} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug="income-tax-calculator"
        h1="Income Tax Calculator FY 2025-26 — Old vs New Tax Regime"
        faqs={FAQS}
        content={CONTENT}
        relatedSlugs={["gst-calculator", "sip-calculator", "fd-calculator"]}
      >
        <TaxCalculator />
      </CalculatorShell>
    </>
  );
}
