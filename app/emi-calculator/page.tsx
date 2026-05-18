import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("emi-calculator");

const slug = "emi-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is an EMI calculator?",
    answer: "An EMI calculator is a free online tool that instantly computes your Equated Monthly Installment for any loan — home, car, personal, or education. Enter the loan amount, interest rate, and tenure to see your monthly EMI, total interest payable, total amount payable, and a month-by-month amortization schedule.",
  },
  {
    question: "How is EMI calculated?",
    answer: "EMI is calculated using the formula: EMI = P × r × (1+r)^n / [(1+r)^n – 1], where P = Principal loan amount, r = Monthly interest rate (annual rate ÷ 12 ÷ 100), n = Loan tenure in months. For example, ₹10L loan at 10% for 5 years: r = 0.00833, n = 60. EMI = 10,00,000 × 0.00833 × (1.00833)^60 / [(1.00833)^60 – 1] = ₹21,247/month.",
  },
  {
    question: "What is the EMI for ₹1 lakh loan?",
    answer: "EMI per ₹1 lakh depends on interest rate and tenure. At 10% interest: 1 year = ₹8,792/month, 3 years = ₹3,227/month, 5 years = ₹2,125/month, 10 years = ₹1,322/month. At 12% interest: 1 year = ₹8,885, 3 years = ₹3,321, 5 years = ₹2,224, 10 years = ₹1,435. Lower EMI = longer tenure = more total interest paid.",
  },
  {
    question: "How can I reduce my EMI?",
    answer: "5 ways to reduce EMI: (1) Make a larger down payment to reduce the principal. (2) Improve your CIBIL score above 750 to negotiate lower interest rates. (3) Choose a longer tenure — caution: this increases total interest paid. (4) Balance transfer to a lower-rate lender. (5) Make periodic prepayments to reduce outstanding principal and get EMI revised down.",
  },
  {
    question: "What is amortization?",
    answer: "Amortization is the process of paying off a loan through fixed EMIs over time. In early EMIs, the interest component is higher and the principal component is lower. As the loan progresses, the interest portion decreases and principal repayment increases. Our calculator shows the exact year-wise amortization schedule showing how each year's EMI is split between principal and interest.",
  },
  {
    question: "What is the difference between EMI and equated monthly installment?",
    answer: "EMI stands for Equated Monthly Installment — they are the same thing. EMI is the fixed monthly payment made to a lender (bank or NBFC) to repay a loan. It is 'equated' because the payment amount stays the same every month, even though the split between principal and interest changes each month.",
  },
  {
    question: "Does prepayment reduce EMI or tenure?",
    answer: "Prepayment can reduce either EMI (keeping tenure same) or reduce tenure (keeping EMI same). Most financial experts recommend reducing tenure — it saves more on total interest. Example: ₹30L home loan at 9% for 20 years. A ₹2L prepayment after 2 years reduces tenure by ~2.5 years, saving ₹4.8L in interest. Reducing EMI instead saves only ₹2.1L.",
  },
  {
    question: "What is a floating vs fixed interest rate loan?",
    answer: "Fixed rate loans have the same interest rate throughout the tenure — EMI never changes. Floating rate loans are linked to an external benchmark (like RBI repo rate) — EMI or tenure changes when rates change. In India, most home loans are floating rate. Fixed rate is 1–2% higher but provides certainty. If you expect rates to fall, floating is better. If you expect rates to rise, fixed is safer.",
  },
  {
    question: "What CIBIL score is needed for a low-interest loan?",
    answer: "CIBIL score requirements: 750+ = best rates (0.5–1% lower than standard), 700–749 = slightly higher rate, 650–699 = limited lender options, below 650 = difficult to get unsecured loans. Improving CIBIL from 700 to 750 can save ₹500–₹1,000/month on a ₹50L home loan. Check your CIBIL score free once a year at CIBIL.com.",
  },
  {
    question: "What is the maximum loan tenure?",
    answer: "Maximum loan tenures in India: Home loans — 30 years (SBI, HDFC, ICICI), Car loans — 7 years, Personal loans — 7 years, Education loans — 15 years. Longer tenure = lower EMI but significantly more total interest paid. A ₹30L home loan at 9% for 20 years costs ₹32.4L in interest. For 30 years, the same loan costs ₹57.6L in interest — almost 2x more.",
  },
  {
    question: "What is the processing fee for a loan?",
    answer: "Loan processing fees in India: Home loans 0.25–1% of loan amount (minimum ₹5,000), Car loans 0.5–2%, Personal loans 1–3%. Processing fee is deducted upfront from the disbursed amount. A ₹50L home loan with 0.5% processing fee means ₹25,000 upfront cost. Compare effective interest rates (including processing fee) across lenders before deciding.",
  },
  {
    question: "Is it better to take a loan from a bank or NBFC?",
    answer: "Banks vs NBFCs: Banks offer lower interest rates (0.5–2% cheaper), more regulated, better customer protection. NBFCs (Bajaj Finance, HDFC Ltd, LIC HFL) offer easier eligibility, faster processing, and may approve loans for lower CIBIL scores. For large loans (home, car), prefer banks. For urgent personal loans or if credit score is below 700, NBFCs can be an option.",
  },
  {
    question: "What documents are required for a loan in India?",
    answer: "Common loan documents: Identity proof (Aadhaar, PAN), Address proof (Aadhaar, utility bill), Income proof (salary slips for 3 months, Form 16, ITR for self-employed), Bank statements (6 months), Property documents (for home loans), Vehicle quote (for car loans). Self-employed need GST returns, P&L statements, and business proof additionally.",
  },
  {
    question: "Can I take two loans simultaneously?",
    answer: "Yes, you can have multiple loans simultaneously. Banks consider your Total Fixed Obligation to Income Ratio (FOIR) — ideally should not exceed 40–50% of monthly income. Example: ₹1L salary, existing home loan EMI ₹25K = 25% FOIR. You can still take a personal loan if total EMIs stay under ₹40–50K. Too many loans reduce your CIBIL score over time.",
  },
  {
    question: "How does loan balance transfer work?",
    answer: "Loan balance transfer moves your outstanding loan from one lender to another at a lower interest rate. Benefits: lower EMI or reduced tenure, savings on total interest. Costs: processing fee at new lender (0.5–1%), prepayment penalty at old lender (if applicable — most floating rate loans have no prepayment penalty). Best time to transfer is in the first half of the loan tenure when interest component is highest.",
  },
];

