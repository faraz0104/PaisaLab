import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("home-loan-emi-calculator");

const slug = "home-loan-emi-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a home loan EMI calculator?",
    answer: "A home loan EMI calculator is a free online tool that computes your monthly housing loan repayment amount. Enter the loan amount, interest rate, and tenure to instantly see your EMI, total interest payable, and year-wise amortization schedule. You can also test prepayment scenarios to see how much interest and years you save.",
  },
  {
    question: "What is the current home loan interest rate in India 2025?",
    answer: "Home loan interest rates in India as of 2025: SBI 8.50%–9.15%, HDFC Bank 8.75%–9.40%, ICICI Bank 8.75%–9.60%, Axis Bank 8.75%–9.15%, Kotak Mahindra 8.75%–9.35%, Bank of Baroda 8.40%–10.65%. Rates depend on loan amount, tenure, CIBIL score, and income. Floating rates linked to RLLR (Repo Linked Lending Rate) change with RBI rate decisions.",
  },
  {
    question: "How much home loan can I get on my salary?",
    answer: "Banks typically sanction home loans where EMI ≤ 40–50% of monthly take-home salary. Approximate eligibility: ₹30,000/month salary → ₹15–20L loan, ₹50,000/month → ₹25–35L, ₹75,000/month → ₹40–50L, ₹1L/month → ₹55–70L, ₹2L/month → ₹1.2–1.5Cr. Co-applicant income can be clubbed to increase eligibility. Most banks offer up to 75–90% of property value (LTV ratio).",
  },
  {
    question: "What CIBIL score is needed for a home loan?",
    answer: "Minimum CIBIL score for home loan: 650 (some NBFCs), 700 (most banks at higher rates), 750+ (best rates from all major banks). A 750+ CIBIL score gets you the lowest rate — 0.5–1% lower than a 700 score. On a ₹50L home loan for 20 years, 0.75% lower rate saves ₹1,600/month in EMI = ₹3.84L over the loan tenure. Check CIBIL score at cibil.com once a year free.",
  },
  {
    question: "Is it better to prepay a home loan or invest?",
    answer: "Compare home loan rate vs expected investment return. If home loan rate is 9% and FD rate is 7% — prepay the loan. If home loan rate is 8.5% and equity SIP returns 12% — invest the difference. A middle path: prepay up to the Section 24(b) limit (₹2L interest deduction used up) and invest the rest. Also consider: loan prepayment is risk-free, investment returns are uncertain.",
  },
  {
    question: "What are home loan tax benefits in India?",
    answer: "Home loan tax benefits (old regime): Section 24(b) — deduction on interest up to ₹2L/year for self-occupied property, Section 80C — principal repayment up to ₹1.5L within 80C limit, Section 80EEA — additional ₹1.5L interest deduction for first-time buyers (stamp duty ≤ ₹45L, loan sanctioned before 31-Mar-2022). Note: New tax regime does not allow Section 80C or 24(b) deductions except employer NPS contribution.",
  },
  {
    question: "Should I choose a shorter or longer home loan tenure?",
    answer: "Shorter tenure (15 years vs 20 years): Higher EMI but saves lakhs in interest. Longer tenure (25–30 years): Lower EMI but pays significantly more interest. Example: ₹50L at 9% — 15 years EMI = ₹50,713, total interest = ₹41.3L. 20 years EMI = ₹44,986, total interest = ₹57.97L. 30 years EMI = ₹40,230, total interest = ₹94.8L. Rule: Choose tenure where EMI ≤ 40% of income, then prepay to reduce it faster.",
  },
  {
    question: "What is the down payment for a home loan?",
    answer: "RBI mandates minimum down payment (LTV ratio): Loans up to ₹30L — bank can fund up to 90% (10% down), ₹30L–75L — bank funds up to 80% (20% down), above ₹75L — bank funds up to 75% (25% down). Higher down payment = lower principal = lower EMI and less total interest. On a ₹1Cr property, paying 30% down (₹30L) instead of 20% (₹20L) saves ₹8,400/month in EMI.",
  },
  {
    question: "What is PMAY (Pradhan Mantri Awas Yojana) subsidy?",
    answer: "PMAY-Urban Credit Linked Subsidy Scheme (CLSS): EWS/LIG (income ≤ ₹6L/year) — 6.5% interest subsidy on loan up to ₹6L (NPV: ₹2.67L), MIG-I (income ₹6L–12L) — 4% subsidy on ₹9L (NPV: ₹2.35L), MIG-II (income ₹12L–18L) — 3% subsidy on ₹12L (NPV: ₹2.3L). Subsidy is credited upfront to reduce outstanding principal. First-time homebuyers only. Check eligibility at pmaymis.gov.in.",
  },
  {
    question: "What is a home loan balance transfer?",
    answer: "Home loan balance transfer (HLBT) moves your outstanding loan to another lender at a lower interest rate. When it makes sense: existing rate is 0.5%+ higher than current best rates, remaining tenure is at least 5+ years, processing fee at new lender < interest savings. Example: ₹40L outstanding, 9.5% → 8.75%, 15 years remaining. Monthly saving: ₹1,800. Processing fee: ₹15,000. Break-even: 8 months. Net 15-year saving: ₹3.09L.",
  },
  {
    question: "How does prepayment affect home loan tenure?",
    answer: "Prepayment reduces your outstanding principal directly. On floating rate home loans, banks must apply prepayment towards reducing principal (RBI mandate). No prepayment penalty on floating rate loans (RBI regulation). Example: ₹40L home loan, 9%, 20 years remaining, EMI ₹35,989. Prepay ₹2L in year 5 — saves ~₹3.8L in interest and reduces tenure by ~2 years. Use our prepayment calculator above to see exact savings.",
  },
  {
    question: "What is the difference between repo rate and home loan rate?",
    answer: "RBI's Repo Rate is the rate at which RBI lends to banks. Banks add a spread to the Repo Rate to arrive at home loan rates. Since October 2019, all new floating rate home loans must be linked to an external benchmark like Repo Rate. When RBI cuts repo rate by 0.25%, banks must pass it on to existing floating rate home loan customers within 3 months. Fixed rate loans don't change with repo rate.",
  },
  {
    question: "Can I get a home loan with an existing personal loan?",
    answer: "Yes, you can have a home loan with an existing personal loan, but it affects eligibility. Banks calculate your FOIR (Fixed Obligation to Income Ratio) — total EMIs ÷ monthly income. Should stay below 40–50%. Example: ₹80K salary, personal loan EMI ₹10K (12.5% FOIR), remaining capacity for home loan EMI: ₹22K–30K. This limits home loan eligibility. Closing the personal loan before applying improves your home loan eligibility significantly.",
  },
  {
    question: "What is a joint home loan?",
    answer: "Joint home loan has two or more co-borrowers (typically spouses, parents, or children). Benefits: Higher loan eligibility (combined income), both get tax benefits (each can claim ₹2L interest + ₹1.5L principal deduction), women co-borrowers often get 0.05% rate concession. Requirement: all co-borrowers must be co-owners of the property. Co-borrower's credit score also matters — a lower score can affect the loan terms.",
  },
  {
    question: "How many years does it take to repay a home loan?",
    answer: "Standard home loan tenure is 10–30 years. Most borrowers in India choose 15–20 years. With regular prepayments, you can close a 20-year loan in 13–15 years. The 'debt-free date' depends on your prepayment capacity. Tip: Any annual bonus, increment, or windfall should go towards prepayment in the first 10 years — when the interest component of EMI is highest and every prepayment saves maximum interest.",
  },
];

