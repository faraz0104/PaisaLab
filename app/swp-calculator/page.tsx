import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SWPCalculator from "@/components/swp/SWPCalculator";

export const metadata: Metadata = buildMetadata("swp-calculator");

const slug = "swp-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a SWP calculator?",
    answer: "A SWP (Systematic Withdrawal Plan) calculator is a free online tool that helps you plan monthly withdrawals from your mutual fund corpus. Enter your initial corpus, monthly withdrawal amount, expected return rate, and withdrawal period to see how long your money lasts, total amount withdrawn, and remaining corpus at the end.",
  },
  {
    question: "What is SWP in mutual funds?",
    answer: "SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount from your mutual fund investment at regular intervals — monthly, quarterly, or annually. It's the opposite of SIP. Your remaining corpus continues to earn market returns even as you withdraw. SWP is popular for retirement income planning — it provides regular cash flow while keeping invested capital growing.",
  },
  {
    question: "What is the safe withdrawal rate for SWP?",
    answer: "Safe withdrawal rate (SWR): The globally accepted rule is 4% per year (the '4% rule' by William Bengen, based on US market data). For India: 3–3.5%/year is considered more conservative given potential inflation and market volatility. For a ₹1Cr corpus: Safe SWP = ₹25,000–₹33,000/month. At 4% = ₹33,333/month. For retirement planning, 3.5% is widely recommended to ensure corpus lasts 30+ years without running out.",
  },
  {
    question: "Is SWP better than FD for regular income?",
    answer: "SWP vs FD for regular income: FD — guaranteed interest payout (6.5–7.5%), zero market risk, fully taxable at slab rate. SWP from debt fund — similar stability, slightly higher return potential (7–9%), tax: only gain portion taxed, not full withdrawal. SWP from equity fund — higher returns (10–14% historically), market risk, LTCG at 12.5% on gains after 1 year. For retirees: FD for certainty, debt fund SWP for slightly better post-tax returns, equity SWP for long-horizon (15+ years) growth-oriented income.",
  },
  {
    question: "How is SWP taxed in India?",
    answer: "SWP taxation: Each withdrawal is treated as partial redemption. The gain component is taxed, not the full withdrawal amount. Equity fund SWP: STCG (units < 1 year old) 20%, LTCG (units > 1 year) 12.5% on gains above ₹1.25L/year. Debt fund SWP: gains taxed at your income slab rate. Key advantage over FD: If your SWP withdrawal is ₹20,000/month and ₹18,000 is original investment (principal) and ₹2,000 is gain — only ₹2,000 is taxed. FD pays interest on the full amount as taxable income.",
  },
  {
    question: "How much corpus do I need for ₹50,000/month SWP?",
    answer: "Corpus required for ₹50,000/month SWP: At 3.5% safe withdrawal rate: ₹50,000 × 12 ÷ 3.5% = ₹1.71Cr corpus needed. At 4% SWR: ₹50,000 × 12 ÷ 4% = ₹1.5Cr corpus. At 5% SWR (aggressive): ₹1.2Cr corpus. Note: Higher SWR risks corpus depletion during market downturns. Build a buffer of 20–25% above the minimum to account for inflation and bad market years. ₹1.71Cr → ₹2Cr target corpus for sustainable ₹50K/month SWP.",
  },
  {
    question: "Can I do SWP from any mutual fund?",
    answer: "Yes, most mutual funds in India offer SWP facility. Process: Register SWP mandate with the fund house — specify amount, frequency (monthly/quarterly), and bank account. Minimum SWP amount: usually ₹500–₹1,000/month. Suitable funds for SWP: Balanced advantage funds (managed allocation), Debt funds (stable, lower returns), Large cap equity funds (with adequate corpus). Avoid: Small/mid cap funds for SWP (too volatile), funds with exit load periods. Check SWP option when investing — some funds allow it only after a minimum holding period.",
  },
  {
    question: "What is the 4% rule in retirement planning?",
    answer: "The 4% rule (Bengen Rule): You can withdraw 4% of your corpus in the first year of retirement, then adjust for inflation annually — and the portfolio should last 30+ years. Based on historical US market data. For India: Conservative version uses 3–3.5% to account for potentially lower equity returns and higher inflation. Example: Retiring at 60 with ₹2Cr corpus: 4% = ₹8L/year = ₹66,666/month. At 3.5% = ₹5.83L/year = ₹48,611/month. Build corpus that gives comfortable SWP at 3.5% to ensure portfolio longevity.",
  },
  {
    question: "What is the difference between SWP and dividend option in mutual funds?",
    answer: "SWP vs Dividend option: SWP — you choose the exact amount and timing, tax-efficient (only gain taxed), corpus stays invested and potentially grows. Dividend option — fund declares dividend when it has surplus, amount and timing not guaranteed, not regular, SEBI renamed to 'Income Distribution cum Capital Withdrawal' (IDCW), taxed at slab rate. For planned regular income: SWP is always better than dividend option. Dividend option is unpredictable and can be stopped or reduced anytime.",
  },
  {
    question: "How to start a SWP in mutual funds?",
    answer: "Steps to start SWP: (1) Have a mutual fund investment with adequate corpus (minimum ₹5–10L for meaningful SWP), (2) Log in to AMC website, Zerodha Coin, Groww, or MF Central, (3) Go to your investment → Set up SWP, (4) Enter amount, frequency (monthly recommended), and date (usually 1st to 10th), (5) Choose bank account for credit. Online SWP setup takes 5 minutes. Physical form available at AMC branches. SWP typically processes by 3rd working day after the withdrawal date.",
  },
  {
    question: "Can SWP corpus run out?",
    answer: "Yes, SWP corpus can be depleted if withdrawal rate exceeds returns. When withdrawal rate > fund return rate: corpus shrinks each month and eventually runs to zero. Example: ₹10L corpus at 8% return = ₹6,667 interest/month. If you withdraw ₹10,000/month, you're eating into principal by ₹3,333/month — corpus runs out in ~7 years. Our SWP calculator shows exactly when and if depletion happens. Solution: Withdraw less than expected returns, or build a larger corpus before starting SWP.",
  },
  {
    question: "What is SWP in NPS (National Pension System)?",
    answer: "NPS also has a systematic lump sum withdrawal (SLW) option from age 60. NPS rules: Minimum 40% must go to annuity (guaranteed pension), maximum 60% can be withdrawn as lump sum (tax-free). From age 60–75: can choose to defer lump sum withdrawal or do it in installments (SLW). NPS SWP (SLW): allows monthly/quarterly/annual withdrawals from the 60% lump sum portion, remaining 60% portion stays invested in NPS and earns returns. This is different from mutual fund SWP and has different tax treatment.",
  },
  {
    question: "How much SIP is needed to build a corpus for SWP?",
    answer: "Planning backwards from SWP goal: Target: ₹50,000/month SWP → need ₹2Cr corpus (at 3% SWR). Build ₹2Cr via SIP at 12% returns: 15 years SIP needed = ₹40,000/month, 20 years = ₹21,500/month, 25 years = ₹13,000/month. Formula: Target corpus ÷ SIP future value factor. Key insight: Starting SIP early reduces the monthly investment dramatically. ₹13,000/month SIP at 25 vs ₹40,000/month at 15 years same result — same ₹2Cr corpus with 3x less monthly investment over longer period.",
  },
  {
    question: "What is inflation-adjusted SWP?",
    answer: "Inflation-adjusted SWP (step-up SWP): Increase your monthly withdrawal by 5–7% every year to maintain purchasing power. Example: Start with ₹30,000/month SWP, increase by 6% yearly. Year 1: ₹30,000, Year 5: ₹37,874, Year 10: ₹50,726, Year 15: ₹67,934. This ensures your real income doesn't erode with inflation. Calculator tip: To plan inflation-adjusted SWP, assume a return rate that's 5–6% higher than your starting withdrawal rate so corpus sustains long-term.",
  },
];

