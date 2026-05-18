import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FDCalculator from "@/components/fd/FDCalculator";
import { calculateFD } from "@/lib/calculators/fd";

function fmtFull(n: number) { return `₹${Math.round(n).toLocaleString("en-IN")}` }
function fmt(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(0)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

interface Variant {
  slug: string;
  principal: number;
  rate: number;
  years: number;
  bankLabel: string;
}

const VARIANTS: Variant[] = [
  // SBI branded
  { slug: "sbi-1-lakh-for-1-year",   principal: 100000,  rate: 6.80, years: 1,  bankLabel: "SBI" },
  { slug: "sbi-1-lakh-for-3-years",  principal: 100000,  rate: 7.00, years: 3,  bankLabel: "SBI" },
  { slug: "sbi-1-lakh-for-5-years",  principal: 100000,  rate: 6.50, years: 5,  bankLabel: "SBI" },
  { slug: "sbi-5-lakh-for-3-years",  principal: 500000,  rate: 7.00, years: 3,  bankLabel: "SBI" },
  // HDFC branded
  { slug: "hdfc-1-lakh-for-1-year",  principal: 100000,  rate: 7.10, years: 1,  bankLabel: "HDFC" },
  { slug: "hdfc-1-lakh-for-3-years", principal: 100000,  rate: 7.25, years: 3,  bankLabel: "HDFC" },
  { slug: "hdfc-5-lakh-for-5-years", principal: 500000,  rate: 7.00, years: 5,  bankLabel: "HDFC" },
  // Generic amounts
  { slug: "1-lakh-for-1-year",       principal: 100000,  rate: 7.00, years: 1,  bankLabel: "" },
  { slug: "1-lakh-for-2-years",      principal: 100000,  rate: 7.25, years: 2,  bankLabel: "" },
  { slug: "1-lakh-for-3-years",      principal: 100000,  rate: 7.25, years: 3,  bankLabel: "" },
  { slug: "1-lakh-for-5-years",      principal: 100000,  rate: 7.00, years: 5,  bankLabel: "" },
  { slug: "2-lakh-for-3-years",      principal: 200000,  rate: 7.25, years: 3,  bankLabel: "" },
  { slug: "5-lakh-for-1-year",       principal: 500000,  rate: 7.00, years: 1,  bankLabel: "" },
  { slug: "5-lakh-for-3-years",      principal: 500000,  rate: 7.25, years: 3,  bankLabel: "" },
  { slug: "5-lakh-for-5-years",      principal: 500000,  rate: 7.00, years: 5,  bankLabel: "" },
  { slug: "10-lakh-for-3-years",     principal: 1000000, rate: 7.25, years: 3,  bankLabel: "" },
  { slug: "10-lakh-for-5-years",     principal: 1000000, rate: 7.00, years: 5,  bankLabel: "" },
  { slug: "50-lakh-for-5-years",     principal: 5000000, rate: 7.00, years: 5,  bankLabel: "" },
];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const v = VARIANTS.find((x) => x.slug === variant);
  if (!v) return {};
  const res = calculateFD({ principal: v.principal, annualRate: v.rate, years: v.years, frequency: "quarterly" });
  const bankStr = v.bankLabel ? `${v.bankLabel} ` : "";
  const title = `FD Calculator: ${bankStr}${fmt(v.principal)} for ${v.years} Year${v.years > 1 ? "s" : ""} at ${v.rate}%`;
  const description = `${bankStr}${fmtFull(v.principal)} fixed deposit for ${v.years} year${v.years > 1 ? "s" : ""} at ${v.rate}%: Maturity = ${fmtFull(res.maturityAmount)}. Interest earned = ${fmtFull(res.totalInterest)}. Compare all bank FD rates — free calculator, no signup.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL_CONST}/fd-calculator/${variant}/` },
    openGraph: { type: "website", url: `${SITE_URL_CONST}/fd-calculator/${variant}/`, title, description, siteName: "RupeesCalc", images: [{ url: `${SITE_URL_CONST}/og/fd-calculator.png`, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

const HOW_TO_STEPS = [
  { name: "Enter FD principal amount", text: "Type the amount you want to deposit in the fixed deposit." },
  { name: "Set interest rate", text: "Enter the rate offered by your bank. Compare SBI, HDFC, ICICI rates in the table below." },
  { name: "Choose FD tenure", text: "Select the duration. Most banks offer highest rates for 1–3 year tenures." },
  { name: "View maturity amount", text: "Instantly see the maturity amount, total interest earned, and effective annual yield." },
];

export default async function FDVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS.find((x) => x.slug === variant);
  if (!v) notFound();

  const res = calculateFD({ principal: v.principal, annualRate: v.rate, years: v.years, frequency: "quarterly" });
  const bankStr = v.bankLabel ? `${v.bankLabel} ` : "";
  const h1 = `FD Calculator: ${bankStr}${fmt(v.principal)} for ${v.years} Year${v.years > 1 ? "s" : ""}`;
  const description = `${bankStr}${fmtFull(v.principal)} FD at ${v.rate}% for ${v.years} year${v.years > 1 ? "s" : ""}: Maturity = ${fmtFull(res.maturityAmount)}, Interest = ${fmtFull(res.totalInterest)}.`;

  const FAQS = [
    {
      question: `What is the maturity amount for ${bankStr}${fmt(v.principal)} FD for ${v.years} year${v.years > 1 ? "s" : ""}?`,
      answer: `${bankStr}${fmtFull(v.principal)} FD at ${v.rate}% for ${v.years} year${v.years > 1 ? "s" : ""} with quarterly compounding: Maturity amount = ${fmtFull(res.maturityAmount)}. Interest earned = ${fmtFull(res.totalInterest)}. Effective annual yield = ${res.effectiveRate.toFixed(2)}%.`,
    },
    {
      question: "Is FD interest taxable?",
      answer: "Yes, FD interest is fully taxable as 'Income from Other Sources' at your income tax slab rate. TDS is deducted at 10% if interest exceeds ₹40,000/year (₹50,000 for senior citizens). Submit Form 15G/15H if your income is below the taxable limit to avoid TDS. For tax-free guaranteed returns, consider PPF (7.1% EEE status) alongside FD.",
    },
    {
      question: "How does compounding frequency affect FD returns?",
      answer: `With quarterly compounding at ${v.rate}%, effective annual yield is ${res.effectiveRate.toFixed(2)}% (vs stated ${v.rate}%). Monthly compounding gives slightly more. For a ${fmtFull(v.principal)} FD for ${v.years} years: quarterly compounding = ${fmtFull(res.maturityAmount)}. Always check whether your bank compounds monthly, quarterly, or at maturity.`,
    },
    {
      question: "Should I invest in FD or SIP?",
      answer: "FD: Guaranteed ${v.rate}% returns, zero risk, fully liquid with penalty. Best for emergency funds, short-term goals (1–3 years), and conservative investors. SIP: Historical 10–12% returns in equity funds, but market-linked risk. Best for long-term wealth creation (7+ years). Ideal strategy: Keep 3–6 months expenses in FD as emergency fund. Invest everything else in SIP for long-term goals.",
    },
  ];

  // Bank comparison rows
  const bankRates: [string, number][] = [
    ["SBI", 7.00], ["HDFC Bank", 7.25], ["ICICI Bank", 7.10], ["Axis Bank", 7.10],
    ["Kotak Bank", 7.25], ["Post Office", 7.50],
  ];

  return (
    <>
      <JsonLd data={webAppSchema("fd-calculator", h1, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema(h1, description, HOW_TO_STEPS)} />
      <CalculatorShell
        slug="fd-calculator"
        h1={h1}
        faqs={FAQS}
        relatedSlugs={["rd-calculator", "ppf-calculator", "sip-calculator", "income-tax-calculator"]}
        content={<VariantContent v={v} res={res} bankRates={bankRates} />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <FDCalculator mode="fd" initialPrincipal={v.principal} initialRate={v.rate} initialYears={v.years} />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function VariantContent({ v, res, bankRates }: { v: Variant; res: ReturnType<typeof calculateFD>; bankRates: [string, number][] }) {
  const pctGain = ((res.totalInterest / v.principal) * 100).toFixed(1);
  const bankStr = v.bankLabel ? `${v.bankLabel} ` : "";

  return (
    <>
      <h2>{bankStr}{fmt(v.principal)} FD for {v.years} Year{v.years > 1 ? "s" : ""} — Maturity Breakdown</h2>
      <p>
        A fixed deposit of <strong>{fmtFull(v.principal)}</strong>{v.bankLabel ? ` with ${v.bankLabel}` : ""} at <strong>{v.rate}% per annum</strong> for <strong>{v.years} year{v.years > 1 ? "s" : ""}</strong> (quarterly compounding) matures to <strong>{fmtFull(res.maturityAmount)}</strong>. You earn <strong>{fmtFull(res.totalInterest)}</strong> in interest — a <strong>{pctGain}% gain</strong> over your principal. The effective annual yield is {res.effectiveRate.toFixed(2)}%.
      </p>

      <h2>Bank FD Rate Comparison — {v.years} Year{v.years > 1 ? "s" : ""} (2025)</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Bank</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Rate</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Maturity ({fmt(v.principal)})</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Interest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {bankRates.map(([bank, r]) => {
              const br = calculateFD({ principal: v.principal, annualRate: r, years: v.years, frequency: "quarterly" });
              return (
                <tr key={bank} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${Math.abs(r - v.rate) < 0.01 ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{bank}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r}%</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{fmtFull(br.maturityAmount)}</td>
                  <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400">{fmtFull(br.totalInterest)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Rates as of May 2025 for general citizens. Senior citizens get +0.25% to +0.50% higher rates.</p>

      <h2>Year-Wise Growth of Your FD</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Interest Earned</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {res.yearlyBreakdown.map((row) => (
              <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">Year {row.year}</td>
                <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400">{fmtFull(row.interest)}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{fmtFull(row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <blockquote>
        <strong>Tax tip:</strong> If you are in the 30% tax bracket, your post-tax FD return at {v.rate}% is only {(v.rate * 0.7).toFixed(2)}%. Consider putting the same money in PPF (7.1% fully tax-free) — it outperforms FD on a post-tax basis for most salaried investors.
      </blockquote>
    </>
  );
}
