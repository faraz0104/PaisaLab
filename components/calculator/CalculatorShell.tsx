import type { ReactNode } from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ALL_CALCULATORS } from "@/lib/seo";
import { howToSchema, type HowToStep, JsonLd } from "@/lib/schemas";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorShellProps {
  slug: string;
  h1: string;
  children: ReactNode;
  content: ReactNode;
  faqs?: FAQ[];
  relatedSlugs?: string[];
  howToSteps?: HowToStep[];
  lastUpdated?: string;
}

export default function CalculatorShell({
  slug,
  h1,
  children,
  content,
  faqs,
  relatedSlugs = [],
  howToSteps,
  lastUpdated = "May 2025",
}: CalculatorShellProps) {
  const related = relatedSlugs
    .map((s) => ALL_CALCULATORS.find((c) => c.slug === s))
    .filter(Boolean) as (typeof ALL_CALCULATORS)[number][];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {howToSteps && howToSteps.length > 0 && (
        <JsonLd data={howToSchema(`How to use the ${h1.split("—")[0].trim()}`, `Step-by-step guide to using the free ${h1.split("—")[0].trim()} on RupeesCalc.`, howToSteps)} />
      )}

      {/* Breadcrumb bar */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <Breadcrumb items={[{ label: h1.split("—")[0].trim() }]} />
        </div>
      </div>

      {/* Hero + calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {h1}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
          By <span className="font-medium text-slate-500 dark:text-slate-400">RupeesCalc Editorial Team</span>
          {" · "}Reviewed by a <span className="font-medium text-slate-500 dark:text-slate-400">SEBI-registered financial planner</span>
          {" · "}Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>

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

        {/* Sources & Methodology */}
        <section className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            <strong className="text-slate-500 dark:text-slate-400">Sources & Methodology:</strong>{" "}
            Calculations are based on standard mathematical formulas. Tax slabs and rates are sourced from the{" "}
            <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Income Tax Department of India</a>,{" "}
            <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Reserve Bank of India</a>, and{" "}
            <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">AMFI India</a>.{" "}
            All calculators are for educational and planning purposes only — not financial advice.{" "}
            Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>.
          </p>
        </section>
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
