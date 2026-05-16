import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import RetirementCalculator from "@/components/retirement/RetirementCalculator";

const slug = "retirement-calculator";
const title = "Retirement Calculator — Free Online Retirement Savings Planner";
const description =
  "Free retirement calculator: Find out if you're on track for retirement. Enter your age, savings, monthly contributions, and expected return — see your projected corpus, whether it's sufficient, and estimated monthly income using the 4% rule. Multi-currency support.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "retirement calculator",
    "retirement savings calculator",
    "retirement planning calculator",
    "retirement calculator online free",
    "how much to save for retirement",
    "retirement corpus calculator",
    "401k retirement calculator",
    "retirement income calculator",
    "am I saving enough for retirement",
    "retirement fund calculator",
    "retirement calculator 2025",
    "pension calculator",
    "fire calculator",
    "early retirement calculator",
    "retirement withdrawal calculator",
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
    question: "How much money do I need to retire?",
    answer: "The most widely used rule is the 25x rule (based on the 4% safe withdrawal rate): multiply your expected annual retirement expenses by 25. Examples: Spend $3,000/month ($36,000/year) → need $900,000. Spend $5,000/month ($60,000/year) → need $1,500,000. Spend $8,000/month ($96,000/year) → need $2,400,000. These figures are in today's dollars — you'll need more due to inflation. Our calculator automatically adjusts for inflation to give you the future-dollar corpus target. The 4% rule is based on historical data showing a 4% annual withdrawal from a diversified portfolio has never depleted a portfolio over 30 years.",
  },
  {
    question: "What is the 4% rule for retirement?",
    answer: "The 4% rule (also called the Safe Withdrawal Rate) states that you can withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, and your money will last at least 30 years with high probability. Originated from the 1994 Trinity Study using US stock/bond data from 1926–1992. If you have $1,000,000 at retirement: Year 1 withdrawal = $40,000 (4%). At 3% inflation, year 2 = $41,200, year 3 = $42,436, etc. Success rate: historically ~95–98% over 30 years for a 60/40 stock/bond portfolio. For longer retirements (40+ years), consider using 3–3.5% to be safer.",
  },
  {
    question: "How much should I save per month for retirement?",
    answer: "General guidelines: Save 10–15% of gross income minimum (most financial advisors). If starting late (40s), aim for 20–25%. Specific targets by age with $1M retirement goal at 65, earning 8% annual return: Starting at 25: save $286/month. Starting at 30: save $436/month. Starting at 35: save $671/month. Starting at 40: save $1,052/month. Starting at 45: save $1,698/month. The cost of waiting is massive — starting at 40 instead of 25 requires 3.7x the monthly savings for the same result. Use our retirement calculator to find your exact required monthly savings based on your specific situation.",
  },
  {
    question: "What is the 25x rule for retirement?",
    answer: "The 25x rule says: to retire comfortably, you need 25 times your annual expenses saved. This is mathematically equivalent to the 4% rule (1 ÷ 4% = 25). Why 25x? If you have 25x expenses, withdrawing 4% annually gives you 1 year of expenses. With investment returns, the portfolio keeps replenishing. Examples: Annual expenses $40,000 → need $1,000,000. Annual expenses $60,000 → need $1,500,000. Annual expenses $80,000 → need $2,000,000. Important: use future-value expenses (adjusted for inflation). If you spend $3,000/month now, at 3% inflation, in 30 years you'll spend $7,281/month — so target 25 × ($7,281 × 12) = $2,184,300.",
  },
  {
    question: "What is a good return rate to use for retirement planning?",
    answer: "Conservative estimates by asset class: All stocks (S&P 500 historical): 10% nominal, 7% real (after inflation). 60% stocks / 40% bonds: 7–8% nominal, 4–5% real. Target-date retirement funds: 6–8% depending on years to retirement. Bonds only: 3–4% nominal. For retirement planning, most advisors recommend: Use 6–7% if you're 20–30 years from retirement. Use 5–6% if 10–20 years out. Use 4–5% if under 10 years (more conservative allocation). Always use real (inflation-adjusted) returns if your expenses are in today's dollars. Our calculator applies the return rate to your contributions and then inflation-adjusts the expense target separately.",
  },
  {
    question: "How does inflation affect retirement planning?",
    answer: "Inflation is the biggest threat to retirement security. At 3% annual inflation, $4,000/month today becomes: $5,376/month in 10 years. $7,224/month in 20 years. $9,709/month in 30 years. This means your retirement corpus target must be calculated in future dollars, not today's dollars. Example: You need $5,000/month in today's money. Retiring in 25 years at 3% inflation, you'll need $10,469/month. Annual expenses at retirement = $125,628. Retirement corpus needed = $125,628 × 25 = $3,140,700. Our retirement calculator automatically applies inflation to your monthly expense target so you get an accurate future corpus requirement.",
  },
  {
    question: "What is FIRE (Financial Independence, Retire Early)?",
    answer: "FIRE is a movement focused on aggressive saving and investing to retire far earlier than the traditional age 65. The math: FIRE number = annual expenses × 25 (4% rule). Common FIRE variants: Lean FIRE: Very frugal lifestyle, FIRE number $500K–$800K, annual expenses $20,000–$32,000. Regular FIRE: Moderate lifestyle, FIRE number $1M–$2M. Fat FIRE: Comfortable lifestyle, FIRE number $2M+, annual expenses $80,000+. Barista FIRE / Coast FIRE: Semi-retirement — enough saved to coast, working part-time for expenses. Typical FIRE savings rate: 50–70% of income. At a 70% savings rate, you can retire in ~8.5 years regardless of income. Our calculator works for FIRE — just set a younger retirement age (40–50) and higher monthly contributions.",
  },
  {
    question: "Should I use a 401(k), IRA, or taxable account for retirement?",
    answer: "Tax-advantaged accounts (US): 401(k): Contribute pre-tax, grows tax-deferred, taxed on withdrawal. 2025 limit: $23,500 (plus $7,500 catch-up over 50). Roth 401(k): After-tax contributions, tax-free growth and withdrawals. Traditional IRA: Pre-tax (if eligible), tax-deferred growth. 2025 limit: $7,000 ($8,000 over 50). Roth IRA: After-tax, tax-free growth. Best for most: 1. Contribute to 401(k) up to employer match (free money). 2. Max out Roth IRA ($7,000). 3. Max out remaining 401(k) space. 4. Taxable brokerage for additional savings. Roth accounts are generally better if you expect higher taxes in retirement. Our calculator does not model tax implications — consult a tax professional.",
  },
  {
    question: "How much will $500,000 generate in retirement?",
    answer: "Using the 4% rule, $500,000 generates: Annual income: $20,000/year ($1,667/month). At 3% inflation adjustment: Year 1: $20,000. Year 10: $26,878. Year 20: $36,122. $500,000 is generally not enough for a comfortable retirement in high-cost countries if it's your only source of income. However, combined with Social Security/pension: If Social Security covers $2,000/month, $500K adds $1,667/month = $3,667/month total — potentially sufficient in many locations. In lower-cost countries or with other income sources, $500K can be sufficient for basic FIRE. Use our calculator to model your complete picture including Social Security as a starting savings.",
  },
  {
    question: "What happens to my retirement savings if markets crash?",
    answer: "Market crashes are normal and historically temporary. Key facts: S&P 500 has recovered from every crash in history. Average bear market: -30%, lasts 9 months. Average bull market: +114%, lasts 2.7 years. Sequence of returns risk: A major crash in early retirement (when you're withdrawing) is most damaging. Mitigation strategies: Cash buffer: Keep 1–2 years of expenses in cash so you don't sell stocks during crashes. Bond allocation: Increase bonds as you approach retirement (reduces volatility). Flexible spending: Cut discretionary expenses 10–15% during downturns. The 4% rule already accounts for historical crashes — it's based on worst-case periods including the Great Depression.",
  },
  {
    question: "How do I catch up on retirement savings if I'm starting late?",
    answer: "Catch-up strategies for late starters: Maximize tax-advantaged accounts — use catch-up contributions ($7,500 extra in 401(k) for age 50+). Reduce expenses aggressively — every $500/month saved at 45 becomes ~$360,000 by 65 at 8%. Consider delaying retirement — each year you delay: adds 1 year of contributions, lets savings grow longer, reduces years of withdrawal. Work part-time in early retirement — reduces portfolio withdrawal rate dramatically. Downsize housing — can free up $200,000–$500,000 for investment. Move to lower cost of living area — reduces corpus needed by 30–50%. Increase income — side income, skill upgrade, higher-paying job. Don't panic — even starting at 50 with aggressive saving, reaching $500K–$800K by 65 is very achievable.",
  },
  {
    question: "What is a pension vs retirement savings account?",
    answer: "Pension (Defined Benefit): Employer guarantees a specific monthly income in retirement based on years of service and salary. You don't manage investments — employer bears the risk. Rare in private sector today, common in government jobs. Retirement savings account (Defined Contribution — 401k, IRA, NPS in India, SIPP in UK): You and/or employer contribute to an account. You choose investments. Final value depends on contributions and market returns. You bear investment risk. When planning with both: Treat pension as guaranteed monthly income (like Social Security). Subtract it from your monthly expense need, then use our calculator for the remaining gap to be funded by personal savings.",
  },
  {
    question: "How does this retirement calculator work?",
    answer: "Our retirement calculator uses these steps: 1. Future Value of Current Savings: FV = Current Savings × (1 + annual return)^years to retirement. 2. Future Value of Monthly Contributions: FV = PMT × [((1 + r)^n − 1) / r] × (1 + r), where r = monthly rate, n = months. 3. Total Corpus at Retirement = FV of savings + FV of contributions. 4. Target Corpus = Monthly Expenses × (1 + inflation)^years × 12 × 25 (25x rule / 4% SWR). 5. Safe Monthly Income = Total Corpus × 4% / 12. 6. Compare corpus to target to show if you're on track. All numbers are in future (nominal) dollars, not today's dollars.",
  },
];

