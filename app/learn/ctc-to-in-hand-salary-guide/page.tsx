import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "ctc-to-in-hand-salary-guide";
const title = "CTC to In-Hand Salary: Every Deduction Explained";
const description = "Step-by-step breakdown of how CTC becomes in-hand salary. Employer PF, gratuity, gross salary, employee PF, professional tax, and income tax TDS — with worked examples for ₹8L to ₹30L CTC.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "How much in-hand salary will I get for ₹12 LPA CTC?", answer: "For ₹12L CTC (40% basic, metro, new tax regime, PF included in CTC): Basic = ₹4.8L, HRA = ₹2.4L, Gross Salary ≈ ₹11.19L. Deductions: Employee PF ₹57,600, PT ₹2,400, Income Tax ₹0 (taxable income < ₹12L). Monthly in-hand ≈ ₹89,400. Use our salary calculator for exact figures." },
  { question: "What is the difference between CTC and gross salary?", answer: "CTC = Gross Salary + Employer PF (12% of basic) + Gratuity (4.81% of basic). Employer PF and gratuity are costs the company pays on top of your gross — they never appear in your monthly payslip. Gross Salary = CTC − Employer PF − Gratuity. This is what your payslip shows before your own deductions." },
  { question: "What is the take-home salary for ₹15 LPA?", answer: "For ₹15L CTC (40% basic, metro, new regime): Basic ₹6L, HRA ₹3L, Gross ≈ ₹13.96L. Employee PF ₹72,000, PT ₹2,400, Income Tax TDS ≈ ₹35,000. Annual take-home ≈ ₹12.85L. Monthly ≈ ₹1,07,083. Old regime with full deductions may give ₹1,500–₹2,000/month more." },
  { question: "Is PF included in CTC or paid separately?", answer: "It depends on the company. Some include employer PF in CTC (meaning your gross salary is lower). Others pay employer PF over and above CTC. Always check your offer letter. If PF is in-CTC: lower in-hand salary. If PF is extra: higher in-hand salary for the same CTC number." },
];

const EXAMPLES = [
  { ctc: 800000,  basic: 320000, hra: 160000, special: 250920, empPF: 38400,  gratuity: 15392,  grossSalary: 746208,  emplPFmonth: 3200,  pt: 2400, tax: 0,      inhand: 71150 },
  { ctc: 1200000, basic: 480000, hra: 240000, special: 362880, empPF: 57600,  gratuity: 23088,  grossSalary: 1119312, emplPFmonth: 4800,  pt: 2400, tax: 0,      inhand: 92696 },
  { ctc: 1500000, basic: 600000, hra: 300000, special: 420000, empPF: 72000,  gratuity: 28860,  grossSalary: 1399140, emplPFmonth: 6000,  pt: 2400, tax: 31200,  inhand: 107145 },
  { ctc: 2000000, basic: 800000, hra: 400000, special: 550000, empPF: 96000,  gratuity: 38480,  grossSalary: 1865520, emplPFmonth: 8000,  pt: 2400, tax: 93600,  inhand: 139127 },
  { ctc: 3000000, basic: 1200000,hra: 600000, special: 812880, empPF: 144000, gratuity: 57720,  grossSalary: 2798280, emplPFmonth: 12000, pt: 2400, tax: 218400, inhand: 214540 },
];

function fmtINR(n: number) { return `₹${Math.round(n).toLocaleString("en-IN")}` }

