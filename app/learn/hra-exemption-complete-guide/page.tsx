import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "hra-exemption-complete-guide";
const title = "Complete Guide to HRA Exemption — 5 Real Scenarios";
const description = "How HRA exemption works under old tax regime, which cities count as metro, 5 worked examples from ₹8L to ₹30L salary, and how to pay rent to parents legally.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "Can I pay rent to my parents and claim HRA?", answer: "Yes. You can pay rent to your parents and claim HRA exemption — provided: (1) Rent agreement exists. (2) You make regular bank transfers. (3) Parents declare it as rental income in their ITR. (4) The property belongs to parents, not jointly with you. This is legal and commonly used." },
  { question: "Is HRA available in the new tax regime?", answer: "No. HRA exemption is available ONLY under the old tax regime. Under the new regime, the full HRA received is taxable. This is one of the biggest reasons why the old regime is better for employees in rented accommodation, especially in metro cities." },
  { question: "Which cities count as metro for HRA?", answer: "Only 4 cities qualify for 50% HRA exemption (metro): Mumbai, Delhi, Kolkata, Chennai. All other cities — including Bangalore, Hyderabad, Pune, Ahmedabad — are non-metro and get only 40% of basic. This has not been updated despite the growth of tech cities." },
  { question: "My landlord refuses to give PAN. Can I still claim HRA?", answer: "If your annual rent exceeds ₹1 lakh, landlord PAN is mandatory. If they refuse, you can get Form 60 from them (no-PAN declaration). If that's also refused, your employer will deduct TDS on rent. You can still claim the HRA exemption in your ITR — but document everything." },
  { question: "Can I claim HRA and home loan deduction at the same time?", answer: "Yes. If you live in a rented house in one city and own a house (with a home loan) in another city, you can claim both HRA exemption (for rent paid) and home loan interest deduction under Section 24(b) and principal under 80C." },
];

// 5 scenarios
const SCENARIOS = [
  {
    label: "Scenario 1: ₹8L CTC, Bangalore (non-metro), Rent ₹12,000/month",
    basic: 240000, hra: 96000, rent: 144000, metro: false,
    l1: 96000, l2: 120000, l3: 96000, exempt: 96000,
    note: "Limit 1 (actual HRA received) is the binding constraint."
  },
  {
    label: "Scenario 2: ₹12L CTC, Delhi (metro), Rent ₹18,000/month",
    basic: 360000, hra: 180000, rent: 216000, metro: true,
    l1: 180000, l2: 180000, l3: 180000, exempt: 180000,
    note: "All three limits are equal at ₹1.5L/year = ₹15,000/month."
  },
  {
    label: "Scenario 3: ₹15L CTC, Mumbai (metro), Rent ₹25,000/month",
    basic: 450000, hra: 225000, rent: 300000, metro: true,
    l1: 225000, l2: 255000, l3: 225000, exempt: 225000,
    note: "Limit 1 (HRA received) is the binding constraint."
  },
  {
    label: "Scenario 4: ₹20L CTC, Hyderabad (non-metro), Rent ₹30,000/month",
    basic: 600000, hra: 240000, rent: 360000, metro: false,
    l1: 240000, l2: 300000, l3: 240000, exempt: 240000,
    note: "Limit 1 (HRA received) limits exemption to ₹20,000/month."
  },
  {
    label: "Scenario 5: ₹30L CTC, Delhi (metro), Rent ₹45,000/month",
    basic: 900000, hra: 450000, rent: 540000, metro: true,
    l1: 450000, l2: 450000, l3: 450000, exempt: 450000,
    note: "Higher salary, high rent — all limits converge, maximum exemption."
  },
];

function fmtINR(n: number) { return `₹${n.toLocaleString("en-IN")}` }

