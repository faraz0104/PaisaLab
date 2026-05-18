import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SIPCalculator from "@/components/sip/SIPCalculator";

/* ── Variant config ─────────────────────────────────────────── */

interface Variant {
  slug: string;
  amount: number;       // monthly SIP in ₹
  rate: number;         // % per year
  years: number;
  maturity: number;     // pre-calculated (₹)
  invested: number;
}

function calcSIP(amount: number, rate: number, years: number) {
  const r = rate / 100 / 12;
  const n = years * 12;
  const maturity = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return { maturity: Math.round(maturity), invested: amount * n };
}

const VARIANTS: Variant[] = [
  { slug: "500-per-month-for-10-years",   amount: 500,    rate: 12, years: 10, ...calcSIP(500, 12, 10) },
  { slug: "1000-per-month-for-10-years",  amount: 1000,   rate: 12, years: 10, ...calcSIP(1000, 12, 10) },
  { slug: "2000-per-month-for-10-years",  amount: 2000,   rate: 12, years: 10, ...calcSIP(2000, 12, 10) },
  { slug: "3000-per-month-for-10-years",  amount: 3000,   rate: 12, years: 10, ...calcSIP(3000, 12, 10) },
  { slug: "5000-per-month-for-10-years",  amount: 5000,   rate: 12, years: 10, ...calcSIP(5000, 12, 10) },
  { slug: "5000-per-month-for-15-years",  amount: 5000,   rate: 12, years: 15, ...calcSIP(5000, 12, 15) },
  { slug: "5000-per-month-for-20-years",  amount: 5000,   rate: 12, years: 20, ...calcSIP(5000, 12, 20) },
  { slug: "5000-per-month-for-25-years",  amount: 5000,   rate: 12, years: 25, ...calcSIP(5000, 12, 25) },
  { slug: "10000-per-month-for-10-years", amount: 10000,  rate: 12, years: 10, ...calcSIP(10000, 12, 10) },
  { slug: "10000-per-month-for-15-years", amount: 10000,  rate: 12, years: 15, ...calcSIP(10000, 12, 15) },
  { slug: "10000-per-month-for-20-years", amount: 10000,  rate: 12, years: 20, ...calcSIP(10000, 12, 20) },
  { slug: "10000-per-month-for-25-years", amount: 10000,  rate: 12, years: 25, ...calcSIP(10000, 12, 25) },
  { slug: "15000-per-month-for-15-years", amount: 15000,  rate: 12, years: 15, ...calcSIP(15000, 12, 15) },
  { slug: "20000-per-month-for-20-years", amount: 20000,  rate: 12, years: 20, ...calcSIP(20000, 12, 20) },
  { slug: "25000-per-month-for-20-years", amount: 25000,  rate: 12, years: 20, ...calcSIP(25000, 12, 20) },
  { slug: "50000-per-month-for-10-years", amount: 50000,  rate: 12, years: 10, ...calcSIP(50000, 12, 10) },
  { slug: "50000-per-month-for-20-years", amount: 50000,  rate: 12, years: 20, ...calcSIP(50000, 12, 20) },
  { slug: "1-lakh-per-month-for-10-years", amount: 100000, rate: 12, years: 10, ...calcSIP(100000, 12, 10) },
];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ variant: v.slug }));
}

