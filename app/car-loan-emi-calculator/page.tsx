import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EMICalculator from "@/components/emi/EMICalculator";

export const metadata: Metadata = buildMetadata("car-loan-emi-calculator");

const slug = "car-loan-emi-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a car loan EMI calculator?",
    answer: "A car loan EMI calculator is a free online tool that computes your monthly car loan repayment amount. Enter the car loan amount, interest rate, and tenure to instantly see your monthly EMI, total interest, total amount payable, and year-by-year amortization schedule.",
  },
  {
    question: "What is the current car loan interest rate in India 2025?",
    answer: "Car loan interest rates in India 2025: SBI 8.65%–9.45%, HDFC Bank 8.75%–9.75%, ICICI Bank 9.10%–10.50%, Axis Bank 9.25%–10%, Kotak Mahindra 8.75%–12%, Bajaj Auto Finance 9.5%–15%. Rates depend on car model (new vs used), tenure, loan amount, income, and CIBIL score. New cars get better rates than used cars.",
  },
  {
    question: "How much car loan can I get on my salary?",
    answer: "Banks typically allow car loan EMI up to 15–20% of monthly take-home salary. Approximate eligibility: ₹25,000/month salary → ₹3–4L loan, ₹50,000/month → ₹8–10L loan, ₹1L/month → ₹15–20L loan. Banks typically fund 80–90% of the ex-showroom price for new cars. Used car loans: typically 70–80% of current market value.",
  },
  {
    question: "What is the minimum down payment for a car loan?",
    answer: "Minimum down payment for a new car: Banks finance up to 85–90% of ex-showroom price, so minimum 10–15% down payment. For a ₹10L on-road car, minimum down payment is ₹1–1.5L. Higher down payment = lower loan = lower EMI and less total interest. Always pay at least 20% down to keep EMI affordable.",
  },
  {
    question: "Is it better to take a car loan or pay cash?",
    answer: "Paying cash: No interest cost, instant ownership, better negotiation leverage with dealer. Car loan: Preserve cash for investments that earn more than loan rate (e.g., 9% loan vs 12% equity returns), potential tax deduction if car is for business use. For personal cars: if you have the cash and no better investment option, paying cash saves ₹1–3L in interest depending on loan amount.",
  },
  {
    question: "What is the difference between new car loan and used car loan?",
    answer: "New car loans: 8.65%–10% interest rate, up to 85–90% LTV, tenure up to 7 years. Used car loans: 10%–18% interest rate (2–3% higher), up to 70–80% LTV of market value, tenure up to 5 years. The interest rate difference on a ₹5L used car loan at 14% vs new car at 9% means ₹1,250 more per month over 5 years = ₹75,000 extra interest. Buying new can make more financial sense.",
  },
  {
    question: "What documents are needed for a car loan?",
    answer: "Car loan documents: Identity proof (Aadhaar, PAN), Address proof, Income proof (3 months salary slips + Form 16 for salaried; ITR + bank statements for self-employed), Bank statements (last 6 months), Car quotation or proforma invoice from dealer, Passport photos. Approval typically within 24–48 hours for salaried applicants with good CIBIL score (700+).",
  },
  {
    question: "How to calculate car loan EMI?",
    answer: "Car loan EMI formula: EMI = P × r × (1+r)^n / [(1+r)^n – 1]. P = Loan amount, r = Monthly rate (annual rate ÷ 12 ÷ 100), n = Tenure in months. Example: ₹8L car loan at 9% for 5 years. r = 0.0075, n = 60. EMI = 8,00,000 × 0.0075 × (1.0075)^60 / [(1.0075)^60 – 1] = ₹16,601/month. Total interest = ₹1,96,060.",
  },
  {
    question: "Can I foreclose my car loan early?",
    answer: "Yes, you can foreclose (fully repay) your car loan early. Foreclosure charges: most banks charge 2–6% of outstanding principal if closed within 2 years. After 2 years, many banks allow foreclosure with 0–2% charge. Check your loan agreement for specific terms. Foreclosing early saves significant interest — especially in the first half of the tenure when interest is highest.",
  },
  {
    question: "Does car loan affect CIBIL score?",
    answer: "Car loan affects CIBIL score: Positive — timely EMI payments improve CIBIL score, adds to credit mix. Negative — hard inquiry at application reduces score by 5–10 points temporarily, missed payments severely damage score. An auto loan paid on time for 3+ years typically improves CIBIL by 30–50 points. Never miss a car loan EMI — it stays on your credit report for 7 years.",
  },
  {
    question: "What is the maximum tenure for a car loan in India?",
    answer: "Maximum car loan tenure: New cars — up to 7 years (84 months). Used cars — up to 5 years (60 months). Longer tenure = lower EMI but more total interest. ₹8L at 9% — 3 years EMI ₹25,435 (interest ₹91,651), 5 years EMI ₹16,601 (interest ₹1,96,060), 7 years EMI ₹12,840 (interest ₹2,78,556). 7-year option costs ₹1.87L more vs 3-year. Choose shorter tenure if you can afford higher EMI.",
  },
  {
    question: "Is car loan interest tax deductible in India?",
    answer: "Personal car loan interest: NOT tax deductible. Business-use cars: Interest is deductible as a business expense under Section 37(1). Depreciation also claimable. Self-employed professionals and business owners can claim car loan interest if the vehicle is used for business. Maintain a usage log of business vs personal km. Salaried employees can only claim if using the car for business and employer doesn't provide a car allowance.",
  },
  {
    question: "Should I use dealer financing or bank loan?",
    answer: "Dealer financing (OEM tie-ups): 0% interest EMI schemes on select models — check if there are processing fees or mandatory insurance add-ons. Bank loans: transparent pricing, negotiable, pre-approved loan gives buying power. Compare total cost of ownership using this EMI calculator. Pre-approved bank loans let you negotiate car price better since you go in as a cash buyer. 0% dealer schemes are best when there are no hidden costs.",
  },
  {
    question: "What CIBIL score is required for a car loan?",
    answer: "Car loan CIBIL score requirements: 750+ = best rates from all lenders, 700–749 = approved at slightly higher rates (0.5% more), 650–699 = limited bank options, NBFCs may approve at high rates (12%+), below 650 = very difficult, may need guarantor or high down payment. Tip: Check and improve CIBIL before applying — 6 months of responsible credit behavior can move score from 680 to 720+.",
  },
  {
    question: "What is on-road price vs ex-showroom price?",
    answer: "Ex-showroom price = car base price before taxes. On-road price = ex-showroom + GST (28% + cess on most cars) + road tax (4–20% by state) + insurance (1st year compulsory, ₹20K–60K+) + registration + accessories. Banks fund 80–90% of ex-showroom, not on-road. So a ₹10L ex-showroom car may cost ₹13–14L on-road, with bank giving ₹8–9L max. You pay the rest from pocket.",
  },
];

