import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("personal-loan-emi-calculator");

const slug = "personal-loan-emi-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a personal loan EMI calculator?",
    answer: "A personal loan EMI calculator is a free online tool that instantly computes your monthly loan repayment amount for an unsecured personal loan. Enter the loan amount, interest rate, and tenure to see your exact EMI, total interest payable, total amount payable, and a complete month-by-month amortization schedule.",
  },
  {
    question: "What is the current personal loan interest rate in India 2025?",
    answer: "Personal loan interest rates in India 2025: HDFC Bank 10.85%–24%, ICICI Bank 10.85%–16%, SBI 11%–15%, Axis Bank 11%–22%, Bajaj Finance 13%–35%, Kotak Mahindra 10.99%–24%. Rates depend heavily on credit score, income, employer category, existing relationship with bank. Salaried employees at top companies get the lowest rates. Always compare multiple lenders.",
  },
  {
    question: "What CIBIL score is needed for a personal loan?",
    answer: "Personal loan CIBIL requirements: 750+ = best rates (10.85%–12%), 700–749 = slightly higher rates (12%–16%), 650–699 = approved with high rates (15%–24%) or rejected by banks (NBFCs like Bajaj Finance may approve), below 650 = very difficult to get unsecured personal loan. Personal loans are unsecured — lenders take more risk, so CIBIL score matters more than for secured loans.",
  },
  {
    question: "How much personal loan can I get on my salary?",
    answer: "Personal loan eligibility typically: 10–15x your monthly salary. ₹30,000/month salary → ₹3–4.5L loan, ₹50,000/month → ₹5–7.5L, ₹75,000/month → ₹7.5–11L, ₹1L/month → ₹10–15L. Banks also check FOIR (total EMIs ÷ income ≤ 40–50%). If you already have a home loan or car loan EMI, personal loan eligibility reduces. Minimum salary for personal loan: ₹15,000–₹25,000/month depending on lender.",
  },
  {
    question: "What documents are required for a personal loan?",
    answer: "Personal loan documents (salaried): Aadhaar card, PAN card, last 3 months salary slips, Form 16, bank statement (last 6 months), employment proof. Self-employed: Aadhaar, PAN, ITR last 2 years, business registration proof, bank statements (12 months), CA-certified P&L and balance sheet. Pre-approved personal loans from your existing bank require minimal documentation since they already have your records.",
  },
  {
    question: "What is the maximum personal loan amount in India?",
    answer: "Maximum personal loan amounts: HDFC Bank — ₹40L, ICICI Bank — ₹50L, SBI — ₹20L, Axis Bank — ₹40L, Bajaj Finance — ₹40L, Kotak Mahindra — ₹25L. Maximum is also limited by your eligibility (10–15x salary). Most personal loans range from ₹50,000 to ₹15L for average salaried employees. High-income professionals can get up to ₹40–50L.",
  },
  {
    question: "What is the maximum tenure for a personal loan?",
    answer: "Personal loan maximum tenure: Most banks offer 1–5 years (12–60 months). Some lenders extend to 6–7 years. Longer tenure = lower EMI but significantly more interest. ₹5L at 12% — 2 years EMI ₹23,537 (interest ₹64,888), 5 years EMI ₹11,122 (interest ₹1,67,320). 5-year option costs ₹1.02L more in interest than 2-year. Choose shortest tenure where EMI fits your budget.",
  },
  {
    question: "Can I prepay a personal loan?",
    answer: "Yes, but personal loans often have prepayment/foreclosure charges: 2–5% of outstanding principal within 6–12 months. After 1 year: 1–3%. Check your loan agreement. Banks: most charge 2–5% if closed before 1 year, some waive after 12 EMIs. Fintech lenders (MoneyView, KreditBee): similar. Calculate if interest savings from prepayment exceed the prepayment penalty before foreclosing.",
  },
  {
    question: "Is it better to take personal loan from bank or fintech app?",
    answer: "Banks (HDFC, ICICI, SBI): Lower rates (10.85%–16%), stricter eligibility (CIBIL 700+, min salary ₹25K), slower approval (1–3 days). Fintech apps (Bajaj, MoneyView, Navi, KreditBee): Faster (instant to 24 hours), lower eligibility requirement, but higher rates (15%–35%). For planned expenses: get bank loan at low rate. For urgent small amounts (₹50K–₹2L): fintech apps work. Avoid fintech for large amounts due to high interest.",
  },
  {
    question: "What is the processing fee for a personal loan?",
    answer: "Personal loan processing fees: Banks typically charge 1–3% of loan amount + GST. HDFC: 0.5%–2.5%, ICICI: up to 2.25%, SBI: 1.5%–2%, Bajaj Finance: up to 3.93%. On a ₹5L loan with 2% processing fee = ₹10,000 upfront cost. Processing fee is deducted from disbursed amount or paid upfront. Factor this into total loan cost when comparing lenders. Pre-approved offers often have nil/lower processing fees.",
  },
  {
    question: "How does personal loan affect CIBIL score?",
    answer: "Personal loan impact on CIBIL: Negative: Hard inquiry reduces score by 5–10 points. Taking multiple loans is risky for score. Personal loan increases your unsecured credit — high unsecured load = lower score. Positive: On-time EMI payments significantly improve score over time. A personal loan closed successfully improves credit history. Rule: Never apply to multiple lenders simultaneously — each application is a hard inquiry.",
  },
  {
    question: "What are alternatives to a personal loan?",
    answer: "Personal loan alternatives: Loan against FD (7–8% interest, use your FD as collateral), Loan against mutual funds (10.5%–11%, minimal documentation), Gold loan (7%–15%, gold as collateral — faster approval), Credit card balance transfer (0% for 3–6 months on some cards), BNPL (Buy Now Pay Later for specific purchases), EPF withdrawal (for emergencies, own money), Loan from family/employer (no interest). Always exhaust secured options before taking an unsecured personal loan.",
  },
  {
    question: "Is personal loan interest tax deductible?",
    answer: "Personal loan interest tax deductions: Not generally tax deductible for personal expenses. Exceptions: If personal loan is used for home renovation/construction — interest deductible up to ₹2L under Section 24(b). If used for business — deductible as business expense. If used for buying assets for business — deductible. Keep documentary proof of how the loan amount was used. For personal use (medical, travel, wedding) — no tax benefit.",
  },
  {
    question: "What is an instant personal loan in India?",
    answer: "Instant personal loans are disbursed within minutes to 4 hours. Available through: Bank apps (HDFC Flexicash, ICICI iLens, Axis Flash Cash) for existing customers with pre-approved offers, Fintech apps (Bajaj Finserv, MoneyView, Navi, KreditBee, PaySense). Requirements: Aadhaar-linked mobile, PAN, income proof, 650+ CIBIL. Loan range: ₹10,000–₹5L. Instant loans are convenient but often carry higher rates (15%–30%). Best for genuine emergencies only.",
  },
  {
    question: "How to get the lowest personal loan interest rate?",
    answer: "Tips to get lowest personal loan rate: (1) Maintain CIBIL score 750+ (most important factor), (2) Apply to your salary account bank first — existing relationship gets best rates, (3) Compare pre-approved offers in your bank app, (4) Choose shorter tenure — some banks offer lower rates for shorter loans, (5) Avoid multiple applications — each reduces CIBIL, (6) Show stable employment (3+ years at same company), (7) Negotiate using competing offers — banks can sometimes match lower rates.",
  },
];

