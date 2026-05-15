"use client";

import { useState, useMemo } from "react";
import InsightCards from "@/components/calculator/InsightCards";
import { calculateTax, type TaxInputs } from "@/lib/calculators/tax";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

const INCOME_PRESETS = [
  { label: "₹5L", value: 500000 },
  { label: "₹8L", value: 800000 },
  { label: "₹12L", value: 1200000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹20L", value: 2000000 },
  { label: "₹30L", value: 3000000 },
];

export default function TaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(1200000);
  const [section80C, setSection80C] = useState(150000);
  const [section80D, setSection80D] = useState(25000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [npsEmployee, setNpsEmployee] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [metroCity, setMetroCity] = useState(false);
  const [activeRegime, setActiveRegime] = useState<"new" | "old">("new");

  const inputs: TaxInputs = useMemo(() => ({
    grossIncome,
    section80C,
    section80D,
    homeLoanInterest,
    npsEmployee,
    hraReceived,
    rentPaid,
    metroCity,
  }), [grossIncome, section80C, section80D, homeLoanInterest, npsEmployee, hraReceived, rentPaid, metroCity]);

  const result = useMemo(() => calculateTax(inputs), [inputs]);
  const current = activeRegime === "new" ? result.new : result.old;

  const insights = useMemo(() => {
    const list = [];
    list.push({
      icon: result.betterRegime === "new" ? "🆕" : "🏛️",
      text: `The ${result.betterRegime.toUpperCase()} tax regime saves you ${formatINR(result.savings)}/year (${formatINR(result.savings / 12)}/month).`,
      type: "tip" as const,
    });
    list.push({
      icon: "💰",
      text: `Under the ${activeRegime} regime, your take-home is ${formatINR(current.inHandMonthly)}/month after ₹${formatINRCompact(current.totalTax)} annual tax (${current.effectiveRate.toFixed(1)}% effective rate).`,
      type: "info" as const,
    });
    if (grossIncome <= 1200000 && activeRegime === "new") {
      list.push({
        icon: "🎉",
        text: "Income ≤ ₹12L: Under the new regime, Section 87A rebate eliminates all tax liability!",
        type: "tip" as const,
      });
    }
    return list;
  }, [result, activeRegime, current, grossIncome]);

  const numberInput = (label: string, value: number, onChange: (v: number) => void, max?: number) => (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
      <label className="text-sm text-slate-600 dark:text-slate-300">{label}</label>
      <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
        <span className="text-slate-400 text-xs">₹</span>
        <input
          type="number"
          value={value}
          min={0}
          max={max}
          step={1000}
          onChange={(e) => onChange(Math.min(Number(e.target.value), max ?? Infinity))}
          className="w-24 bg-transparent text-sm font-semibold text-slate-900 dark:text-white text-right outline-none"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Inputs */}
        <div className="lg:col-span-2 p-6 space-y-4">
          {/* Income */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
              Gross Annual Income
            </label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-2">
              <span className="text-slate-500 font-medium mr-2">₹</span>
              <input
                type="number"
                value={grossIncome}
                min={0}
                step={10000}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {INCOME_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setGrossIncome(p.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    grossIncome === p.value
                      ? "bg-brand/20 text-brand border border-brand/40"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Old regime deductions */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
              Old Regime Deductions
            </p>
            {numberInput("80C (PPF, ELSS, LIC…)", section80C, setSection80C, 150000)}
            {numberInput("80D (Health Insurance)", section80D, setSection80D, 50000)}
            {numberInput("24(b) Home Loan Interest", homeLoanInterest, setHomeLoanInterest, 200000)}
            {numberInput("80CCD(1B) NPS Employee", npsEmployee, setNpsEmployee, 50000)}
            {numberInput("HRA Received", hraReceived, setHraReceived)}
            {numberInput("Annual Rent Paid", rentPaid, setRentPaid)}
            <div className="flex items-center justify-between py-2.5">
              <label className="text-sm text-slate-600 dark:text-slate-300">Metro City (Mumbai/Delhi/Kolkata/Chennai)?</label>
              <button
                onClick={() => setMetroCity(!metroCity)}
                className={`relative w-10 h-5 rounded-full transition-colors ${metroCity ? "bg-brand" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${metroCity ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Results — regime comparison */}
        <div className="lg:col-span-3 p-6 space-y-4">
          {/* Regime toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            {(["new", "old"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegime(r)}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors relative ${
                  activeRegime === r
                    ? "bg-brand text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {r === "new" ? "New Regime" : "Old Regime"}
                {result.betterRegime === r && (
                  <span className="ml-1.5 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                    Better
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-2 gap-3">
            {(["new", "old"] as const).map((r) => {
              const regime = result[r];
              return (
                <div
                  key={r}
                  className={`rounded-xl p-4 border transition-colors cursor-pointer ${
                    activeRegime === r
                      ? "border-brand bg-brand/5 dark:bg-brand/10"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                  onClick={() => setActiveRegime(r)}
                >
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {r === "new" ? "New Regime" : "Old Regime"}
                  </p>
                  <p className="text-sm text-slate-500 mb-0.5">Tax</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white result-value">
                    {formatINRCompact(regime.totalTax)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {regime.effectiveRate.toFixed(1)}% effective rate
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400">In-hand/month</p>
                    <p className="text-sm font-semibold text-brand">{formatINR(regime.inHandMonthly)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tax slab breakdown */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                {activeRegime === "new" ? "New" : "Old"} Regime Tax Breakdown
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Gross Income</span><span className="font-medium text-slate-700 dark:text-slate-200">{formatINR(current.grossIncome)}</span>
              </div>
              <div className="flex justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Total Deductions</span><span className="font-medium text-green-600">− {formatINR(current.deductions)}</span>
              </div>
              <div className="flex justify-between px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50">
                <span>Taxable Income</span><span>{formatINR(current.taxableIncome)}</span>
              </div>
              {current.slabBreakdown.map((s) => (
                <div key={s.slab} className="flex justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{s.slab} ({s.rate}%)</span><span className="font-medium">{formatINR(s.tax)}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Surcharge</span><span className="font-medium">{formatINR(current.surcharge)}</span>
              </div>
              <div className="flex justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                <span>4% Health & Education Cess</span><span className="font-medium">{formatINR(current.cess)}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800">
                <span>Total Tax Payable</span><span className="text-red-600 dark:text-red-400">{formatINR(current.totalTax)}</span>
              </div>
            </div>
          </div>

          <InsightCards insights={insights} />
        </div>
      </div>
    </div>
  );
}
