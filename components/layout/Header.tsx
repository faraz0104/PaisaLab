"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_CALCULATORS } from "@/lib/seo";

const categories = ["Investment", "Loans", "Tax", "Savings"] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm">
              ₹
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
              Paisa<span className="text-brand">Lab</span>
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
                <button className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand transition-colors rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">
                  {cat}
                  <span className="ml-1 opacity-60">▾</span>
                </button>

                {activeCategory === cat && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-1 z-50">
                    {ALL_CALCULATORS.filter((c) => c.category === cat).map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/${calc.slug}/`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand transition-colors"
                      >
                        <span>{calc.icon}</span>
                        {calc.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/sip-calculator/"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors"
            >
              Start Calculating
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 pb-4">
          {categories.map((cat) => (
            <div key={cat} className="px-4 pt-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{cat}</p>
              <div className="grid grid-cols-2 gap-1">
                {ALL_CALCULATORS.filter((c) => c.category === cat).map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}/`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{calc.icon}</span>
                    {calc.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
