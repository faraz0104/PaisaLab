import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/schemas";
import ArticleShell from "@/components/learn/ArticleShell";

const slug = "sip-to-become-crorepati";
const title = "How Much SIP Do You Need to Become a Crorepati?";
const description = "Calculate exactly how much monthly SIP it takes to reach ₹1 crore, ₹2 crore, and ₹5 crore — with year-by-year tables, real return scenarios, and the maths behind it.";

export const metadata: Metadata = {
  title: `${title} — RupeesCalc`,
  description,
  alternates: { canonical: `${SITE_URL_CONST}/learn/${slug}/` },
  openGraph: { type: "article", url: `${SITE_URL_CONST}/learn/${slug}/`, title, description, siteName: "RupeesCalc" },
};

const FAQS = [
  { question: "How much SIP do I need to get ₹1 crore in 10 years?", answer: "To reach ₹1 crore in 10 years at 12% annual return, you need a monthly SIP of ₹43,471. At a conservative 10%, you need ₹48,819/month. At an aggressive 14%, ₹38,678/month. The faster you start, the lower the required SIP." },
  { question: "How much SIP do I need for ₹1 crore in 15 years?", answer: "To reach ₹1 crore in 15 years at 12% annual return, you need a monthly SIP of ₹19,819. At 10%, ₹23,572/month. At 14%, ₹16,353/month. Notice how extending from 10 to 15 years cuts the required SIP almost in half — that is compounding at work." },
  { question: "How much SIP do I need for ₹1 crore in 20 years?", answer: "₹1 crore in 20 years at 12% return requires just ₹10,109/month. At 10%, ₹13,168/month. At 14%, ₹7,677/month. This is why starting early is the most powerful financial decision — the 20-year SIP amount is less than 1/4th of the 10-year amount." },
  { question: "Which mutual funds are best for SIP to become a crorepati?", answer: "For a 15–20 year goal, diversified equity funds work best. Options: Nifty 50 index funds (UTI Nifty 50, HDFC Index Fund) for passive investing at low cost. Large-cap active funds (HDFC Top 100, Mirae Asset Large Cap) for slightly higher returns with moderate risk. Flexi-cap funds (Parag Parikh Flexi Cap, HDFC Flexi Cap) for broad diversification. Review and rebalance every 2–3 years." },
  { question: "Is 12% SIP return realistic?", answer: "12% is the long-term historical average for diversified equity mutual funds in India. Nifty 50 CAGR over the last 20 years is approximately 13%. However, returns are not guaranteed and fluctuate year-to-year. For conservative planning, use 10%. For moderate planning, 12%. For optimistic projection, 14%. Never plan for less than 5 years in equity SIP." },
];

// Pre-calculated SIP amounts needed for target corpus
const SCENARIOS = [
  { target: 10000000, years: 10, rate10: 48819, rate12: 43471, rate14: 38678 },
  { target: 10000000, years: 15, rate10: 23572, rate12: 19819, rate14: 16353 },
  { target: 10000000, years: 20, rate10: 13168, rate12: 10109, rate14: 7677 },
  { target: 10000000, years: 25, rate10: 7537,  rate12: 5313,  rate14: 3706 },
  { target: 20000000, years: 15, rate10: 47144, rate12: 39638, rate14: 32706 },
  { target: 20000000, years: 20, rate10: 26336, rate12: 20218, rate14: 15354 },
  { target: 50000000, years: 20, rate10: 65840, rate12: 50545, rate14: 38385 },
  { target: 50000000, years: 25, rate10: 37685, rate12: 26565, rate14: 18530 },
];

function fmtINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(0)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(0)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}
function fmtK(n: number) {
  return `₹${(n / 1000).toFixed(1)}K`;
}

