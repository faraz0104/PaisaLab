import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MortgageCalculator from "@/components/mortgage/MortgageCalculator";

const slug = "mortgage-calculator";
const title = "Mortgage Calculator — Free Online Monthly Payment Calculator";
const description =
  "Free mortgage calculator: Calculate monthly payment, total interest, and full amortization schedule for any home loan. Supports USD, EUR, GBP, INR, AUD, CAD. Adjust home price, down payment, rate, and term — instant results, no signup.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "mortgage calculator",
    "mortgage calculator online",
    "mortgage payment calculator",
    "home loan calculator",
    "monthly mortgage payment calculator",
    "mortgage amortization calculator",
    "mortgage calculator free",
    "mortgage calculator 2025",
    "how much mortgage can I afford",
    "mortgage interest calculator",
    "house payment calculator",
    "home loan payment calculator",
    "mortgage calculator with down payment",
    "30 year mortgage calculator",
    "15 year mortgage calculator",
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
    question: "What is a mortgage calculator?",
    answer: "A mortgage calculator estimates your monthly home loan payment based on home price, down payment, interest rate, and loan term. It uses the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P = loan amount, r = monthly rate, n = total months. It also shows total interest paid over the life of the loan and a year-by-year amortization schedule showing how each payment is split between principal and interest.",
  },
  {
    question: "How is a mortgage payment calculated?",
    answer: "Monthly mortgage payment formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]. Where P = Principal (home price minus down payment), r = Monthly interest rate = Annual rate ÷ 12 ÷ 100, n = Total payments = Years × 12. Example: $300,000 loan at 7% for 30 years → r = 0.07/12 = 0.005833, n = 360. M = 300,000 × [0.005833 × (1.005833)^360] / [(1.005833)^360 − 1] = $1,996/month. Total paid = $1,996 × 360 = $718,560. Total interest = $418,560.",
  },
  {
    question: "How much down payment do I need for a mortgage?",
    answer: "Down payment requirements by loan type: Conventional loan — minimum 3–5% down. To avoid PMI (private mortgage insurance), put at least 20% down. FHA loan (US) — minimum 3.5% down with 580+ credit score. VA loan (US veterans) — 0% down payment. Jumbo loan — typically 10–20% down. In the UK: standard mortgages require 5–10% deposit. First-time buyer schemes may allow lower deposits. Larger down payments mean lower monthly payments, lower total interest, and no PMI requirement. On a $400,000 home, each 5% more down payment saves roughly $150/month in payments.",
  },
  {
    question: "What is the 28/36 rule for mortgage affordability?",
    answer: "The 28/36 rule is a widely used guideline: Spend no more than 28% of gross monthly income on housing costs (mortgage + property tax + insurance). Spend no more than 36% of gross income on total debt (housing + car loans + student loans + credit cards). Example: $80,000/year salary = $6,667/month gross income. 28% rule: max mortgage payment = $1,867/month. 36% rule: max total debt = $2,400/month. At 7% for 30 years, $1,867/month supports about a $280,000 loan. Many lenders use 43% DTI (debt-to-income) as the maximum qualification threshold.",
  },
  {
    question: "What is mortgage amortization?",
    answer: "Mortgage amortization is the process of paying off a loan through scheduled, regular payments over time. In early years, most of your payment goes to interest. Over time, the proportion shifts to principal. Example: $300,000 at 7% for 30 years ($1,996/month). Year 1: $20,881 interest / $3,071 principal. Year 10: $18,640 interest / $5,312 principal. Year 20: $14,073 interest / $9,879 principal. Year 30 (final): $2,243 interest / $21,709 principal. This front-loading of interest is why extra early payments dramatically reduce total interest paid.",
  },
  {
    question: "How does a 15-year vs 30-year mortgage compare?",
    answer: "Comparison on a $300,000 loan at 7% (30yr) vs 6.5% (15yr, lower rate typical): 30-year: Monthly payment = $1,996. Total interest = $418,560. 15-year: Monthly payment = $2,613 (+$617/mo). Total interest = $170,340. Savings = $248,220 in interest! The 15-year saves 59% in interest. Trade-off: higher monthly payment ($617 more) requires stronger income and cash flow. Many financial advisors recommend the 30-year with voluntary extra payments — you get 30-year payment flexibility but can pay it off in 20 years by adding $200–300/month extra.",
  },
  {
    question: "How much does a 1% difference in interest rate affect mortgage payments?",
    answer: "A 1% rate difference significantly impacts your payment and total cost. On a $300,000 30-year mortgage: At 6%: $1,799/month. Total interest = $347,515. At 7%: $1,996/month (+$197/mo). Total interest = $418,560 (+$71,045). At 8%: $2,201/month (+$402/mo). Total interest = $492,311 (+$144,796). Each 0.25% rate increase costs approximately $45–50/month and $16,000–18,000 over 30 years on a $300,000 loan. This is why shopping for the best mortgage rate can save you tens of thousands of dollars.",
  },
  {
    question: "What is PMI (Private Mortgage Insurance)?",
    answer: "PMI is insurance that protects the lender if you default, required when your down payment is less than 20%. PMI cost: typically 0.5–1.5% of loan amount per year. On a $300,000 loan at 1%: $3,000/year = $250/month extra. PMI automatically cancels when your equity reaches 20% (Homeowners Protection Act in the US). You can also request cancellation at 20% equity — or refinance. To avoid PMI entirely: put 20% down ($60,000 on a $300,000 home) or use a piggyback loan (80/10/10 structure). The 20% down payment threshold exists specifically to eliminate PMI.",
  },
  {
    question: "Should I make extra mortgage payments?",
    answer: "Extra mortgage payments can dramatically reduce interest paid and years remaining. On $300,000 at 7% for 30 years ($1,996/month): Extra $100/month → pay off 4 years early, save $44,000 interest. Extra $200/month → pay off 6 years early, save $77,000 interest. Extra $500/month → pay off 11 years early, save $153,000 interest. The earlier you make extra payments, the more you save. Always verify your mortgage has no prepayment penalty. Alternatively, consider investing the extra money if your investment return exceeds your mortgage interest rate (especially relevant when mortgage rates are below 5%).",
  },
  {
    question: "What is a fixed-rate vs adjustable-rate mortgage (ARM)?",
    answer: "Fixed-rate mortgage: Interest rate stays the same for the entire loan term. Predictable monthly payments. Best when rates are low and you plan to stay long-term. Common terms: 15, 20, 30 years. Adjustable-rate mortgage (ARM): Rate fixed for initial period (3, 5, 7, or 10 years), then adjusts annually based on a benchmark (SOFR in US). Example 5/1 ARM: fixed 5 years, adjusts every year after. ARMs typically start 0.5–1.5% lower than fixed rates. Best for: buyers who plan to sell within 5–7 years, or when rates are high and expected to fall. Risk: if rates rise significantly, ARM payments can spike substantially.",
  },
  {
    question: "How do I calculate how much mortgage I can afford?",
    answer: "Step-by-step mortgage affordability calculation: 1. Find your gross monthly income. 2. Apply 28% rule: max monthly payment = income × 0.28. 3. Factor in property tax (~1.2% of home value annually = ÷12 monthly) and homeowner's insurance (~$150/month). 4. Subtract tax and insurance from max payment to find max P&I (principal + interest). 5. Use mortgage formula to find loan amount. Example: $7,000/month income → $1,960 max payment. Minus $400 tax + insurance = $1,560 for P&I. At 7% for 30 years: $1,560 supports ~$234,000 loan. Add 20% down payment to get max home price.",
  },
  {
    question: "What mortgage costs are not included in this calculator?",
    answer: "This mortgage calculator shows principal and interest only. Additional homeownership costs to budget for: Property taxes: typically 0.5–2.5% of home value/year (varies by location). Homeowner's insurance: $1,200–$3,000/year for most homes. HOA fees: $100–$1,000+/month for condos or planned communities. PMI: $50–$300/month if down payment < 20%. Maintenance: budget 1–2% of home value/year. Closing costs: 2–5% of loan amount (paid once at purchase). Utilities: significantly higher for owned vs rented homes. Total true cost of homeownership is typically 30–50% more than just the mortgage payment.",
  },
  {
    question: "What is a good mortgage interest rate in 2025?",
    answer: "Mortgage rates vary by country and loan type. US average rates (2025): 30-year fixed: 6.5–7.5%. 15-year fixed: 6.0–7.0%. 5/1 ARM: 5.5–6.5%. UK (2025): 2-year fixed: 4.5–5.5%. 5-year fixed: 4.2–5.2%. Canada (2025): 5-year fixed: 4.5–5.5%. Australia (2025): Variable rate: 6.0–7.0%. Fixed 3-year: 5.5–6.5%. India home loan rates (2025): SBI: 8.5–9.15%, HDFC: 8.7–9.45%, ICICI: 8.75–9.60%. Rates depend on your credit score, loan-to-value ratio, loan type, and lender. Always shop multiple lenders — even a 0.25% difference saves thousands.",
  },
];

