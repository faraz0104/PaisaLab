import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import LumpsumCalculator from "@/components/lumpsum/LumpsumCalculator";

export const metadata: Metadata = buildMetadata("lumpsum-calculator");

const slug = "lumpsum-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a lumpsum calculator?",
    answer: "A lumpsum calculator is a free online tool that estimates the future value of a one-time investment. Enter the investment amount, expected annual return rate, and time period to instantly see the maturity value, total returns earned, and year-by-year growth. Unlike SIP where you invest monthly, lumpsum means investing a single large amount at once.",
  },
  {
    question: "How is lumpsum return calculated?",
    answer: "Lumpsum return uses compound interest formula: A = P × (1 + r/100)^n. A = Maturity value, P = Principal invested, r = Annual rate of return (%), n = Number of years. Example: ₹5L invested at 12% for 10 years: A = 5,00,000 × (1.12)^10 = 5,00,000 × 3.1058 = ₹15.53L. Total return = ₹10.53L on ₹5L investment — a 3.1x growth in 10 years.",
  },
  {
    question: "Is lumpsum investment better than SIP?",
    answer: "Lumpsum is better when: you have a large sum available (bonus, inheritance, sale proceeds), markets have corrected 15–20%+ from recent highs, you're investing for 10+ years. SIP is better when: you have regular income but no large sum, markets are at all-time highs (SIP averages entry price), you want rupee cost averaging. Statistically over 20+ years, both strategies yield similar returns — the real advantage of SIP is discipline and accessibility for regular investors.",
  },
  {
    question: "What is CAGR and how is it different from simple returns?",
    answer: "CAGR (Compound Annual Growth Rate) is the year-over-year growth rate that would take the investment from its initial value to its final value. Example: ₹1L invested for 5 years grows to ₹1.76L. CAGR = (1.76)^(1/5) – 1 = 12%. Simple return = 76%. CAGR is more meaningful for comparing investments over different time periods. A fund with 100% return over 10 years has CAGR of just 7.2% — meaning a fixed deposit at 7% would have beaten it.",
  },
  {
    question: "What is the Rule of 72?",
    answer: "Rule of 72 is a simple way to estimate how long it takes money to double at a given return rate. Divide 72 by the annual return rate. At 8% return: 72÷8 = 9 years to double. At 12%: 72÷12 = 6 years. At 18%: 72÷18 = 4 years. Example: ₹10L at 12% doubles every 6 years. After 12 years = ₹40L, after 18 years = ₹80L, after 24 years = ₹1.6Cr. This is the power of long-term compounding.",
  },
  {
    question: "How much should I invest in lumpsum mutual funds?",
    answer: "Lumpsum investment strategy: Ideal for any windfall (bonus, inheritance, FD maturity, property sale). Amount: invest what you don't need for at least 5 years. Don't put emergency funds (6 months expenses) in market. Don't invest money needed within 3 years in equity. If you receive ₹10L bonus: keep ₹2L in FD (emergency), invest ₹8L in diversified equity funds via lumpsum. For large amounts (₹25L+), consider Systematic Transfer Plan (STP) — move from liquid fund to equity over 6–12 months.",
  },
  {
    question: "What is the best lumpsum investment option in India 2025?",
    answer: "Best lumpsum investment options 2025: Equity mutual funds (12%–18% historical returns, 5+ year horizon) — Parag Parikh Flexi Cap, UTI Nifty 50 Index, HDFC Mid Cap Opportunities. PPF (7.1% tax-free, 15-year lock-in, excellent for debt portion). NPS (8%–12%, tax benefits under 80CCD). FD (6.5%–9% guaranteed). Real estate (illiquid but good inflation hedge). Gold (3%–8% long-term, portfolio hedge). For most investors: 60–70% equity mutual funds + 20–30% debt (FD/PPF) is the right lumpsum allocation.",
  },
  {
    question: "Is lumpsum investment in mutual funds safe?",
    answer: "Lumpsum in equity mutual funds has market risk. Short-term (1–3 years): can lose 20–40% during market downturns. Long-term (10+ years): no 10-year period in India's history has given negative returns on broad market index. Risk mitigation: diversify across large cap + mid cap + international funds, use STP (systematic transfer from liquid fund) for large amounts, don't check NAV daily. SEBI regulates all mutual funds — money is protected from fund house bankruptcy as it's held in trust.",
  },
  {
    question: "What is STP (Systematic Transfer Plan) vs lumpsum?",
    answer: "STP (Systematic Transfer Plan): You put the lump sum in a liquid/debt mutual fund first, then automatically transfer a fixed amount to equity fund monthly. Benefit: reduces timing risk for large investments, money earns liquid fund returns while waiting to be invested. Example: ₹12L lumpsum — park in liquid fund, set up ₹1L/month STP to equity fund for 12 months. This effectively creates a 12-month SIP while keeping all money invested. Best for amounts above ₹5L when markets aren't significantly down.",
  },
  {
    question: "What return rate should I assume for lumpsum calculation?",
    answer: "Expected return assumptions for lumpsum: Equity large cap funds (10+ years): 11–13% CAGR. Flexi cap / multi cap: 12–15%. Mid cap / small cap: 13–18% (but more volatile). Nifty 50 Index Fund: ~12% historical. Balanced advantage / hybrid: 9–11%. Debt funds: 7–9%. PPF/SSY: 7.1–8.2% (tax-free). FD: 6.5–9% (taxable). For conservative planning: use 10% for equity, 7% for debt. Don't use more than 15% — even the best funds rarely sustain 18%+ over 10+ years.",
  },
  {
    question: "How does lumpsum investment in ELSS save tax?",
    answer: "ELSS (Equity Linked Saving Scheme) lumpsum investment qualifies for Section 80C deduction up to ₹1.5L/year under the old tax regime. Benefits: tax deduction + market-linked returns (historically 12–16%) + only 3-year lock-in (shortest among 80C options). After 3 years, LTCG tax is 12.5% (gains above ₹1.25L exempt). ELSS is the most tax-efficient 80C option. ₹1.5L in ELSS at 30% tax bracket saves ₹46,800 tax upfront, and if it grows to ₹2.5L in 3 years, only ₹87,500 gain (taxable at 12.5% if above ₹1.25L annual limit).",
  },
  {
    question: "What is NAV in mutual funds?",
    answer: "NAV (Net Asset Value) is the per-unit price of a mutual fund. NAV = (Total assets – Liabilities) ÷ Total units. Example: Fund with ₹100 crore assets, 1 crore units: NAV = ₹100/unit. When you invest ₹1L at NAV ₹100, you get 1,000 units. If NAV rises to ₹150, your investment is worth ₹1.5L. For lumpsum investment, the date of investment determines the NAV at which units are allotted. Investing when NAV is high doesn't mean it's overpriced — look at portfolio, not NAV, to judge value.",
  },
  {
    question: "What is the exit load in mutual funds?",
    answer: "Exit load is a fee charged when you redeem (sell) mutual fund units before a specified period. Typical exit loads: Most equity funds — 1% if redeemed within 1 year (0% after 1 year). ELSS — no redemption allowed before 3 years. Liquid funds — 7-day exit load schedule (nominal). Ultra short term — usually nil. Index funds — 0%–0.1% (check each fund). Strategy: For lumpsum equity investments, plan to hold at least 1 year to avoid exit load. For 5+ year investments, exit load is irrelevant.",
  },
  {
    question: "How is lumpsum mutual fund return taxed in India?",
    answer: "Lumpsum mutual fund taxation (FY 2025-26): Equity funds: STCG (held < 1 year) — 20%, LTCG (held > 1 year) — 12.5% on gains above ₹1.25L. Debt funds: all gains taxed at your slab rate (after 2023 Budget). International/FOF: taxed at slab rate. Gold ETF: LTCG (> 2 years) at 12.5%, else slab rate. Tax strategy: Stay invested in equity funds for 1+ year to get LTCG benefit. Use tax-loss harvesting at year-end. Each year, redeem and reinvest ₹1.25L in LTCG gains tax-free.",
  },
];