function fmt(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtFull(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ── Metadata ───────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ variant: string }> }
): Promise<Metadata> {
  const { variant } = await params;
  const v = VARIANTS.find((x) => x.slug === variant);
  if (!v) return {};

  const title = `SIP Calculator: ${fmt(v.amount)}/Month for ${v.years} Years — ${fmt(v.maturity)} Returns`;
  const description = `Invest ${fmt(v.amount)} per month in SIP for ${v.years} years at 12% return. Total invested: ${fmtFull(v.invested)}. Estimated maturity: ${fmtFull(v.maturity)}. See year-wise breakdown and chart — free, no signup.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL_CONST}/sip-calculator/${variant}/` },
    openGraph: {
      type: "website",
      url: `${SITE_URL_CONST}/sip-calculator/${variant}/`,
      title,
      description,
      siteName: "RupeesCalc",
      images: [{ url: `${SITE_URL_CONST}/og/sip-calculator.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ── Page ───────────────────────────────────────────────────── */

const HOW_TO_STEPS = [
  { name: "Enter monthly SIP amount", text: "The amount is pre-filled based on this page. You can adjust it to explore different scenarios." },
  { name: "Set expected annual return", text: "Default is 12% — the historical average for diversified equity mutual funds in India. Adjust for conservative (8%) or aggressive (14%) scenarios." },
  { name: "Choose investment duration", text: "The tenure is pre-filled. Change it to see the power of compounding over 10, 15, 20, or 25 years." },
  { name: "View maturity amount and chart", text: "Instantly see your total invested amount, estimated returns, and final maturity value with a year-by-year growth chart." },
];

export default async function SIPVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS.find((x) => x.slug === variant);
  if (!v) notFound();

  const returns = v.maturity - v.invested;
  const returnPct = ((returns / v.invested) * 100).toFixed(0);
  const h1 = `SIP Calculator: ${fmt(v.amount)}/Month for ${v.years} Years`;
  const description = `Invest ${fmt(v.amount)} per month in SIP for ${v.years} years at 12% return. Total invested: ${fmtFull(v.invested)}. Estimated maturity: ${fmtFull(v.maturity)}. See year-wise breakdown and chart — free, no signup.`;

  const FAQS = [
    {
      question: `What will ${fmt(v.amount)} SIP per month become in ${v.years} years?`,
      answer: `Investing ${fmt(v.amount)} per month via SIP for ${v.years} years at an assumed 12% annual return gives you: Total invested: ${fmtFull(v.invested)}. Estimated returns: ${fmtFull(returns)}. Maturity amount: ${fmtFull(v.maturity)}. That is a ${returnPct}% gain on your total investment. Note: actual returns depend on the mutual fund you choose and market conditions.`,
    },
    {
      question: "Which mutual funds should I choose for SIP?",
      answer: "For a 10–15 year SIP horizon, diversified equity funds work best — Nifty 50 index funds (e.g., UTI Nifty 50, HDFC Index Fund) for passive investing, or large-cap and flexi-cap actively managed funds. For risk-averse investors, balanced advantage funds (hybrid) offer lower volatility. For tax saving, ELSS funds qualify for 80C deduction with a 3-year lock-in.",
    },
    {
      question: "How is SIP return calculated?",
      answer: `SIP returns use the future value of a series of equal payments formula: FV = P × [(1+r)^n − 1]/r × (1+r). Where P = monthly SIP amount (${fmtFull(v.amount)}), r = monthly rate (12% ÷ 12 = 1%), n = total months (${v.years * 12}). This gives ${fmtFull(v.maturity)} as the maturity amount.`,
    },
    {
      question: "Is SIP return of 12% realistic?",
      answer: "12% is the long-term historical average for diversified equity mutual funds in India (Nifty 50 CAGR over 20 years: ~13%). Over shorter periods, returns can be lower or negative. For conservative planning, use 10%. For debt funds, use 7-8%. The actual return you get depends on your fund selection and the market cycle.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema("sip-calculator", h1, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema(h1, description, HOW_TO_STEPS)} />
      <CalculatorShell
        slug="sip-calculator"
        h1={h1}
        faqs={FAQS}
        relatedSlugs={["lumpsum-calculator", "step-up-sip-calculator", "ppf-calculator", "fd-calculator"]}
        content={<VariantContent v={v} returns={returns} returnPct={returnPct} />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <SIPCalculator mode="standard" initialAmount={v.amount} initialRate={v.rate} initialYears={v.years} />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function VariantContent({ v, returns, returnPct }: { v: Variant; returns: number; returnPct: string }) {
  // Build year-wise table for first 5 years
  const rows: { year: number; invested: number; value: number }[] = [];
  const r = v.rate / 100 / 12;
  for (let yr = 1; yr <= Math.min(5, v.years); yr++) {
    const n = yr * 12;
    const value = Math.round(v.amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    rows.push({ year: yr, invested: v.amount * n, value });
  }

  return (
    <>
      <h2>₹{v.amount.toLocaleString("en-IN")} SIP for {v.years} Years — Results Summary</h2>
      <p>
        A <strong>systematic investment plan (SIP)</strong> of <strong>{fmt(v.amount)} per month</strong> sustained for <strong>{v.years} years</strong> at a 12% expected annual return grows into <strong>{fmtFull(v.maturity)}</strong>. Your total investment of <strong>{fmtFull(v.invested)}</strong> earns <strong>{fmtFull(returns)}</strong> in returns — a <strong>{returnPct}% gain</strong> over your principal. This is the power of compounding: the longer you stay invested, the larger the gap between what you put in and what you get out.
      </p>

      <h2>Year-by-Year Growth — First 5 Years</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Invested</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Portfolio Value</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Returns</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map(({ year, invested, value }) => (
              <tr key={year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">Year {year}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtFull(invested)}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{fmtFull(value)}</td>
                <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400">{fmtFull(value - invested)}</td>
              </tr>
            ))}
            <tr className="bg-slate-50 dark:bg-slate-800 font-bold">
              <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">Year {v.years} (Maturity)</td>
              <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtFull(v.invested)}</td>
              <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400">{fmtFull(v.maturity)}</td>
              <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400">{fmtFull(returns)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>SIP Formula Used</h2>
      <p>
        The SIP maturity formula is: <strong>FV = P × [(1+r)^n − 1] / r × (1+r)</strong>
      </p>
      <p>
        Where: <strong>P</strong> = Monthly SIP = {fmtFull(v.amount)} | <strong>r</strong> = Monthly rate = {v.rate}% ÷ 12 = {(v.rate / 12).toFixed(4)}% | <strong>n</strong> = Total months = {v.years} × 12 = {v.years * 12}
      </p>
      <p>
        Result: <strong>{fmtFull(v.maturity)}</strong> maturity amount.
      </p>

      <blockquote>
        <strong>Want a higher corpus?</strong> Try a <a href="/sip-calculator/">Step-Up SIP</a> where you increase your monthly amount by 10% each year. On a {fmt(v.amount)}/month base SIP for {v.years} years, a 10% annual step-up can add 40–60% more to your final corpus.
      </blockquote>
    </>
  );
}
