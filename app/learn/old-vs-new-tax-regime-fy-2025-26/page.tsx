import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "old-vs-new-tax-regime-fy-2025-26";
const title = "Old vs New Tax Regime FY 2025-26: Which Saves You More?";
const description = "Complete comparison of old and new income tax regimes for FY 2025-26. Exact tax calculations for 5 salary levels — ₹8L, ₹12L, ₹15L, ₹20L, ₹30L — with deductions.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "Which tax regime is better for ₹12 lakh salary in FY 2025-26?", answer: "For ₹12 lakh gross salary with standard deduction, taxable income under new regime = ₹11.25L. Tax = ₹0 (rebate u/s 87A applies as taxable income ≤ ₹12L post standard deduction). Old regime saves more only if your total deductions exceed ~₹4–5 lakh including 80C, HRA, home loan interest, etc." },
  { question: "What is the standard deduction in new regime 2025-26?", answer: "The standard deduction under the new tax regime is ₹75,000 for FY 2025-26 (increased from ₹50,000 in FY 2023-24). Under the old regime, standard deduction is ₹50,000. The higher standard deduction in the new regime is one key reason it benefits most salaried employees." },
  { question: "Is the new tax regime compulsory from FY 2025-26?", answer: "No, the new regime is the DEFAULT for salaried employees but not compulsory. You can opt for the old regime every financial year by filing your preference with your employer at the start of the year (usually April). You can also switch regimes when filing your ITR." },
  { question: "What deductions are available in the new tax regime?", answer: "New regime allows very few deductions: Standard deduction (₹75,000), NPS employer contribution (80CCD(2)), Agniveer Corpus Fund, and a few others. Most popular deductions are NOT available: 80C, HRA, 80D, home loan interest under 24(b), LTA, professional tax deduction." },
  { question: "When is old regime better than new regime?", answer: "Old regime saves more when: (1) You pay high rent and claim HRA (₹1.5–3L/year). (2) You have a home loan with ₹2L+ interest. (3) You max out 80C (₹1.5L). (4) You invest in NPS (₹50K extra via 80CCD1B). (5) You pay ₹25K+ health insurance. If combined deductions exceed ₹4–5L, old regime usually wins." },
];

export default function OldVsNewTaxRegimePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2025-05-18"
        readingTime="10 min read"
        relatedSlugs={["income-tax-calculator", "salary-calculator", "hra-calculator", "ppf-calculator"]}
      >
        <h2>New Tax Regime Slabs — FY 2025-26</h2>
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
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Plus 4% health and education cess on tax. Section 87A rebate: zero tax if taxable income ≤ ₹12,00,000. Standard deduction: ₹75,000.</p>

        <h2>Old Tax Regime Slabs — FY 2025-26</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Taxable Income</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">General (&lt;60)</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Senior (60–79)</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Super Senior (80+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Up to ₹2.5L",   "Nil", "Nil", "Nil"],
                ["₹2.5L–₹3L",     "5%",  "Nil", "Nil"],
                ["₹3L–₹5L",       "5%",  "5%",  "Nil"],
                ["₹5L–₹10L",      "20%", "20%", "20%"],
                ["Above ₹10L",    "30%", "30%", "30%"],
              ].map(([slab, g, s, ss]) => (
                <tr key={slab} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{slab}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{g}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{s}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{ss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Standard deduction ₹50,000. Section 87A rebate: zero tax if income ≤ ₹5,00,000. Allows 80C, HRA, 80D, 24(b), etc.</p>

        <h2>5 Salary Scenarios — Which Regime Saves More?</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Gross Salary</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">New Regime Tax</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Old Regime Tax*</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["₹8 Lakh",  "₹0",       "₹0",       "Tie (zero tax in both)"],
                ["₹12 Lakh", "₹0",       "₹0",       "Tie (zero tax in both)"],
                ["₹15 Lakh", "₹31,200",  "₹26,000",  "Old (saves ₹5,200)"],
                ["₹20 Lakh", "₹93,600",  "₹72,800",  "Old (saves ₹20,800)"],
                ["₹30 Lakh", "₹2,08,000","₹1,56,000","Old (saves ₹52,000)"],
              ].map(([salary, newTax, oldTax, winner]) => (
                <tr key={salary} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-bold text-slate-900 dark:text-white">{salary}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{newTax}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{oldTax}</td>
                  <td className={`px-4 py-2.5 text-xs font-semibold ${winner.includes("Old") ? "text-violet-600 dark:text-violet-400" : "text-slate-500"}`}>{winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">*Old regime assumes: standard deduction ₹50K + full 80C ₹1.5L + HRA ₹1.68L (metro, 40% basic) + 80D ₹25K. Actual savings depend on your deductions.</p>

        <h2>The Break-Even Deduction Amount</h2>
        <p>
          The new regime is simpler but not always cheaper. The break-even point — where both regimes give the same tax — is when your <strong>total deductions exceed approximately ₹4–5 lakh</strong> (at ₹15–20L salary). Beyond this, old regime saves more.
        </p>
        <p>
          Quick check: Add up your deductions. Standard deduction (₹50K) + PF employee (₹21,600 for ₹15K basic) + 80C max (₹1.5L) = ₹2.22L without any optional deductions. If you also have HRA (₹1.5L+) or home loan interest (₹2L), you cross the break-even easily.
        </p>

        <h2>Which Regime is Right for You — Decision Tree</h2>
        <ul>
          <li><strong>Salary ≤ ₹12.75L gross</strong> → New regime. Zero tax either way, but new regime is simpler.</li>
          <li><strong>Salary ₹12.75L–₹20L, no home loan, no HRA</strong> → New regime (likely lower tax).</li>
          <li><strong>Salary ₹12.75L–₹20L, paying high rent or have home loan</strong> → Calculate both. Old regime likely wins.</li>
          <li><strong>Salary above ₹20L</strong> → Almost certainly old regime wins if you have a home loan, HRA, and full 80C investments.</li>
          <li><strong>Self-employed</strong> → New regime at flat 30% with no deductions vs old regime with business expenses — depends heavily on your deductible expenses.</li>
        </ul>

        <p>
          Use the <Link href="/income-tax-calculator/">Income Tax Calculator</Link> to enter your exact salary and deductions — it computes both regimes simultaneously and shows you the saving.
        </p>

        <blockquote>
          <strong>Important:</strong> Once you opt for the old regime and are a salaried employee, you can switch back to new regime next year. But if you have business income, switching back is not straightforward. Salaried employees can freely switch every year — choose whichever saves more after calculating deductions.
        </blockquote>
      </ArticleShell>
    </>
  );
}