export default function HRAExemptionGuidePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2025-05-18"
        readingTime="8 min read"
        relatedSlugs={["hra-calculator", "income-tax-calculator", "salary-calculator", "home-loan-emi-calculator"]}
      >
        <h2>The HRA Exemption Formula</h2>
        <p>
          HRA exemption under <strong>Section 10(13A)</strong> is the <strong>lowest</strong> of three limits:
        </p>
        <ol>
          <li><strong>Limit 1:</strong> Actual HRA received from employer</li>
          <li><strong>Limit 2:</strong> Rent paid − 10% of (Basic + DA)</li>
          <li><strong>Limit 3:</strong> 50% of (Basic + DA) for metro cities, 40% for non-metro</li>
        </ol>
        <p>
          The taxable HRA = Total HRA received − Exemption amount. This is added back to your income and taxed at your slab rate.
        </p>

        <h2>Metro vs Non-Metro Cities for HRA</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Category</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Cities</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">HRA % of Basic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Metro (50%)</td>
                <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">Mumbai, Delhi (+ NCR), Kolkata, Chennai</td>
                <td className="px-4 py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">50%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-semibold text-slate-500">Non-Metro (40%)</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">Bangalore, Hyderabad, Pune, Ahmedabad + all others</td>
                <td className="px-4 py-2.5 text-right font-bold text-slate-600 dark:text-slate-300">40%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Note: This 4-city list is unchanged since 1974. Despite Bangalore and Hyderabad having rent levels comparable to Mumbai/Delhi, they still get only 40% exemption.</p>

        <h2>5 Worked Scenarios</h2>
        {SCENARIOS.map((s, i) => (
          <div key={i} className="my-4 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.label}</p>
            </div>
            <div className="p-4 text-sm space-y-1 text-slate-600 dark:text-slate-300">
              <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                <div>Basic: <strong>{fmtINR(s.basic)}/yr</strong></div>
                <div>HRA received: <strong>{fmtINR(s.hra)}/yr</strong></div>
                <div>Rent paid: <strong>{fmtINR(s.rent)}/yr</strong></div>
              </div>
              <p>Limit 1 (Actual HRA): <strong>{fmtINR(s.l1)}</strong></p>
              <p>Limit 2 (Rent − 10% of basic): <strong>{fmtINR(s.l2)}</strong> ({fmtINR(s.rent)} − {fmtINR(s.basic * 0.1)} = {fmtINR(s.rent - s.basic * 0.1)})</p>
              <p>Limit 3 ({s.metro ? "50% of basic (metro)" : "40% of basic (non-metro)"}): <strong>{fmtINR(s.l3)}</strong></p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">→ HRA Exemption = {fmtINR(s.exempt)}/year = {fmtINR(s.exempt / 12)}/month</p>
              <p className="text-xs text-slate-400">{s.note}</p>
            </div>
          </div>
        ))}

        <h2>Paying Rent to Parents — Step-by-Step</h2>
        <ol>
          <li>Ensure the property is solely in your parent's name (not joint with you).</li>
          <li>Create a written rent agreement (notarized for amounts above ₹8,333/month).</li>
          <li>Transfer rent via bank — NEFT/IMPS/UPI. Cash rent is not accepted for HRA claims.</li>
          <li>Collect rent receipts from your parent monthly (or quarterly).</li>
          <li>If annual rent exceeds ₹1 lakh, provide parent's PAN to your employer.</li>
          <li>Your parent must declare this rental income in their ITR as "Income from House Property."</li>
        </ol>
        <p>
          <strong>Tax efficiency:</strong> If your parent is a senior citizen or in a lower tax bracket, this strategy reduces your family's combined tax burden. The rent you pay reduces your taxable income (saves you 20–30% tax), while your parent may pay 0–5% tax on that rental income.
        </p>

        <h2>Common HRA Mistakes to Avoid</h2>
        <ul>
          <li><strong>Not submitting rent receipts on time:</strong> Most employers require receipts by December or January. Miss the deadline and you lose the exemption for that year — though you can still claim it in your ITR.</li>
          <li><strong>Paying rent in cash:</strong> Cash rent is not acceptable for HRA claims above ₹3,000/month. Always use bank transfer.</li>
          <li><strong>Claiming HRA without paying rent:</strong> This is tax fraud. The department cross-checks bank statements during scrutiny.</li>
          <li><strong>Ignoring HRA under new regime:</strong> If you switched to new regime thinking HRA is available, it is not. You must be on old regime to claim HRA.</li>
          <li><strong>Not claiming in ITR even if employer missed it:</strong> If you forgot to submit receipts to your employer, you can still claim the exemption directly in your ITR and get a TDS refund.</li>
        </ul>

        <p>Use the <Link href="/hra-calculator/">HRA Exemption Calculator</Link> to instantly see your exact tax-free HRA for your specific salary and rent amount.</p>

        <blockquote>
          <strong>The 10% rule:</strong> If your monthly rent is less than 10% of your basic salary, Limit 2 becomes zero — meaning no HRA exemption at all. Example: Basic ₹60,000/month, paying rent ₹5,000/month — Limit 2 = ₹5,000 − ₹6,000 = −₹1,000 → zero exemption. Always pay rent at least 11% of your basic to get any benefit.
        </blockquote>
      </ArticleShell>
    </>
  );
}
