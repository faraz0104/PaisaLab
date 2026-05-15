"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ALL_CALCULATORS } from "@/lib/seo";

const categories = ["All", "Investment", "Loans", "Tax", "Savings"] as const;

const calcDescriptions: Record<string, string> = {
  "sip-calculator": "Monthly mutual fund returns",
  "lumpsum-calculator": "One-time investment growth",
  "swp-calculator": "Monthly withdrawal planning",
  "step-up-sip-calculator": "SIP with yearly increase",
  "emi-calculator": "Any loan monthly payment",
  "home-loan-emi-calculator": "Housing loan with prepayment",
  "car-loan-emi-calculator": "Vehicle loan EMI",
  "personal-loan-emi-calculator": "Unsecured loan cost",
  "income-tax-calculator": "Old vs new regime FY 2025-26",
  "gst-calculator": "Add or extract GST instantly",
  "fd-calculator": "Fixed deposit maturity",
  "rd-calculator": "Recurring deposit returns",
};

const popularSlugs = ["sip-calculator", "emi-calculator", "income-tax-calculator", "gst-calculator"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return ALL_CALCULATORS.filter((c) => {
      const matchesCategory = activeCategory === "All" || c.category === activeCategory;
      const matchesSearch =
        !search ||
        c.label.toLowerCase().includes(search.toLowerCase()) ||
        (calcDescriptions[c.slug] ?? "").toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const popular = ALL_CALCULATORS.filter((c) => popularSlugs.includes(c.slug));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-5">
            🇮🇳 Free · Instant · No Signup
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            What do you want<br className="hidden sm:block" /> to calculate today?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
            12 Indian finance calculators — results update as you type
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
              onChange={(e) => { setSearch(e.target.value); setActiveCategory("All"); }}
              placeholder='Search — try "SIP", "EMI", "tax", "GST"...'
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-base outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* ── POPULAR ──────────────────────────────────────────── */}
        {!search && (
          <section>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              ⚡ Most Used
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {popular.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}/`}
                  className="group flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-2xl">
                    {calc.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{calc.label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">
                      {calcDescriptions[calc.slug]}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── CATEGORY FILTER ──────────────────────────────────── */}
        {!search && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── ALL CALCULATORS GRID ─────────────────────────────── */}
        <section>
          {search && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-600 dark:text-slate-300 font-medium">No calculator found for &quot;{search}&quot;</p>
              <button onClick={() => setSearch("")} className="mt-3 text-sm text-emerald-600 hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}/`}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-150"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                    {calc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm leading-tight">{calc.label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                      {calcDescriptions[calc.slug]}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── TRUST BAR ────────────────────────────────────────── */}
        {!search && (
          <section className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
            {[
              { icon: "⚡", title: "Instant Results", desc: "Updates as you type — no Calculate button" },
              { icon: "📊", title: "Visual Charts", desc: "Animated charts & year-by-year breakdown" },
              { icon: "🔗", title: "Shareable", desc: "Share results via WhatsApp or link" },
            ].map((f) => (
              <div key={f.title} className="text-center p-4">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="font-semibold text-slate-800 dark:text-white text-sm">{f.title}</p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{f.desc}</p>
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
}
