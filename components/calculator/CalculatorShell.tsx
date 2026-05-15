import type { ReactNode } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ALL_CALCULATORS } from "@/lib/seo";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorShellProps {
  slug: string;
  h1: string;
  children: ReactNode;       // the interactive calculator widget
  content: ReactNode;        // SEO content below the fold
  faqs?: FAQ[];
  relatedSlugs?: string[];
}

export default function CalculatorShell({
  slug,
  h1,
  children,
  content,
  faqs,
  relatedSlugs = [],
}: CalculatorShellProps) {
  const related = relatedSlugs
    .map((s) => ALL_CALCULATORS.find((c) => c.slug === s))
    .filter(Boolean) as (typeof ALL_CALCULATORS)[number][];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb bar */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <Breadcrumb items={[{ label: h1.split("—")[0].trim() }]} />
        </div>
      </div>

      {/* Hero + calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {h1}
        </h1>

        {/* Calculator widget (above fold, no ads) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {children}
        </div>
      </div>

      {/* AdSense slot 1 — after calculator result */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div
          className="w-full h-20 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-xs text-slate-400 no-print"
          data-ad-slot="1"
          aria-hidden="true"
        >
          {/* AdSense: responsive ad unit will be placed here */}
          Ad Placeholder
        </div>
      </div>

      {/* SEO content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-base prose-p:text-slate-600 dark:prose-p:text-slate-300">
          {content}
        </div>

        {/* AdSense slot 2 — mid-content */}
        <div
          className="my-8 w-full h-20 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center justify-center text-xs text-slate-400 no-print"
          data-ad-slot="2"
          aria-hidden="true"
        >
          Ad Placeholder
        </div>

        {/* FAQ section */}
        {faqs && faqs.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        )}

        {/* Related calculators */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Related Calculators
            </h2>
            <div className="flex flex-wrap gap-2">
              {related.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}/`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand transition-colors bg-white dark:bg-slate-900"
                >
                  <span>{calc.icon}</span>
                  {calc.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-slate-800 dark:text-slate-200 select-none list-none">
        {question}
        <svg
          className="w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
