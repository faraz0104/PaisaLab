import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SIPCalculator from "@/components/sip/SIPCalculator";

export const metadata: Metadata = buildMetadata("step-up-sip-calculator");

const slug = "step-up-sip-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a Step-Up SIP calculator?",
    answer: "A Step-Up SIP calculator (also called Top-Up SIP calculator) helps you estimate returns when you increase your SIP amount by a fixed percentage each year. As your income grows with annual increments, increasing your SIP by 5–10% annually can dramatically multiply your final corpus compared to a flat SIP — without significantly straining your budget.",
  },
  {
    question: "What is Step-Up SIP or Top-Up SIP?",
    answer: "Step-Up SIP (also called SIP Top-Up or SIP Booster) is a facility where your monthly SIP amount automatically increases by a fixed amount or percentage at defined intervals (usually annually). Example: Start with ₹5,000/month SIP with 10% annual step-up. Year 1: ₹5,000/month, Year 2: ₹5,500/month, Year 3: ₹6,050/month, Year 4: ₹6,655/month. This mirrors salary growth and lets you invest more as you earn more.",
  },
  {
    question: "How much more can Step-Up SIP earn vs regular SIP?",
    answer: "Step-Up SIP returns vs flat SIP (at 12% annual return, 20 years): Flat ₹5,000/month SIP = ₹49.5L maturity. ₹5,000/month SIP with 10% annual step-up = ₹1.25Cr — 2.5x more! With 5% step-up = ₹73L (48% more than flat SIP). With 15% step-up = ₹2.1Cr (4.2x more). The power of step-up SIP compounds not just on returns but also on the increasing investment amounts — creating exponential wealth over long horizons.",
  },
  {
    question: "What step-up percentage should I choose?",
    answer: "Recommended step-up percentages: Conservative: 5%/year (matches low income growth, inflation adjustment only). Moderate: 10%/year (matches average salary increment in India). Aggressive: 15%/year (for high-growth careers or if currently underinvesting relative to income). Rule of thumb: match your expected annual salary increment. If you get 8% hike yearly, step up SIP by 8%. Even 5% step-up nearly doubles your corpus vs flat SIP over 20 years. Start with 10% if uncertain.",
  },
  {
    question: "How does Step-Up SIP work mathematically?",
    answer: "Step-Up SIP calculation: Each year, investment amount increases by the step-up rate. All monthly investments earn compound returns till maturity. Year 1: 12 installments of ₹P each. Year 2: 12 installments of ₹P×(1+s) each. Year n: 12 installments of ₹P×(1+s)^(n-1). Each installment grows at monthly rate r = Annual rate ÷ 12 until maturity. Final corpus = sum of FV of all installments. Our calculator handles this complex calculation instantly.",
  },
  {
    question: "Can I set up Step-Up SIP with any mutual fund?",
    answer: "Most major mutual fund houses in India offer SIP Top-Up facility: SBI MF, HDFC AMC, ICICI Pru AMC, Axis MF, Mirae Asset, Kotak, UTI AMC. Platforms that support step-up SIP: MF Central, Groww, Zerodha Coin, ET Money, Paytm Money, ICICI Direct. You can set up step-up SIP online in 5 minutes — specify start amount, step-up percentage (or fixed amount), step-up frequency (annual is most common), and duration. The EMI increases automatically without any manual action.",
  },
  {
    question: "Is Step-Up SIP better than investing lumpsum when salary increases?",
    answer: "Step-Up SIP is usually better than irregular lumpsum investments. Step-up SIP: Automatic, disciplined, takes advantage of compounding immediately as income grows, rupee cost averaging maintained throughout. Irregular lumpsum at year end: requires discipline to invest bonus, timing risk, may miss months. However, combination strategy works best: Continue step-up SIP + invest any bonus/windfall as additional lumpsum. This maximizes both rupee cost averaging and opportunity investing.",
  },
  {
    question: "What is the difference between fixed step-up and percentage step-up?",
    answer: "Fixed amount step-up: Increase SIP by a fixed ₹ amount each year. Example: ₹5,000/month, increase by ₹500 every year. Year 1: ₹5,000, Year 2: ₹5,500, Year 3: ₹6,000, etc. Percentage step-up: Increase by a fixed % each year. Example: 10% step-up. Year 1: ₹5,000, Year 2: ₹5,500, Year 3: ₹6,050, Year 4: ₹6,655. Percentage step-up creates faster growth since the increment itself increases each year. Most investors prefer percentage step-up as it mirrors salary growth (which is also percentage-based).",
  },
  {
    question: "What is the minimum SIP amount for step-up SIP?",
    answer: "Minimum step-up SIP amounts: Most AMCs require minimum ₹500/month SIP and minimum ₹100 step-up increment. For percentage step-up, the resulting amount must be at least ₹500/month. Example: ₹500/month SIP with 10% step-up: Year 2 = ₹550 → allowed. Some platforms require ₹1,000/month minimum for step-up SIP. Check with your specific AMC or platform. There is no maximum limit on step-up SIP amount.",
  },
  {
    question: "Should I choose step-up SIP or multiple SIPs?",
    answer: "Step-up SIP vs multiple separate SIPs: Step-up SIP — single mandate that increases automatically, simpler to manage, same fund benefits from all investments, clean annual report. Multiple SIPs — more control, can be in different funds, can stop one without affecting others, more diversification. Best approach for most investors: 1–2 core funds with step-up SIP (60–70% of investment) + 2–3 satellite SIPs in specific categories. As income grows, increase through step-up rather than adding more SIPs — it keeps portfolio manageable.",
  },
  {
    question: "How does Step-Up SIP help beat inflation?",
    answer: "India's average inflation is 5–6% per year. A flat SIP's real purchasing power erodes over time — ₹10,000 today is worth only ₹5,584 in 10 years at 6% inflation. Step-up SIP at 6% annual increase exactly matches inflation — maintaining real investment value. Step-up at 10% grows faster than inflation — increasing real investment value year over year. This is why step-up SIP is considered inflation-beating: you're not just maintaining purchasing power, you're actively increasing it.",
  },
  {
    question: "What is the best mutual fund for Step-Up SIP in India 2025?",
    answer: "Best mutual funds for step-up SIP 2025: Large Cap (stable, lower risk): Mirae Asset Large Cap, HDFC Top 100, Axis Bluechip. Flexi Cap (balanced): Parag Parikh Flexi Cap, HDFC Flexi Cap. Mid Cap (higher growth): Motilal Oswal Midcap, Kotak Emerging Equity. Index (lowest cost, market returns): UTI Nifty 50, Nippon India Nifty 500. ELSS (tax saving + growth): Mirae Asset ELSS, DSP Tax Saver. For step-up SIP: flexi cap funds work best as they adapt allocation based on market conditions and absorb increasing amounts effectively.",
  },
  {
    question: "Can I pause or stop the step-up feature?",
    answer: "Yes, you can pause or stop the step-up increase while continuing the base SIP. Process: Log in to AMC website or your investment platform → Go to existing SIP → Modify/stop step-up. The base SIP continues at the current (last increased) amount. You can also stop the entire SIP if needed. Step-up is not an irrevocable commitment — it's flexible. If your income temporarily drops or you have a large expense, you can pause the step-up for 1–2 years and resume later.",
  },
  {
    question: "What is SIP Top-Up vs SIP with increasing installment?",
    answer: "These terms mean the same thing — step-up SIP, top-up SIP, SIP booster, SIP with increasing installment all refer to the same facility where your SIP amount increases periodically. Different AMCs/platforms use different names. HDFC AMC calls it 'SIP Top-Up', Axis MF calls it 'Step-Up SIP', Groww calls it 'Flexible SIP', ET Money has 'Smart SIP'. When setting up, confirm the facility allows automatic increase — not just manual flexibility.",
  },
];

