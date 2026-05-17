import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SalaryCalculator from "@/components/salary/SalaryCalculator";

const slug = "salary-calculator";
const title = "Salary Calculator India 2025 — CTC to In-Hand Take Home Salary";
const description =
  "Free salary calculator India: Convert CTC to monthly in-hand take-home salary. See exact PF deduction, professional tax, income tax TDS, and net salary. Supports new and old tax regime. Instant results.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "salary calculator",
    "salary calculator India",
    "CTC to in hand salary calculator",
    "take home salary calculator",
    "in hand salary calculator",
    "monthly salary calculator India",
    "salary calculator 2025",
    "net salary calculator India",
    "CTC calculator India",
    "salary breakdown calculator",
    "salary after tax India",
    "salary slip calculator",
    "how much will I get in hand",
    "gross to net salary India",
    "salary calculator new regime",
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
    question: "How is CTC different from in-hand salary?",
    answer: "CTC (Cost to Company) is the total amount a company spends on an employee annually. In-hand salary (take-home) is what actually gets credited to your bank account. The difference: CTC − Employer PF (12% of basic) − Gratuity (4.81% of basic) = Gross Salary. Gross Salary − Employee PF (12% of basic) − Professional Tax (₹200/month) − Income Tax TDS = In-Hand Salary. Example: ₹12L CTC → Employer PF ≈ ₹57,600, Gratuity ≈ ₹23,088 → Gross ≈ ₹11.19L. Gross − Employee PF ₹57,600 − PT ₹2,400 − Tax ≈ ₹0 (new regime) = ₹10.73L in-hand = ₹89,417/month.",
  },
  {
    question: "How much in-hand salary will I get for ₹10 LPA CTC?",
    answer: "For ₹10,00,000 LPA CTC (assuming 40% basic, metro city, new tax regime): Basic = ₹4,00,000, HRA = ₹2,00,000, Special Allowance = ₹3,42,080. Gross Salary = ₹9,42,080 (after employer PF and gratuity deductions). Deductions: Employee PF = ₹48,000, Professional Tax = ₹2,400, Income Tax = ₹0 (taxable income < ₹12L after deductions). Monthly take-home ≈ ₹74,307. Note: At ₹10L CTC, most employees pay zero tax under the new regime in FY 2025-26.",
  },
  {
    question: "How much in-hand salary for ₹15 LPA, ₹20 LPA, ₹30 LPA?",
    answer: "Approximate monthly in-hand (40% basic, metro, new tax regime, with PF): ₹15 LPA CTC → ₹1,01,000–1,05,000/month. ₹20 LPA CTC → ₹1,30,000–1,38,000/month. ₹30 LPA CTC → ₹1,88,000–2,00,000/month. ₹50 LPA CTC → ₹3,00,000–3,20,000/month. These are estimates — actual amounts vary based on basic salary percentage, tax regime chosen, HRA exemptions claimed, and other deductions like 80C investments. Use our salary calculator above for exact figures.",
  },
  {
    question: "What is PF deduction in salary?",
    answer: "PF (Provident Fund) deduction has two parts: Employee contribution: 12% of basic salary (deducted from your salary). Employer contribution: 12% of basic salary (employer's cost, part of CTC). Both are subject to a maximum basic salary of ₹15,000/month for mandatory PF (meaning max statutory PF = ₹1,800/month each). However, many companies calculate PF on the actual basic salary if it's higher. Total annual PF = Employee ₹21,600 + Employer ₹21,600 = ₹43,200 (at ₹15,000 basic). Employee PF qualifies for 80C deduction. Accumulated PF balance earns 8.25% interest (FY 2023-24) and is tax-free on withdrawal after 5 years.",
  },
  {
    question: "What is professional tax and who has to pay it?",
    answer: "Professional Tax (PT) is a state government tax levied on salary income. It's deducted by the employer from your salary. Most states charge ₹200/month (₹2,400/year) for salaries above a threshold. Karnataka: ₹200/month. Maharashtra: ₹200/month. Andhra Pradesh: ₹200/month. Tamil Nadu: ₹208/month. Some states (Delhi, Haryana, Rajasthan, UP, Uttarakhand) do NOT levy professional tax. Maximum professional tax: ₹2,500/year — amounts above this are deductible under the Income Tax Act. PT is deductible from your taxable income under the old regime.",
  },
  {
    question: "New regime vs old regime — which is better for salaried employees?",
    answer: "For salaried employees in FY 2025-26: New regime is better if: Your deductions are less than ₹4-5 lakh (standard ₹75K + PF + basic 80C only). Salary is under ₹12.75L gross (zero tax). You want simplicity. Old regime is better if: You have large deductions — home loan interest (₹2L), HRA exemption, full 80C, 80D. Total deductions exceed ~₹4-5L. Typically earns ₹15L+ with significant investments. Quick check: Old regime taxable income = Gross − ₹4L+ deductions. New regime taxable income = Gross − ₹75K. If old regime income is significantly lower, old regime saves more.",
  },
  {
    question: "Is HRA included in CTC and how is it taxed?",
    answer: "Yes, HRA (House Rent Allowance) is a component of CTC/gross salary. For tax purposes, HRA exemption under old regime = least of: (1) Actual HRA received. (2) Actual rent paid − 10% of basic salary. (3) 50% of basic (metro city) or 40% (non-metro). Example: Basic ₹40,000/month, HRA ₹20,000/month, Rent paid ₹18,000/month, Delhi (metro). Exemption = min(₹20,000, ₹18,000−₹4,000=₹14,000, ₹20,000) = ₹14,000/month = ₹1,68,000/year. Under new regime: No HRA exemption is available. This is why the old regime can be significantly better for people living in rented accommodation.",
  },
  {
    question: "How is income tax calculated on salary?",
    answer: "For salaried employees, TDS (Tax Deducted at Source) is deducted monthly by the employer. Calculation steps: Gross Annual Salary − Standard Deduction (₹75K new / ₹50K old) − Other deductions (80C, 80D, HRA etc. for old regime) = Taxable Income. Apply tax slab rates → Compute tax → Apply 87A rebate if applicable → Add 4% cess = Annual Tax. Monthly TDS = Annual Tax ÷ 12. Under new regime FY 2025-26: Zero tax for taxable income ≤ ₹12L (post standard deduction ₹75K, so gross salary ≤ ₹12.75L = zero tax).",
  },
  {
    question: "What is gratuity and is it part of CTC?",
    answer: "Gratuity is a statutory payment by employers to employees who have completed 5+ years of service. It's typically included in CTC as 4.81% of basic salary (representing 15 days pay per year of service). However, gratuity is NOT paid monthly — it's paid as a lump sum when you leave the company (after 5 years). Tax treatment: Tax-free up to ₹20 lakh (for government employees: fully exempt). For private employees: Tax-free up to ₹20L for covered establishments. If your CTC includes gratuity but you leave before 5 years, you forfeit the gratuity amount. Some companies exclude gratuity from CTC calculations — check your offer letter.",
  },
  {
    question: "Does our salary calculator include ESIC?",
    answer: "ESIC (Employee State Insurance Corporation) deduction applies only to employees with gross salary ≤ ₹21,000/month. If your gross monthly salary exceeds ₹21,000, you are exempt from ESIC. For eligible employees: Employee ESIC = 0.75% of gross salary. Employer ESIC = 3.25% of gross salary. Example: ₹18,000 gross/month → Employee ESIC = ₹135/month. Our calculator focuses on salaried employees earning above ₹21,000/month, so ESIC is not included. If your salary is below ₹21,000 gross, add ₹135-200/month to the deductions shown.",
  },
];

