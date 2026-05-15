import Link from "next/link";
import { ALL_CALCULATORS, SITE_NAME_CONST } from "@/lib/seo";
import { organizationSchema, JsonLd } from "@/lib/schemas";

const categories = ["Investment", "Loans", "Tax", "Savings"] as const;

const categoryDescriptions: Record<string, string> = {
  Investment: "SIP, lumpsum, and systematic withdrawal planning",
  Loans: "Home, car, and personal loan EMI with amortization",
  Tax: "Income tax and GST calculations for FY 2025-26",
  Savings: "Fixed and recurring deposit maturity calculations",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/30 rounded-full px-3 py-1 text-sm text-brand mb-6">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              Free · No signup · Instant results
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
              India&apos;s Smartest{" "}
              <span className="text-brand">Finance Calculators</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              SIP, EMI, Income Tax, GST, FD — 12 calculators that update as you type.
              No button clicks, no ads above the fold, no clutter.
              Built for India, optimized for mobile.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sip-calculator/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition-colors shadow-brand-glow"
              >
                📈 SIP Calculator
              </Link>
              <Link
                href="/emi-calculator/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                🏦 EMI Calculator
              </Link>
              <Link
                href="/income-tax-calculator/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                📋 Tax Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 text-center">
              {[
                { label: "Calculators", value: "12" },
                { label: "Monthly Searches", value: "2M+" },
                { label: "Mobile Ready", value: "100%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl sm:text-2xl font-bold text-brand">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            All Calculators
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Pick a calculator and get instant results — no signup required
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {cat}
              </h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 hidden sm:block">
                {categoryDescriptions[cat]}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ALL_CALCULATORS.filter((c) => c.category === cat).map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}/`}
                  className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand dark:hover:border-brand hover:shadow-card-hover transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl group-hover:bg-brand/10 transition-colors">
                    {calc.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-center leading-tight">
                    {calc.label}
                  </span>
                  <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand text-xs">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Why PaisaLab */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Why {SITE_NAME_CONST}?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Instant Results",
                desc: "Results update as you type or drag the slider. No &ldquo;Calculate&rdquo; button. No page reload.",
              },
              {
                icon: "📊",
                title: "Beautiful Charts",
                desc: "Animated area charts, donut charts, and year-by-year tables make your numbers visual and clear.",
              },
              {
                icon: "💡",
                title: "Smart Insights",
                desc: "Plain-English insights after every calculation — like &ldquo;Increase EMI by ₹2K to save 2 years.&rdquo;",
              },
              {
                icon: "📱",
                title: "Mobile-First",
                desc: "Designed for the 70%+ of Indian users on mobile. Large touch targets, responsive layouts.",
              },
              {
                icon: "🔗",
                title: "Shareable Links",
                desc: "Share your calculation results via WhatsApp or a direct link that preserves all inputs.",
              },
              {
                icon: "🇮🇳",
                title: "Built for India",
                desc: "Indian number format (lakh/crore), ₹ symbol, FY 2025-26 tax slabs, bank-wise FD rates.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-2xl shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                  <p
                    className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: f.desc }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular searches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-base font-semibold text-slate-600 dark:text-slate-400 mb-4">
          Popular Calculations
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/sip-calculator/?amt=5000&rate=12&years=10", label: "SIP ₹5K/month × 10 yr @ 12%" },
            { href: "/emi-calculator/?principal=3000000&rate=8.5&years=20", label: "Home Loan ₹30L × 20 yr @ 8.5%" },
            { href: "/income-tax-calculator/?income=1200000", label: "Tax on ₹12L salary" },
            { href: "/gst-calculator/?amount=10000&slab=18", label: "GST on ₹10,000 @ 18%" },
            { href: "/fd-calculator/?principal=100000&rate=7&years=5", label: "FD ₹1L × 5 yr @ 7%" },
            { href: "/sip-calculator/?amt=10000&rate=15&years=20", label: "SIP ₹10K/month × 20 yr @ 15%" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:border-brand hover:text-brand dark:hover:text-brand transition-colors bg-white dark:bg-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