export default function PersonalLoanEMIPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "Personal Loan EMI Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["emi-calculator", "home-loan-emi-calculator", "car-loan-emi-calculator"]}
        content={<PersonalLoanContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <EMICalculator loanType="personal" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function PersonalLoanContent() {
  return (
    <>
      <h2>What is a Personal Loan EMI Calculator?</h2>
      <p>
        A <strong>Personal Loan EMI Calculator</strong> is a free online tool that instantly computes your monthly repayment amount for an unsecured personal loan. Unlike home or car loans, personal loans require no collateral — making them useful for medical emergencies, weddings, travel, or home renovation. Enter the loan amount, interest rate, and tenure to see your exact EMI and total interest cost.
      </p>
      <p>
        Personal loans in India carry higher interest rates (10.85%–35%) than secured loans due to the higher risk for lenders. This makes choosing the right amount, tenure, and lender critical to minimizing your overall borrowing cost.
      </p>

      <h2>Personal Loan EMI — Quick Reference</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Loan Amount</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">12% / 1yr</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">12% / 3yr</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">16% / 3yr</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">24% / 3yr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹1 Lakh", "₹8,885", "₹3,321", "₹3,516", "₹3,923"],
              ["₹2 Lakh", "₹17,769", "₹6,642", "₹7,033", "₹7,846"],
              ["₹5 Lakh", "₹44,424", "₹16,607", "₹17,582", "₹19,617"],
              ["₹10 Lakh", "₹88,849", "₹33,214", "₹35,163", "₹39,232"],
              ["₹20 Lakh", "₹1,77,698", "₹66,430", "₹70,326", "₹78,464"],
            ].map(([amt, r12_1, r12_3, r16_3, r24_3]) => (
              <tr key={amt} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{amt}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r12_1}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r12_3}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{r16_3}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{r24_3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Personal Loan Interest Rates 2025</h2>
      <ul>
        <li><strong>HDFC Bank:</strong> 10.85%–24% (best for salary account holders)</li>
        <li><strong>ICICI Bank:</strong> 10.85%–16%</li>
        <li><strong>SBI Xpress Credit:</strong> 11%–15%</li>
        <li><strong>Axis Bank:</strong> 11%–22%</li>
        <li><strong>Kotak Mahindra:</strong> 10.99%–24%</li>
        <li><strong>Bajaj Finance:</strong> 13%–35% (flexible eligibility)</li>
      </ul>

      <h2>How to Get the Lowest Personal Loan Rate</h2>
      <ul>
        <li>Maintain CIBIL score 750+ — single biggest factor in getting low rates</li>
        <li>Apply first to your salary account bank — existing relationship gets best rates</li>
        <li>Check pre-approved offers in your banking app — usually the best deal</li>
        <li>Avoid multiple loan applications — each is a hard inquiry reducing CIBIL</li>
        <li>Show stable employment (3+ years same employer) to demonstrate repayment capacity</li>
      </ul>

      <blockquote>
        <strong>Disclaimer:</strong> Personal loan rates are indicative and change frequently. This personal loan EMI calculator is for informational and planning purposes only. Compare multiple lenders and read terms carefully before applying for a personal loan.
      </blockquote>
    </>
  );
}