export default function SalaryCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["income-tax-calculator", "emi-calculator", "ppf-calculator", "compound-interest-calculator"]}
        content={<SalaryContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <SalaryCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function SalaryContent() {
  return (
    <>
      <h2>What is a CTC to In-Hand Salary Calculator?</h2>
      <p>
        A <strong>salary calculator</strong> converts your CTC (Cost to Company) to the actual monthly in-hand salary credited to your bank account. It deducts employee PF, professional tax, and income tax TDS to show your net take-home pay — in both the new and old tax regime.
      </p>

      <h2>CTC vs Gross vs In-Hand — Quick Reference</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Annual CTC</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Gross</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly In-Hand (New)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly In-Hand (Old)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹5 LPA",  "₹38,000",  "₹33,500",  "₹34,200"],
              ["₹8 LPA",  "₹61,200",  "₹54,800",  "₹55,900"],
              ["₹12 LPA", "₹91,700",  "₹84,900",  "₹85,600"],
              ["₹15 LPA", "₹1,14,700","₹1,02,300","₹1,04,800"],
              ["₹20 LPA", "₹1,53,100","₹1,31,500","₹1,37,200"],
              ["₹30 LPA", "₹2,29,800","₹1,90,700","₹2,01,400"],
            ].map(([ctc, gross, newH, oldH]) => (
              <tr key={ctc} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{ctc}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{gross}</td>
                <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400 font-semibold">{newH}</td>
                <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400">{oldH}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Estimates: 40% basic, metro city, PF opted in. Old regime assumes full 80C + HRA deductions.</p>

      <blockquote>
        <strong>Tip:</strong> When evaluating a job offer, always ask for the complete salary structure — basic, HRA, allowances, and whether PF is included in CTC or paid over and above. A ₹12L CTC with PF in-CTC gives less in-hand than ₹12L CTC with PF extra.
      </blockquote>
    </>
  );
}
