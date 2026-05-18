import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SIPCalculator from "@/components/sip/SIPCalculator";

export const metadata: Metadata = buildMetadata("sip-calculator");

const slug = "sip-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a SIP calculator?",
    answer: "A SIP (Systematic Investment Plan) calculator is a free online tool that estimates the future value of your mutual fund investments made at fixed monthly intervals. Enter your monthly SIP amount, expected annual return, and investment duration to instantly see maturity amount, estimated returns, and year-wise growth chart.",
  },
  {
    question: "How to calculate SIP returns?",
    answer: "SIP returns are calculated using the formula: M = P × {[(1+i)^n – 1] / i} × (1+i), where M = maturity amount, P = monthly SIP amount, i = monthly interest rate (annual rate ÷ 12 ÷ 100), n = number of months. For example, ₹5,000/month SIP for 10 years at 12% = ₹11.6 lakhs maturity on ₹6 lakhs invested.",
  },
  {
    question: "What is a good SIP return rate to assume?",
    answer: "For equity mutual funds in India: Large cap funds average 11–13% over 10+ years, Flexi cap funds 12–15%, Mid cap funds 14–18%, Index funds (Nifty 50) around 12%. For conservative planning, use 10–12% for equity SIPs and 6–8% for debt funds. Avoid assuming more than 15% as it may overestimate returns.",
  },
  {
    question: "How much SIP should I do per month?",
    answer: "A common rule is to invest 20% of your monthly take-home pay. For ₹50,000/month salary, ₹10,000 SIP is ideal. Use this calculator in reverse — enter your goal amount (e.g., ₹1 crore) and get the required monthly SIP. ₹5,000/month at 12% for 20 years grows to ~₹49.5 lakhs. ₹10,000/month grows to ~₹99 lakhs.",
  },
  {
    question: "What is the minimum SIP amount in India?",
    answer: "Most mutual funds allow SIPs starting from ₹100–₹500/month. Mirae Asset, Axis, HDFC, SBI Mutual Fund all offer ₹500 minimum SIPs. Some funds like Parag Parikh Flexi Cap allow ₹1,000/month minimum. There is no maximum limit on SIP amount.",
  },
  {
    question: "Is SIP better than FD?",
    answer: "SIP in equity mutual funds has historically delivered 11–14% annual returns vs FD's 6.5–7.5%. Over 10+ years, SIP creates significantly more wealth. However, SIP carries market risk while FD is capital-guaranteed. For goals beyond 5 years, equity SIP is generally better. For short-term needs (under 3 years), FD is safer.",
  },
  {
    question: "What is the difference between SIP and lumpsum investment?",
    answer: "SIP invests a fixed amount every month, averaging your purchase price over time (rupee cost averaging). Lumpsum is a one-time large investment. SIP is better for salaried investors who want to invest regularly. Lumpsum works when you have a windfall or markets have corrected significantly. Use our Lumpsum Calculator to compare both.",
  },
  {
    question: "Can I increase my SIP amount every year?",
    answer: "Yes — this is called Step-Up SIP or Top-Up SIP. You can increase your SIP by 5–10% each year, matching salary growth. A ₹5,000 SIP with 10% annual step-up for 20 years at 12% returns grows to ₹1.25 crore vs ₹49.5 lakhs with flat SIP — 2.5x more wealth. Use our Step-Up SIP Calculator to see the exact difference.",
  },
  {
    question: "What is XIRR in SIP?",
    answer: "XIRR (Extended Internal Rate of Return) is the accurate way to measure SIP returns since multiple cash flows happen at different times. Unlike CAGR (used for lumpsum), XIRR accounts for each monthly investment's timing. Most mutual fund platforms show XIRR. A 12% XIRR on a SIP is equivalent to 12% CAGR on a lumpsum.",
  },
  {
    question: "Is SIP investment safe in India?",
    answer: "SIP is a method of investing in SEBI-regulated mutual funds — not a product itself. Equity SIPs carry market risk but have never given negative returns over any 10-year period in India's history. Debt fund SIPs are more stable. All mutual funds in India are regulated by SEBI, making them legally safe. Invest only in AMFI-registered fund houses.",
  },
  {
    question: "How many years should I do SIP?",
    answer: "The longer the better due to compounding. ₹5,000/month SIP at 12%: 5 years = ₹4.1L, 10 years = ₹11.6L, 15 years = ₹25L, 20 years = ₹49.5L, 30 years = ₹1.76 Cr. The last 10 years contribute more than the first 20 years combined — this is the power of compounding. Minimum recommended SIP horizon is 5+ years.",
  },
  {
    question: "What happens if I miss a SIP installment?",
    answer: "Missing 1–2 SIP installments is usually fine. Most AMCs allow a 3-month grace period. If your bank account doesn't have sufficient balance, the SIP for that month is skipped (no penalty typically). Consistent SIP is ideal, but occasional misses don't ruin your corpus significantly. You can pause SIPs for 1–3 months with most fund houses.",
  },
  {
    question: "What are the best mutual funds for SIP in India 2025?",
    answer: "Top performing SIP funds 2025: Large cap — Mirae Asset Large Cap, Axis Bluechip. Flexi cap — Parag Parikh Flexi Cap, HDFC Flexi Cap. Mid cap — Motilal Oswal Midcap, Kotak Emerging Equity. Index — UTI Nifty 50, Nippon Nifty 500. Tax saving (ELSS) — DSP Tax Saver, Mirae Asset ELSS. Always check SEBI ratings and 5-year performance before investing.",
  },
  {
    question: "How is SIP taxed in India?",
    answer: "Equity SIP taxation: Units held > 1 year taxed at 10% LTCG (above ₹1.25 lakh annual gain). Units held < 1 year taxed at 15% STCG. Debt SIP: taxed at your income slab rate (as per Budget 2023). ELSS funds have 3-year lock-in but qualify for ₹1.5L 80C deduction. Each monthly SIP installment has its own 1-year holding period calculation.",
  },
  {
    question: "Can NRI invest in SIP in India?",
    answer: "Yes, NRIs can invest in Indian mutual funds through NRE/NRO accounts. NRIs from the USA and Canada face restrictions from some fund houses due to FATCA compliance but many AMCs like PPFAS and Mirae accept NRI investments. KYC with Indian passport and NRE/NRO account details are required. Repatriation of returns is allowed from NRE accounts.",
  },
];

