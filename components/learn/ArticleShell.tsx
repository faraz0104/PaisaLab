import type { ReactNode } from "react";
import Link from "next/link";
import { ALL_CALCULATORS } from "@/lib/seo";

interface ArticleShellProps {
  h1: string;
  description: string;
  publishDate: string;      // ISO date string, e.g. "2025-05-18"
  readingTime: string;      // e.g. "8 min read"
  relatedSlugs?: string[];
  children: ReactNode;
}

export default function ArticleShell({ h1, description, publishDate, readingTime, relatedSlugs = [], children }: ArticleShellProps) {
  const related = relatedSlugs
    .map((s) => ALL_CALCULATORS.find((c) => c.slug === s))
    .filter(Boolean) as (typeof ALL_CALCULATORS)[number][];

  const displayDate = new Date(publishDate).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/learn/" className="hover:text-brand">Learn</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700 dark:text-slate-300">{h1}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="mb-3">
          <Link href="/learn/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full hover:bg-brand/20 transition-colors">
            ← All Guides
          </Link>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{h1}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">{description}</p>
        <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 pb-6 border-b border-slate-100 dark:border-slate-800">
          <span>By <strong className="text-slate-600 dark:text-slate-300">RupeesCalc Editorial Team</strong></span>
          <span>·</span>
          <time dateTime={publishDate}>{displayDate}</time>
          <span>·</span>
          <span>{readingTime}</span>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h3:text-base prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        {/* Related calculators */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-3">Use These Calculators</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}/`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand transition-colors bg-white dark:bg-slate-900"
                >
                  <span>{calc.icon}</span>
                  {calc.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        <section className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            <strong className="text-slate-500 dark:text-slate-400">Sources:</strong>{" "}
            <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Income Tax Dept of India</a>,{" "}
            <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">Reserve Bank of India</a>,{" "}
            <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">AMFI India</a>,{" "}
            <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">SEBI</a>.{" "}
            All content is for educational purposes only — not financial advice. Last updated: {displayDate}.
          </p>
        </section>
      </div>
    </div>
  );
}