export default function StepUpSIPPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "Step Up SIP Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["sip-calculator", "lumpsum-calculator", "swp-calculator", "fd-calculator"]}
        content={<StepUpContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <SIPCalculator mode="stepup" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function StepUpContent() {
  return (
    <>
      <h2>What is a Step-Up SIP Calculator?</h2>
      <p>
        A <strong>Step-Up SIP Calculator</strong> helps you estimate your mutual fund corpus when you increase your monthly SIP by a fixed percentage every year. As your salary grows with annual increments, so does your SIP — creating exponentially greater wealth compared to a flat SIP.
      </p>
      <p>
        The difference is staggering: a ₹5,000/month flat SIP at 12% for 20 years gives ₹49.5L. The <em>same SIP with just 10% annual step-up</em> gives ₹1.25Cr — 2.5x more wealth, with a much smaller sacrifice since you&apos;re only increasing by 10% of your already-small starting amount.
      </p>

      <h2>Step-Up SIP vs Flat SIP — Side by Side</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Starting SIP</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Flat SIP (20yr)</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5% Step-Up</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10% Step-Up</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">15% Step-Up</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹2,000", "₹19.8L", "₹29.2L", "₹49.9L", "₹84.1L"],
              ["₹5,000", "₹49.5L", "₹72.9L", "₹1.25Cr", "₹2.10Cr"],
              ["₹10,000", "₹98.9L", "₹1.46Cr", "₹2.50Cr", "₹4.21Cr"],
              ["₹20,000", "₹1.98Cr", "₹2.91Cr", "₹4.99Cr", "₹8.41Cr"],
              ["₹50,000", "₹4.95Cr", "₹7.29Cr", "₹12.5Cr", "₹21.0Cr"],
            ].map(([sip, flat, s5, s10, s15]) => (
              <tr key={sip} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{sip}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{flat}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{s5}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{s10}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{s15}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">At 12% annual return. All values approximate.</p>

      <h2>How Step-Up SIP Works</h2>
      <p>
        Year 1: Invest ₹5,000/month. Year 2: Auto-increases to ₹5,500/month (10% more). Year 3: ₹6,050/month. Year 20: ₹30,587/month. By then, your income has grown proportionally — and this amount feels comfortable. The magic: every rupee invested in year 1 has 20 years to compound, while even year 20 installments add meaningfully to the corpus.
      </p>

      <h2>How to Set Up Step-Up SIP</h2>
      <ol>
        <li>Log in to your mutual fund platform (Groww, Zerodha Coin, ET Money, or AMC website)</li>
        <li>Go to your existing SIP or start a new one</li>
        <li>Look for &quot;Step-Up SIP&quot;, &quot;Top-Up SIP&quot;, or &quot;SIP Booster&quot; option</li>
        <li>Enter step-up percentage (10% recommended) and frequency (annual)</li>
        <li>Confirm — the system increases your SIP automatically every year</li>
      </ol>

      <blockquote>
        <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Past performance does not guarantee future results. This step-up SIP calculator is for educational and financial planning purposes only. Consult a SEBI-registered financial advisor before investing.
      </blockquote>
    </>
  );
}