export default function MortgageCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["compound-interest-calculator", "retirement-calculator", "emi-calculator", "home-loan-emi-calculator"]}
        content={<MortgageContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <MortgageCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function MortgageContent() {
  return (
    <>
      <h2>What is a Mortgage Calculator?</h2>
      <p>
        A <strong>mortgage calculator</strong> helps you estimate your monthly home loan payment, total interest over the life of the loan, and full amortization schedule. Enter your home price, down payment, interest rate, and loan term — and instantly see exactly what you&apos;ll pay each month.
      </p>
      <p>
        This calculator supports 6 currencies (USD, EUR, GBP, INR, AUD, CAD) and works for any type of fixed-rate mortgage or home loan worldwide.
      </p>

      <h2>Mortgage Payment Formula</h2>
      <p>Monthly mortgage payment is calculated using the standard amortization formula:</p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        M = P × [r(1+r)^n] / [(1+r)^n − 1]
      </div>
      <ul>
        <li><strong>M</strong> = Monthly payment</li>
        <li><strong>P</strong> = Principal loan amount (home price − down payment)</li>
        <li><strong>r</strong> = Monthly interest rate = Annual rate ÷ 12 ÷ 100</li>
        <li><strong>n</strong> = Total payments = Years × 12</li>
      </ul>

      <h2>Mortgage Payment Reference Table</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Loan Amount</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">6% / 30yr</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">7% / 30yr</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">7% / 15yr</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">8% / 30yr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["$150,000", "$899", "$998", "$1,348", "$1,101"],
              ["$200,000", "$1,199", "$1,331", "$1,797", "$1,468"],
              ["$300,000", "$1,799", "$1,996", "$2,696", "$2,201"],
              ["$400,000", "$2,398", "$2,661", "$3,595", "$2,935"],
              ["$500,000", "$2,997", "$3,327", "$4,494", "$3,668"],
            ].map(([loan, r6, r7_30, r7_15, r8]) => (
              <tr key={loan} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{loan}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r6}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{r7_30}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r7_15}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r8}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Monthly principal + interest payment only. Does not include property tax, insurance, or PMI.</p>

      <h2>15-Year vs 30-Year Mortgage</h2>
      <p>
        The 30-year mortgage has lower monthly payments but costs significantly more in total interest. The 15-year saves roughly 50–60% in interest but requires higher monthly payments. A popular strategy is taking a 30-year mortgage but making extra payments voluntarily — giving you lower required payments with the option to pay off faster.
      </p>

      <blockquote>
        <strong>Disclaimer:</strong> This mortgage calculator is for educational and financial planning purposes only. Results show principal and interest only — they do not include property taxes, homeowner&apos;s insurance, PMI, HOA fees, or closing costs. Consult a licensed mortgage professional or financial advisor before making any home buying decision.
      </blockquote>
    </>
  );
}
