import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "ppf-vs-nps-vs-elss";
const title = "PPF vs NPS vs ELSS — Where to Put Your ₹1.5 Lakh (80C Limit)";
const description = "Detailed comparison of PPF, NPS, and ELSS for FY 2025-26 — returns, tax treatment, lock-in, liquidity, and the right mix for different investor profiles.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "Which is better — PPF or ELSS?", answer: "ELSS historically delivers 12–14% returns vs PPF's guaranteed 7.1%. But ELSS has market risk and only a 3-year lock-in vs PPF's 15 years. For long-term (15+ years) wealth building, ELSS wins. For guaranteed, risk-free returns and tax-free maturity, PPF wins. Most advisors suggest splitting: ₹50K PPF + ₹1L ELSS." },
  { question: "Is PPF better than NPS for retirement?", answer: "PPF: 7.1% guaranteed, EEE status (100% tax-free), 15-year lock-in. NPS: 10-12% market-linked, 60% tax-free lump sum + taxable pension. For pure retirement: NPS (higher returns, extra ₹50K deduction via 80CCD1B). For guaranteed tax-free corpus: PPF. Best strategy: max PPF (₹1.5L/year) + put ₹50K in NPS via 80CCD(1B) for the extra deduction." },
  { question: "What is the 80C limit for FY 2025-26?", answer: "The Section 80C limit remains ₹1,50,000 for FY 2025-26 (unchanged since 2014). This includes: PPF, ELSS, EPF employee contribution, LIC premium, home loan principal repayment, NSC, 5-year bank FD, Sukanya Samriddhi Yojana, and more. The limit applies cumulatively — all 80C instruments together cannot exceed ₹1.5L." },
  { question: "Can I invest in all three — PPF, NPS, and ELSS?", answer: "Yes. You can invest in all three simultaneously. PPF up to ₹1.5L/year (80C limit). NPS Tier 1 up to ₹50K/year via 80CCD(1B) — this is OVER AND ABOVE the ₹1.5L 80C limit. ELSS within the ₹1.5L 80C limit. Combined, you can get deductions on ₹2L+ per year through a PPF+NPS combination." },
];

export default function PPFNPSELSSPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2025-05-18"
        readingTime="9 min read"
        relatedSlugs={["ppf-calculator", "nps-calculator", "sip-calculator", "income-tax-calculator"]}
      >
        <h2>Head-to-Head Comparison</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Factor</th>
                <th className="text-right px-4 py-2.5 font-semibold text-amber-600 dark:text-amber-400">PPF</th>
                <th className="text-right px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">NPS Tier 1</th>
                <th className="text-right px-4 py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">ELSS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Returns",           "7.1% guaranteed",    "10–12% market-linked", "12–14% market-linked"],
                ["Return type",       "Fixed (Govt)",        "Variable (fund)",      "Variable (equity)"],
                ["Lock-in",           "15 years",            "Till age 60",          "3 years"],
                ["Tax on investment", "80C (up to ₹1.5L)",   "80CCD(1) + 80CCD(1B)", "80C (up to ₹1.5L)"],
                ["Tax on maturity",   "100% tax-free (EEE)", "60% tax-free, 40% annuity", "LTCG @10% above ₹1L"],
                ["Risk",              "Zero",                "Low-medium",           "Medium-high"],
                ["Liquidity",         "Partial from Yr 7",   "Restricted",           "After 3 years"],
                ["Minimum/year",      "₹500",                "₹1,000",               "₹500 SIP"],
                ["Maximum/year",      "₹1,50,000",           "No limit (deduction has cap)", "No limit"],
              ].map(([factor, ppf, nps, elss]) => (
                <tr key={factor} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{factor}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-amber-700 dark:text-amber-400">{ppf}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-blue-700 dark:text-blue-400">{nps}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-emerald-700 dark:text-emerald-400">{elss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>₹1.5 Lakh Over 15 Years — Return Comparison</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Instrument</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Invested</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Maturity (Pre-Tax)</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Take-Home (Post-Tax)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["PPF @ 7.1%",      "₹22.5L", "₹40.7L", "₹40.7L (100% exempt)"],
                ["NPS @ 11% (60%)", "₹22.5L", "₹52.4L", "₹42.6L (60% tax-free)"],
                ["ELSS @ 13%",      "₹22.5L", "₹62.5L", "₹57.8L (LTCG on gains)"],
                ["Bank FD @ 7%",    "₹22.5L", "₹40.1L", "₹32.1L (taxed at 30%)"],
              ].map(([inst, invested, maturity, takehome]) => (
                <tr key={inst} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{inst}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{invested}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{maturity}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{takehome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Annual investment ₹1.5L. ELSS post-tax: gains above ₹1L taxed at 10% LTCG. NPS post-tax: 40% annuity mandatory, taxable pension. Returns illustrative — not guaranteed for NPS/ELSS.</p>

        <h2>Who Should Choose What</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Profile</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Best Choice</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Conservative investor, age 40+", "PPF", "Guaranteed returns, zero risk, tax-free"],
                ["Aggressive investor, age 25–35", "ELSS", "Highest long-term returns, short 3-yr lock-in"],
                ["Salaried, wants pension income", "NPS", "Extra ₹50K deduction, structured retirement income"],
                ["Business owner, irregular income", "ELSS SIP", "Flexible, no mandatory annual deposit"],
                ["Parent investing for child's future", "PPF or ELSS", "PPF for safety, ELSS for growth"],
                ["Wants all three benefits", "Mix: PPF+NPS+ELSS", "PPF ₹50K + NPS ₹50K (extra deduction) + ELSS ₹50K"],
              ].map(([profile, choice, reason]) => (
                <tr key={profile} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{profile}</td>
                  <td className={`px-4 py-2.5 font-semibold text-xs ${choice.includes("ELSS") ? "text-emerald-600 dark:text-emerald-400" : choice.includes("NPS") ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"}`}>{choice}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>The Optimal 80C Strategy (FY 2025-26)</h2>
        <p>
          If you can invest ₹2 lakh per year in tax-saving instruments, here is the most tax-efficient allocation:
        </p>
        <ul>
          <li><strong>₹1,00,000 in ELSS</strong> (80C): Highest returns, 3-year lock-in, 10% LTCG on maturity.</li>
          <li><strong>₹50,000 in PPF</strong> (80C): Guaranteed 7.1%, fully tax-free, builds safe corpus.</li>
          <li><strong>₹50,000 in NPS via 80CCD(1B)</strong>: This is <em>outside</em> the ₹1.5L 80C limit — extra ₹50K deduction worth ₹15,600 in tax at 30% bracket.</li>
        </ul>
        <p>
          Total deductions: ₹2,00,000. Tax saved at 30% bracket: ₹62,400 + ₹15,600 = <strong>₹78,000/year</strong> = ₹6,500/month in tax savings.
        </p>

        <p>
          Use the <Link href="/ppf-calculator/">PPF Calculator</Link> and <Link href="/nps-calculator/">NPS Calculator</Link> to see exactly how your corpus grows over 15–30 years.
        </p>

        <blockquote>
          <strong>The ₹1.5L trap:</strong> The 80C limit has been ₹1.5L since 2014. With inflation, its real value has fallen by 40%. Diversify across instruments — relying solely on PPF for the full ₹1.5L means you may miss the higher returns of ELSS or the extra ₹50K NPS deduction.
        </blockquote>
      </ArticleShell>
    </>
  );
}
