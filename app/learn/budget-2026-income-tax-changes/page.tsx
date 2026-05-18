import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "budget-2026-income-tax-changes";
const title = "Budget 2026 Income Tax Changes: What Changed for Salaried Employees";
const description = "All income tax changes from Union Budget 2026 that affect salaried individuals — new slab rates, revised rebate limits, updated standard deduction, and NPS employer contribution rules.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "What is the income tax rebate limit in FY 2026-27?", answer: "Under the new tax regime for FY 2026-27, the Section 87A rebate limit remains ₹12,00,000 taxable income (after standard deduction). This means salaried employees with gross salary up to ₹12,75,000 pay zero tax under the new regime. The old regime rebate of ₹5,00,000 is unchanged." },
  { question: "What is the standard deduction for FY 2026-27?", answer: "The standard deduction under the new tax regime is ₹75,000 for FY 2026-27 (unchanged from FY 2025-26). The old regime standard deduction remains ₹50,000. No increase was announced in Budget 2026 for standard deduction." },
  { question: "Did the 80C limit increase in Budget 2026?", answer: "No. The Section 80C limit remains ₹1,50,000 — unchanged since 2014. Despite expectations, Budget 2026 did not revise the 80C limit. The government's stated objective is to push more taxpayers toward the simplified new regime, which has no 80C deductions." },
  { question: "What changed for NPS in Budget 2026?", answer: "The employer's NPS contribution deduction under 80CCD(2) was enhanced for private sector employees — the limit increased from 10% to 14% of basic salary (matching the government employee limit set in 2024). This means private sector employees can get higher tax deductions on employer NPS contributions." },
  { question: "Is TDS on salary changed for FY 2026-27?", answer: "The TDS provisions for salary income are unchanged for FY 2026-27. Employers must continue deducting TDS based on the employee's projected annual income and declared regime preference. The new regime remains the default; employees must affirmatively opt for the old regime with their employer." },
];

