import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import TaxCalculator from "@/components/tax/TaxCalculator";

export const metadata: Metadata = buildMetadata("income-tax-calculator");

const slug = "income-tax-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What are the income tax slabs for FY 2025-26?",
    answer: "New tax regime slabs (FY 2025-26): 0% up to ₹4L, 5% from ₹4L–8L, 10% from ₹8L–12L, 15% from ₹12L–16L, 20% from ₹16L–20L, 25% from ₹20L–24L, 30% above ₹24L. Old regime slabs: 0% up to ₹2.5L, 5% from ₹2.5L–5L, 20% from ₹5L–10L, 30% above ₹10L. Standard deduction: ₹75,000 (new) and ₹50,000 (old).",
  },
  {
    question: "Is income up to ₹12 lakh tax-free in FY 2025-26?",
    answer: "Yes. Under the new tax regime, if your net taxable income (after ₹75,000 standard deduction) is ₹12 lakh or less, Section 87A rebate eliminates the entire tax. So a salaried person with gross salary up to ₹12.75 lakh pays ZERO income tax in FY 2025-26 under the new regime. Income above ₹12L is taxed normally — the benefit is not a cliff-edge, just that the marginal rate kicks in from ₹12L onwards.",
  },
  {
    question: "Which tax regime is better — old or new?",
    answer: "New regime is better if your total deductions are less than ~₹4.25L. Old regime wins if you claim: Section 80C ₹1.5L + HRA + home loan interest ₹2L + NPS 80CCD(1B) ₹50K + health insurance 80D ₹25K = ₹4.75L+ deductions. For income of ₹15L: new regime tax = ₹1.05L, old regime with ₹4.75L deductions = taxable income ₹10.25L, tax = ₹1.12L. Use our calculator above to compare instantly for your exact numbers.",
  },
  {
    question: "What is the Section 87A tax rebate?",
    answer: "Section 87A rebate: If your total taxable income (after all deductions) is ₹12 lakh or less under the new regime, or ₹5 lakh or less under the old regime — the entire tax liability becomes ZERO. Under old regime: max rebate is ₹12,500. Under new regime: rebate eliminates full tax up to ₹12L taxable income. Budget 2025 enhanced this, making the new regime highly attractive for income up to ₹12.75L gross.",
  },
  {
    question: "What deductions can I claim under the old tax regime?",
    answer: "Old tax regime deductions: Section 80C (₹1.5L limit) — EPF, PPF, ELSS, LIC, home loan principal, NSC, tuition fees; Section 80D — health insurance premium ₹25K (self) + ₹50K (parents above 60); Section 24(b) — home loan interest ₹2L/year; Section 80CCD(1B) — NPS additional ₹50K; Section 80E — education loan interest (no limit); HRA exemption — lower of (actual HRA, 40%/50% of basic, actual rent minus 10% of basic); Standard deduction ₹50,000.",
  },
  {
    question: "What is standard deduction for salaried employees in FY 2025-26?",
    answer: "Standard deduction for salaried employees: ₹75,000 under the new tax regime (increased from ₹50,000 in Budget 2024). ₹50,000 under the old tax regime. Standard deduction is automatically applied — no documentation needed. This flat deduction reduces gross salary to arrive at net salary before other deductions. Both regimes allow standard deduction for salaried and pensioners.",
  },
  {
    question: "What is the surcharge on income tax in FY 2025-26?",
    answer: "Surcharge on income tax: Income ₹50L–₹1Cr → 10% surcharge on tax, ₹1Cr–₹2Cr → 15% surcharge, ₹2Cr–₹5Cr → 25% surcharge, above ₹5Cr → 37% surcharge (new regime caps at 25%). Health & Education Cess: 4% on (tax + surcharge) — applicable to all. Effective tax rate for ₹1Cr income: ~34.3% (new regime). For ₹5Cr: ~42.7% (old regime) vs ~39% (new regime).",
  },
  {
    question: "How is HRA exemption calculated?",
    answer: "HRA exemption is the lowest of: (1) Actual HRA received from employer, (2) 50% of basic salary (metro cities: Delhi, Mumbai, Chennai, Kolkata) or 40% of basic (non-metro), (3) Actual rent paid minus 10% of basic salary. Example: Basic ₹50K, HRA ₹20K, Rent ₹18K in Mumbai. Exemptions: (1) ₹20K, (2) ₹25K, (3) ₹18K–₹5K = ₹13K. Lowest = ₹13K is exempt. HRA exemption not available under new tax regime.",
  },
  {
    question: "What is Section 80C and what qualifies?",
    answer: "Section 80C allows deduction up to ₹1.5 lakh per year (old regime only). Qualifying investments: EPF employee contribution, PPF (Public Provident Fund), ELSS mutual funds (best returns, 3-year lock-in), NSC, 5-year bank FD, LIC premium, home loan principal repayment, tuition fees (2 children), NPS Tier-1 contribution (basic). Strategy: ELSS gets 80C benefit + historically best returns among 80C options.",
  },
  {
    question: "Can I switch between old and new tax regime?",
    answer: "Salaried employees: Yes, can switch every year when filing ITR. Choose the regime that saves more tax for that year's income and deductions. Business/self-employed: Once you opt for old regime, switching back to new regime is allowed only once in a lifetime. Most salaried people can compare both regimes each year and choose optimally. Tell your employer which regime you want at the start of the year for correct TDS deduction.",
  },
  {
    question: "What is advance tax and when should I pay it?",
    answer: "Advance tax is for those whose total tax liability exceeds ₹10,000 in a year. Payment schedule: 15% by June 15, 45% by September 15, 75% by December 15, 100% by March 15. Applicable to: self-employed, freelancers, those with capital gains, rental income, or any non-salary income. Salaried employees with only salary income don't need advance tax (TDS handles it). Late payment: 1% interest per month under Section 234B/234C.",
  },
  {
    question: "What is TDS and when is it deducted?",
    answer: "TDS (Tax Deducted at Source) is tax deducted before paying income. For salary: employer deducts TDS based on your projected annual income and declared investments. TDS is deducted when: Salary paid (every month), FD interest above ₹40,000/year (10% TDS), Rent above ₹50,000/month (5% TDS), Freelance/professional fees above ₹30,000 (10% TDS). You can claim TDS credit when filing ITR — it reduces your tax payable. File Form 15G/15H if no tax liability and want to avoid TDS on FD.",
  },
  {
    question: "How is capital gains tax calculated in India?",
    answer: "Capital gains tax for FY 2025-26: Equity/equity funds: STCG (< 1 year) 20%, LTCG (> 1 year, gains above ₹1.25L) 12.5%. Debt funds: taxed at income slab rate (same as your tax bracket). Real estate: STCG at slab rate (< 2 years), LTCG 12.5% without indexation or 20% with indexation (choose lower). Gold: LTCG (> 2 years) 12.5%. Set off losses: Short-term losses can be set off against both STCG and LTCG. Long-term losses only against LTCG.",
  },
  {
    question: "What is the last date to file ITR for FY 2025-26?",
    answer: "ITR filing deadlines for FY 2025-26 (AY 2026-27): Individuals/HUF not under audit: July 31, 2026 (typically). Businesses requiring audit: October 31, 2026. With tax audit and transfer pricing: November 30, 2026. Belated ITR (with penalty ₹5,000): December 31, 2026. Late filing penalty: ₹1,000 if income ≤ ₹5L, ₹5,000 otherwise. Interest on unpaid tax: 1% per month from due date. Always file on time to avoid penalties and protect refund eligibility.",
  },
  {
    question: "What is the new income tax regime default for FY 2025-26?",
    answer: "New tax regime is the DEFAULT for FY 2025-26. Salaried employees who don't explicitly choose old regime will automatically be under the new regime. To opt for old regime: submit declaration to employer at start of year, or choose old regime while filing ITR. The new regime makes more sense for most taxpayers with income up to ₹15L and minimal deductions. Those with large deductions (home loan, NPS, HRA) should compare both using our calculator.",
  },
];

