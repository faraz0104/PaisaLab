"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_CALCULATORS } from "@/lib/seo";

const categories = ["Investment", "Loans", "Tax", "Savings"] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
              ₹
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              Rupeescalc
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <div
                key={cat}
                className="relative"
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  {cat}
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeCategory === cat && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                    {ALL_CALCULATORS.filter((c) => c.category === cat).map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/${calc.slug}/`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                      >
                        <span className="text-base">{calc.icon}</span>
                        <div>
                          <p className="font-medium leading-tight">{calc.label}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
            >
              All Calculators
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          {/* Search hint */}
          <div className="px-4 pt-3 pb-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              Search all calculators...
            </Link>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="px-4 py-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">{cat}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {ALL_CALCULATORS.filter((c) => c.category === cat).map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}/`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{calc.icon}</span>
                    <span className="font-medium leading-tight text-xs">{calc.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 mt-1">
            <p className="text-xs text-center text-slate-400">rupeescalc.in</p>
          </div>
        </div>
      )}
    </header>
  );
}
