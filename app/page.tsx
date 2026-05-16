"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ALL_CALCULATORS } from "@/lib/seo";

/* ─── static data ────────────────────────────────────────── */

const categoryMeta = {
  Investment: { color: "emerald", hex: "#10b981", light: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-l-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  Loans:      { color: "blue",    hex: "#3b82f6", light: "bg-blue-50 dark:bg-blue-900/20",     text: "text-blue-600 dark:text-blue-400",     border: "border-l-blue-500",    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  Tax:        { color: "violet",  hex: "#8b5cf6", light: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", border: "border-l-violet-500",  badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400" },
  Savings:    { color: "amber",   hex: "#f59e0b", light: "bg-amber-50 dark:bg-amber-900/20",   text: "text-amber-600 dark:text-amber-400",   border: "border-l-amber-500",   badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  Global:     { color: "teal",    hex: "#14b8a6", light: "bg-teal-50 dark:bg-teal-900/20",     text: "text-teal-600 dark:text-teal-400",     border: "border-l-teal-500",    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
} as const;

const calcInfo: Record<string, { desc: string; example: string }> = {
  "sip-calculator":            { desc: "Estimate returns on monthly mutual fund investments", example: "₹5K/mo × 20 yrs = ₹49.5 L" },
  "lumpsum-calculator":        { desc: "See how a one-time investment grows over time",       example: "₹1 L × 20 yrs @ 12% = ₹9.6 L" },
  "swp-calculator":            { desc: "Plan monthly withdrawals from your corpus",           example: "₹1 Cr corpus → ₹30K/mo" },
  "step-up-sip-calculator":    { desc: "Boost wealth by increasing SIP every year",           example: "₹5K + 10% step × 20 yrs = ₹1.25 Cr" },
  "emi-calculator":            { desc: "Calculate monthly payment for any loan instantly",    example: "₹10 L at 10% for 5 yr = ₹21,247/mo" },
  "home-loan-emi-calculator":  { desc: "Housing loan EMI with prepayment savings",            example: "₹50 L at 9% for 20 yr = ₹44,986/mo" },
  "car-loan-emi-calculator":   { desc: "Auto loan EMI and total interest cost",               example: "₹8 L at 9% for 5 yr = ₹16,601/mo" },
  "personal-loan-emi-calculator": { desc: "Unsecured personal loan monthly payment",         example: "₹3 L at 14% for 3 yr = ₹10,253/mo" },
  "income-tax-calculator":     { desc: "Old vs new regime comparison for FY 2025-26",        example: "₹12.75 L salary → ₹0 tax (new regime)" },
  "gst-calculator":            { desc: "Add or remove GST for all slabs instantly",           example: "₹10,000 + 18% GST = ₹11,800" },
  "fd-calculator":             { desc: "Fixed deposit maturity with bank rate comparison",    example: "₹1 L at 7.25% for 3 yr = ₹1.24 L" },
  "rd-calculator":             { desc: "Recurring deposit maturity for any bank or post office", example: "₹5K/mo for 5 yr = ₹3.58 L" },
  "compound-interest-calculator": { desc: "Calculate interest on any investment in 6 currencies", example: "$10K at 8% for 10 yrs = $22,196" },
};

const featured = ["sip-calculator", "emi-calculator", "income-tax-calculator", "fd-calculator"];

const categories = ["All", "Investment", "Loans", "Tax", "Savings", "Global"] as const;
type Category = typeof categories[number];

const catIcons: Record<Category, string> = {
  All: "🧮", Investment: "📈", Loans: "🏦", Tax: "📋", Savings: "🏛️", Global: "🌍",
};

/* ─── page ────────────────────────────────────────────────── */

export default function HomePage() {
  const [search, setSearch]     = useState("");
  const [activeCat, setActiveCat] = useState<Category>("All");

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_CALCULATORS.filter((c) => {
      const matchCat = activeCat === "All" || c.category === activeCat;
      const matchQ   = !q || c.label.toLowerCase().includes(q) || (calcInfo[c.slug]?.desc ?? "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, activeCat]);

  const featuredCalcs = ALL_CALCULATORS.filter((c) => featured.includes(c.slug));

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white dark:bg-slate-900 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-emerald-400/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl -translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-3.5 py-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide mb-5">
            🇮🇳 &nbsp;Free · Instant · No Signup Required
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-[3.25rem] font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-4">
            What do you want<br />
            <span className="text-emerald-500">to calculate</span> today?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            12 free Indian finance calculators — SIP, EMI, income tax, GST, FD, RD and more. Results update as you type.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveCat("All"); }}
              placeholder='Search — "SIP", "home loan", "GST", "tax"…'
              className="w-full pl-12 pr-10 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base outline-none focus:ring-2 focus:ring-emerald-500 shadow-md shadow-slate-100 dark:shadow-none transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Quick chips */}
          {!isSearching && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {featuredCalcs.map((c) => {
                const cm = categoryMeta[c.category as keyof typeof categoryMeta];
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 ${cm.badge} border-transparent`}
                  >
                    {c.icon} {c.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SEARCH RESULTS
      ══════════════════════════════════════════════════════ */}
      {isSearching && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-slate-700 dark:text-slate-200 font-semibold text-lg mb-1">
                No results for &quot;{search}&quot;
              </p>
              <p className="text-slate-400 text-sm mb-4">Try &quot;SIP&quot;, &quot;EMI&quot;, &quot;tax&quot;, or &quot;GST&quot;</p>
              <button onClick={() => setSearch("")} className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                Clear search
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((c) => <FullCard key={c.slug} calc={c} />)}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      {!isSearching && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">

          {/* ── FEATURED 4 ───────────────────────────────────── */}
          <section>
            <SectionHeader
              label="Most Used"
              title="Popular calculators"
              sub="Start here — the four tools Indians use most."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCalcs.map((c) => <FeaturedCard key={c.slug} calc={c} />)}
            </div>
          </section>

          {/* ── ALL CALCULATORS ──────────────────────────────── */}
          <section>
            <SectionHeader
              label="All Tools"
              title="Every calculator"
              sub="12 free tools — pick a category or browse all."
            />

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => {
                const isActive = activeCat === cat;
                const cm = cat !== "All" ? categoryMeta[cat as keyof typeof categoryMeta] : null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? cm
                          ? `${cm.badge} border-transparent shadow-sm`
                          : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="text-base">{catIcons[cat]}</span> {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((c) => <FullCard key={c.slug} calc={c} />)}
            </div>
          </section>

          {/* ── HOW IT WORKS ─────────────────────────────────── */}
          <section className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "01", icon: "🎚️", title: "Adjust the sliders", desc: "Set your amount, rate, and duration. No typing required — just drag and drop." },
              { step: "02", icon: "⚡", title: "See instant results", desc: "Charts, totals, and year-by-year tables update in real time. No Calculate button." },
              { step: "03", icon: "🔗", title: "Share your plan", desc: "Copy your result URL or tap the WhatsApp button to share with family or an advisor." },
            ].map((s) => (
              <div key={s.step} className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
                <span className="absolute top-4 right-5 text-5xl font-black text-slate-100 dark:text-slate-800 select-none leading-none">{s.step}</span>
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="font-bold text-slate-900 dark:text-white mb-1.5">{s.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </section>

          {/* ── TRUST / FEATURES ─────────────────────────────── */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🇮🇳", title: "Built for India", desc: "₹ in lakh & crore, FY 2025-26 tax slabs, Indian bank rates." },
                { icon: "🔒", title: "100% Private", desc: "No login. All math runs in your browser. We store nothing." },
                { icon: "📊", title: "Live Charts", desc: "Animated growth charts and donut charts update as you type." },
                { icon: "📱", title: "Works on Mobile", desc: "Thumb-friendly sliders, fast on 4G — no app needed." },
              ].map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="text-2xl shrink-0 mt-0.5">{f.icon}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{f.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── DISCLAIMER ───────────────────────────────────── */}
          <p className="text-xs text-center text-slate-400 dark:text-slate-600 pb-2">
            All results are estimates for planning purposes only. Mutual fund investments are subject to market risks.
            Verify with your bank or a SEBI-registered advisor before investing.
          </p>

        </div>
      )}
    </div>
  );
}

/* ─── sub-components ─────────────────────────────────────── */

function SectionHeader({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
        <span className="text-sm text-slate-400 hidden sm:block">{sub}</span>
      </div>
    </div>
  );
}

function FeaturedCard({ calc }: { calc: typeof ALL_CALCULATORS[number] }) {
  const cm = categoryMeta[calc.category as keyof typeof categoryMeta];
  const info = calcInfo[calc.slug];
  return (
    <Link
      href={`/${calc.slug}/`}
      className="group relative flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-transparent hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      {/* colour accent strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${cm.light} opacity-0 group-hover:opacity-100 transition-opacity`}
        style={{ background: `linear-gradient(90deg, ${cm.hex}, ${cm.hex}88)` }} />

      <div className={`w-11 h-11 rounded-xl ${cm.light} flex items-center justify-center text-2xl mb-4`}>
        {calc.icon}
      </div>
      <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1">{calc.label}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 flex-1">{info?.desc}</p>
      <p className={`text-xs font-mono font-semibold ${cm.text} mb-3 leading-snug`}>{info?.example}</p>
      <span className={`text-xs font-bold ${cm.text} group-hover:underline`}>
        Calculate →
      </span>
    </Link>
  );
}

function FullCard({ calc }: { calc: typeof ALL_CALCULATORS[number] }) {
  const cm = categoryMeta[calc.category as keyof typeof categoryMeta];
  const info = calcInfo[calc.slug];
  return (
    <Link
      href={`/${calc.slug}/`}
      className={`group flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border-l-4 ${cm.border} border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className={`w-10 h-10 rounded-xl ${cm.light} flex items-center justify-center text-xl shrink-0`}>
        {calc.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{calc.label}</p>
          <span className={`hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cm.badge}`}>
            {calc.category}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mb-1.5">{info?.desc}</p>
        <p className={`text-xs font-mono font-semibold ${cm.text}`}>{info?.example}</p>
      </div>
      <svg
        className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 mt-1"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