const HOW_TO_STEPS = [
  { name: "Select financial year and age group", text: "Choose FY 2025-26 (current year). Select your age group — General (under 60), Senior Citizen (60–79), or Super Senior (80+). Different slabs apply." },
  { name: "Enter gross salary income", text: "Enter your annual gross salary (CTC minus employer PF and gratuity). Include any other income like interest, freelance, or rental income." },
  { name: "Add deductions for old regime", text: "Under old regime, enter 80C investments (PPF, ELSS, LIC), HRA rent paid, home loan interest, 80D health insurance, and other deductions." },
  { name: "Compare new vs old regime", text: "The calculator automatically computes tax under both regimes side by side. The lower tax regime is highlighted — switch to see the exact saving." },
  { name: "Check effective tax rate", text: "View your effective tax rate (tax paid ÷ total income) — this helps compare your tax burden year over year and plan investments." },
];

export default function IncomeTaxPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "Income Tax Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema("Income Tax Calculator FY 2025-26", "How to calculate income tax for FY 2025-26 using RupeesCalc", HOW_TO_STEPS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["gst-calculator", "sip-calculator", "fd-calculator", "emi-calculator"]}
        content={<TaxContent />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <TaxCalculator />
      </CalculatorShell>
    </>
  );
}

function TaxContent() {
  return (
    <>
      <h2>Income Tax Calculator FY 2025-26</h2>
      <p>
        Our <strong>Income Tax Calculator FY 2025-26</strong> (AY 2026-27) helps you compute your exact tax liability under both the old and new tax regimes and instantly tells you which regime saves more money. Enter your gross salary, HRA, and key deductions to get your net tax payable in seconds.
      </p>
      <p>
        Budget 2025 made the new tax regime the default, enhanced the Section 87A rebate to cover income up to ₹12 lakh, and increased standard deduction to ₹75,000 — making the new regime attractive for most salaried taxpayers.
      </p>

      <h2>New Tax Regime Slabs — FY 2025-26</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Income Slab</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">New Regime</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Old Regime</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["Up to ₹2.5 lakh", "0%", "0%"],
              ["₹2.5L – ₹4L", "0%", "5%"],
              ["₹4L – ₹5L", "5%", "5%"],
              ["₹5L – ₹8L", "5%", "20%"],
              ["₹8L – ₹10L", "10%", "20%"],
              ["₹10L – ₹12L", "10%", "30%"],
              ["₹12L – ₹15L", "15%", "30%"],
              ["₹15L – ₹16L", "15%–20%", "30%"],
              ["₹16L – ₹20L", "20%", "30%"],
              ["₹20L – ₹24L", "25%", "30%"],
              ["Above ₹24L", "30%", "30%"],
            ].map(([slab, newRate, oldRate]) => (
              <tr key={slab} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{slab}</td>
                <td className="px-4 py-2.5 text-right font-semibold text-brand">{newRate}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{oldRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Key Changes in Budget 2025</h2>
      <ul>
        <li><strong>Zero tax up to ₹12L</strong> — Section 87A rebate covers full tax for income ≤ ₹12L (new regime)</li>
        <li><strong>Standard deduction ₹75,000</strong> — increased from ₹50,000 (new regime)</li>
        <li><strong>New regime as default</strong> — employers deduct TDS under new regime unless you opt for old</li>
        <li><strong>NPS employer contribution</strong> — still deductible under 80CCD(2) in new regime</li>
      </ul>

      <h2>Old Regime vs New Regime — When to Choose</h2>
      <p>
        <strong>Choose New Regime if:</strong> Gross salary under ₹12.75L (zero tax), fewer deductions (renting, no home loan, no large 80C investments), simpler filing.
      </p>
      <p>
        <strong>Choose Old Regime if:</strong> You claim HRA + ₹1.5L 80C + ₹2L home loan interest + ₹50K NPS + ₹25K health insurance. For ₹12L–₹20L income with full deductions, old regime often saves ₹30,000–₹70,000 in tax.
      </p>

      <blockquote>
        <strong>Disclaimer:</strong> This income tax calculator is for FY 2025-26 estimation only. Tax laws are complex and change frequently. Consult a Chartered Accountant (CA) or tax professional for personalized tax advice.
      </blockquote>
    </>
  );
}
