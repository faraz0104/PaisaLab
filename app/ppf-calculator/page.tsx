import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PPFCalculator from "@/components/ppf/PPFCalculator";

const slug = "ppf-calculator";
const title = "PPF Calculator 2025 — Public Provident Fund Maturity Calculator";
const description =
  "Free PPF calculator: Calculate Public Provident Fund maturity amount, interest earned, and tax savings. Enter yearly deposit and see 15/20/25 year projections instantly. Current PPF rate 7.1%.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "PPF calculator",
    "PPF calculator 2025",
    "public provident fund calculator",
    "PPF maturity calculator",
    "PPF interest calculator",
    "PPF calculator online",
    "PPF calculator India",
    "PPF 15 year maturity calculator",
    "PPF monthly deposit calculator",
    "PPF tax saving calculator",
    "PPF rate 2025",
    "PPF interest rate 2025",
    "PPF calculator SBI",
    "PPF scheme calculator",
    "how to calculate PPF interest",
  ],
  alternates: { canonical: `${SITE_URL_CONST}/${slug}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL_CONST}/${slug}/`,
    title,
    description,
    siteName: "RupeesCalc",
    images: [{ url: `${SITE_URL_CONST}/og/${slug}.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL_CONST}/og/${slug}.png`] },
};

const FAQS = [
  {
    question: "What is the current PPF interest rate in 2025?",
    answer: "The current PPF (Public Provident Fund) interest rate is 7.1% per annum for Q1 FY 2025-26 (April–June 2025). The rate is reviewed quarterly by the Government of India and has remained at 7.1% since April 2020. PPF interest is compounded annually and credited at the end of the financial year (March 31). Despite being a government-set rate, it is generally higher than fixed deposits offered by most banks, making PPF one of the best risk-free investment options in India.",
  },
  {
    question: "How is PPF interest calculated?",
    answer: "PPF interest is calculated on the minimum balance between the 5th and last day of each month. This means if you deposit before the 5th of the month, that deposit earns interest for that month. If deposited after the 5th, interest starts from the next month. Formula: Monthly qualifying balance = minimum balance between 5th and last day. Annual interest = Sum of 12 monthly qualifying balances × rate / 12. In practice, for a yearly deposit made at the start of the year: Interest = (Opening Balance + Deposit) × 7.1%. For example: ₹1,00,000 deposit in Year 1: Interest = ₹7,100. Balance at end of Year 1 = ₹1,07,100.",
  },
  {
    question: "What is the maturity amount for ₹1.5 lakh PPF per year for 15 years?",
    answer: "If you invest the maximum ₹1,50,000 per year in PPF at 7.1% for 15 years: Total investment = ₹22,50,000. Maturity amount ≈ ₹40,68,000. Total interest earned ≈ ₹18,18,000. That's nearly 81% more than what you invested, completely tax-free. The actual amount varies slightly based on when deposits are made (before or after the 5th of each month). Our PPF calculator uses the start-of-year deposit assumption, which gives the maximum interest.",
  },
  {
    question: "Can I extend PPF beyond 15 years?",
    answer: "Yes. After the initial 15-year maturity, you can extend PPF in blocks of 5 years indefinitely. Two extension options: (1) Extension with contributions: You continue depositing up to ₹1.5L/year and earn interest — balance continues to grow. This is available only if you apply within 1 year of maturity. (2) Extension without contributions: The balance stays and continues to earn 7.1% interest annually with no further deposits required. You can make partial withdrawals. For long-term wealth building, extending with contributions is better. Our calculator supports 15, 20, and 25 year tenures.",
  },
  {
    question: "How much can I invest in PPF per year?",
    answer: "Minimum: ₹500 per year (if you miss a year, the account becomes inactive and needs reactivation with a ₹50 penalty per inactive year). Maximum: ₹1,50,000 per year. This limit applies across all PPF accounts — if you have a personal account and a minor child's account, the combined limit is still ₹1.5L. You can deposit in up to 12 instalments in a year. The ₹1.5L limit has been unchanged since 2014. All deposits up to ₹1.5L qualify for 80C tax deduction.",
  },
  {
    question: "Is PPF better than FD, SIP, or NPS?",
    answer: "Comparison for FY 2025-26: PPF: 7.1% tax-free return, EEE status (fully exempt), 15-year lock-in. Better than: Bank FDs (6-7% pre-tax, taxable), Post Office FD (7.5% pre-tax, taxable). Worse than (potentially): Equity SIP (10-12% historical but not guaranteed), NPS (market-linked with 60% equity). PPF is best for: risk-averse investors, guaranteed tax-free returns, and building a retirement corpus alongside equity SIP. Most financial planners recommend doing both PPF (₹1.5L/year) and SIP for optimal tax + growth balance.",
  },
  {
    question: "What is the PPF withdrawal rule?",
    answer: "Full withdrawal: Only at maturity (15 years). Premature closure: Allowed after 5 years for specific reasons — serious illness of self/spouse/children, or higher education expenses. Penalty: 1% reduction in interest rate on the balance withdrawn. Partial withdrawal: Allowed from Year 7 onwards. Maximum withdrawal = 50% of balance at end of 4th year OR end of preceding year, whichever is lower. Example: Balance at end of Year 4 = ₹5L, Balance at end of Year 7 = ₹9L. Maximum withdrawal = 50% × ₹5L = ₹2.5L. You can make one partial withdrawal per year.",
  },
  {
    question: "Is PPF interest and maturity amount taxable?",
    answer: "PPF has EEE (Exempt-Exempt-Exempt) tax status — the most favorable tax treatment available in India: Exempt 1 — Investment: Deposits up to ₹1.5L/year qualify for Section 80C deduction. Exempt 2 — Interest: Annual interest earned is completely tax-free (not added to income). Exempt 3 — Maturity: The full maturity amount is tax-free. This makes PPF one of the best tax-saving instruments. At 30% tax bracket, investing ₹1.5L in PPF saves ₹46,800 in tax (₹45,000 + ₹1,800 cess) compared to investing in taxable instruments.",
  },
  {
    question: "Can I open a PPF account online?",
    answer: "Yes. You can open a PPF account online through: SBI (net banking or YONO app), HDFC Bank (net banking), ICICI Bank (iMobile), Axis Bank, Punjab National Bank, Post Office (India Post Payments Bank app). Documents required: Aadhaar, PAN, passport photo, cancelled cheque. The account can be opened, funded, and managed entirely online. Most banks link the PPF account to your savings account for easy yearly deposits. Setting up an auto-debit on April 1 (start of financial year) ensures maximum interest as the deposit qualifies for all 12 months.",
  },
  {
    question: "What happens if I miss a PPF deposit year?",
    answer: "If you don't deposit even ₹500 in a financial year, the account becomes 'inactive'. To reactivate: Pay ₹50 penalty for each inactive year + minimum ₹500 deposit per inactive year. Example: Account inactive for 3 years → Pay ₹150 penalty + ₹1,500 minimum arrears = ₹1,650 total to reactivate. The balance continues to earn interest even in inactive years. Withdrawals and loans are not available from inactive accounts. Reactivation must be done before maturity.",
  },
  {
    question: "Can I take a loan against PPF?",
    answer: "Yes. Loan facility is available from Year 3 to Year 6 (3rd financial year after opening to the end of 6th year). Loan amount: Maximum 25% of the balance at the end of the 2nd year preceding the loan application. Interest rate: 1% above PPF rate (currently 8.1%). Repayment: Loan must be repaid within 36 months. If not repaid in 36 months, 6% interest is charged from month 37. After repaying the first loan, a second loan can be taken in the same period. From Year 7 onwards, partial withdrawal is available instead of loans.",
  },
];