const HOW_TO_STEPS = [
  { name: "Enter monthly SIP amount", text: "Type or adjust the slider for how much you want to invest every month — from ₹500 to ₹1,00,000." },
  { name: "Set expected annual return", text: "Enter the expected annual return percentage. Historical equity mutual fund average is 12%. Debt funds typically return 7-8%." },
  { name: "Choose investment duration", text: "Select how many years you plan to continue the SIP — 5, 10, 15, 20, or 25 years." },
  { name: "View maturity amount and returns", text: "The calculator instantly shows your total invested amount, estimated returns, and final maturity value. The chart shows year-by-year growth." },
  { name: "Compare with step-up SIP", text: "Click 'Step-Up SIP' to see how increasing your SIP by 10% each year significantly boosts your final corpus." },
];

export default function SIPCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "SIP Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema("SIP Calculator", "How to calculate SIP returns using RupeesCalc free SIP calculator", HOW_TO_STEPS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["lumpsum-calculator", "step-up-sip-calculator", "swp-calculator", "fd-calculator"]}
        content={<SIPContent />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <SIPCalculator mode="standard" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function SIPContent() {
  return (
    <>
      <h2>What is a SIP Calculator?</h2>
      <p>
        A <strong>SIP Calculator</strong> (Systematic Investment Plan Calculator) is a free online tool that helps you estimate the future value of your mutual fund investments made at regular monthly intervals. Whether you&apos;re planning for retirement, your child&apos;s education, buying a house, or building long-term wealth — a SIP return calculator shows you exactly how your disciplined monthly investing will grow over time with the power of compounding.
      </p>
      <p>
        The RupeesCalc SIP calculator gives you instant results as you move the slider — no button click needed. You get the total invested amount, estimated returns, maturity value, a live growth chart, donut chart showing principal vs returns, and a year-by-year breakdown table.
      </p>

      <h2>How to Use This SIP Calculator</h2>
      <ol>
        <li><strong>Monthly SIP Amount:</strong> Enter how much you plan to invest every month. Start with as little as ₹500.</li>
        <li><strong>Expected Annual Return (%):</strong> The average annual return you expect. Use 10–12% for equity funds, 6–8% for debt funds.</li>
        <li><strong>Investment Period (Years):</strong> How long you plan to stay invested. Longer = more compounding = more wealth.</li>
        <li><strong>Read Results Instantly:</strong> See invested amount, estimated returns, total maturity value, and live animated charts — no Calculate button needed.</li>
        <li><strong>Share Your Plan:</strong> Use the WhatsApp share button to share your SIP plan with family or a financial advisor.</li>
      </ol>

      <h2>SIP Calculator Formula</h2>
      <p>The SIP maturity amount formula used in this calculator:</p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        M = P × &#123;[(1 + i)^n – 1] / i&#125; × (1 + i)
      </div>
      <ul>
        <li><strong>M</strong> = Maturity Amount (total corpus at end)</li>
        <li><strong>P</strong> = Monthly SIP amount (₹)</li>
        <li><strong>i</strong> = Monthly rate of return = Annual rate ÷ 12 ÷ 100</li>
        <li><strong>n</strong> = Total months = Years × 12</li>
      </ul>
      <p><strong>Example:</strong> ₹5,000/month × 10 years at 12% annual return: i = 0.01, n = 120. M = 5000 × [(1.01^120 – 1) / 0.01] × 1.01 = <strong>₹11,61,695</strong> (invested ₹6 lakhs, earned ₹5.6 lakhs in returns).</p>

      <h2>SIP Returns — How Much Can You Earn?</h2>
      <p>Here is a quick reference SIP returns table at 12% annual returns:</p>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Monthly SIP</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">20 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">30 Years</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["₹1,000", "₹2.3L", "₹9.9L", "₹35.3L"],
              ["₹5,000", "₹11.6L", "₹49.5L", "₹1.76Cr"],
              ["₹10,000", "₹23.2L", "₹98.9L", "₹3.53Cr"],
              ["₹25,000", "₹58L", "₹2.47Cr", "₹8.82Cr"],
              ["₹50,000", "₹1.16Cr", "₹4.94Cr", "₹17.6Cr"],
            ].map(([sip, y10, y20, y30]) => (
              <tr key={sip} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{sip}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y10}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y20}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{y30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>SIP vs Lumpsum — Which is Better?</h2>
      <p>
        <strong>SIP (Systematic Investment Plan)</strong> invests a fixed amount every month regardless of market conditions. This gives you rupee cost averaging — you buy more units when markets fall and fewer when they rise, automatically averaging your cost. SIP is ideal for salaried investors who receive regular income.
      </p>
      <p>
        <strong>Lumpsum</strong> works better when you have a large windfall and markets have corrected significantly. Over a full market cycle, both SIP and lumpsum deliver similar returns — the difference is risk management and discipline.
      </p>
      <p><strong>Verdict:</strong> For most salaried Indians, SIP is the recommended approach because it removes the need to time the market and builds investing discipline automatically.</p>

      <h2>Top Mutual Funds for SIP in India 2025</h2>
      <ul>
        <li><strong>Large Cap:</strong> Mirae Asset Large Cap Fund, Axis Bluechip Fund, ICICI Pru Bluechip — lower risk, 11–13% returns</li>
        <li><strong>Flexi Cap:</strong> Parag Parikh Flexi Cap, HDFC Flexi Cap — balanced risk, 12–15% returns</li>
        <li><strong>Mid Cap:</strong> Motilal Oswal Midcap, Kotak Emerging Equity — higher risk, 14–18% returns</li>
        <li><strong>Index Funds:</strong> UTI Nifty 50, Nippon India Nifty 500 — lowest cost (0.1–0.2% expense ratio)</li>
        <li><strong>ELSS Tax Saver:</strong> DSP Tax Saver, Mirae Asset ELSS — 80C deduction up to ₹1.5L/year</li>
      </ul>

      <blockquote>
        <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Past performance does not guarantee future results. This SIP calculator is for educational and financial planning purposes only. Consult a SEBI-registered financial advisor before investing.
      </blockquote>
    </>
  );
}
