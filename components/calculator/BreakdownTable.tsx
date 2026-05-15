"use client";

import { useState } from "react";
import { formatINR } from "@/lib/calculators/format";

// Intentionally loose — receives typed year-data objects from calculators
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BreakdownRow = Record<string, any>;

interface Column {
  key: string;
  label: string;
  format?: "currency" | "number" | "percent";
}

interface BreakdownTableProps {
  rows: BreakdownRow[];
  columns: Column[];
  initialRows?: number;
}

export default function BreakdownTable({
  rows,
  columns,
  initialRows = 5,
}: BreakdownTableProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? rows : rows.slice(0, initialRows);

  function formatCell(value: number, format?: string) {
    if (format === "currency") return formatINR(value);
    if (format === "percent") return `${value.toFixed(2)}%`;
    return value.toLocaleString("en-IN");
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide">
                Year
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {visible.map((row, i) => (
              <tr
                key={row.year}
                className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  i === visible.length - 1 && expanded
                    ? "bg-brand/5 dark:bg-brand/10 font-semibold"
                    : ""
                }`}
              >
                <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                  Yr {row.year}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2.5 text-right text-slate-800 dark:text-slate-200 tabular-nums"
                  >
                    {formatCell(row[col.key] ?? 0, col.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > initialRows && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2.5 text-xs font-semibold text-brand hover:text-brand-dark dark:hover:text-brand-light border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 transition-colors"
        >
          {expanded ? "▲ Show Less" : `▼ Show All ${rows.length} Years`}
        </button>
      )}
    </div>
  );
}
