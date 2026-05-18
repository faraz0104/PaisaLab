import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata, CALC_META } from "@/lib/seo";
import { webAppSchema, faqSchema, howToSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FDCalculator from "@/components/fd/FDCalculator";

export const metadata: Metadata = buildMetadata("fd-calculator");

const slug = "fd-calculator";
const meta = CALC_META[slug];

const FAQS = [
  {
    question: "What is an FD calculator?",
    answer: "An FD (Fixed Deposit) calculator is a free online tool that computes the maturity amount and interest earned on your fixed deposit. Enter the principal amount, interest rate, and tenure to instantly see total interest earned and maturity value. You can also compare different compounding frequencies (monthly, quarterly, annually) to see which bank offers better effective returns.",
  },
  {
    question: "What is the best FD interest rate in India 2025?",
    answer: "FD rates in India as of 2025: SBI 6.5%–7.1% (7.5% for 1 year for regular, 7.5%+ for senior citizens), HDFC Bank 7%–7.4%, ICICI Bank 6.7%–7.25%, Axis Bank 6.7%–7.2%, Kotak Mahindra 6.75%–7.4%, Post Office TD 6.9%–7.5%. Small Finance Banks offer highest rates: Unity SFB 9%–9.5%, Utkarsh SFB 8.5%–9%, ESAF SFB 8.25%–8.75%. Senior citizens get 0.25%–0.75% extra at all institutions.",
  },
  {
    question: "Is FD interest taxable in India?",
    answer: "Yes, FD interest is fully taxable as 'Income from Other Sources' at your income tax slab rate. TDS at 10% is deducted when annual interest exceeds ₹40,000 (₹50,000 for senior citizens). If you're in the 30% tax bracket, a 7% FD yields only ~4.9% post-tax return. Submit Form 15G (below 60 years) or Form 15H (senior citizens) to your bank if total income is below taxable limit to avoid TDS deduction.",
  },
  {
    question: "How is FD interest calculated?",
    answer: "Most Indian banks use quarterly compounding. Formula: A = P × (1 + r/n)^(n×t). P = Principal, r = Annual rate (decimal), n = compounding frequency (4 for quarterly), t = Time in years. Example: ₹1L FD at 7% for 1 year (quarterly compounding): A = 1,00,000 × (1 + 0.07/4)^4 = 1,00,000 × (1.0175)^4 = ₹1,07,186. Interest earned = ₹7,186 vs ₹7,000 for simple annual compounding. Quarterly compounding adds ₹186 extra.",
  },
  {
    question: "Can I break an FD before maturity?",
    answer: "Yes, most FDs allow premature withdrawal with a penalty. Typical penalty: 0.5%–1% reduction in applicable interest rate. Example: You put money in a 2-year FD at 7%. You break it after 1 year. Applicable rate for 1 year is 6.5%, minus 1% penalty = 5.5% effective rate. Tax-saver FDs (5-year, 80C) cannot be broken before maturity. Some banks offer 'no-penalty premature withdrawal' FDs — useful for emergency funds.",
  },
  {
    question: "What is a tax-saving FD?",
    answer: "Tax-saving FD (5-year FD) qualifies for Section 80C deduction up to ₹1.5L per year under the old tax regime. Features: 5-year mandatory lock-in (cannot break prematurely), interest is taxable at slab rate (unlike PPF/ELSS which have tax-exempt interest/gains), joint FDs — only first holder gets 80C benefit, available at all scheduled commercial banks and post offices. Current rates: 6.5%–7.5%. Compare with ELSS (higher returns, 3-year lock-in) as an 80C option.",
  },
  {
    question: "What is the DICGC insurance on FD?",
    answer: "Deposit Insurance and Credit Guarantee Corporation (DICGC) insures bank deposits including FDs up to ₹5 lakh per depositor per bank (as of 2025). This ₹5L limit includes principal + interest across all accounts (savings, FD, RD) in the same bank. If a bank fails, you're protected up to ₹5L. For amounts above ₹5L, spread across multiple banks for safety. DICGC doesn't cover NBFCs — avoid keeping large amounts in NBFC FDs.",
  },
  {
    question: "Is FD better than RD?",
    answer: "FD vs RD: FD — invest lump sum at once, same interest rate throughout, better if you have a large amount available, interest compounded quarterly. RD — invest fixed amount monthly, same interest rate, good for regular savers who can't invest lump sum. Interest rates are similar at the same bank. FD earns more total interest if you have the lump sum, since all ₹ earn interest from day 1 vs RD where later installments earn less time. Choose RD if you don't have lump sum.",
  },
  {
    question: "What is the FD rate for senior citizens?",
    answer: "Senior citizen FD rates (additional 0.25%–0.75% over regular rates): SBI — 7.75% on certain tenures, HDFC Bank — 7.75%–8%, ICICI Bank — 7.5%–8%, Post Office — same as regular rates, Unity SFB — up to 10% for senior citizens. Budget 2025 proposed increasing TDS exemption for senior citizens to ₹1L for FD interest. Senior citizens also have option to choose quarterly interest payout for regular income instead of cumulative FD.",
  },
  {
    question: "What is a cumulative vs non-cumulative FD?",
    answer: "Cumulative FD: Interest reinvested and compounded — you get full maturity amount (principal + all compound interest) at the end. Best for wealth building. Non-cumulative FD (payout option): Interest paid out periodically — monthly, quarterly, or annually. Best for regular income seekers (retirees). Interest rates are the same, but cumulative FDs give more total interest due to reinvestment. Our calculator shows cumulative (maturity) calculation — for monthly payout, divide annual interest by 12.",
  },
  {
    question: "How to calculate FD maturity for post office fixed deposit?",
    answer: "Post Office Time Deposit (POTD) rates 2025: 1 year — 6.9%, 2 years — 7%, 3 years — 7.1%, 5 years — 7.5% (qualifies for 80C deduction). POTD uses quarterly compounding. ₹1L in 5-year post office FD at 7.5%: Maturity = 1,00,000 × (1.01875)^20 = ₹1,44,995. Interest earned = ₹44,995. Backed by Government of India — zero default risk. Minimum: ₹1,000. No maximum limit. Can open in any post office or SBI.",
  },
  {
    question: "Is FD or mutual fund better for 3 years?",
    answer: "3-year comparison: FD at 7% (post-tax at 30% slab) = ~4.9% annual returns. Debt mutual fund at 7% (taxed at slab rate post-2023) = ~4.9% (similar after tax). Equity mutual fund: historically 10–14% returns but uncertain and volatile. For money you cannot afford to lose and need in exactly 3 years: FD is better. For amounts where you can tolerate 10–20% volatility: diversified equity fund has a good probability of beating FD over 3 years. Emergency funds and short-term goals → FD. Wealth creation → mutual funds.",
  },
  {
    question: "What is NRE FD and NRO FD for NRIs?",
    answer: "NRE FD (Non-Resident External): Maintained in Indian rupees, funded from foreign earnings, interest fully tax-free in India, freely repatriable (can send back abroad), exchange rate risk on repatriation. NRO FD: Maintained in rupees, funded from Indian income (rent, dividends), interest taxable in India at 30% TDS, repatriation limited to $1M per year. Current NRE FD rates (2025): 6.5%–7.5% at major banks. Tax-free NRE FD interest is a significant benefit for NRIs compared to India FDs.",
  },
  {
    question: "What is the penalty for FD TDS?",
    answer: "FD TDS (Tax Deducted at Source): Deducted @10% if annual FD interest from a bank exceeds ₹40,000 (₹50,000 for senior citizens). If PAN not provided: TDS @20%. Multiple FDs at same bank: all interest from that bank is aggregated. FDs across different banks: TDS calculated separately per bank. Important: TDS is not final tax — you must include FD interest in ITR and pay tax as per your slab. If your slab is 20%, you pay 10% extra. If below taxable limit, file ITR to claim TDS refund.",
  },
  {
    question: "What is a flexi FD or sweep-in FD?",
    answer: "Flexi FD (Sweep-in FD): Linked to your savings account. When savings balance exceeds a threshold (e.g., ₹25,000), excess amount automatically moves to FD. When you need money (ATM withdrawal, cheque), FD breaks in multiples (usually ₹1,000) automatically. You get FD rates on money that would otherwise sit in savings account (earning just 2.5–3.5%). Penalty: none for amounts swept back. Best for: emergency funds where you want FD returns but immediate access. Available at SBI, HDFC, ICICI, Axis.",
  },
];

const HOW_TO_STEPS = [
  { name: "Enter principal amount", text: "Enter the amount you want to invest in a fixed deposit — from ₹1,000 to ₹1 crore." },
  { name: "Set annual interest rate", text: "Enter the FD rate offered by your bank. SBI currently offers 6.5–7.25%, HDFC 7.0–7.4%, small finance banks up to 9%." },
  { name: "Select tenure", text: "Choose the FD duration. Rates vary by tenure — typically higher for 1–3 year FDs than very short or very long durations." },
  { name: "Choose compounding frequency", text: "Select quarterly (most common), monthly, half-yearly, or annual compounding. More frequent compounding = slightly higher effective yield." },
  { name: "View maturity amount and interest", text: "The result shows total interest earned, maturity amount, and effective annual yield — compare this against SIP returns to decide where to invest." },
];

export default function FDPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, "FD Calculator", meta.description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={howToSchema("FD Calculator", "How to calculate fixed deposit maturity amount using RupeesCalc", HOW_TO_STEPS)} />
      <CalculatorShell
        slug={slug}
        h1={meta.h1}
        faqs={FAQS}
        relatedSlugs={["rd-calculator", "sip-calculator", "income-tax-calculator", "swp-calculator"]}
        content={<FDContent />}
        howToSteps={HOW_TO_STEPS}
        lastUpdated="May 2025"
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <FDCalculator mode="fd" />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function FDContent() {
  return (
    <>
      <h2>What is an FD Calculator?</h2>
      <p>
        An <strong>FD Calculator</strong> (Fixed Deposit Calculator) is a free online tool that computes the maturity amount and total interest earned on your fixed deposit investment. Enter the principal amount, interest rate, and tenure to instantly see how your money grows — along with the effective annual yield and total returns. Compare SBI, HDFC, ICICI, post office, and small finance bank FD rates to find the best option.
      </p>
      <p>
        Fixed deposits offer guaranteed, risk-free returns — making them ideal for short-term financial goals, emergency funds, and conservative investors who prioritize capital protection over higher returns.
      </p>

      <h2>FD Formula (Quarterly Compounding)</h2>
      <p>Most Indian banks compound FD interest quarterly. The formula:</p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm my-3">
        A = P × (1 + r/n)^(n × t)
      </div>
      <ul>
        <li><strong>A</strong> = Maturity Amount</li>
        <li><strong>P</strong> = Principal (initial deposit)</li>
        <li><strong>r</strong> = Annual interest rate ÷ 100</li>
        <li><strong>n</strong> = 4 (quarterly compounding)</li>
        <li><strong>t</strong> = Tenure in years</li>
      </ul>
      <p><strong>Example:</strong> ₹5L FD at 7.25% for 3 years: A = 5,00,000 × (1 + 0.0725/4)^12 = 5,00,000 × (1.018125)^12 = <strong>₹6,23,800</strong>. Interest = ₹1,23,800.</p>

      <h2>FD Rates Comparison 2025</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Bank</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">1 Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">3 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Senior Citizen Extra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["SBI", "6.80%", "6.75%", "6.50%", "+0.50%"],
              ["HDFC Bank", "7.00%", "7.00%", "7.00%", "+0.50%"],
              ["ICICI Bank", "6.70%", "7.00%", "7.00%", "+0.50%"],
              ["Axis Bank", "7.10%", "7.10%", "7.00%", "+0.50%"],
              ["Post Office", "6.90%", "7.10%", "7.50%", "Same"],
              ["Unity SFB", "9.00%", "9.00%", "8.65%", "+0.50%"],
            ].map(([bank, y1, y3, y5, sc]) => (
              <tr key={bank} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{bank}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y1}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y3}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y5}</td>
                <td className="px-4 py-2.5 text-right text-brand font-semibold">{sc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>FD vs SIP — Which is Better?</h2>
      <p>
        <strong>FD (Fixed Deposit):</strong> Guaranteed 6.5%–9% returns, zero market risk, DICGC insurance up to ₹5L, interest taxed at slab rate. Best for: money needed within 1–3 years, emergency corpus, conservative investors aged 55+.
      </p>
      <p>
        <strong>SIP in Mutual Funds:</strong> Historically 10–14% returns over 10+ years, market risk, tax-efficient (LTCG 12.5% after 1 year). Best for: 5+ year goals, building long-term wealth, inflation-beating growth.
      </p>
      <p><strong>Rule of thumb:</strong> Keep 6 months expenses in FD as emergency fund. For all goals beyond 5 years, equity SIP beats FD by 3–6% annually — which doubles your wealth over 15 years.</p>

      <blockquote>
        <strong>Disclaimer:</strong> FD rates are indicative and subject to change. DICGC insures up to ₹5L per bank. This FD calculator is for informational purposes only — verify current rates directly with your bank before investing.
      </blockquote>
    </>
  );
}
