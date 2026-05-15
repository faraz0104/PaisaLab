import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SIPCalculator from "@/components/sip/SIPCalculator";

export const metadata: Metadata = buildMetadata("sip-calculator");

const slug = "sip-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is a SIP calculator?",
    answer:
      "A SIP (Systematic Investment Plan) calculator helps you estimate the future value of your mutual fund investments made at regular intervals. You enter the monthly investment amount, expected annual return rate, and investment duration to see how much your money will grow.",
  },
  {
    question: "How accurate is the SIP calculator?",
    answer:
      "The SIP calculator uses the standard SIP maturity formula: M = P × {[(1+i)^n – 1] / i} × (1+i). It assumes a constant rate of return, which is a reasonable long-term estimate. Actual mutual fund returns vary year to year, so treat results as an estimate for planning purposes.",
  },
  {
    question: "What is a good SIP return rate to assume?",
    answer:
      "Historically, large-cap equity mutual funds in India have delivered 12–14% annualized returns over 10+ year periods. Small/mid-cap funds average 15–18% over long periods but with higher volatility. For conservative planning, use 10–12% for equity SIPs. Debt funds typically yield 6–8%.",
  },
  {
    question: "How much SIP should I do per month?",
    answer:
      "A common rule of thumb is to invest 20% of your monthly take-home salary. If you earn ₹50,000/month, a ₹10,000 SIP is a reasonable starting point. Use this calculator to work backward — enter your financial goal (e.g. ₹1 crore in 20 years) and find the required monthly SIP.",
  },
  {
    question: "What is the difference between SIP and lumpsum investment?",
    answer:
      "In a SIP, you invest a fixed amount every month, which averages out your purchase price over time (rupee cost averaging). A lumpsum is a one-time large investment. SIPs are ideal for salaried investors with regular income; lumpsum works better when you have a windfall or when markets are at a low.",
  },
  {
    question: "Can I increase my SIP amount every year?",
    answer:
      "Yes! This is called a Step-Up SIP or Top-Up SIP. Many mutual funds allow you to automatically increase your SIP by a fixed amount or percentage each year. Increasing your SIP by 10% annually can significantly boost your final corpus — use our Step-Up SIP Calculator to see the difference.",
  },
  {
    question: "Is SIP investment safe?",
    answer:
      "SIP is a method of investing, not an investment product itself. The safety depends on the underlying mutual fund. Equity mutual fund SIPs carry market risk but have historically rewarded patient long-term investors. Debt fund SIPs are more stable. Always match the fund type to your risk appetite and goal.",
  },
  {
    question: "What is the minimum SIP amount in India?",
    answer:
      "Most mutual funds in India allow SIPs starting from ₹100–₹500 per month. Prominent AMCs like HDFC, SBI, and Axis allow ₹100/month SIPs. Some funds for small investors like DSP Small Cap Fund start at ₹500/month.",
  },
  {
    question: "How is SIP return calculated?",
    answer:
      "SIP return is calculated using the formula: M = P × {[(1+i)^n – 1] / i} × (1+i), where M is the maturity value, P is the monthly investment, i is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of months.",
  },
  {
    question: "What is CAGR vs XIRR for SIP?",
    answer:
      "CAGR (Compound Annual Growth Rate) is used for lumpsum investments. For SIPs with multiple cash flows at different times, XIRR (Extended Internal Rate of Return) is the correct metric. XIRR accounts for the timing of each SIP installment, giving a more accurate picture of your true return.",
  },
];