export default function RetirementCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["compound-interest-calculator", "mortgage-calculator", "sip-calculator", "swp-calculator"]}
        content={<RetirementContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <RetirementCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function RetirementContent() {
  return (
    <>
      <h2>What is a Retirement Calculator?</h2>
      <p>
        A <strong>retirement calculator</strong> helps you determine whether your current savings rate is on track to meet your retirement goals. Enter your current age, retirement age, existing savings, monthly contributions, expected return, inflation rate, and desired monthly expenses — and instantly see your projected corpus, whether it&apos;s sufficient, and estimated monthly income.
      </p>
      <p>
        This calculator uses the <strong>25x rule</strong> (4% safe withdrawal rate) to calculate your target corpus and checks it against your projected savings. It supports 6 currencies and works for retirement planning in any country.
      </p>

      <h2>The 4% Rule & 25x Rule Explained</h2>
      <p>
        The <strong>4% rule</strong> is the cornerstone of retirement planning: withdraw 4% of your portfolio in year one, then adjust for inflation annually, and historically your money lasts 30+ years. This means you need <strong>25x your annual expenses</strong> saved at retirement.
      </p>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Expenses</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Annual</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Corpus Needed (25×)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Income (4%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["$2,000", "$24,000", "$600,000", "$2,000"],
              ["$3,000", "$36,000", "$900,000", "$3,000"],
              ["$5,000", "$60,000", "$1,500,000", "$5,000"],
              ["$8,000", "$96,000", "$2,400,000", "$8,000"],
              ["$12,000", "$144,000", "$3,600,000", "$12,000"],
            ].map(([mo, ann, corpus, income]) => (
              <tr key={mo} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{mo}/mo</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{ann}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{corpus}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400">{income}/mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">In today&apos;s dollars. Actual target will be higher due to inflation.</p>

      <h2>The Cost of Starting Late</h2>
      <p>
        To accumulate $1,000,000 by age 65 at 8% annual return — your required monthly contribution depending on when you start:
      </p>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Start Age</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Years to Invest</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Needed</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Invested</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["25", "40 yrs", "$286/mo", "$137,280"],
              ["30", "35 yrs", "$436/mo", "$183,120"],
              ["35", "30 yrs", "$671/mo", "$241,560"],
              ["40", "25 yrs", "$1,052/mo", "$315,600"],
              ["45", "20 yrs", "$1,698/mo", "$407,520"],
              ["50", "15 yrs", "$2,890/mo", "$520,200"],
            ].map(([age, yrs, mo, total]) => (
              <tr key={age} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{age}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{yrs}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{mo}</td>
                <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400">{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">8% annual return, starting from $0 savings. Starting at 25 vs 45 requires 6x lower monthly savings for the same result.</p>

      <blockquote>
        <strong>Disclaimer:</strong> This retirement calculator is for educational and financial planning purposes only. Results are projections based on assumed constant returns and inflation — actual investment returns vary year to year. The 4% rule is a guideline, not a guarantee. Does not account for taxes, Social Security, pension income, or healthcare costs. Consult a certified financial planner (CFP) or qualified financial advisor before making retirement decisions.
      </blockquote>
    </>
  );
}
