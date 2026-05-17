import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL_CONST } from "@/lib/seo";
import { webAppSchema, faqSchema, JsonLd } from "@/lib/schemas";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import NPSCalculator from "@/components/nps/NPSCalculator";

const slug = "nps-calculator";
const title = "NPS Calculator 2025 — National Pension System Returns Calculator";
const description =
  "Free NPS calculator 2025: Calculate National Pension System corpus, monthly pension & tax savings. Enter age, monthly contribution & expected return — see retirement corpus, lump sum & pension. Instant results.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "NPS calculator",
    "NPS calculator 2025",
    "national pension system calculator",
    "NPS return calculator",
    "NPS calculator online India",
    "NPS maturity calculator",
    "NPS pension calculator",
    "NPS tax benefit calculator",
    "NPS 80CCD calculator",
    "NPS corpus calculator",
    "NPS monthly pension calculator",
    "NPS vs PPF calculator",
    "NPS calculator for government employees",
    "NPS annuity calculator",
    "NPS tier 1 calculator",
  ],
  alternates: { canonical: `${SITE_URL_CONST}/${slug}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL_CONST}/${slug}/`,
    title,
    description,
    siteName: "RupeesCalc",
    images: [{ url: `${SITE_URL_CONST}/og/${slug}.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL_CONST}/og/${slug}.png`] },
};

