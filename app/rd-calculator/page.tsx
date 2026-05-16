import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FDCalculator from "@/components/fd/FDCalculator";

export const metadata: Metadata = buildMetadata("rd-calculator");

const slug = "rd-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is an RD calculator?",
    answer: "An RD (Recurring Deposit) calculator is a free online tool that computes the maturity amount for your monthly recurring deposits. Enter your monthly deposit amount, interest rate, and tenure to instantly see total invested amount, total interest earned, and final maturity value. This helps you plan your monthly savings goal before opening an RD account.",
  },
  {
    question: "What is the formula to calculate RD maturity?",
    answer: "RD maturity formula (quarterly compounding): M = R × [(1 + i)^n – 1] / (1 – (1 + i)^(-1/3)), where M = Maturity amount, R = Monthly installment, i = Quarterly interest rate = Annual rate ÷ 4 ÷ 100, n = Number of quarters = Tenure (months) ÷ 3. Example: ₹5,000/month RD at 7% for 2 years (8 quarters): i = 0.0175, maturity = ₹1,28,500 approx (invested ₹1,20,000, interest ₹8,500).",
  },
  {
    question: "What is the post office RD interest rate 2025?",
    answer: "Post Office RD (PORD) rate for 2025: 6.7% per annum with quarterly compounding. Fixed 5-year mandatory tenure. Minimum deposit: ₹100/month (multiples of ₹10). No maximum limit. Can be opened at any post office or India Post Payments Bank. Backed by Government of India — zero default risk. Senior citizens get same rate as regular. Interest taxable. Rs 5,000/month PORD for 5 years at 6.7% = maturity of approximately ₹3,59,000 (invested ₹3,00,000).",
  },
  {
    question: "What is the SBI RD interest rate 2025?",
    answer: "SBI Recurring Deposit rates 2025: 1 year — 6.80%, 2 years — 7.00%, 3 years — 6.75%, 5 years — 6.50%. Senior citizens get 0.50% extra on all tenures. Minimum RD amount: ₹100/month. Maximum: no limit. Premature withdrawal allowed with penalty (0.50–1%). TDS on interest above ₹40,000/year. SBI RD can be opened online via YONO app or at any SBI branch. DICGC insured up to ₹5L.",
  },
  {
    question: "Is RD interest taxable in India?",
    answer: "Yes, RD interest is fully taxable as 'Income from Other Sources' at your income tax slab rate. TDS is deducted at 10% when total interest from all RDs at a bank exceeds ₹40,000 in a year (₹50,000 for senior citizens). Submit Form 15G (below 60 years) or Form 15H (senior citizens) to the bank if your total income is below the taxable limit to avoid TDS. File ITR to claim any excess TDS deducted as a refund.",
  },
  {
    question: "What is the difference between RD and SIP?",
    answer: "RD (Recurring Deposit): Guaranteed 6.5%–7.5% returns, zero market risk, DICGC insured, interest taxed at slab rate, tenure 6 months to 10 years. SIP (Mutual Fund): Historically 10–14% returns over 10+ years, market risk, LTCG tax at 12.5% (equity, after 1 year). ₹5,000/month for 5 years: RD at 7% = ₹3,58,000 maturity. SIP at 12% = ₹4,08,000 maturity. Over 10 years: RD ₹8,64,000 vs SIP ₹11,62,000. Long-term: SIP wins. Short-term: RD is safer.",
  },
  {
    question: "Can I break RD before maturity?",
    answer: "Yes, most RDs allow premature withdrawal with a penalty. Typical penalty: 0.5%–1% reduction in applicable interest rate for the period held. Example: 2-year RD at 7%. You close after 1 year. Applicable rate for 1 year is 6.8%, minus 1% penalty = 5.8%. You receive interest at 5.8% for the 1 year held. Post Office RD: premature withdrawal allowed after 3 years (for 5-year PORD), but you lose some interest. Avoid breaking RD unless it's an emergency.",
  },
  {
    question: "What is RD vs FD — which is better?",
    answer: "RD vs FD comparison: FD — invest lump sum at once. Better if you have ₹50,000+ available. All rupees earn interest from day 1. RD — invest ₹1,000–₹10,000/month. Better if you want to save regularly. Later installments earn less interest since they're invested later. At the same rate, FD earns more total interest if you have the lump sum. RD is the right choice when you're building savings from monthly income without a lump sum available. Think of RD as a disciplined savings tool.",
  },
  {
    question: "What is the maximum RD amount?",
    answer: "Maximum RD amount limits: Most banks — no maximum limit. Post Office RD — no maximum limit. However, DICGC insures only ₹5L total per bank. For large RD amounts, spread across multiple banks. Note: Some cooperative banks and NBFCs may have different limits. For online RDs opened through net banking, some banks have daily/weekly transaction limits. Senior citizens and NRIs may have different rules — check with your bank before opening a large RD.",
  },
  {
    question: "What is the minimum RD amount in India?",
    answer: "Minimum RD amounts: SBI — ₹100/month, HDFC Bank — ₹1,000/month, ICICI Bank — ₹500/month, Axis Bank — ₹500/month, Post Office — ₹100/month. Some small finance banks accept ₹100/month minimums. For first-time savers, even ₹500/month RD builds a savings habit. ₹1,000/month for 5 years at 7% = ₹71,592 maturity (invested ₹60,000). Starting small is better than not starting.",
  },
  {
    question: "Is post office RD better than bank RD?",
    answer: "Post Office RD vs Bank RD: Interest rate: Post Office 6.7% vs banks 6.5%–7.5%. Safety: Post Office — Government of India guarantee (no limit), banks — DICGC insured up to ₹5L. Flexibility: Banks — tenures from 6 months to 10 years, Post Office — fixed 5-year tenure only. Convenience: Banks — online management via app, post office — branch-based mostly (improving). Winner: For amounts above ₹5L, post office is safer. For flexibility and higher rates, some banks (especially small finance banks) offer better rates.",
  },
  {
    question: "What is the RD interest rate comparison for 2025?",
    answer: "RD interest rate comparison 2025: HDFC Bank — 7.00%–7.40% (regular), 7.50%–7.90% (senior), ICICI Bank — 6.70%–7.25% (regular), 7.20%–7.75% (senior), SBI — 6.80%–7.00%, Axis Bank — 7.10%–7.35%, Post Office — 6.7% (5-year only), Unity SFB — 8.5%–9% (small finance bank, higher risk than scheduled commercial banks). Always check DICGC coverage (₹5L limit) for any bank where you keep large amounts.",
  },
  {
    question: "How many RD accounts can I open?",
    answer: "There is no limit on the number of RD accounts you can open. You can open multiple RDs at the same bank or across different banks. Reasons to open multiple RDs: Goal-based savings (one for vacation, one for down payment), laddering tenures (1-year, 2-year, 3-year RDs), using different banks to stay within DICGC ₹5L insurance limit. Keep in mind: TDS is calculated per bank (all accounts combined), so total interest from all RDs at one bank above ₹40,000 triggers 10% TDS.",
  },
  {
    question: "Does RD have Section 80C tax benefit?",
    answer: "No, regular RD does not qualify for Section 80C tax deduction. Only 5-year Tax-Saver FD (not RD) qualifies for 80C deduction up to ₹1.5L. For tax-saving investments with guaranteed returns, consider: PPF (7.1% tax-free, 15-year lock-in), NSC (7.7%, 5-year), Post Office 5-year TD (7.5%, qualifies for 80C). RD interest is also taxable — making it less tax-efficient than PPF. If your goal is both tax saving and guaranteed returns, PPF > NSC > Tax-Saver FD.",
  },
  {
    question: "Can NRIs open RD accounts in India?",
    answer: "NRIs can open NRO RD (Non-Resident Ordinary Recurring Deposit) accounts. NRO RD: Funded from Indian income (rent, pension, dividends), interest taxable in India at 30% TDS rate, repatriation up to $1M per year. NRE FD is more common for NRIs than NRE RD (most banks prefer NRE FDs). Some banks like SBI and HDFC do offer NRE RD accounts where interest is tax-free in India. Check with your bank for eligibility and documentation requirements.",
  },
];

