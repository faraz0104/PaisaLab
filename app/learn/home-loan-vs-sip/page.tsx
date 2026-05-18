import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "home-loan-vs-sip";
const title = "Home Loan Prepayment vs SIP: Where Should Your Extra Money Go?";
const description = "The most common personal finance question for Indian homeowners — answered with maths. The break-even rate, when each strategy wins, and the correct approach for most people.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "Should I prepay home loan or invest in SIP?", answer: "If your home loan rate is below 8.5%: Invest in SIP (equity gives ~12% long-term). If rate is 8.5–9.5%: Do both — 50/50 split. If rate is above 9.5% (personal loan, high-rate loan): Prepay first, especially in the first 5 years when interest component is highest." },
  { question: "Is prepaying home loan a good idea?", answer: "Prepaying in the first 5 years saves the most interest because early EMIs are 75-80% interest. Prepaying ₹1 lakh in Year 1 saves more than prepaying ₹1 lakh in Year 15. However, if the savings rate (post-tax) from prepayment is lower than your SIP return, invest in SIP instead." },
  { question: "What is the break-even home loan rate for SIP vs prepayment?", answer: "The break-even is roughly where post-tax home loan rate = post-tax SIP return. If you are in the 30% bracket and SIP gives 12%: post-tax SIP = ~10.2% (after LTCG at 10%). Compare this to home loan effective rate = loan rate × (1 − 30% for interest deduction) = 9% × 0.7 = 6.3%. At 9% home loan: prepayment post-tax benefit = 6.3% vs SIP post-tax = 10.2%. Invest in SIP." },
  { question: "Does home loan prepayment save tax?", answer: "Prepaying reduces the loan principal. But loan interest (up to ₹2L under Section 24b) and principal (up to ₹1.5L under 80C) give tax deductions under the old regime. If you fully prepay, you lose these deductions. At 30% tax bracket, home loan interest at 9% effectively costs 6.3% post-tax. Factor this in when comparing with SIP returns." },
];

export default function HomeLoanVsSIPPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2025-05-18"
        readingTime="9 min read"
        relatedSlugs={["home-loan-emi-calculator", "sip-calculator", "emi-calculator", "income-tax-calculator"]}
      >
        <h2>The Core Question</h2>
        <p>
          You have ₹20,000/month extra after your EMI. Should you add it as a home loan prepayment or start a ₹20,000/month SIP in equity mutual funds?
        </p>
        <p>
          The answer depends on <strong>three numbers</strong>: your home loan interest rate, your tax bracket, and your expected SIP return. Here is the framework.
        </p>

        <h2>The Math — ₹50L Home Loan at 9%, ₹20,000/Month Extra</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Strategy</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">After 10 Years</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Net Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Prepay ₹20K/month on ₹50L @ 9% loan", "Loan closed in ~13 yrs (saves ₹7.2L interest)", "Debt-free 7 years early, ₹7.2L saved"],
                ["SIP ₹20K/month @ 12% for 10 years",    "SIP corpus = ₹46.5L",                           "₹46.5L corpus, loan still running"],
                ["SIP ₹20K/month @ 10% for 10 years",    "SIP corpus = ₹41.4L",                           "₹41.4L corpus, loan still running"],
              ].map(([strategy, result, net]) => (
                <tr key={strategy} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{strategy}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{result}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400">{net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          At 9% loan rate and 12% SIP return: SIP wins by ₹39L over 10 years. But this ignores the psychological peace of being debt-free and the tax deductions you lose.
        </p>

        <h2>The Break-Even Rate — When Each Strategy Wins</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Scenario</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Verdict</th>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                ["Home loan rate < 7.5%", "Invest in SIP", "Post-tax SIP return (10%+) comfortably beats loan cost"],
                ["Home loan rate 7.5–8.5%", "SIP (lean towards)", "SIP return likely higher post-tax, but margin narrower"],
                ["Home loan rate 8.5–9.5%", "Do 50/50", "Break-even zone — diversify risk"],
                ["Home loan rate > 9.5%", "Prepay first", "Guaranteed 9.5% return by prepaying beats uncertain SIP"],
                ["Personal/top-up loan at 12–14%", "Prepay always", "No SIP reliably beats 12%+ guaranteed savings"],
              ].map(([scenario, verdict, why]) => (
                <tr key={scenario} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{scenario}</td>
                  <td className={`px-4 py-2.5 font-semibold text-xs ${verdict.includes("SIP") ? "text-emerald-600 dark:text-emerald-400" : verdict.includes("Prepay") ? "text-violet-600 dark:text-violet-400" : "text-blue-600 dark:text-blue-400"}`}>{verdict}</td>
                  <td className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Tax Deductions — The Factor Most People Miss</h2>
        <p>Under the <strong>old tax regime</strong>, a home loan gives two deductions:</p>
        <ul>
          <li><strong>Section 80C:</strong> Principal repayment up to ₹1.5L/year (shared with PF, ELSS, PPF).</li>
          <li><strong>Section 24(b):</strong> Interest paid up to ₹2L/year (self-occupied property).</li>
        </ul>
        <p>
          At 30% bracket: ₹2L interest deduction saves ₹62,400/year in tax. This means a 9% home loan effectively costs only <strong>9% × (1 − 30%) = 6.3%</strong> post-tax. At this effective rate, almost any equity SIP outperforms prepayment.
        </p>
        <p>
          Under the <strong>new tax regime</strong>, neither deduction is available. So the full 9% is your real cost — and the case for prepayment is stronger.
        </p>

        <h2>The Recommended Approach for Most Indians</h2>
        <ol>
          <li><strong>First 5 years of loan:</strong> Build an emergency fund (6 months expenses in FD). Do not put everything into prepayment or SIP without this buffer.</li>
          <li><strong>Home loan rate ≤ 8.5%:</strong> Invest extra in SIP. Review every 2 years.</li>
          <li><strong>Home loan rate &gt; 9%:</strong> Prepay one extra EMI per year + invest remaining in SIP.</li>
          <li><strong>10 years before retirement:</strong> Shift focus to prepaying — being debt-free at retirement reduces risk significantly.</li>
          <li><strong>If interest rate crosses 10%:</strong> Aggressively prepay. The guaranteed 10% return from debt reduction beats uncertain SIP over short horizons.</li>
        </ol>

        <blockquote>
          <strong>The hybrid approach:</strong> Use your 13th month bonus entirely for home loan prepayment. Invest monthly salary surplus entirely in SIP. This splits the psychologically distinct decisions — regular savings go to SIP, windfalls go to debt. Most people find this easier to execute than constantly re-evaluating the split.
        </blockquote>

        <p>Use the <Link href="/home-loan-emi-calculator/">Home Loan EMI Calculator</Link> and <Link href="/sip-calculator/">SIP Calculator</Link> to model your exact numbers.</p>
      </ArticleShell>
    </>
  );
}