export default function HomeLoanEMIPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "Home Loan EMI Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["emi-calculator", "car-loan-emi-calculator", "personal-loan-emi-calculator", "sip-calculator"]}
        content={<HomeLoanContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <EMICalculator loanType="home" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function HomeLoanContent() {
  return (
    <>
      <h2>What is a Home Loan EMI Calculator?</h2>
      <p>
        A <strong>Home Loan EMI Calculator</strong> is a free online tool that computes your exact monthly housing loan repayment (EMI) based on the loan amount, interest rate, and tenure. Our calculator also lets you test prepayment scenarios — see precisely how much interest you save and how many years you shave off your loan by making extra payments.
      </p>
      <p>
        Whether you&apos;re evaluating SBI, HDFC, ICICI, Axis, or any other bank&apos;s home loan offer, this tool helps you compare the true cost and choose the best option for your financial situation.
      </p>

      <h2>How to Use the Home Loan EMI Calculator</h2>
      <ol>
        <li><strong>Loan Amount:</strong> Enter the home loan amount (not the property price). Typically 75–90% of property value.</li>
        <li><strong>Interest Rate (%):</strong> Enter the annual interest rate offered by your bank. See the comparison table below.</li>
        <li><strong>Loan Tenure (Years):</strong> How many years you plan to repay. Most banks allow up to 30 years.</li>
        <li><strong>Prepayment (Optional):</strong> Enter any extra lump-sum payment to see interest savings.</li>
      </ol>

      <h2>Home Loan EMI — Quick Reference Table</h2>
      <p>Monthly EMI for different loan amounts at 9% annual interest rate:</p>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Loan Amount</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">15 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">20 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">25 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">30 Years</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹20 Lakh", "₹25,335", "₹20,285", "₹17,995", "₹16,790", "₹16,092"],
              ["₹30 Lakh", "₹38,002", "₹30,428", "₹26,993", "₹25,185", "₹24,139"],
              ["₹50 Lakh", "₹63,337", "₹50,713", "₹44,986", "₹41,974", "₹40,230"],
              ["₹75 Lakh", "₹95,006", "₹76,070", "₹67,479", "₹62,961", "₹60,345"],
              ["₹1 Crore", "₹1,26,676", "₹1,01,427", "₹89,973", "₹83,948", "₹80,460"],
            ].map(([amt, y10, y15, y20, y25, y30]) => (
              <tr key={amt} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{amt}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y10}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y15}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y20}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y25}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{y30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Home Loan Tax Benefits (Old Regime)</h2>
      <ul>
        <li><strong>Section 24(b):</strong> Interest deduction up to ₹2 lakh/year for self-occupied property</li>
        <li><strong>Section 80C:</strong> Principal repayment up to ₹1.5 lakh/year (within 80C limit)</li>
        <li><strong>Section 80EEA:</strong> Extra ₹1.5L deduction for first-time buyers (stamp duty ≤ ₹45L)</li>
        <li><strong>Joint loan:</strong> Both co-borrowers can independently claim all above deductions</li>
      </ul>

      <h2>Bank Home Loan Interest Rates 2025</h2>
      <ul>
        <li><strong>SBI:</strong> 8.50%–9.15% (lowest for government salary holders)</li>
        <li><strong>HDFC Bank:</strong> 8.75%–9.40%</li>
        <li><strong>ICICI Bank:</strong> 8.75%–9.60%</li>
        <li><strong>Axis Bank:</strong> 8.75%–9.15%</li>
        <li><strong>Kotak Mahindra:</strong> 8.75%–9.35%</li>
        <li><strong>Bank of Baroda:</strong> 8.40%–10.65%</li>
        <li><strong>LIC Housing Finance:</strong> 8.50%–10.75%</li>
      </ul>

      <blockquote>
        <strong>Disclaimer:</strong> Interest rates are indicative and change frequently. This home loan EMI calculator is for financial planning purposes only. Consult your bank or a SEBI-registered financial advisor before making borrowing decisions.
      </blockquote>
    </>
  );
}
