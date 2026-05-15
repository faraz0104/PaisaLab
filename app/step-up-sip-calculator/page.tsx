import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SIPCalculator from "@/components/sip/SIPCalculator";

export const metadata: Metadata = buildMetadata("step-up-sip-calculator");

const CONTENT = (
  <>
    <h2>What is a Step-Up SIP Calculator?</h2>
    <p>A Step-Up SIP (also called Top-Up SIP) calculator helps you estimate returns when you increase your SIP amount by a fixed percentage each year. As your income grows, increasing your SIP annually can dramatically boost your final corpus compared to a flat SIP.</p>
    <h2>How Step-Up SIP Works</h2>
    <p>If you start a ₹5,000/month SIP with a 10% annual step-up: Year 1 = ₹5,000/month, Year 2 = ₹5,500/month, Year 3 = ₹6,050/month, and so on. This mirrors real salary growth and leverages the power of compounding on increasing installments.</p>
    <h2>Step-Up SIP vs Regular SIP</h2>
    <p>For a 20-year period at 12% returns: A flat ₹5,000/month SIP grows to ~₹49.5L. The same SIP with 10% annual step-up grows to ~₹1.25 Cr — 2.5x more with only a 10% annual increase. The difference is staggering.</p>
  </>
);

export default function StepUpSIPPage() {
  return (
    <CalculatorShell
      slug="step-up-sip-calculator"
      h1="Step-Up SIP Calculator — Calculate Returns with Annual SIP Increase"
      content={CONTENT}
      relatedSlugs={["sip-calculator", "lumpsum-calculator", "swp-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <SIPCalculator mode="stepup" />
      </Suspense>
    </CalculatorShell>
  );
}
