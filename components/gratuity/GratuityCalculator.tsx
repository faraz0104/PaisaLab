"use client";

import { useState, useMemo } from "react";
import { calculateGratuity } from "@/lib/calculators/gratuity";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

const YEAR_PRESETS = [1, 3, 5, 10, 15, 20, 25, 30];

export default function GratuityCalculator() {
  const [basicDearness, setBasicDearness] = useState(40000);
  const [years, setYears] = useState(10);
  const [isGovt, setIsGovt] = useState(false);

  const result = useMemo(
    () => calculateGratuity({ basicDearness, yearsOfService: years, isGovtEmployee: isGovt }),
    [basicDearness, years, isGovt]
  );

  return (
    <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

      {/* INPUTS */}
      <div className="lg:col-span-2 p-6 space-y-5">

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Monthly Basic + DA Salary
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-2">
            <span className="text-slate-400 mr-2 font-medium">₹</span>
            <input
              type="number"
              value={basicDearness}
              min={1000}
              step={1000}
              onChange={(e) => setBasicDearness(Number(e.target.value))}
              className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
            />
          </div>
          <input
            type="range" min={5000} max={500000} step={5000} value={basicDearness}
            onChange={(e) => setBasicDearness(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>₹5K</span><span>₹5L</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Years of Service</label>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{years} years</span>
          </div>
          <input
            type="range" min={1} max={35} step={1} value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {YEAR_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setYears(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  years === p
                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-400/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {p}yr
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Employee Type</p>
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
            {[false, true].map((g) => (
              <button
                key={String(g)}
                onClick={() => setIsGovt(g)}
                className={`flex-1 py-2.5 transition-colors ${
                  isGovt === g
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                }`}
              >
                {g ? "Government" : "Private Sector"}
              </button>
            ))}
          </div>
        </div>

        {!result.isEligible && (
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3 text-xs text-amber-700 dark:text-amber-300">
            Gratuity requires minimum 4 years 6 months of service (5 completed years). Current: {years} year{years !== 1 ? "s" : ""}.
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="lg:col-span-3 p-6 space-y-4">

        <div className={`rounded-2xl p-5 text-white ${result.isEligible ? "bg-blue-600" : "bg-slate-400"}`}>
          <p className="text-blue-100 text-sm mb-1">Gratuity Amount</p>
          <p className="text-4xl font-extrabold tabular-nums">{formatINR(result.gratuityAmount)}</p>
          <p className="text-blue-200 text-xs mt-1">{result.isEligible ? "Fully tax-free (within ₹20L limit)" : "Not yet eligible — need ≥ 4.5 years"}</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Calculation Details</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="Monthly Basic + DA" value={formatINR(basicDearness)} />
            <Row label="Years of Service" value={`${years} yrs (rounded: ${result.roundedYears} yrs)`} />
            <Row label="Formula" value={result.formula} small />
            <Row label="Gratuity (before cap)" value={formatINR(result.gratuityAmount)} />
            <Row label="Statutory Cap" value="₹20,00,000" faint />
            <div className="flex justify-between px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-700 dark:text-emerald-300">
              <span>Final Gratuity</span>
              <span>{formatINR(result.gratuityAmount)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Tax Treatment</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="Tax-Free Limit" value="₹20,00,000" />
            <Row label="Tax-Free Gratuity" value={formatINR(result.taxFreeLimit)} green />
            <Row label="Taxable Gratuity" value={formatINR(result.taxableGratuity)} red={result.taxableGratuity > 0} />
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-xs text-slate-500 dark:text-slate-400">
          <strong className="text-slate-700 dark:text-slate-200">CTC context:</strong> Employers include gratuity as {formatINR(basicDearness * 0.0481)}/month (4.81% of basic) in CTC. It is NOT paid monthly — you receive it as a lump sum when you leave after 5+ years.
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, faint, green, red, small }: {
  label: string; value: string; faint?: boolean; green?: boolean; red?: boolean; small?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center px-4 py-2.5 ${faint ? "opacity-60" : ""}`}>
      <p className="text-slate-600 dark:text-slate-300">{label}</p>
      <span className={`font-medium tabular-nums ${small ? "text-xs" : ""} ${
        green ? "text-emerald-600 dark:text-emerald-400" :
        red ? "text-red-500 dark:text-red-400" :
        "text-slate-700 dark:text-slate-200"
      }`}>{value}</span>
    </div>
  );
}
