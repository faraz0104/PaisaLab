"use client";

import { useState, useMemo } from "react";
import { calculatePPF } from "@/lib/calculators/ppf";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

const DEPOSIT_PRESETS = [10000, 25000, 50000, 75000, 100000, 150000];
const TENURE_OPTIONS  = [15, 20, 25];

export default function PPFCalculator() {
  const [yearlyDeposit, setYearlyDeposit] = useState(50000);
  const [interestRate,  setInterestRate]  = useState(7.1);
  const [tenure,        setTenure]        = useState(15);
  const [showAll,       setShowAll]       = useState(false);

  const result = useMemo(
    () => calculatePPF({ yearlyDeposit, interestRate, tenure }),
    [yearlyDeposit, interestRate, tenure]
  );

  const rows = showAll ? result.yearlyBreakdown : result.yearlyBreakdown.slice(0, 5);

  return (
    <div className="p-6 space-y-6">

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4">

        {/* Yearly deposit */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Yearly Deposit
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-2">
            <span className="text-slate-400 mr-2 font-medium">₹</span>
            <input
              type="number"
              value={yearlyDeposit}
              min={500}
              max={150000}
              step={500}
              onChange={(e) => setYearlyDeposit(Math.min(150000, Math.max(500, Number(e.target.value))))}
              className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DEPOSIT_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setYearlyDeposit(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  yearlyDeposit === p
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-400/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                ₹{p >= 100000 ? `${p / 100000}L` : `${p / 1000}K`}
              </button>
            ))}
          </div>
        </div>

        {/* Interest rate + tenure */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
              Interest Rate (% p.a.)
            </label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
              <input
                type="number"
                value={interestRate}
                min={1}
                max={15}
                step={0.1}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white outline-none"
              />
              <span className="text-slate-400 text-sm">%</span>
            </div>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">Current rate: 7.1%</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
              Tenure
            </label>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
              {TENURE_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`flex-1 py-2.5 transition-colors ${
                    tenure === t
                      ? "bg-emerald-500 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {t} yr
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ResultCard label="Maturity Amount" value={formatINRCompact(result.maturityAmount)} color="emerald" big />
        <ResultCard label="Total Invested" value={formatINRCompact(result.totalDeposited)} color="blue" />
        <ResultCard label="Interest Earned" value={formatINRCompact(result.totalInterest)} color="violet" />
        <ResultCard label="Tax Saving / Year" value={formatINR(result.taxSavingEstimate)} color="amber" hint="@30% slab" />
      </div>

      {/* EEE benefit badge */}
      <div className="flex flex-wrap gap-2 items-center bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-sm">
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">🛡️ EEE Status:</span>
        <span className="text-emerald-600 dark:text-emerald-300 text-xs">
          Deposit qualifies for 80C deduction · Interest is tax-free · Maturity amount is tax-free
        </span>
      </div>

      {/* Year-wise breakdown */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
          Year-wise Growth
        </p>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Year</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Deposit</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Interest</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rows.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2 text-slate-600 dark:text-slate-300">Year {row.year}</td>
                  <td className="px-4 py-2 text-right text-slate-700 dark:text-slate-200">{formatINR(row.deposit)}</td>
                  <td className="px-4 py-2 text-right text-emerald-600 dark:text-emerald-400">{formatINR(row.interest)}</td>
                  <td className="px-4 py-2 text-right font-semibold text-slate-900 dark:text-white">{formatINRCompact(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result.yearlyBreakdown.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            {showAll ? "Show less ▲" : `Show all ${result.yearlyBreakdown.length} years ▼`}
          </button>
        )}
      </div>

    </div>
  );
}

function ResultCard({ label, value, color, big, hint }: {
  label: string; value: string; color: string; big?: boolean; hint?: string;
}) {
  const colors: Record<string, string> = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    blue:    "text-blue-600 dark:text-blue-400",
    violet:  "text-violet-600 dark:text-violet-400",
    amber:   "text-amber-600 dark:text-amber-400",
  };
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className={`font-bold tabular-nums ${big ? "text-2xl" : "text-lg"} ${colors[color]}`}>{value}</p>
      {hint && <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
}
