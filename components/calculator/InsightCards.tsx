"use client";

interface Insight {
  icon: string;
  text: string;
  type?: "info" | "tip" | "warning";
}

interface InsightCardsProps {
  insights: Insight[];
}

const typeStyles = {
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  tip: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
  warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
};

export default function InsightCards({ insights }: InsightCardsProps) {
  if (!insights.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        Key Insights
      </h3>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm animate-slide-up ${
              typeStyles[insight.type ?? "tip"]
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-base shrink-0 mt-0.5">{insight.icon}</span>
            <p className="leading-snug">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
