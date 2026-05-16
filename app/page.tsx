"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { ALL_CALCULATORS } from "@/lib/seo";

/* ─── data ───────────────────────────────────────────────── */

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

const calcExamples: Record<string, string> = {
  "sip-calculator": "₹5K/mo → ₹49.5L in 20 yrs",
  "lumpsum-calculator": "₹1L → ₹9.6L in 20 yrs @ 12%",
  "swp-calculator": "₹1Cr corpus → ₹30K/mo income",
  "step-up-sip-calculator": "₹5K/mo + 10% step → ₹1.25Cr",
  "emi-calculator": "₹10L at 10% for 5yr → ₹21K/mo",
  "home-loan-emi-calculator": "₹50L at 9% for 20yr → ₹45K/mo",
  "car-loan-emi-calculator": "₹8L at 9% for 5yr → ₹16.6K/mo",
  "personal-loan-emi-calculator": "₹3L at 14% for 3yr → ₹10.2K/mo",
  "income-tax-calculator": "₹12L salary → ₹0 tax (new regime)",
  "gst-calculator": "₹10,000 + 18% GST = ₹11,800",
  "fd-calculator": "₹1L at 7.25% for 3yr → ₹1.24L",
  "rd-calculator": "₹2K/mo for 5yr → ₹1.43L",
};

const goals = [
  {
    id: "invest",
    icon: "📈",
    label: "Save & Invest",
    desc: "Mutual funds, SIP, wealth building",
    slugs: ["sip-calculator", "lumpsum-calculator", "step-up-sip-calculator", "swp-calculator"],
    color: "emerald",
  },
  {
    id: "loan",
    icon: "🏦",
    label: "Take a Loan",
    desc: "Home, car, personal loan EMI",
    slugs: ["emi-calculator", "home-loan-emi-calculator", "car-loan-emi-calculator", "personal-loan-emi-calculator"],
    color: "blue",
  },
  {
    id: "tax",
    icon: "📋",
    label: "Plan Taxes",
    desc: "Income tax, GST calculation",
    slugs: ["income-tax-calculator", "gst-calculator"],
    color: "violet",
  },
  {
    id: "fixed",
    icon: "🏛️",
    label: "Fixed Returns",
    desc: "FD and RD maturity calculator",
    slugs: ["fd-calculator", "rd-calculator"],
    color: "amber",
  },
] as const;

const goalColorMap = {
  emerald: { tab: "bg-emerald-500 text-white", hoverBorder: "hover:border-emerald-400", icon: "bg-emerald-50 dark:bg-emerald-900/30" },
  blue:    { tab: "bg-blue-500 text-white",    hoverBorder: "hover:border-blue-400",    icon: "bg-blue-50 dark:bg-blue-900/30" },
  violet:  { tab: "bg-violet-500 text-white",  hoverBorder: "hover:border-violet-400",  icon: "bg-violet-50 dark:bg-violet-900/30" },
  amber:   { tab: "bg-amber-500 text-white",   hoverBorder: "hover:border-amber-400",   icon: "bg-amber-50 dark:bg-amber-900/30" },
};