const HOW_TO_STEPS = [
  { name: "Enter loan amount", text: "Enter the total loan amount you want to borrow — from ₹10,000 to ₹1 crore. Use the preset buttons for common amounts." },
  { name: "Set annual interest rate", text: "Enter the interest rate offered by your bank. Home loans are typically 8.5–9.5%, personal loans 10–18%." },
  { name: "Choose loan tenure", text: "Select the repayment period in months or years. Longer tenure = lower EMI but higher total interest." },
  { name: "View EMI and total interest", text: "The calculator shows your monthly EMI, total interest paid over the full tenure, and the principal-to-interest ratio." },
  { name: "Check amortization table", text: "Expand the year-wise amortization table to see the exact principal and interest breakdown for every year." },
];

export default function EMIPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "EMI Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema("EMI Calculator", "How to calculate loan EMI using RupeesCalc free EMI calculator", HOW_TO_STEPS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["home-loan-emi-calculator", "car-loan-emi-calculator", "personal-loan-emi-calculator", "sip-calculator"]}
        content={<EMIContent />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <EMICalculator loanType="general" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function EMIContent() {
  return (
    <>
      <h2>What is an EMI Calculator?</h2>
      <p>
        An <strong>EMI Calculator</strong> (Equated Monthly Installment Calculator) is a free online tool that instantly computes your fixed monthly loan repayment amount. Whether you&apos;re planning a home loan, car loan, personal loan, or education loan — our EMI calculator gives you the exact monthly payment, total interest, and a year-by-year amortization schedule in real time as you adjust the sliders.
      </p>
      <p>
        The RupeesCalc EMI calculator works for all loan types. Simply enter the loan amount, interest rate, and tenure to see your complete loan repayment picture. You can also test prepayment scenarios to see how much interest and time you can save.
      </p>

      <h2>How to Use This EMI Calculator</h2>
      <ol>
        <li><strong>Loan Amount:</strong> Enter the total loan amount you need (not the property price — the loan portion).</li>
        <li><strong>Interest Rate (%):</strong> Enter the annual interest rate. Check your lender&apos;s current rate or use our reference table below.</li>
        <li><strong>Loan Tenure (Years):</strong> How many years you want to repay the loan over. Longer = lower EMI but more total interest.</li>
        <li><strong>Read Results Instantly:</strong> See EMI, total interest, total payable, and the amortization table — no Calculate button needed.</li>
      </ol>

      <h2>EMI Calculation Formula</h2>
      <p>The EMI formula used by all banks and this calculator:</p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        EMI = P × r × (1 + r)^n ÷ [(1 + r)^n – 1]
      </div>
      <ul>
        <li><strong>P</strong> = Principal loan amount (₹)</li>
        <li><strong>r</strong> = Monthly interest rate = Annual rate ÷ 12 ÷ 100</li>
        <li><strong>n</strong> = Loan tenure in months = Years × 12</li>
      </ul>
      <p><strong>Example:</strong> ₹10L loan at 10% annual interest for 5 years: r = 10 ÷ 12 ÷ 100 = 0.00833, n = 60. EMI = 10,00,000 × 0.00833 × (1.00833)^60 / [(1.00833)^60 – 1] = <strong>₹21,247/month</strong>. Total interest paid = ₹2,74,823 over 5 years.</p>

      <h2>EMI Per Lakh — Reference Table</h2>
      <p>EMI for ₹1 lakh loan at different interest rates and tenures:</p>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Rate</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">1 Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">3 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">20 Years</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["8%", "₹8,699", "₹3,134", "₹2,028", "₹1,213", "₹836"],
              ["9%", "₹8,745", "₹3,180", "₹2,076", "₹1,267", "₹900"],
              ["10%", "₹8,792", "₹3,227", "₹2,125", "₹1,322", "₹965"],
              ["12%", "₹8,885", "₹3,321", "₹2,224", "₹1,435", "₹1,101"],
              ["14%", "₹8,979", "₹3,418", "₹2,327", "₹1,553", "₹1,244"],
              ["16%", "₹9,073", "₹3,516", "₹2,432", "₹1,675", "₹1,392"],
            ].map(([rate, y1, y3, y5, y10, y20]) => (
              <tr key={rate} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-semibold text-brand">{rate}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y1}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y3}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y5}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y10}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y20}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How to Reduce Your Loan EMI</h2>
      <ul>
        <li><strong>Larger Down Payment:</strong> Reduce principal by paying more upfront. On a ₹50L property, 30% down payment (₹15L) vs 20% (₹10L) saves ₹5,000+/month in EMI.</li>
        <li><strong>Improve CIBIL Score:</strong> A 750+ CIBIL score can get you rates 0.5–1% lower. On a ₹30L loan for 20 years, 0.5% lower rate saves ₹850/month = ₹2 lakh total.</li>
        <li><strong>Balance Transfer:</strong> Move your loan to a lender offering lower rates. Check if processing fees and prepayment penalties make it worthwhile.</li>
        <li><strong>Periodic Prepayment:</strong> Making extra payments reduces principal, which reduces the interest calculated on the remaining balance.</li>
      </ul>

      <h2>Loan Interest Rates in India 2025</h2>
      <ul>
        <li><strong>Home Loans:</strong> 8.25%–9.5% (SBI 8.5%, HDFC 8.75%, ICICI 8.75%, Axis 8.75%)</li>
        <li><strong>Car Loans:</strong> 8.5%–12% (SBI 8.65%, HDFC 8.75%, ICICI 9.1%)</li>
        <li><strong>Personal Loans:</strong> 10.5%–24% (HDFC 10.85%, SBI 11%, ICICI 10.85%, Bajaj 13%+)</li>
        <li><strong>Education Loans:</strong> 8.5%–12% (SBI 8.65%, HDFC Credila 10.5%+)</li>
      </ul>

      <blockquote>
        <strong>Disclaimer:</strong> Interest rates are indicative and change frequently. Verify current rates with your lender before applying. This EMI calculator is for financial planning purposes only and does not constitute financial advice.
      </blockquote>
    </>
  );
}
