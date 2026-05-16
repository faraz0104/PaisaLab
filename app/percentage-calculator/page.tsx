import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PercentageCalculator from "@/components/percentage/PercentageCalculator";

const slug = "percentage-calculator";
const title = "Percentage Calculator — Free Online % Calculator";
const description =
  "Free percentage calculator: Calculate what is X% of Y, what percentage X is of Y, percentage change, increase/decrease by %, and reverse percentage. Instant results, no signup.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "percentage calculator",
    "percentage calculator online",
    "percentage calculator free",
    "how to calculate percentage",
    "percent calculator",
    "percentage change calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "what is X percent of Y",
    "percentage difference calculator",
    "calculate percentage of a number",
    "reverse percentage calculator",
    "percentage formula calculator",
    "percent of total calculator",
    "percentage calculator 2025",
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
    question: "How do you calculate a percentage of a number?",
    answer: "To find X% of Y: multiply Y by X and divide by 100. Formula: Result = (X ÷ 100) × Y. Examples: 15% of 200 = (15/100) × 200 = 30. 25% of 80 = (25/100) × 80 = 20. 7.5% of 1000 = (7.5/100) × 1000 = 75. Quick shortcut: To find 10%, move decimal point one place left (10% of 350 = 35). To find 5%, halve the 10% answer (5% of 350 = 17.5). To find 1%, move decimal two places left (1% of 350 = 3.5).",
  },
  {
    question: "How do you calculate what percentage one number is of another?",
    answer: "To find what percentage A is of B: divide A by B and multiply by 100. Formula: Percentage = (A ÷ B) × 100. Examples: 30 is what % of 200? = (30/200) × 100 = 15%. 45 is what % of 180? = (45/180) × 100 = 25%. 7 is what % of 28? = (7/28) × 100 = 25%. Real-world use: Your test score is 72/90 — what %? = (72/90) × 100 = 80%. You spent ₹3,500 out of ₹15,000 budget — what %? = (3500/15000) × 100 = 23.3%.",
  },
  {
    question: "How do you calculate percentage change?",
    answer: "Percentage change formula: % Change = ((New Value − Old Value) ÷ Old Value) × 100. If positive = increase. If negative = decrease. Examples: Price increases from ₹80 to ₹100: ((100−80)/80) × 100 = +25% increase. Salary drops from $60,000 to $54,000: ((54000−60000)/60000) × 100 = −10% decrease. Stock price moves from $150 to $180: ((180−150)/150) × 100 = +20% gain. Important: % increase and % decrease are NOT symmetrical. A 50% increase followed by a 50% decrease returns you to 75% of the original (not 100%).",
  },
  {
    question: "How do you add or subtract a percentage from a number?",
    answer: "To increase a number by X%: New Value = Original × (1 + X/100). To decrease a number by X%: New Value = Original × (1 − X/100). Examples: Increase 500 by 20%: 500 × 1.20 = 600. Decrease 500 by 20%: 500 × 0.80 = 400. Price of ₹1,200 with 18% GST added: 1,200 × 1.18 = ₹1,416. Salary of $50,000 with 8% hike: 50,000 × 1.08 = $54,000. Discount: Product costs ₹2,000 with 15% off: 2,000 × 0.85 = ₹1,700.",
  },
  {
    question: "What is reverse percentage?",
    answer: "Reverse percentage finds the original number when you know what percentage it represents. Formula: Original = Known Value ÷ (Percentage / 100). Examples: 30 is 15% of what number? Original = 30 ÷ 0.15 = 200. A shirt costs ₹850 after a 15% discount — what was the original price? Original = 850 ÷ 0.85 = ₹1,000. VAT-inclusive price is ₹1,180 at 18% VAT — what is the pre-tax price? Pre-tax = 1,180 ÷ 1.18 = ₹1,000. Common use: Working backwards from discounted or tax-inclusive prices.",
  },
  {
    question: "What is the percentage difference formula?",
    answer: "Percentage difference measures the difference between two values relative to their average. Formula: % Difference = |V1 − V2| / ((V1 + V2) / 2) × 100. Example: Comparing 80 and 100: |80−100| / ((80+100)/2) × 100 = 20/90 × 100 = 22.2%. Note: Percentage difference is different from percentage change. Percentage change has a clear 'before' and 'after'. Percentage difference is used when comparing two equal-status values (e.g., two different prices). Use percentage change for before/after comparisons, percentage difference for comparing two alternatives.",
  },
  {
    question: "How do you calculate percentage marks?",
    answer: "Percentage of marks = (Marks Obtained / Total Marks) × 100. Examples: You scored 425 out of 500: (425/500) × 100 = 85%. CBSE result: 456/500 = 91.2%. JEE score: 240/300 = 80%. To find marks needed for a target %: Marks needed = (Target % × Total Marks) / 100. To score 90% in a 500-mark exam: (90 × 500) / 100 = 450 marks needed. CGPA to percentage (approximate): CGPA × 9.5 = percentage (used by many Indian universities).",
  },
  {
    question: "How do you calculate percentage profit or loss?",
    answer: "Percentage profit = ((Selling Price − Cost Price) / Cost Price) × 100. Percentage loss = ((Cost Price − Selling Price) / Cost Price) × 100. Examples: Bought for ₹500, sold for ₹600: Profit = (100/500) × 100 = 20% profit. Bought for ₹1,000, sold for ₹850: Loss = (150/1000) × 100 = 15% loss. Stock bought at $50, sold at $75: Profit = (25/50) × 100 = 50% gain. Property bought for ₹50L, sold for ₹70L: Profit = (20L/50L) × 100 = 40% gain.",
  },
  {
    question: "How do you calculate tip percentage?",
    answer: "Tip amount = Bill Amount × (Tip % / 100). Total with tip = Bill Amount × (1 + Tip % / 100). Common tip percentages: 10% tip on $45 bill: $45 × 0.10 = $4.50 tip → $49.50 total. 15% tip on $60 bill: $60 × 0.15 = $9.00 tip → $69 total. 20% tip on $80 bill: $80 × 0.20 = $16 tip → $96 total. Quick mental math for 20% tip: Double the bill and move decimal left one place. $75 bill → double = $150 → 20% tip = $15. Use our percentage calculator above with the 'Increase by %' mode for any tip calculation.",
  },
  {
    question: "How do you calculate percentage increase in salary?",
    answer: "Salary increase % = ((New Salary − Old Salary) / Old Salary) × 100. New salary after % increase = Old Salary × (1 + % / 100). Examples: Salary increases from ₹50,000 to ₹57,500: ((57,500 − 50,000) / 50,000) × 100 = 15% hike. What will ₹80,000 salary be after 12% hike? 80,000 × 1.12 = ₹89,600. After 3 years of 10% annual hikes from ₹60,000: Year 1: 66,000, Year 2: 72,600, Year 3: ₹79,860. Compound effect: Multiple percentage increases compound — a 10% hike each year for 3 years is NOT 30% total, it's 33.1%.",
  },
  {
    question: "What is the percentage formula for GST calculation?",
    answer: "GST amount = Original Price × GST Rate / 100. Price with GST = Original Price × (1 + GST Rate / 100). To find original price from GST-inclusive price: Original = Inclusive Price / (1 + GST Rate / 100). Examples (18% GST): Product costs ₹1,000 → GST = ₹180 → Total = ₹1,180. Product costs ₹2,500 + 18% GST: 2,500 × 1.18 = ₹2,950. Bill shows ₹1,416 inclusive of 18% GST → Original = 1,416 / 1.18 = ₹1,200. Use our GST Calculator for split CGST/SGST/IGST breakdown.",
  },
];

