import type { Metadata } from "next";
import Link from "next/link";
import { ALL_CALCULATORS, SITE_URL_CONST } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About RupeesCalc — Free Indian Finance Calculators",
  description:
    "RupeesCalc is a free Indian finance calculator platform. Learn about our mission to make personal finance planning simple and accessible for every Indian — SIP, EMI, Tax, GST, FD, RD and more.",
  alternates: { canonical: `${SITE_URL_CONST}/about/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL_CONST}/about/`,
    title: "About RupeesCalc — Free Indian Finance Calculators",
    description:
      "RupeesCalc is a free Indian finance calculator platform. Learn about our mission to make personal finance planning simple for every Indian.",
    siteName: "RupeesCalc",
  },
};

const stats = [
  { value: "12+", label: "Free Calculators" },
  { value: "100%", label: "Free, No Signup" },
  { value: "0", label: "Hidden Charges" },
  { value: "₹0", label: "Cost to You" },
];

const values = [
  {
    icon: "⚡",
    title: "Instant Results",
    desc: "Every calculator updates in real time as you move the slider — no Calculate button, no waiting. Your numbers, your pace.",
  },
  {
    icon: "🇮🇳",
    title: "Built for India",
    desc: "Indian number system (lakh, crore), INR formatting, India-specific tax slabs (FY 2025-26), Indian bank rates, and Indian mutual fund context — not a US calculator reskinned.",
  },
  {
    icon: "🔒",
    title: "Private by Design",
    desc: "No account required. No data saved on servers. All calculations happen entirely in your browser. Your financial numbers never leave your device.",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    desc: "Designed for the Indian user — thumb-friendly sliders, readable on small screens, fast on 4G connections. Works perfectly on any device.",
  },
  {
    icon: "🔗",
    title: "Shareable Plans",
    desc: "Every calculator state is encoded in the URL. Share your SIP plan with your advisor or family via WhatsApp — they open exactly what you see.",
  },
  {
    icon: "📊",
    title: "Visual, Not Just Numbers",
    desc: "Animated growth charts, donut charts showing principal vs returns, year-by-year breakdown tables — because a picture is worth a thousand numbers.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-5">
            About RupeesCalc
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
            Making Personal Finance Simple<br className="hidden sm:block" /> for Every Indian
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            RupeesCalc is a free, no-signup finance calculator platform built specifically for India — with the right tax slabs, the right number formatting, and the right context for Indian investors and borrowers.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center">
              <p className="text-3xl font-bold text-brand mb-1">{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Mission */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
            Most Indians make major financial decisions — taking a home loan, starting a SIP, filing taxes — without fully understanding the numbers. They either rely on advisors with potential conflicts of interest, or skip the math entirely.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
            We built RupeesCalc because we believe that <strong className="text-slate-900 dark:text-white">financial clarity is a right, not a privilege</strong>. Every Indian — whether earning ₹20,000/month or ₹20L/month — deserves to understand exactly what their money is doing.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            Our tools are and will always be <strong className="text-slate-900 dark:text-white">100% free</strong>. No signup. No premium tier. No paywalled features. Just accurate, instant, honest financial math.
          </p>
        </section>

        {/* Why we built this */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Why RupeesCalc?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Most online financial calculators are either built for the US market or require login to see results. We built the tools we wanted to use ourselves.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculators */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Our Calculators</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            12 calculators covering the full spectrum of personal finance decisions in India.
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {ALL_CALCULATORS.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}/`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-slate-700 dark:text-slate-300"
              >
                <span className="text-xl">{calc.icon}</span>
                <div>
                  <p className="font-medium text-sm leading-tight">{calc.label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{calc.category}</p>
                </div>
                <span className="ml-auto text-xs text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-3">Important Disclaimer</h2>
          <p className="text-amber-800 dark:text-amber-400 leading-relaxed text-sm">
            RupeesCalc calculators are for <strong>educational and financial planning purposes only</strong>. The results are estimates based on the inputs you provide and mathematical formulas — they do not constitute financial, investment, tax, or legal advice.
          </p>
          <p className="text-amber-800 dark:text-amber-400 leading-relaxed text-sm mt-3">
            Mutual fund investments are subject to market risks. Loan interest rates, FD rates, and tax slabs change frequently — verify with your bank or a SEBI-registered financial advisor before making any financial decision. Past performance of mutual funds does not guarantee future results.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Have a question or suggestion?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            We&apos;d love to hear from you — whether it&apos;s feedback, a bug report, or a request for a new calculator.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Contact Us →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-emerald-400 hover:text-emerald-600 transition-colors"
            >
              Explore Calculators
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