export default function CarLoanEMIPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "Car Loan EMI Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["emi-calculator", "home-loan-emi-calculator", "personal-loan-emi-calculator"]}
        content={<CarLoanContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <EMICalculator loanType="car" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function CarLoanContent() {
  return (
    <>
      <h2>What is a Car Loan EMI Calculator?</h2>
      <p>
        A <strong>Car Loan EMI Calculator</strong> helps you plan your car purchase by computing the exact monthly repayment amount for your auto loan. Enter the loan amount (ex-showroom price minus down payment), interest rate, and tenure to instantly see your EMI, total interest cost, and full amortization schedule.
      </p>
      <p>
        Whether you&apos;re buying a Maruti Swift, Hyundai Creta, Tata Nexon, or a luxury sedan — this calculator helps you understand the true total cost of your car loan before signing at the dealership.
      </p>

      <h2>Car Loan EMI — Quick Reference (at 9% interest)</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Loan Amount</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">3 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">7 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Interest (5yr)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹3 Lakh", "₹9,538", "₹6,225", "₹4,815", "₹37,500"],
              ["₹5 Lakh", "₹15,897", "₹10,376", "₹8,026", "₹62,560"],
              ["₹8 Lakh", "₹25,435", "₹16,601", "₹12,841", "₹1,00,060"],
              ["₹10 Lakh", "₹31,799", "₹20,758", "₹16,051", "₹1,25,480"],
              ["₹15 Lakh", "₹47,698", "₹31,137", "₹24,077", "₹1,88,220"],
              ["₹20 Lakh", "₹63,598", "₹41,516", "₹32,103", "₹2,50,960"],
            ].map(([amt, y3, y5, y7, interest]) => (
              <tr key={amt} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{amt}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y3}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y5}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y7}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{interest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Car Loan Interest Rates 2025 — Bank Comparison</h2>
      <ul>
        <li><strong>SBI:</strong> 8.65%–9.45% (lowest for government employees)</li>
        <li><strong>HDFC Bank:</strong> 8.75%–9.75%</li>
        <li><strong>ICICI Bank:</strong> 9.10%–10.50%</li>
        <li><strong>Axis Bank:</strong> 9.25%–10%</li>
        <li><strong>Kotak Mahindra:</strong> 8.75%–12%</li>
        <li><strong>Bajaj Auto Finance:</strong> 9.5%–15% (more flexible eligibility)</li>
      </ul>

      <h2>New Car vs Used Car Loan</h2>
      <p>
        <strong>New car loan:</strong> Lower rates (8.65%–10%), up to 90% LTV, up to 7-year tenure, comprehensive insurance mandatory.
      </p>
      <p>
        <strong>Used car loan:</strong> Higher rates (10%–18%), up to 75% of market value, up to 5-year tenure. Interest rate alone makes used car loans significantly more expensive in total cost.
      </p>
      <p><strong>Tip:</strong> If a used car is more than 5 years old, getting a loan is difficult. Compare total cost of new vs used with loan using this calculator.</p>

      <blockquote>
        <strong>Disclaimer:</strong> Rates are indicative and subject to change. This car loan EMI calculator is for planning purposes only and does not constitute financial advice. Verify rates with your bank or NBFC before applying.
      </blockquote>
    </>
  );
}
