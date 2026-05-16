import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CompoundCalculator from "@/components/compound/CompoundCalculator";

const slug = "compound-interest-calculator";
const title = "Compound Interest Calculator — Free Online with Monthly Contributions";
const description =
  "Free compound interest calculator: Calculate final balance & interest earned on any investment. Supports daily, monthly, quarterly & annual compounding, monthly contributions, and 6 currencies (USD, EUR, GBP, INR, AUD, CAD). Instant results, no signup.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "compound interest calculator",
    "compound interest calculator online",
    "compound interest calculator free",
    "compound interest calculator with monthly contributions",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "quarterly compound interest calculator",
    "compound interest formula calculator",
    "compound interest calculator 2025",
    "how to calculate compound interest",
    "compound interest vs simple interest calculator",
    "investment compound interest calculator",
    "savings compound interest calculator",
    "compound interest calculator USD",
    "compound interest calculator UK",
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
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL_CONST}/og/${slug}.png`],
  },
};

const FAQS = [
  {
    question: "What is compound interest?",
    answer: "Compound interest is interest calculated on both the initial principal and all previously accumulated interest. Unlike simple interest (which is calculated only on the principal), compound interest grows exponentially over time. For example, $10,000 at 8% simple interest earns $800/year always. But at 8% compound interest, year 1 earns $800, year 2 earns $864, year 3 earns $933 — because each year's interest is added to the principal. Over 30 years: simple interest = $34,000 total vs compound interest = $100,627.",
  },
  {
    question: "What is the compound interest formula?",
    answer: "The compound interest formula is: A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual interest rate (decimal), n = compounding frequency per year, t = time in years. Example: $10,000 at 8% compounded monthly for 10 years: A = 10000 × (1 + 0.08/12)^(12×10) = 10000 × (1.00667)^120 = $22,196. With monthly contributions of $200: add PMT × [((1 + r/n)^(nt) − 1) / (r/n)] × (1 + r/n) = additional $36,833. Total = $59,029.",
  },
  {
    question: "How does compounding frequency affect returns?",
    answer: "$10,000 at 10% for 10 years with different compounding frequencies: Annually (n=1) = $25,937. Semi-annually (n=2) = $26,533. Quarterly (n=4) = $26,851. Monthly (n=12) = $27,070. Daily (n=365) = $27,179. The difference between annual and daily compounding is about 4.8% more wealth over 10 years. Over 30 years the difference becomes significant — daily compounding adds over $35,000 on a $10,000 investment at 10%. Most savings accounts and investments compound monthly or daily.",
  },
  {
    question: "What is the difference between simple interest and compound interest?",
    answer: "Simple interest: Interest = Principal × Rate × Time. Earned only on the original principal. Example: $1,000 at 5% for 5 years = $250 interest total. Compound interest: Interest earned each period is added to principal, so next period's interest is higher. Example: $1,000 at 5% compounded annually for 5 years = $276 interest total ($1,276). The difference grows dramatically with time — over 30 years, $10,000 at 8% simple = $34,000, compound = $100,627. Compound interest is 3x more powerful over long horizons.",
  },
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a quick mental math shortcut to estimate how long it takes for money to double with compound interest. Formula: Years to double = 72 ÷ Annual Interest Rate. Examples: At 6% → 72/6 = 12 years to double. At 8% → 72/8 = 9 years. At 10% → 72/10 = 7.2 years. At 12% → 72/12 = 6 years. At 4% → 72/4 = 18 years. Works in reverse too: if you need money to double in 8 years, you need a 72/8 = 9% annual return. The Rule of 72 is accurate to within 1% for interest rates between 1% and 20%.",
  },
  {
    question: "How much does $10,000 grow with compound interest?",
    answer: "$10,000 invested at 8% annual return compounded monthly: After 5 years = $14,898. After 10 years = $22,196. After 20 years = $49,268. After 30 years = $109,357. After 40 years = $242,734. With an additional $200/month contribution: After 10 years = $58,902. After 20 years = $177,582. After 30 years = $436,025. The monthly contribution nearly doubles the final amount at 20 years and quadruples it at 30 years — showing how consistent contributions amplify compound growth.",
  },
  {
    question: "How do monthly contributions affect compound interest?",
    answer: "Monthly contributions (also called regular deposits or recurring investments) dramatically amplify compound interest returns. Each contribution starts earning compound interest from the moment it's deposited. Example at 8% compounded monthly for 20 years: Principal only ($10,000): $49,268. With $100/month extra: $108,929. With $200/month extra: $168,591. With $500/month extra: $347,576. The math: your monthly contributions themselves earn compound interest, and over 20 years each $100/month deposit collectively adds ~$59,000 to your final amount. This is why starting a retirement account early matters.",
  },
  {
    question: "What is a good interest rate for compound interest calculations?",
    answer: "Benchmark rates to use in your compound interest calculator: High-yield savings accounts (US): 4.5–5.5% (2025 rates). Certificates of Deposit (CD): 4.5–5.5%. S&P 500 historical average: ~10% annually (7% inflation-adjusted). Total stock market index funds: ~9–10% long-term average. Bonds/fixed income: 3–5%. Real estate (appreciation only): 3–5%. For retirement planning, most financial advisors recommend using 6–7% real return (after inflation) for stock market investments to be conservative.",
  },
  {
    question: "How does compound interest work on savings accounts?",
    answer: "Most savings accounts compound interest daily and credit it monthly. The bank calculates interest on your balance every day (daily rate = APY/365) and adds it to your account monthly. High-yield savings account example ($10,000 at 5% APY): Year 1 interest = $511.62 (slightly more than 5% due to daily compounding). After 5 years = $12,834 total. After 10 years = $16,470. Key metric to compare accounts: APY (Annual Percentage Yield) — this already accounts for compounding frequency, making it a fair comparison across accounts. An account offering 5% APR compounded daily has an APY of 5.127%.",
  },
  {
    question: "What is APY vs APR in compound interest?",
    answer: "APR (Annual Percentage Rate) is the stated interest rate without accounting for compounding. APY (Annual Percentage Yield) is the effective rate after compounding. Formula: APY = (1 + APR/n)^n − 1. Examples: 5% APR compounded annually → APY = 5.00%. 5% APR compounded monthly → APY = 5.116%. 5% APR compounded daily → APY = 5.127%. When comparing savings accounts, CDs, or investments — always compare APY, not APR. A bank advertising 4.8% APY compounded daily is better than one offering 5% APR compounded annually.",
  },
  {
    question: "How does starting early affect compound interest?",
    answer: "Starting early is the single most powerful factor in compound interest wealth building. Person A invests $200/month from age 25 to 65 (40 years) at 8%: Total invested = $96,000. Final value = $702,856. Person B invests $200/month from age 35 to 65 (30 years) at 8%: Total invested = $72,000. Final value = $298,072. Person A has 2.36x more money by starting just 10 years earlier, investing only $24,000 more. Person C invests $200/month from age 45 to 65 (20 years): Final value = $117,804. This shows that the first decade of compounding is worth more than the last three decades combined.",
  },
  {
    question: "How does inflation affect compound interest returns?",
    answer: "Inflation erodes the real value of your compound interest returns. To find your real (inflation-adjusted) return: Real Return ≈ Nominal Return − Inflation Rate. At 8% nominal return with 3% inflation → ~5% real return. Your $10,000 at 8% becomes $100,627 in 30 years nominally. But in today's purchasing power (3% inflation): real value = $100,627 / (1.03^30) = $41,438. This is why investment returns need to beat inflation to build real wealth. A 4% savings account when inflation is 3% gives only 1% real return. Stocks historically return 10% nominal / 7% real after inflation.",
  },
  {
    question: "What is the compound annual growth rate (CAGR)?",
    answer: "CAGR (Compound Annual Growth Rate) is the rate at which an investment grows from its initial to final value, assuming it grows at a steady rate compounded annually. Formula: CAGR = (Final Value / Initial Value)^(1/n) − 1, where n = number of years. Example: Investment grows from $10,000 to $25,937 in 10 years. CAGR = (25,937/10,000)^(1/10) − 1 = 10%. CAGR is useful for comparing investment performance — it smooths out volatility and gives a single representative growth rate. Use our compound interest calculator by setting compounding to 'Annually' to work backwards from a CAGR.",
  },
  {
    question: "Is compound interest better than simple interest for long-term investing?",
    answer: "For any investment horizon beyond 2–3 years, compound interest is dramatically superior to simple interest. Comparison at 8% over different periods (starting with $10,000): 5 years: Simple = $14,000 vs Compound = $14,898 (+6.4%). 10 years: Simple = $18,000 vs Compound = $22,196 (+23.3%). 20 years: Simple = $26,000 vs Compound = $49,268 (+89.5%). 30 years: Simple = $34,000 vs Compound = $100,627 (+196%). 40 years: Simple = $42,000 vs Compound = $222,834 (+431%). Compound interest is the foundation of every long-term investment strategy — from index funds to retirement accounts to real estate leverage.",
  },
];

export default function CompoundInterestPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["sip-calculator", "fd-calculator", "lumpsum-calculator", "rd-calculator"]}
        content={<CompoundContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <CompoundCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function CompoundContent() {
  return (
    <>
      <h2>What is a Compound Interest Calculator?</h2>
      <p>
        A <strong>compound interest calculator</strong> helps you estimate how an investment grows when interest is earned not just on your principal, but also on accumulated interest over time. This snowball effect — where interest earns interest — is what Albert Einstein reportedly called the &quot;eighth wonder of the world.&quot;
      </p>
      <p>
        Our free compound interest calculator supports 6 currencies (USD, EUR, GBP, INR, AUD, CAD), 5 compounding frequencies (daily through annual), and optional monthly contributions — making it a complete tool for investors worldwide.
      </p>

      <h2>Compound Interest Formula</h2>
      <p>The standard compound interest formula:</p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        A = P × (1 + r/n)^(n×t)
      </div>
      <ul>
        <li><strong>A</strong> = Final amount (principal + interest)</li>
        <li><strong>P</strong> = Principal (initial investment)</li>
        <li><strong>r</strong> = Annual interest rate (decimal form, e.g. 8% = 0.08)</li>
        <li><strong>n</strong> = Compounding frequency per year (12 for monthly, 365 for daily)</li>
        <li><strong>t</strong> = Time in years</li>
      </ul>
      <p>
        <strong>Example:</strong> $10,000 at 8% compounded monthly for 10 years: A = 10,000 × (1 + 0.08/12)^(12×10) = <strong>$22,196</strong>. You invest $10,000 and earn $12,196 in interest alone.
      </p>

      <h2>Simple Interest vs Compound Interest</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Simple (8%)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Compound (8%)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["5 yrs", "$14,000", "$14,898", "+$898"],
              ["10 yrs", "$18,000", "$22,196", "+$4,196"],
              ["20 yrs", "$26,000", "$49,268", "+$23,268"],
              ["30 yrs", "$34,000", "$100,627", "+$66,627"],
              ["40 yrs", "$42,000", "$222,834", "+$180,834"],
            ].map(([yr, simple, compound, diff]) => (
              <tr key={yr} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{yr}</td>
                <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400">{simple}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{compound}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Starting principal: $10,000 at 8% annual rate. Compound = monthly compounding.</p>

      <h2>How Compounding Frequency Impacts Growth</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Frequency</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Value after 10 yrs</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Value after 30 yrs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["Annually (n=1)", "$21,589", "$85,994"],
              ["Semi-annually (n=2)", "$21,911", "$91,610"],
              ["Quarterly (n=4)", "$22,080", "$94,646"],
              ["Monthly (n=12)", "$22,196", "$96,885"],
              ["Daily (n=365)", "$22,254", "$98,020"],
            ].map(([freq, y10, y30]) => (
              <tr key={freq} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{freq}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y10}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{y30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">$10,000 at 8% annual rate. More frequent compounding = more interest earned.</p>

      <h2>The Power of Early Investing</h2>
      <p>
        The most powerful variable in compound interest is <strong>time</strong>. Someone who invests $200/month from age 25 earns <em>more than twice</em> the retirement wealth of someone who starts at 35 — despite only investing $24,000 more. The first decade of compounding does more work than the last three decades combined.
      </p>

      <blockquote>
        <strong>Disclaimer:</strong> This compound interest calculator is for educational and financial planning purposes only. Results are estimates based on fixed interest rates and do not account for taxes, inflation, fees, or investment risk. Past performance does not guarantee future results. Consult a qualified financial advisor before making investment decisions.
      </blockquote>
    </>
  );
}
