"use client";

import { formatINR, formatINRCompact } from "@/lib/calculators/format";

export interface ResultCard {
  label: string;
  value: number;
  highlight?: boolean;   // emerald highlight for main result
  isNegative?: boolean;  // red for losses
  compact?: boolean;     // use compact format (L/Cr)
}

interface ResultSummaryProps {
  cards: ResultCard[];
}

export default function ResultSummary({ cards }: ResultSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl p-4 ${
            card.highlight
              ? "bg-brand/10 dark:bg-brand/20 border border-brand/30"
              : "bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700"
          }`}
        >
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1 leading-tight">
            {card.label}
          </p>
          <p
            className={`text-lg font-bold result-value leading-tight ${
              card.highlight
                ? "text-brand dark:text-brand-light"
                : card.isNegative
                ? "text-red-500"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {card.compact ? formatINRCompact(card.value) : formatINR(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