export default function SWPPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "SWP Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["sip-calculator", "lumpsum-calculator", "fd-calculator", "step-up-sip-calculator"]}
        content={<SWPContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <SWPCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function SWPContent() {
  return (
    <>
      <h2>What is a SWP Calculator?</h2>
      <p>
        A <strong>SWP Calculator</strong> (Systematic Withdrawal Plan Calculator) helps you plan regular monthly withdrawals from your mutual fund corpus. Whether you&apos;re planning for retirement income, or supplementing a salary — SWP lets you withdraw a fixed amount monthly while your remaining corpus continues to earn market returns.
      </p>
      <p>
        Our calculator shows you exactly: total amount you can withdraw, returns your corpus earns while being withdrawn, remaining corpus at the end, and a year-wise chart showing how your corpus evolves.
      </p>

      <h2>How SWP Works</h2>
      <p>
        When you set up an SWP, the mutual fund systematically redeems units worth your withdrawal amount on the specified date each month. The remaining units continue to participate in market growth. If your portfolio returns exceed your withdrawal rate, your corpus can actually <em>grow</em> even while you withdraw.
      </p>

      <h2>Corpus Required for Different SWP Amounts</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly SWP</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Corpus at 3% SWR</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Corpus at 4% SWR</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Corpus at 5% SWR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹10,000", "₹40L", "₹30L", "₹24L"],
              ["₹25,000", "₹1Cr", "₹75L", "₹60L"],
              ["₹50,000", "₹2Cr", "₹1.5Cr", "₹1.2Cr"],
              ["₹1,00,000", "₹4Cr", "₹3Cr", "₹2.4Cr"],
              ["₹2,00,000", "₹8Cr", "₹6Cr", "₹4.8Cr"],
            ].map(([swp, c3, c4, c5]) => (
              <tr key={swp} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{swp}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{c3}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{c4}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{c5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>SWP for Retirement Planning</h2>
      <p>
        <strong>Safe Withdrawal Rate (SWR):</strong> The 4% rule suggests you can withdraw 4% of your corpus per year indefinitely (corpus grows with markets and replaces withdrawals). For India, a conservative 3–3.5% is recommended.
      </p>
      <p>
        <strong>Tax advantage over FD:</strong> In SWP, only the <em>gain component</em> of each withdrawal is taxed — not the principal portion. With a ₹50,000/month SWP where ₹40,000 is original investment and ₹10,000 is gain, only ₹10,000 is taxable. An FD paying ₹50,000/month interest has the full ₹50,000 taxed at your slab rate.
      </p>

      <blockquote>
        <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. SWP returns are not guaranteed. This calculator is for financial planning purposes only. Consult a SEBI-registered financial advisor for retirement planning specific to your situation.
      </blockquote>
    </>
  );
}