export default function LumpsumPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "Lumpsum Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["sip-calculator", "step-up-sip-calculator", "fd-calculator", "swp-calculator"]}
        content={<LumpsumContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <LumpsumCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function LumpsumContent() {
  return (
    <>
      <h2>What is a Lumpsum Investment Calculator?</h2>
      <p>
        A <strong>Lumpsum Calculator</strong> helps you estimate the future value of a one-time investment. Unlike SIP (where you invest every month), a lumpsum investment means committing a single large amount — like a year-end bonus, inheritance, FD maturity, or property sale proceeds — all at once. The formula used is compound interest: <strong>A = P × (1 + r/100)^n</strong>.
      </p>
      <p>
        Our calculator gives instant results as you adjust sliders — showing invested amount, estimated returns, total maturity value, animated growth chart, and year-by-year breakdown.
      </p>

      <h2>Lumpsum Investment Formula</h2>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        A = P × (1 + r ÷ 100)^n
      </div>
      <ul>
        <li><strong>A</strong> = Maturity Amount</li>
        <li><strong>P</strong> = Principal (one-time investment)</li>
        <li><strong>r</strong> = Expected annual return (%)</li>
        <li><strong>n</strong> = Investment period (years)</li>
      </ul>
      <p><strong>Example:</strong> ₹10L invested at 12% for 15 years: A = 10,00,000 × (1.12)^15 = 10,00,000 × 5.4736 = <strong>₹54.74L</strong>. Returns = ₹44.74L on ₹10L investment — a 5.47x growth.</p>

      <h2>Lumpsum Returns Reference Table (at 12% CAGR)</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Investment</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">15 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">20 Years</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹1 Lakh", "₹1.76L", "₹3.11L", "₹5.47L", "₹9.65L"],
              ["₹5 Lakh", "₹8.81L", "₹15.53L", "₹27.37L", "₹48.23L"],
              ["₹10 Lakh", "₹17.62L", "₹31.06L", "₹54.74L", "₹96.46L"],
              ["₹25 Lakh", "₹44.06L", "₹77.65L", "₹1.37Cr", "₹2.41Cr"],
              ["₹50 Lakh", "₹88.11L", "₹1.55Cr", "₹2.74Cr", "₹4.82Cr"],
              ["₹1 Crore", "₹1.76Cr", "₹3.11Cr", "₹5.47Cr", "₹9.65Cr"],
            ].map(([inv, y5, y10, y15, y20]) => (
              <tr key={inv} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{inv}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y5}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y10}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y15}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{y20}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lumpsum vs SIP — Which is Better?</h2>
      <p>
        <strong>Lumpsum:</strong> Invest your entire amount at once. Best when markets have corrected significantly or when you have a large windfall and a 10+ year horizon. Full amount benefits from compounding from day one.
      </p>
      <p>
        <strong>SIP:</strong> Invest fixed monthly amount. Best for salaried investors. Averages your purchase price through market ups and downs (rupee cost averaging). More accessible — start with ₹500/month.
      </p>
      <p><strong>Best of both:</strong> Use STP (Systematic Transfer Plan) — park lumpsum in liquid fund, transfer monthly to equity fund. Gets averaging benefit while keeping money invested.</p>

      <blockquote>
        <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Past performance does not guarantee future results. This lumpsum calculator is for educational and financial planning purposes only. Consult a SEBI-registered advisor before investing.
      </blockquote>
    </>
  );
}
