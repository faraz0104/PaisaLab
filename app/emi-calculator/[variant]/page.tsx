import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";
import { calculateEMI } from "@/lib/calculators/emi";

/* ── Helpers ──────────────────────────────────────────────── */

function fmt(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(1)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(0)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}
function fmtFull(n: number) { return `₹${Math.round(n).toLocaleString("en-IN")}` }
function fmtK(n: number) {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${Math.round(n)}`;
}

/* ── Variant config ─────────────────────────────────────────── */

type LoanKind = "home" | "personal" | "car" | "general";

interface Variant {
  slug: string;
  label: string;
  principal: number;
  rate: number;
  years: number;
  kind: LoanKind;
  bankLabel?: string; // e.g. "SBI", "HDFC"
}

const VARIANTS: Variant[] = [
  // Home loans
  { slug: "10-lakh-home-loan",           label: "₹10 Lakh Home Loan",    principal: 1000000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "20-lakh-home-loan",           label: "₹20 Lakh Home Loan",    principal: 2000000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "25-lakh-home-loan",           label: "₹25 Lakh Home Loan",    principal: 2500000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "30-lakh-home-loan",           label: "₹30 Lakh Home Loan",    principal: 3000000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "40-lakh-home-loan",           label: "₹40 Lakh Home Loan",    principal: 4000000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "50-lakh-home-loan",           label: "₹50 Lakh Home Loan",    principal: 5000000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "60-lakh-home-loan",           label: "₹60 Lakh Home Loan",    principal: 6000000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "75-lakh-home-loan",           label: "₹75 Lakh Home Loan",    principal: 7500000,  rate: 8.75, years: 20, kind: "home" },
  { slug: "1-crore-home-loan",           label: "₹1 Crore Home Loan",    principal: 10000000, rate: 8.75, years: 20, kind: "home" },
  { slug: "50-lakh-home-loan-15-years",  label: "₹50L Home Loan 15 Yr",  principal: 5000000,  rate: 8.75, years: 15, kind: "home" },
  { slug: "50-lakh-home-loan-30-years",  label: "₹50L Home Loan 30 Yr",  principal: 5000000,  rate: 8.75, years: 30, kind: "home" },
  // Personal loans
  { slug: "1-lakh-personal-loan",        label: "₹1 Lakh Personal Loan", principal: 100000,   rate: 14,   years: 2,  kind: "personal" },
  { slug: "3-lakh-personal-loan",        label: "₹3 Lakh Personal Loan", principal: 300000,   rate: 14,   years: 3,  kind: "personal" },
  { slug: "5-lakh-personal-loan",        label: "₹5 Lakh Personal Loan", principal: 500000,   rate: 14,   years: 3,  kind: "personal" },
  { slug: "10-lakh-personal-loan",       label: "₹10L Personal Loan",    principal: 1000000,  rate: 14,   years: 5,  kind: "personal" },
  { slug: "20-lakh-personal-loan",       label: "₹20L Personal Loan",    principal: 2000000,  rate: 13,   years: 5,  kind: "personal" },
  // Car loans
  { slug: "5-lakh-car-loan",             label: "₹5 Lakh Car Loan",      principal: 500000,   rate: 9.5,  years: 5,  kind: "car" },
  { slug: "8-lakh-car-loan",             label: "₹8 Lakh Car Loan",      principal: 800000,   rate: 9.5,  years: 5,  kind: "car" },
  { slug: "10-lakh-car-loan",            label: "₹10 Lakh Car Loan",     principal: 1000000,  rate: 9.5,  years: 7,  kind: "car" },
  { slug: "15-lakh-car-loan",            label: "₹15 Lakh Car Loan",     principal: 1500000,  rate: 9.0,  years: 7,  kind: "car" },
];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ variant: v.slug }));
}

/* ── Metadata ───────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const v = VARIANTS.find((x) => x.slug === variant);
  if (!v) return {};
  const res = calculateEMI({ principal: v.principal, annualRate: v.rate, years: v.years });
  const title = `EMI for ${v.label} at ${v.rate}% — ${fmtK(res.emi)}/Month`;
  const description = `${v.label} at ${v.rate}% for ${v.years} years: Monthly EMI = ${fmtFull(res.emi)}. Total interest = ${fmtFull(res.totalInterest)}. Total payment = ${fmtFull(res.totalAmount)}. See full amortization table — free, no signup.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL_CONST}/emi-calculator/${variant}/` },
    openGraph: { type: "website", url: `${SITE_URL_CONST}/emi-calculator/${variant}/`, title, description, siteName: "RupeesCalc", images: [{ url: `${SITE_URL_CONST}/og/emi-calculator.png`, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ── Page ───────────────────────────────────────────────────── */

const HOW_TO_STEPS = [
  { name: "Enter loan amount", text: "The loan amount is pre-filled. Adjust it to match your exact loan amount." },
  { name: "Set interest rate", text: "Enter the annual interest rate from your bank's offer letter. Compare rates from SBI, HDFC, ICICI above." },
  { name: "Choose tenure", text: "Select repayment period in years. Longer tenure = lower EMI but more total interest paid." },
  { name: "View EMI and total cost", text: "See monthly EMI, total interest paid, and year-wise amortization breakdown instantly." },
];

export default async function EMIVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS.find((x) => x.slug === variant);
  if (!v) notFound();

  const res = calculateEMI({ principal: v.principal, annualRate: v.rate, years: v.years });
  const h1 = `EMI Calculator: ${v.label} at ${v.rate}%`;
  const description = `${v.label} at ${v.rate}% for ${v.years} years: Monthly EMI = ${fmtFull(res.emi)}. Total interest = ${fmtFull(res.totalInterest)}. Total payment = ${fmtFull(res.totalAmount)}.`;

  const kindLabel = v.kind === "home" ? "home loan" : v.kind === "car" ? "car loan" : "personal loan";

  const FAQS = [
    {
      question: `What is the EMI for ${v.label} at ${v.rate}%?`,
      answer: `For ${v.label} at ${v.rate}% per annum for ${v.years} years: Monthly EMI = ${fmtFull(res.emi)}. Total amount payable = ${fmtFull(res.totalAmount)}. Total interest = ${fmtFull(res.totalInterest)} (${res.interestPercent.toFixed(0)}% of total payment). Use our EMI calculator above to adjust the rate or tenure.`,
    },
    {
      question: `How can I reduce the EMI on my ${kindLabel}?`,
      answer: `Three ways to reduce EMI: (1) Make a larger down payment — reducing principal reduces EMI proportionally. (2) Choose a longer tenure — ${v.years + 5} years would reduce EMI by roughly 10–15% vs ${v.years} years. (3) Negotiate a lower rate — even 0.5% lower saves significant interest. You can also make annual prepayments to close the loan early.`,
    },
    {
      question: "What is the EMI formula?",
      answer: `EMI = P × r × (1+r)^n / [(1+r)^n − 1]. Where P = Principal (${fmtFull(v.principal)}), r = Monthly rate (${v.rate}% ÷ 12 = ${(v.rate / 12).toFixed(4)}%), n = Total months (${v.years * 12}). Result: EMI = ${fmtFull(res.emi)}/month.`,
    },
    {
      question: `How much total interest do I pay on ${v.label}?`,
      answer: `On ${v.label} at ${v.rate}% for ${v.years} years, total interest = ${fmtFull(res.totalInterest)}. That is ${res.interestPercent.toFixed(0)}% of your total payment of ${fmtFull(res.totalAmount)}. Making even one extra EMI per year can save 1–2 years of tenure and reduce total interest by 8–12%.`,
    },
  ];

  const related = v.kind === "home"
    ? ["home-loan-emi-calculator", "sip-calculator", "ppf-calculator", "salary-calculator"]
    : v.kind === "car"
    ? ["car-loan-emi-calculator", "emi-calculator", "personal-loan-emi-calculator", "salary-calculator"]
    : ["personal-loan-emi-calculator", "emi-calculator", "salary-calculator", "income-tax-calculator"];

  return (
    <>
      <JsonLd data={webAppSchema("emi-calculator", h1, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema(h1, description, HOW_TO_STEPS)} />
      <CalculatorShell
        slug="emi-calculator"
        h1={h1}
        faqs={FAQS}
        relatedSlugs={related}
        content={<VariantContent v={v} res={res} />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <EMICalculator loanType={v.kind} initialPrincipal={v.principal} initialRate={v.rate} initialYears={v.years} />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function VariantContent({ v, res }: { v: Variant; res: ReturnType<typeof calculateEMI> }) {
  const rows = res.yearlyBreakdown.slice(0, 5);
  const interestRatio = (res.totalInterest / v.principal * 100).toFixed(0);

  return (
    <>
      <h2>{v.label} — EMI Summary at {v.rate}%</h2>
      <p>
        A <strong>{v.label}</strong> at <strong>{v.rate}% per annum</strong> for <strong>{v.years} years</strong> results in a monthly EMI of <strong>{fmtFull(res.emi)}</strong>. Over the full tenure, you pay back <strong>{fmtFull(res.totalAmount)}</strong> — of which <strong>{fmtFull(res.totalInterest)}</strong> is interest ({interestRatio}% extra over principal). Use the calculator above to test different rates and tenures.
      </p>

      <h2>Bank Interest Rate Comparison — {v.kind === "home" ? "Home Loan" : v.kind === "car" ? "Car Loan" : "Personal Loan"} 2025</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Bank</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Rate (p.a.)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">EMI for {fmt(v.principal)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {(v.kind === "home" ? (
              [["SBI", 8.50], ["HDFC Bank", 8.75], ["ICICI Bank", 8.75], ["Kotak Bank", 8.75], ["Axis Bank", 8.75]] as [string, number][]
            ) : v.kind === "car" ? (
              [["SBI", 8.90], ["HDFC Bank", 9.40], ["ICICI Bank", 9.30], ["Axis Bank", 9.25], ["Kotak Bank", 9.50]] as [string, number][]
            ) : (
              [["HDFC Bank", 10.50], ["ICICI Bank", 10.75], ["SBI", 11.45], ["Axis Bank", 11.25], ["Kotak Bank", 10.99]] as [string, number][]
            )).map(([bank, r]) => {
              const emi = calculateEMI({ principal: v.principal, annualRate: r, years: v.years }).emi;
              return (
                <tr key={bank} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${r === v.rate ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{bank}{r === v.rate ? " ✓" : ""}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r}%</td>
                  <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400 font-semibold">{fmtFull(emi)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Year-Wise Amortization — First 5 Years</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Principal Paid</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Interest Paid</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">Year {row.year}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400">{fmtFull(row.principal)}</td>
                <td className="px-4 py-2.5 text-right text-red-500 dark:text-red-400">{fmtFull(row.interest)}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtFull(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <blockquote>
        <strong>Tip:</strong> In the early years, most of your EMI goes toward interest (not principal). Making an extra prepayment of {fmt(res.emi * 2)} in Year 1 can reduce your total tenure by 6–8 months and save {fmt(res.emi * 3)} in interest.
      </blockquote>
    </>
  );
}