export default function RDPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "RD Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["fd-calculator", "sip-calculator", "swp-calculator", "rd-calculator"]}
        content={<RDContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <FDCalculator mode="rd" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function RDContent() {
  return (
    <>
      <h2>What is an RD Calculator?</h2>
      <p>
        An <strong>RD Calculator</strong> (Recurring Deposit Calculator) helps you estimate the maturity amount for your monthly fixed savings. A Recurring Deposit is a savings product offered by banks and post offices where you invest a fixed amount every month and earn compound interest — similar to a SIP in mutual funds but with guaranteed returns and zero market risk.
      </p>
      <p>
        This calculator works for all bank RDs as well as Post Office Recurring Deposits. Enter the monthly deposit, interest rate, and tenure to see your exact maturity amount and total interest earned.
      </p>

      <h2>RD Returns — How Much Can You Accumulate?</h2>
      <p>At 7% interest rate (quarterly compounding):</p>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly RD</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">1 Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">3 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Interest Earned (5yr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹1,000", "₹12,460", "₹39,690", "₹71,650", "₹11,650"],
              ["₹2,000", "₹24,920", "₹79,380", "₹1,43,300", "₹23,300"],
              ["₹5,000", "₹62,300", "₹1,98,450", "₹3,58,250", "₹58,250"],
              ["₹10,000", "₹1,24,600", "₹3,96,900", "₹7,16,500", "₹1,16,500"],
              ["₹25,000", "₹3,11,500", "₹9,92,250", "₹17,91,250", "₹2,91,250"],
            ].map(([rd, y1, y3, y5, interest]) => (
              <tr key={rd} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{rd}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y1}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y3}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y5}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{interest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>RD vs SIP — Key Comparison</h2>
      <p>
        <strong>RD (Recurring Deposit):</strong> Guaranteed returns (6.5%–7.5%), DICGC insured, interest taxed at slab rate, suitable for 1–5 year goals, zero market risk.
      </p>
      <p>
        <strong>SIP (Mutual Fund):</strong> Historically 10–14% returns over 10+ years, market risk, LTCG taxed at 12.5%. For long-term goals (5+ years), SIP significantly outperforms RD.
      </p>
      <p>
        <strong>Recommendation:</strong> Use RD for short-term goals (vacation, down payment, emergency backup). Use SIP for long-term goals (retirement, child&apos;s education, wealth building).
      </p>

      <h2>Post Office vs Bank RD</h2>
      <ul>
        <li><strong>Post Office RD:</strong> 6.7% rate, Government guarantee (unlimited protection), 5-year tenure only, branch-based</li>
        <li><strong>SBI RD:</strong> 6.8%–7.0%, DICGC insured up to ₹5L, tenures from 1–10 years, digital access via YONO</li>
        <li><strong>Small Finance Banks:</strong> 8%–9% rates, DICGC insured up to ₹5L, higher returns but keep within ₹5L limit</li>
      </ul>

      <blockquote>
        <strong>Disclaimer:</strong> RD interest rates are subject to change. DICGC insures deposits up to ₹5 lakh per depositor per bank. This RD calculator is for informational purposes only — verify current rates with your bank or post office before opening an account.
      </blockquote>
    </>
  );
}
