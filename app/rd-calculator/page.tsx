import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FDCalculator from "@/components/fd/FDCalculator";

export const metadata: Metadata = buildMetadata("rd-calculator");

const CONTENT = (
  <>
    <h2>RD Calculator — Recurring Deposit</h2>
    <p>A Recurring Deposit (RD) is a savings product offered by banks and post offices that allows you to deposit a fixed amount every month and earn compound interest. It&apos;s ideal for those who want to build a corpus through regular savings without the market risk of mutual funds.</p>
    <h2>RD Formula</h2>
    <p>RD maturity uses quarterly compounding: each monthly deposit earns interest from the date of deposit until maturity. The formula accounts for each installment separately: M = R × [(1+i)^n – 1] / (1 – (1+i)^(-1/3)) where i = quarterly interest rate.</p>
    <h2>RD vs SIP — Key Differences</h2>
    <p>RD offers guaranteed returns (6.5–7.5% currently) with zero risk. SIP in mutual funds offers potentially higher returns (10–15%+ historically) but with market risk. RD is better for emergency funds and short-term goals; SIP for long-term wealth creation.</p>
    <h2>Post Office RD Rates 2025</h2>
    <p>Post Office RD offers 6.7% interest rate with quarterly compounding, backed by Government of India guarantee. Available in multiples of ₹100 with no maximum limit. 5-year mandatory tenure.</p>
  </>
);

export default function RDPage() {
  return (
    <CalculatorShell
      slug="rd-calculator"
      h1="RD Calculator — Calculate Recurring Deposit Maturity Amount"
      content={CONTENT}
      relatedSlugs={["fd-calculator", "sip-calculator", "swp-calculator"]}
    >
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800" />}>
        <FDCalculator mode="rd" />
      </Suspense>
    </CalculatorShell>
  );
}