export default function PercentageCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["currency-converter", "gst-calculator", "compound-interest-calculator", "income-tax-calculator"]}
        content={<PercentageContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <PercentageCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function PercentageContent() {
  return (
    <>
      <h2>What is a Percentage Calculator?</h2>
      <p>
        A <strong>percentage calculator</strong> handles the 5 most common percentage problems instantly — finding X% of a number, calculating what % one number is of another, computing percentage change, increasing/decreasing by a percentage, and reverse percentage. No formula memorisation needed.
      </p>

      <h2>Percentage Formulas</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Question</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Formula</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["What is 15% of 200?", "(15 ÷ 100) × 200", "= 30"],
              ["30 is what % of 200?", "(30 ÷ 200) × 100", "= 15%"],
              ["% change from 80 to 100", "((100−80) ÷ 80) × 100", "= +25%"],
              ["500 increased by 20%", "500 × (1 + 20/100)", "= 600"],
              ["30 is 15% of what?", "30 ÷ (15 ÷ 100)", "= 200"],
            ].map(([q, f, e]) => (
              <tr key={q} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{q}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-slate-600 dark:text-slate-300">{f}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Common Uses of Percentage Calculations</h2>
      <ul>
        <li><strong>Discounts & shopping:</strong> 30% off ₹2,000 = ₹2,000 × 0.70 = ₹1,400</li>
        <li><strong>Tax calculations:</strong> 18% GST on ₹1,000 = ₹1,180 total</li>
        <li><strong>Exam marks:</strong> 425/500 = 85% score</li>
        <li><strong>Salary hikes:</strong> ₹50,000 + 10% hike = ₹55,000</li>
        <li><strong>Investment returns:</strong> ₹1L grew to ₹1.25L = 25% gain</li>
        <li><strong>Tip calculation:</strong> 15% tip on $60 bill = $9</li>
      </ul>

      <blockquote>
        <strong>Note:</strong> Percentage increase and decrease are not symmetric. Increasing by 50% then decreasing by 50% gives you 75% of the original value, not 100%. Always calculate on the correct base value.
      </blockquote>
    </>
  );
}