export default function CTCToInHandPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2025-05-18"
        readingTime="8 min read"
        relatedSlugs={["salary-calculator", "income-tax-calculator", "hra-calculator", "gratuity-calculator"]}
      >
        <h2>The Two-Step Conversion</h2>
        <p>
          CTC to in-hand involves two separate calculations most people confuse:
        </p>
        <ol>
          <li><strong>CTC → Gross Salary:</strong> Remove what the employer pays but you never see (employer PF and gratuity).</li>
          <li><strong>Gross Salary → In-Hand:</strong> Remove what is deducted from your payslip (employee PF, professional tax, income tax TDS).</li>
        </ol>

        <h2>Step 1: CTC → Gross Salary</h2>
        <p>A typical CTC structure (40% basic):</p>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Component</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Formula</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Example (₹12L CTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Basic Salary",       "40% of CTC",            "₹4,80,000"],
                ["HRA",                "50% of basic (metro)",  "₹2,40,000"],
                ["Special Allowance",  "Residual",              "₹3,62,880"],
                ["Employer PF",        "12% of basic (hidden)", "₹57,600"],
                ["Gratuity",           "4.81% of basic (hidden)","₹23,088"],
                ["= CTC",              "Sum of all",            "₹12,00,000 ✓"],
                ["Gross Salary",       "CTC − Emp PF − Gratuity","₹11,19,312"],
              ].map(([comp, formula, ex]) => (
                <tr key={comp} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${comp === "Gross Salary" ? "bg-blue-50 dark:bg-blue-900/20 font-semibold" : ""}`}>
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{comp}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400">{formula}</td>
                  <td className="px-4 py-2.5 text-right text-slate-700 dark:text-slate-200">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Step 2: Gross Salary → Monthly In-Hand</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Deduction</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Rule</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Amount (₹12L CTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Monthly Gross",         "Gross ÷ 12",                         "₹93,276/month"],
                ["Employee PF",           "12% of basic, max ₹1,800/month",     "−₹4,800/month"],
                ["Professional Tax",      "₹200/month (most states)",           "−₹200/month"],
                ["Income Tax TDS",        "Annual tax ÷ 12 (new regime 2025-26)", "−₹0/month"],
                ["Monthly In-Hand",       "Gross − PF − PT − TDS",              "₹88,276/month"],
              ].map(([ded, rule, amt]) => (
                <tr key={ded} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${ded === "Monthly In-Hand" ? "bg-emerald-50 dark:bg-emerald-900/20 font-bold" : ""}`}>
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{ded}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400">{rule}</td>
                  <td className={`px-4 py-2.5 text-right ${ded === "Monthly In-Hand" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"}`}>{amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>CTC vs In-Hand Salary Table (New Regime, Metro, 40% Basic)</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">CTC</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly Gross</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">PF</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">TDS</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">In-Hand/Month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {EXAMPLES.map((e) => (
                <tr key={e.ctc} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-bold text-slate-900 dark:text-white">{fmtINR(e.ctc / 100000)}L</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtINR(e.grossSalary / 12)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">−{fmtINR(e.emplPFmonth)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">−{fmtINR(e.tax / 12)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">{fmtINR(e.inhand)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">PF calculated at 12% of basic. PT ₹200/month. New regime FY 2025-26. TDS at ₹15L includes ~₹35,000 annual tax.</p>

        <h2>Why Your Offer Letter CTC Looks Higher Than Expected</h2>
        <ul>
          <li><strong>PF included in CTC:</strong> Many companies include both employer PF (12%) and gratuity (4.81%) in CTC. These ~17% are your CTC but not your gross salary.</li>
          <li><strong>Variable pay:</strong> Some companies show 100% variable pay in CTC but only pay it if targets are met. Check "fixed CTC" vs "total CTC" in your offer.</li>
          <li><strong>ESOP / RSU:</strong> Often included in CTC at notional value. These vest over 3–4 years and may be worth zero if the company doesn't perform.</li>
          <li><strong>Insurance and perks:</strong> Medical insurance, meal vouchers, phone bills — sometimes inflated in CTC calculations.</li>
        </ul>

        <p>
          Use the <Link href="/salary-calculator/">Salary Calculator</Link> to get your exact in-hand salary for any CTC level — it handles all deductions automatically.
        </p>

        <blockquote>
          <strong>Negotiation tip:</strong> Always negotiate on "fixed annual gross" not on "CTC". A company offering "₹15L CTC with PF in CTC" gives you less in-hand than another offering "₹14L CTC with PF over and above." Ask for the net monthly number before accepting any offer.
        </blockquote>
      </ArticleShell>
    </>
  );
}