function fmtCompact(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ─── mini SIP widget ────────────────────────────────────── */

function MiniSIPCalculator() {
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const rate = 12;

  const maturity = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    return amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }, [amount, years]);

  const invested = amount * years * 12;
  const returns = maturity - invested;
  const gainPct = ((returns / invested) * 100).toFixed(0);

  function pct(val: number, min: number, max: number) {
    return ((val - min) / (max - min)) * 100;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-7 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-base">SIP Calculator</p>
          <p className="text-xs text-slate-400 mt-0.5">Try it instantly</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-lg">📈</div>
      </div>

      <div className="space-y-5">
        {/* Amount slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Monthly SIP</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ₹{amount.toLocaleString("en-IN")}
            </span>
          </div>
          <input
            type="range" min={500} max={50000} step={500} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ "--range-pct": `${pct(amount, 500, 50000)}%` } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹500</span><span>₹50,000</span>
          </div>
        </div>

        {/* Years slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Duration</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{years} years</span>
          </div>
          <input
            type="range" min={1} max={30} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ "--range-pct": `${pct(years, 1, 30)}%` } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1 yr</span><span>30 yrs</span>
          </div>
        </div>

        {/* Result */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Invested</p>
              <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{fmtCompact(invested)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Returns</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">+{gainPct}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">You Get</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{fmtCompact(maturity)}</p>
            </div>
          </div>
        </div>

        <Link
          href="/sip-calculator/"
          className="block w-full text-center py-3 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors"
        >
          Full Calculator with Charts →
        </Link>
      </div>
    </div>
  );
}

/* ─── main page ──────────────────────────────────────────── */

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeGoal, setActiveGoal] = useState<string>("invest");
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!search) return [];
    const q = search.toLowerCase();
    return ALL_CALCULATORS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        (calcDescriptions[c.slug] ?? "").toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [search]);

  const activeGoalData = goals.find((g) => g.id === activeGoal)!;
  const goalCalcs = ALL_CALCULATORS.filter((c) => activeGoalData.slugs.includes(c.slug as never));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500 opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-emerald-400 opacity-10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-4 py-1.5 text-sm text-emerald-300 font-medium mb-6">
                🇮🇳 Free · Instant · No Signup
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                India&apos;s Smartest<br />
                <span className="text-emerald-400">Finance Calculators</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                12 free calculators for SIP, EMI, income tax, GST, FD, RD and more — instant live results, animated charts, shareable links. Built for Indians.
              </p>

              {/* Search */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search — "SIP", "home loan", "tax"...'
                  className="w-full pl-12 pr-10 py-4 rounded-2xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 text-base outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur"
                />
                {search ? (
                  <button onClick={() => setSearch("")} className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white">
                    ✕
                  </button>
                ) : (
                  <kbd className="absolute inset-y-0 right-4 flex items-center text-xs text-slate-600 font-mono">/</kbd>
                )}
              </div>

              {/* Quick links */}
              {!search && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {["SIP Calculator", "EMI Calculator", "Income Tax", "GST Calculator"].map((label) => {
                    const calc = ALL_CALCULATORS.find((c) => c.label === label);
                    if (!calc) return null;
                    return (
                      <Link
                        key={calc.slug}
                        href={`/${calc.slug}/`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-700/60 border border-slate-600 text-slate-300 text-xs font-medium hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                      >
                        <span>{calc.icon}</span> {calc.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: mini calc */}
            <div className="hidden lg:block">
              <MiniSIPCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ────────────────────────────────────── */}
      {search && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {filtered.length === 0
              ? `No results for "${search}"`
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">Nothing found for &quot;{search}&quot;</p>
              <button onClick={() => setSearch("")} className="text-sm text-emerald-600 hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((calc) => (
                <CalcCard key={calc.slug} calc={calc} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MAIN CONTENT (hidden while searching) ─────────────── */}
      {!search && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">

          {/* ── STATS BAR ───────────────────────────────────────── */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { value: "12", label: "Free Calculators", icon: "🧮" },
              { value: "0", label: "Signup Required", icon: "🔒" },
              { value: "Live", label: "Instant Results", icon: "⚡" },
              { value: "100%", label: "India-Specific", icon: "🇮🇳" },
            ].map((s) => (
              <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex items-center gap-3">
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">{s.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── GOAL TABS ───────────────────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-xl font-bold text-slate-900 dark:text-white">What do you want to do?</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Pick a goal — we&apos;ll show the right calculator.</p>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {goals.map((g) => {
                const colors = goalColorMap[g.color];
                const isActive = activeGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setActiveGoal(g.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? `${colors.tab} border-transparent shadow-md`
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    <span>{g.icon}</span> {g.label}
                  </button>
                );
              })}
            </div>

            {/* Goal calculators */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {goalCalcs.map((calc) => {
                const colors = goalColorMap[activeGoalData.color];
                return (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}/`}
                    className={`group flex flex-col gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 ${colors.hoverBorder} hover:shadow-lg transition-all duration-200`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center text-2xl`}>
                      {calc.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{calc.label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-snug">
                        {calcDescriptions[calc.slug]}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400 font-mono leading-snug">
                        {calcExamples[calc.slug]}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                      Calculate →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── HOW IT WORKS ────────────────────────────────────── */}
          <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl font-bold mb-2">How it works</h2>
            <p className="text-emerald-100 mb-8 text-sm">Three steps to financial clarity — takes under 30 seconds.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Pick a calculator",
                  desc: "Choose from 12 free calculators for SIP, EMI, tax, FD, and more.",
                  icon: "🧮",
                },
                {
                  step: "2",
                  title: "Move the sliders",
                  desc: "Adjust amount, rate, and duration. Results update instantly as you drag — no button needed.",
                  icon: "🎚️",
                },
                {
                  step: "3",
                  title: "Share your plan",
                  desc: "Copy the shareable link or tap the WhatsApp button to send your plan to your advisor or family.",
                  icon: "🔗",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg font-bold shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-bold mb-1">{s.title}</p>
                    <p className="text-emerald-100 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ALL CALCULATORS ─────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">All Calculators</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">12 tools — all free, all instant</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_CALCULATORS.map((calc) => (
                <CalcCard key={calc.slug} calc={calc} />
              ))}
            </div>
          </section>

          {/* ── FEATURES ────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Why RupeesCalc?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Built different from other calculator sites.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "⚡",
                  title: "Results as you type",
                  desc: "No Calculate button. Move a slider — the answer updates in real time with animated charts.",
                },
                {
                  icon: "🇮🇳",
                  title: "100% India-specific",
                  desc: "₹ formatting in lakh & crore, FY 2025-26 tax slabs, Indian bank rates. Not a US tool reskinned.",
                },
                {
                  icon: "🔒",
                  title: "Your data stays private",
                  desc: "No account needed. All calculations happen in your browser. Nothing is sent to our servers.",
                },
                {
                  icon: "📊",
                  title: "Visual charts",
                  desc: "Live animated growth charts, donut charts showing principal vs returns, year-by-year tables.",
                },
                {
                  icon: "🔗",
                  title: "Shareable results",
                  desc: "Every calculation is encoded in the URL. Share your SIP plan via WhatsApp in one tap.",
                },
                {
                  icon: "📱",
                  title: "Mobile-first design",
                  desc: "Thumb-friendly sliders, readable on any screen size, fast on 4G. Works without an app.",
                },
              ].map((f) => (
                <div key={f.title} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex gap-4">
                  <div className="text-2xl shrink-0">{f.icon}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{f.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── MOBILE MINI CALC CTA ────────────────────────────── */}
          <section className="lg:hidden">
            <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 text-center">
              <p className="text-white font-bold text-lg mb-1">Try a quick SIP calculation</p>
              <p className="text-slate-400 text-sm mb-4">See how ₹5,000/month grows over 10 years</p>
              <Link
                href="/sip-calculator/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
              >
                📈 Open SIP Calculator
              </Link>
            </div>
          </section>

          {/* ── DISCLAIMER ──────────────────────────────────────── */}
          <p className="text-xs text-center text-slate-400 dark:text-slate-600 pb-4">
            All calculations are for informational and planning purposes only. Mutual fund investments are subject to market risks.
            Not financial advice. Verify with your bank or a SEBI-registered advisor before investing.
          </p>

        </div>
      )}
    </div>
  );
}

/* ─── reusable calculator card ───────────────────────────── */

function CalcCard({ calc }: { calc: typeof ALL_CALCULATORS[number] }) {
  return (
    <Link
      href={`/${calc.slug}/`}
      className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all duration-150"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
        {calc.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 dark:text-white text-sm leading-tight">{calc.label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {calcDescriptions[calc.slug]}
        </p>
        {calcExamples[calc.slug] && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 font-medium">
            {calcExamples[calc.slug]}
          </p>
        )}
      </div>
      <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
