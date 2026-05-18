import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL_CONST } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Personal Finance Guides India — RupeesCalc Learn",
  description: "Free personal finance guides for India: income tax, SIP, HRA exemption, home loan vs SIP, PPF vs NPS, salary breakdown, and more. Written for Indian salaried employees, investors, and borrowers.",
  alternates: { canonical: `${SITE_URL_CONST}/learn/` },
  openGraph: { type: "website", url: `${SITE_URL_CONST}/learn/`, title: "Personal Finance Guides — RupeesCalc", description: "Free guides on SIP, income tax, HRA, salary, home loans, PPF and NPS for Indian investors.", siteName: "RupeesCalc" },
};

const ARTICLES = [
  {
    slug: "sip-to-become-crorepati",
    title: "How Much SIP Do You Need to Become a Crorepati?",
    description: "Calculate exactly how much you need to invest monthly in SIP to reach ₹1 crore, ₹2 crore, or ₹5 crore. With year-by-year breakdown and real fund examples.",
    readTime: "7 min",
    category: "Investment",
    color: "emerald",
  },
  {
    slug: "old-vs-new-tax-regime-fy-2025-26",
    title: "Old vs New Tax Regime FY 2025-26: Which Saves You More?",
    description: "Complete comparison of old and new income tax regimes for FY 2025-26. 5 salary scenarios with exact tax calculations — find out which regime saves you more money.",
    readTime: "10 min",
    category: "Tax",
    color: "violet",
  },
  {
    slug: "hra-exemption-complete-guide",
    title: "Complete Guide to HRA Exemption — 5 Real Scenarios",
    description: "How HRA exemption is calculated, which city qualifies as metro, paying rent to parents, and 5 worked examples covering different salary levels.",
    readTime: "8 min",
    category: "Tax",
    color: "violet",
  },
  {
    slug: "home-loan-vs-sip",
    title: "Home Loan Prepayment vs SIP: Where Should You Put Extra Money?",
    description: "The most common personal finance dilemma in India — answered with math. When to prepay, when to invest, and the break-even interest rate that changes everything.",
    readTime: "9 min",
    category: "Investment",
    color: "emerald",
  },
  {
    slug: "ppf-vs-nps-vs-elss",
    title: "PPF vs NPS vs ELSS — The ₹1.5 Lakh Question",
    description: "Where should you put your 80C investments? Detailed comparison of PPF, NPS, and ELSS with returns, tax treatment, lock-in, and risk — for FY 2025-26.",
    readTime: "9 min",
    category: "Investment",
    color: "emerald",
  },
  {
    slug: "ctc-to-in-hand-salary-guide",
    title: "CTC to In-Hand Salary: Every Deduction Explained",
    description: "Step-by-step breakdown of how CTC becomes your in-hand salary — employer PF, gratuity, employee PF, professional tax, and income tax TDS, with real examples.",
    readTime: "8 min",
    category: "Salary",
    color: "blue",
  },
  {
    slug: "budget-2026-income-tax-changes",
    title: "Budget 2026 Income Tax Changes — What Changed for Salaried Employees",
    description: "All income tax changes from Budget 2026 explained for salaried individuals. New slabs, rebate limits, standard deduction updates, and what you should do now.",
    readTime: "6 min",
    category: "Tax",
    color: "violet",
  },
] as const;

const categoryColors: Record<string, string> = {
  Investment: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Tax: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  Salary: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

export default function LearnIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-semibold bg-brand/10 text-brand px-3 py-1 rounded-full mb-4">Free Guides</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Personal Finance Guides for India
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Clear, number-backed explanations of income tax, SIP, HRA, salary, home loans, and more — written for Indian salaried employees and investors.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-2 gap-5">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}/`}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-brand dark:hover:border-brand hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[a.category]}`}>
                  {a.category}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{a.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand transition-colors">
                {a.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {a.description}
              </p>
              <span className="inline-flex items-center mt-4 text-xs font-semibold text-brand">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