const FAQS = [
  {
    question: "What is NPS (National Pension System) and how does it work?",
    answer: "NPS (National Pension System) is a government-sponsored retirement savings scheme open to all Indian citizens aged 18–70. How it works: You contribute monthly/annually to your NPS Tier-I account. The money is invested across equities (E), corporate bonds (C), government securities (G), and alternative assets (A) by professional fund managers (SBI, LIC, HDFC, ICICI, Kotak, UTI, Axis, Max Life). At retirement (age 60+): Minimum 40% of corpus must be used to buy an annuity (monthly pension). Up to 60% can be withdrawn as a tax-free lump sum. Returns are market-linked — historically 10-12% for Tier-I Aggressive (75% equity) over the long term.",
  },
  {
    question: "What are the tax benefits of NPS in 2025?",
    answer: "NPS offers the highest tax deduction of any investment in India — up to ₹2,00,000+ per year: 80CCD(1): Own contribution up to 10% of salary (max ₹1,50,000, part of 80C limit). 80CCD(1B): Additional ₹50,000 deduction exclusively for NPS — this is OVER AND ABOVE the ₹1.5L 80C limit. 80CCD(2): Employer contribution up to 14% (govt) or 10% (private) of basic+DA — fully deductible for employee, no upper cap. Total potential deduction: ₹1,50,000 (80C) + ₹50,000 (80CCD1B) + employer contribution = ₹2L+ annually. At 30% tax bracket, ₹50,000 via 80CCD(1B) saves ₹15,600 in tax (including cess). This extra ₹50K deduction is available even under new regime for government employees.",
  },
  {
    question: "How is NPS pension calculated at retirement?",
    answer: "At retirement, your total NPS corpus is split: Annuity portion (minimum 40%, you decide how much more). Lump sum withdrawal (remaining 60% or less — completely tax-free). Monthly pension = (Annuity corpus × Annuity rate) ÷ 12. Example: Total corpus = ₹1 crore. 40% annuity = ₹40 lakh. Annuity rate = 6% per annum. Monthly pension = ₹40,00,000 × 6% ÷ 12 = ₹20,000/month. The annuity rate depends on the annuity provider (LIC, SBI Life, etc.) and the annuity plan you choose. Current rates range from 5.5% to 7% depending on age and plan. Higher annuity percentage = more pension but less lump sum.",
  },
  {
    question: "NPS vs PPF — which is better for retirement?",
    answer: "Comparison: NPS — Returns: 10-12% (market-linked, not guaranteed). Tax on withdrawal: 60% lump sum tax-free; annuity income taxable. Lock-in: Till 60. Best for: Maximum tax benefit, higher long-term growth. PPF — Returns: 7.1% (guaranteed). Tax on withdrawal: 100% tax-free (EEE). Lock-in: 15 years (extendable). Best for: Guaranteed returns, conservative investors. Verdict: For aggressive wealth creation + maximum tax savings: NPS. For guaranteed, 100% tax-free returns: PPF. Most advisors recommend doing both: PPF ₹1.5L/year + NPS ₹50K/year (via 80CCD1B). This maximizes both growth and tax efficiency.",
  },
  {
    question: "What is NPS Tier-1 vs Tier-2?",
    answer: "NPS Tier-1 (mandatory): Tax-deductible contributions. Lock-in till age 60 (partial withdrawal after 3 years for specific reasons). Minimum contribution: ₹500/year (₹1,000 to maintain active status). Tax benefits: 80CCD(1), 80CCD(1B), 80CCD(2). NPS Tier-2 (optional, voluntary savings): No tax deduction (except for government employees). No lock-in — withdraw anytime. Works like a mutual fund but with lower costs. No tax benefits. Minimum: ₹250/transaction. Tier-2 is essentially a no-lock-in investment account. Use Tier-1 for the tax benefits; Tier-2 only if you want NPS fund management without lock-in.",
  },
  {
    question: "Can I withdraw from NPS before retirement?",
    answer: "Partial withdrawal from Tier-1 (after 3 years of account opening): Purpose must be one of: Child's higher education or marriage, Purchase/construction of first residential property, Treatment of specified illnesses (cancer, kidney failure, etc.), or Skill development. Amount: Up to 25% of OWN contributions (not employer's, not returns). Frequency: Max 3 times over the entire NPS tenure. Early exit before 60 (not on retirement): Minimum 80% of corpus must be used for annuity. Only 20% can be withdrawn. This is less favorable than regular retirement exit (where you keep 60%). On retirement (age 60+): 60% tax-free lump sum + 40% annuity minimum. Death: The entire corpus goes to the nominee, all tax-free.",
  },
  {
    question: "How much should I invest in NPS for a good pension?",
    answer: "Rule of thumb: Replace 50-60% of your pre-retirement income with pension. Example for ₹1,00,000/month income at retirement: Target monthly pension = ₹50,000. NPS corpus needed (at 6% annuity) = ₹50,000 × 12 ÷ 6% = ₹1 crore (for 40% annuity). Total corpus needed = ₹1 crore ÷ 40% = ₹2.5 crore. Monthly SIP to build ₹2.5 crore: Starting at 30, retiring at 60, 10% return → ₹14,500/month. This means ₹14,500/month in NPS (₹50,000 under 80C + ₹50,000 under 80CCD1B = full tax benefit, and rest is regular NPS Tier-1). Always supplement NPS with PPF and equity SIP for a complete retirement portfolio.",
  },
  {
    question: "Is NPS safe? What happens if a fund manager fails?",
    answer: "NPS is one of the safest investment products in India: Regulated by PFRDA (Pension Fund Regulatory and Development Authority). Funds are held in a central pool, not with individual fund managers. If an NPS fund manager fails, your account is transferred to another registered PFM — your money is not at risk. Multiple fund managers compete (HDFC, SBI, LIC, ICICI, Kotak, UTI, Axis, Max Life) — you can switch once a year free. Investment risk: NPS investments in equity (stocks and index funds) carry market risk. Your corpus can go down temporarily. But over 20-30 year horizons, equity returns have historically been positive. The conservative (G) option (100% government bonds) eliminates market risk but reduces returns.",
  },
  {
    question: "What is the NPS auto-choice option?",
    answer: "NPS offers two investment approaches: Active Choice: You manually decide the allocation across E (equity, max 75%), C (corporate bonds), G (government bonds), A (alternative assets, max 5%). Auto Choice (Lifecycle Fund): Asset allocation automatically shifts as you age — more equity when young, shifts to bonds as retirement approaches. Three auto-choice variants: LC75 (Aggressive): 75% equity till 35, reduces to 15% at 55. LC50 (Moderate): 50% equity till 35, reduces to 10% at 55. LC25 (Conservative): 25% equity till 35, reduces to 5% at 55. For young investors (under 40), LC75 or Active with 75% E is recommended for maximum long-term growth. Switch to auto-choice as you near 50.",
  },
  {
    question: "How do I open an NPS account online?",
    answer: "Open NPS online in 15 minutes: eNPS Portal: npscra.nsdl.co.in — open directly with Aadhaar/PAN + net banking. Bank portals: Most banks (SBI, HDFC, ICICI, Axis) offer NPS account opening through their net banking or app. NSDL/KARVY/Protean: Any Point of Presence (PoP) service provider's website. Documents needed: PAN card, Aadhaar, bank account details (cancelled cheque/passbook), passport-size photo. PRAN (Permanent Retirement Account Number) is issued immediately. Minimum initial contribution: ₹500 (Tier-1). Annual minimum: ₹1,000 to keep account active. KYC: Aadhaar-based eKYC makes the process paperless — account opens same day.",
  },
];