export default function Budget2026TaxChangesPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2026-02-01"
        readingTime="7 min read"
        relatedSlugs={["income-tax-calculator", "salary-calculator", "nps-calculator", "ppf-calculator"]}
      >
        <h2>Key Tax Changes at a Glance</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Item</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">FY 2025-26</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">FY 2026-27</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["87A Rebate (New regime)", "≤ ₹12L taxable", "≤ ₹12L taxable", "No change"],
                ["Standard deduction (New)", "₹75,000", "₹75,000", "No change"],
                ["Standard deduction (Old)", "₹50,000", "₹50,000", "No change"],
                ["80C limit", "₹1,50,000", "₹1,50,000", "No change"],
                ["80D (self + family)", "₹25,000", "₹25,000", "No change"],
                ["80CCD(2) private employer NPS", "10% of basic", "14% of basic", "↑ Enhanced"],
                ["Surcharge (>₹50L)", "Unchanged", "Unchanged", "No change"],
              ].map(([item, prev, curr, change]) => (
                <tr key={item} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{item}</td>
                  <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400 text-xs">{prev}</td>
                  <td className="px-4 py-2.5 text-right text-slate-700 dark:text-slate-200 text-xs">{curr}</td>
                  <td className={`px-4 py-2.5 text-xs font-semibold ${change.includes("Enhanced") ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>{change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>New Tax Regime Slabs — FY 2026-27 (Unchanged)</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Taxable Income Slab</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Tax Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Up to ₹4,00,000", "Nil"],
                ["₹4,00,001 – ₹8,00,000", "5%"],
                ["₹8,00,001 – ₹12,00,000", "10%"],
                ["₹12,00,001 – ₹16,00,000", "15%"],
                ["₹16,00,001 – ₹20,00,000", "20%"],
                ["₹20,00,001 – ₹24,00,000", "25%"],
                ["Above ₹24,00,000", "30%"],
              ].map(([slab, rate]) => (
                <tr key={slab} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{slab}</td>
                  <td className="px-4 py-2.5 text-right font-bold text-blue-600 dark:text-blue-400">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">4% cess on tax. Section 87A: zero tax if taxable income ≤ ₹12L (after ₹75K standard deduction, so gross salary ≤ ₹12,75,000 pays zero tax).</p>

        <h2>The One Big Change: NPS Employer Contribution Limit</h2>
        <p>
          The most significant change for salaried employees in Budget 2026 is the enhancement of the <strong>80CCD(2)</strong> deduction for private sector employees.
        </p>
        <ul>
          <li><strong>Before Budget 2026:</strong> Private sector employees could deduct employer NPS contribution up to 10% of basic salary under 80CCD(2).</li>
          <li><strong>After Budget 2026:</strong> The limit is enhanced to <strong>14% of basic salary</strong> — matching the benefit already available to Central Government employees since 2024.</li>
        </ul>
        <p>
          This is separate from and in addition to the ₹1.5L 80C limit and the ₹50K 80CCD(1B) limit. The 80CCD(2) deduction has no upper cap in rupee terms — only the 14% of basic ceiling.
        </p>

        <h2>What This Means for a ₹20L CTC Employee</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Scenario</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Deduction</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Tax Saved (30%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Employer NPS at 10% of basic (₹8L basic)", "₹80,000", "₹24,960"],
                ["Employer NPS at 14% of basic (₹8L basic)", "₹1,12,000", "₹34,944"],
                ["Additional benefit from enhanced limit", "₹32,000 more deduction", "₹9,984 extra saved"],
              ].map(([scenario, deduction, saved]) => (
                <tr key={scenario} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${scenario.includes("Additional") ? "bg-emerald-50 dark:bg-emerald-900/20 font-semibold" : ""}`}>
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{scenario}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{deduction}</td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${scenario.includes("Additional") ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`}>{saved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Based on ₹20L CTC, ₹8L basic, 30% tax bracket, new tax regime. Actual savings depend on employer NPS offering and basic salary.</p>

        <h2>What Did Not Change (Despite Expectations)</h2>
        <ul>
          <li><strong>80C limit stays at ₹1.5L:</strong> No increase despite 12 years of no change and significant inflation erosion since 2014.</li>
          <li><strong>No new HRA for new regime:</strong> HRA exemption remains unavailable under the new tax regime.</li>
          <li><strong>Home loan interest (Section 24b):</strong> ₹2L cap for self-occupied property unchanged. No expansion to new regime.</li>
          <li><strong>No change in LTCG on equity:</strong> Long-term capital gains on equity above ₹1.25L continue to be taxed at 12.5% (changed from ₹1L to ₹1.25L threshold in July 2024 budget, not touched in Budget 2026).</li>
          <li><strong>Tax-free LTCG threshold (equity):</strong> ₹1.25L per year — unchanged from the FY 2024-25 revised level.</li>
        </ul>

        <h2>Action Items for FY 2026-27</h2>
        <ol>
          <li><strong>Check if your employer offers NPS:</strong> If you are in the 30% bracket, ask HR to enroll in employer NPS. The new 14% limit means up to ₹9,984 extra annual tax saving for a ₹20L CTC.</li>
          <li><strong>Re-evaluate old vs new regime:</strong> Slabs are unchanged. Run the comparison fresh for your FY 2026-27 expected income, especially if your salary, HRA, or home loan changed.</li>
          <li><strong>Front-load 80C by April:</strong> If you are on old regime, invest ₹1.5L in ELSS/PPF early in the year rather than in the March rush — units bought in April grow 11 extra months.</li>
          <li><strong>Declare regime preference to employer in April:</strong> The new regime is the default. If you want old regime for higher HRA/home loan deductions, inform HR before the first payslip.</li>
        </ol>

        <p>
          Use the <Link href="/income-tax-calculator/">Income Tax Calculator</Link> to compare your FY 2026-27 tax liability under both regimes with your actual deductions.
        </p>

        <blockquote>
          <strong>The stagnant ₹1.5L trap:</strong> ₹1.5 lakh invested in 2014 (when the limit was set) would be worth ₹2.6L in today's money at 4% inflation. The real value of 80C has quietly eroded 40% over 12 years. If the government's goal is to encourage savings, the limit needs an urgent update — but Budget 2026 deferred this again.
        </blockquote>
      </ArticleShell>
    </>
  );
}