export default function SIPCrorepatiPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <ArticleShell
        h1={title}
        description={description}
        publishDate="2025-05-18"
        readingTime="7 min read"
        relatedSlugs={["sip-calculator", "step-up-sip-calculator", "lumpsum-calculator", "ppf-calculator"]}
      >
        <h2>The Crorepati SIP Formula</h2>
        <p>
          To find how much monthly SIP you need for a target corpus, use the reverse SIP formula:
        </p>
        <p>
          <strong>Monthly SIP = FV × r / [(1+r)^n − 1] / (1+r)</strong>
        </p>
        <p>
          Where FV = target corpus, r = monthly rate (annual rate ÷ 12), n = total months.
        </p>
        <p>
          At 12% annual return (r = 1%/month), to reach ₹1 crore in 15 years (n = 180 months):
          Monthly SIP = ₹1,00,00,000 × 0.01 / [(1.01)^180 − 1] / 1.01 = <strong>₹19,819/month</strong>.
        </p>

        <h2>Monthly SIP Required to Reach Your Target (at 12% Return)</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Target</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10 Years</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">15 Years</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">20 Years</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">25 Years</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { target: "₹50 Lakh",  r10: 28655, r15: 13072, r20: 6321, r25: 3524 },
                { target: "₹1 Crore",  r10: 43471, r15: 19819, r20: 10109, r25: 5313 },
                { target: "₹2 Crore",  r10: 86942, r15: 39638, r20: 20218, r25: 10626 },
                { target: "₹5 Crore",  r10: 217355, r15: 99095, r20: 50545, r25: 26565 },
                { target: "₹10 Crore", r10: 434710, r15: 198190, r20: 101090, r25: 53130 },
              ].map(({ target, r10, r15, r20, r25 }) => (
                <tr key={target} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2.5 font-bold text-slate-900 dark:text-white">{target}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtK(r10)}</td>
                  <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400 font-semibold">{fmtK(r15)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{fmtK(r20)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400">{fmtK(r25)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Assumes 12% annual return. Actual returns vary. <Link href="/sip-calculator/">Use our SIP calculator</Link> to test your specific scenario.</p>

        <h2>How Return Rate Affects Your SIP Amount (₹1 Crore in 15 Years)</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Expected Return</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly SIP</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Invested</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Returns Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { rate: "8% (conservative/debt)",  sip: 30217, invested: 5439060, returns: 4560940 },
                { rate: "10% (moderate)",            sip: 23572, invested: 4242960, returns: 5757040 },
                { rate: "12% (equity average)",      sip: 19819, invested: 3567420, returns: 6432580 },
                { rate: "14% (aggressive)",          sip: 16353, invested: 2943540, returns: 7056460 },
              ].map(({ rate, sip, invested, returns }) => (
                <tr key={rate} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${rate.includes("12%") ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">{rate}</td>
                  <td className="px-4 py-2.5 text-right font-bold text-blue-600 dark:text-blue-400">{fmtINR(sip)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtINR(invested)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400">{fmtINR(returns)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>The Power of Starting Early — Same ₹10,000/Month SIP</h2>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Start Age → Retire at 60</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Tenure</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Invested</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Maturity @ 12%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { age: 25, years: 35, invested: 4200000, maturity: 49090000 },
                { age: 30, years: 30, invested: 3600000, maturity: 34950000 },
                { age: 35, years: 25, invested: 3000000, maturity: 18894000 },
                { age: 40, years: 20, invested: 2400000, maturity:  9999000 },
                { age: 45, years: 15, invested: 1800000, maturity:  5034000 },
              ].map(({ age, years, invested, maturity }) => (
                <tr key={age} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${age === 25 ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">Age {age}</td>
                  <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400">{years} years</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtINR(invested)}</td>
                  <td className={`px-4 py-2.5 text-right font-bold ${maturity >= 10000000 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`}>{fmtINR(maturity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Same ₹10,000/month SIP. Starting at 25 vs 35 gives 2.6× more money despite only 10 extra years — compounding accelerates in later years.</p>

        <h2>Step-Up SIP: Become a Crorepati Faster</h2>
        <p>
          If you increase your SIP by 10% every year (called a <Link href="/step-up-sip-calculator/">Step-Up SIP</Link>), you can reach ₹1 crore faster with a smaller starting amount.
        </p>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Strategy</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Starting SIP</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">15-Year Corpus</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Total Invested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { strategy: "Flat SIP",          start: 19819, corpus: 10000000, invested: 3567420 },
                { strategy: "10% Step-Up SIP",   start: 12000, corpus: 10200000, invested: 4540000 },
                { strategy: "15% Step-Up SIP",   start: 9000,  corpus: 10100000, invested: 5180000 },
              ].map(({ strategy, start, corpus, invested }) => (
                <tr key={strategy} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${strategy.includes("10%") ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
                  <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{strategy}</td>
                  <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400 font-semibold">{fmtINR(start)}/mo</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">≈{fmtINR(corpus)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{fmtINR(invested)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Common Mistakes That Delay Your Crorepati Goal</h2>
        <ul>
          <li><strong>Starting late:</strong> Every 5-year delay roughly halves your final corpus for the same SIP amount. Start with ₹1,000/month today rather than waiting to start with ₹5,000/month next year.</li>
          <li><strong>Stopping during market falls:</strong> SIP returns are calculated on average cost, not peak price. Market crashes are when you buy more units — stopping SIP during a crash locks in losses.</li>
          <li><strong>Choosing the wrong fund:</strong> A 2% difference in returns (10% vs 12% over 20 years) changes ₹1 crore into ₹1.24 crore. Choose funds with consistent 5- and 10-year track records.</li>
          <li><strong>Not stepping up:</strong> If your salary grows 10% per year but your SIP stays flat, you are investing a smaller fraction of your income each year. Increase SIP with every salary hike.</li>
          <li><strong>Withdrawing for short-term needs:</strong> Breaking a SIP for a vacation or gadget purchase destroys years of compounding. Maintain a separate emergency fund to protect your SIP.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>

        <h3>Is ₹1 crore enough to retire in India?</h3>
        <p>
          At today's costs, ₹1 crore is borderline for retirement. Using the 4% safe withdrawal rule, ₹1 crore gives ₹4 lakh/year (₹33,333/month) — barely enough for a modest lifestyle in a metro city. For a comfortable retirement, target ₹3–5 crore. Check our <Link href="/retirement-calculator/">Retirement Calculator</Link> for a personalized corpus target.
        </p>

        <h3>What if I can only invest ₹500/month?</h3>
        <p>
          ₹500/month at 12% for 30 years = <strong>₹17.6 lakh</strong>. Not a crore, but ₹500 is the minimum SIP for most apps (Groww, Zerodha Coin, Paytm Money). Start now with ₹500, increase to ₹1,000 when your salary permits. The habit matters more than the amount at the start.
        </p>

        <blockquote>
          <strong>The rule of 72:</strong> Divide 72 by your expected return to find how long it takes to double your money. At 12%, money doubles every 6 years. ₹10 lakh invested at 30 becomes ₹80 lakh by 48 — just from doubling three times.
        </blockquote>
      </ArticleShell>
    </>
  );
}