export default function PPFCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["fd-calculator", "sip-calculator", "income-tax-calculator", "rd-calculator"]}
        content={<PPFContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <PPFCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function PPFContent() {
  return (
    <>
      <h2>What is a PPF Calculator?</h2>
      <p>
        A <strong>PPF calculator</strong> estimates the maturity amount, total interest earned, and tax savings from your Public Provident Fund investments. Enter your yearly deposit and see your projected corpus at 15, 20, or 25 years — completely tax-free.
      </p>

      <h2>PPF Interest Rate History</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Period</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Rate</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["Q1 FY 2025-26 (Apr–Jun 2025)", "7.1%", "Current"],
              ["FY 2023-24 to FY 2024-25",      "7.1%", "Unchanged"],
              ["Q1 FY 2020-21 onwards",          "7.1%", "Reduced from 7.9%"],
              ["FY 2018-19",                     "8.0%", "—"],
              ["FY 2016-17",                     "8.1%", "—"],
            ].map(([period, rate, note]) => (
              <tr key={period} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{period}</td>
                <td className="px-4 py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">{rate}</td>
                <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>PPF vs Other Tax-Saving Investments</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Instrument</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Returns</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Tax Status</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Lock-in</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["PPF",          "7.1%",      "EEE (fully tax-free)", "15 years"],
              ["ELSS Funds",   "10–14%*",   "ETE (LTCG taxable)",   "3 years"],
              ["NSC",          "7.7%",      "EEE",                  "5 years"],
              ["5-Year FD",    "6.5–7.5%",  "ETE (interest taxable)","5 years"],
              ["NPS Tier 1",   "8–10%*",    "EET (60% tax-free)",   "Till 60"],
              ["SSY",          "8.2%",      "EEE",                  "21 years"],
            ].map(([name, ret, tax, lock]) => (
              <tr key={name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{name}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{ret}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300 text-xs">{tax}</td>
                <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 text-xs">{lock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">*Market-linked returns, historical average. PPF/NSC/FD returns are guaranteed.</p>

      <blockquote>
        <strong>Best Strategy:</strong> Max out PPF (₹1.5L/year) for guaranteed tax-free returns, then invest additional savings in equity SIP for higher long-term growth. Together, they balance safety and growth.
      </blockquote>
    </>
  );
}