export default function NPSCalculatorPage() {
  return (
    <>
      <JsonLd data={webAppSchema(slug, title, description)} />
      <JsonLd data={faqSchema(FAQS)} />
      <CalculatorShell
        slug={slug}
        h1={title}
        faqs={FAQS}
        relatedSlugs={["ppf-calculator", "sip-calculator", "income-tax-calculator", "retirement-calculator"]}
        content={<NPSContent />}
      >
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />}>
          <NPSCalculator />
        </Suspense>
      </CalculatorShell>
    </>
  );
}

function NPSContent() {
  return (
    <>
      <h2>What is an NPS Calculator?</h2>
      <p>
        An <strong>NPS calculator</strong> estimates your National Pension System corpus at retirement, the monthly pension you will receive, and your lump-sum tax-free withdrawal. Enter your age, monthly contribution, and expected return — see exactly where you stand for retirement.
      </p>

      <h2>NPS Tax Benefits — Complete Picture</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Section</th>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Who</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Max Deduction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["80CCD(1)", "Employee/Self-employed", "₹1,50,000 (part of 80C)"],
              ["80CCD(1B)", "Employee/Self-employed", "₹50,000 (extra, over 80C)"],
              ["80CCD(2)", "Salaried (employer contribution)", "10–14% of basic, no cap"],
            ].map(([sec, who, max]) => (
              <tr key={sec} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">{sec}</td>
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{who}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>NPS Returns — Scheme Performance (as of 2024)</h2>
      <div className="overflow-x-auto my-3">
        <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Scheme</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">1 Year</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">5 Years</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">10 Years</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              ["Scheme E (Equity)", "20–24%", "14–16%", "12–14%"],
              ["Scheme C (Corp Bonds)", "8–10%", "7–8%", "8–9%"],
              ["Scheme G (Govt Bonds)", "6–8%", "6–7%", "7–8%"],
              ["Auto LC75 (Aggressive)", "18–22%", "13–15%", "11–13%"],
            ].map(([scheme, y1, y5, y10]) => (
              <tr key={scheme} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{scheme}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y1}</td>
                <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300">{y5}</td>
                <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-semibold">{y10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">Past returns across NPS fund managers, approximate ranges. Not guaranteed. Source: PFRDA.</p>

      <blockquote>
        <strong>Power of 80CCD(1B):</strong> Investing just ₹50,000/year in NPS saves ₹15,600 in tax (30% bracket + cess) — that's effectively a guaranteed 31.2% return on your first year's contribution, before market returns even kick in.
      </blockquote>
    </>
  );
}