export default function SIPCalculatorPage() {
  return (
    <>
      <JsonLd
        data={webAppSchema(
          slug,
          "SIP Calculator",
          meta.description
        )}
      />
      <JsonLd data={faqSchema(FAQS)} />

      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={[
          "lumpsum-calculator",
          "step-up-sip-calculator",
          "swp-calculator",
          "fd-calculator",
        ]}
        content={<SIPContent />}
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
        A <strong>SIP Calculator</strong> (Systematic Investment Plan Calculator) is a free online tool that helps you estimate the future value of your mutual fund investments made at regular monthly intervals. Whether you&apos;re planning for retirement, your child&apos;s education, or buying a home, a SIP calculator shows you exactly how much your disciplined monthly investing will grow to — with the magic of compounding working in your favor.
      </p>
      <p>
        Unlike traditional savings accounts or fixed deposits, mutual fund SIPs can potentially deliver higher inflation-adjusted returns over the long term. The SIP calculator helps you set realistic goals and reverse-engineer how much you need to invest monthly to reach them.
      </p>

      <h2>How to Use This SIP Calculator</h2>
      <ol>
        <li>
          <strong>Enter Monthly SIP Amount:</strong> The amount you plan to invest every month. You can start as low as ₹500.
        </li>
        <li>
          <strong>Set Expected Annual Returns:</strong> The average annual return you expect from your mutual fund. For equity funds, 10–12% is a reasonable long-term assumption.
        </li>
        <li>
          <strong>Choose Investment Period:</strong> How many years you plan to stay invested. The longer the period, the more compounding works in your favor.
        </li>
        <li>
          <strong>Read the results:</strong> The calculator instantly shows your total invested amount, estimated returns, and final corpus. Switch between the growth chart and year-by-year table for a detailed breakdown.
        </li>
      </ol>
      <p>
        Results update <em>instantly</em> as you move the sliders — no &quot;Calculate&quot; button needed. Use the share button to save your calculation or send it on WhatsApp.
      </p>

      <h2>SIP Calculator Formula</h2>
      <p>The SIP maturity amount is calculated using the following formula:</p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 my-4 font-mono text-sm">
        M = P × &#123;[(1 + i)^n – 1] / i&#125; × (1 + i)
      </div>
      <p>Where:</p>
      <ul>
        <li><strong>M</strong> = Maturity Amount (total value at the end)</li>
        <li><strong>P</strong> = Monthly SIP investment (₹)</li>
        <li><strong>i</strong> = Monthly rate of return = Annual rate ÷ 12 ÷ 100</li>
        <li><strong>n</strong> = Total number of months = Years × 12</li>
      </ul>
      <p>
        <strong>Example:</strong> If you invest ₹5,000/month for 10 years at 12% annual return:
        i = 12/12/100 = 0.01, n = 120 months.
        M = 5000 × &#123;[(1.01)^120 – 1] / 0.01&#125; × 1.01 = <strong>₹11.6 Lakhs</strong> (against ₹6 Lakhs invested).
      </p>

      <h2>SIP vs Lumpsum — Which is Better?</h2>
      <p>
        Both SIP and lumpsum are valid investment strategies, but they suit different situations:
      </p>
      <ul>
        <li>
          <strong>SIP is better when:</strong> You have a regular salary, you&apos;re unsure about market timing, or you want to invest ₹1,000–₹50,000/month. SIP benefits from rupee cost averaging — you buy more units when markets fall and fewer when they rise.
        </li>
        <li>
          <strong>Lumpsum is better when:</strong> You have a large windfall (bonus, inheritance), markets have corrected significantly, or you have a short-term goal with a specific fund in mind.
        </li>
      </ul>
      <p>
        For most salaried Indians, <strong>SIP is the recommended approach</strong> because it removes the temptation to time the market and builds discipline automatically.
      </p>

      <h2>Top Mutual Funds for SIP in India 2026</h2>
      <p>
        Here are some consistently well-performing categories for long-term SIP (always check current ratings and your risk profile before investing):
      </p>
      <ul>
        <li><strong>Large Cap Funds:</strong> Mirae Asset Large Cap, Axis Bluechip — lower risk, steady 11–13% returns</li>
        <li><strong>Flexi Cap Funds:</strong> Parag Parikh Flexi Cap, HDFC Flexi Cap — balanced risk, 13–15% returns</li>
        <li><strong>Mid Cap Funds:</strong> Motilal Oswal Midcap, Kotak Emerging Equity — higher risk, 15–18% returns</li>
        <li><strong>Index Funds:</strong> UTI Nifty 50, Nippon India Nifty 500 — lowest cost, market-matching returns</li>
        <li><strong>ELSS Tax Saver Funds:</strong> DSP Tax Saver, Mirae Asset ELSS — Section 80C deduction up to ₹1.5L/year</li>
      </ul>

      <blockquote>
        <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Past performance does not guarantee future results. This calculator is for educational and planning purposes only. Please consult a SEBI-registered financial advisor before investing.
      </blockquote>
    </>
  );
}
