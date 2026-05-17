"use client";

import { useState, useMemo } from "react";
import { calculateSalary } from "@/lib/calculators/salary";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

const CTC_PRESETS = [300000, 500000, 800000, 1200000, 1800000, 2500000, 3600000, 5000000];

export default function SalaryCalculator() {
  const [annualCTC,  setAnnualCTC]  = useState(1200000);
  const [basicPct,   setBasicPct]   = useState(40);
  const [isMetro,    setIsMetro]    = useState(true);
  const [taxRegime,  setTaxRegime]  = useState<"new" | "old">("new");
  const [pfOptIn,    setPfOptIn]    = useState(true);

  const result = useMemo(
    () => calculateSalary({ annualCTC, basicPct, isMetro, taxRegime, pfOptIn }),
    [annualCTC, basicPct, isMetro, taxRegime, pfOptIn]
  );

  return (
    <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

      {/* ── INPUTS ── */}
      <div className="lg:col-span-2 p-6 space-y-5">

        {/* CTC */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Annual CTC (Cost to Company)
          </label>
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-2">
            <span className="text-slate-400 mr-2 font-medium">₹</span>
            <input
              type="number"
              value={annualCTC}
              min={100000}
              step={10000}
              onChange={(e) => setAnnualCTC(Number(e.target.value))}
              className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CTC_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setAnnualCTC(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  annualCTC === p
                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-400/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                ₹{p >= 10000000 ? `${p / 10000000}Cr` : p >= 100000 ? `${p / 100000}L` : `${p / 1000}K`}
              </button>
            ))}
          </div>
        </div>

        {/* Basic % */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Basic Salary
            </label>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{basicPct}% of CTC</span>
          </div>
          <input
            type="range"
            min={30}
            max={60}
            step={5}
            value={basicPct}
            onChange={(e) => setBasicPct(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>30%</span><span>60%</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Options</p>

          <Toggle label="Metro City (HRA 50% of Basic)" value={isMetro} onChange={setIsMetro} />
          <Toggle label="Contribute to PF (12% of Basic)" value={pfOptIn} onChange={setPfOptIn} />
        </div>

        {/* Tax regime */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Tax Regime</p>
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
            {(["new", "old"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTaxRegime(r)}
                className={`flex-1 py-2.5 transition-colors ${
                  taxRegime === r
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                }`}
              >
                {r === "new" ? "New Regime" : "Old Regime"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="lg:col-span-3 p-6 space-y-4">

        {/* Hero take-home */}
        <div className="rounded-2xl bg-blue-600 text-white p-5">
          <p className="text-blue-100 text-sm mb-1">Monthly In-Hand Salary</p>
          <p className="text-4xl font-extrabold tabular-nums">{formatINR(result.monthlyTakeHome)}</p>
          <p className="text-blue-200 text-xs mt-1">= {formatINRCompact(result.annualTakeHome)} per year</p>
        </div>

        {/* CTC breakdown */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">CTC Breakdown (Annual)</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="Basic Salary"       value={formatINR(result.basic)}           sub={`${basicPct}% of CTC`} />
            <Row label="HRA"               value={formatINR(result.hra)}             sub={isMetro ? "50% of basic" : "40% of basic"} />
            <Row label="Special Allowance" value={formatINR(result.specialAllowance)} />
            <Row label="Employer PF"       value={formatINR(result.employerPF)}       sub="12% of basic (your cost)" faint />
            <Row label="Gratuity"          value={formatINR(result.gratuity)}         sub="4.81% of basic" faint />
            <div className="flex justify-between px-4 py-2.5 bg-slate-50/50 dark:bg-slate-800/50 font-semibold text-slate-700 dark:text-slate-200">
              <span>Annual CTC</span>
              <span>{formatINR(result.annualCTC)}</span>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Monthly Deductions</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="Gross Monthly Salary" value={formatINR(result.monthlyGross)} bold />
            {pfOptIn && (
              <Row label="Employee PF (12% of basic)" value={`− ${formatINR(result.employeePF / 12)}`} red />
            )}
            <Row label="Professional Tax" value={`− ${formatINR(result.professionalTax / 12)}`} red />
            <Row label={`Income Tax TDS (${taxRegime} regime)`} value={`− ${formatINR(result.incomeTax / 12)}`} red sub={`${result.effectiveTaxRate.toFixed(1)}% effective rate`} />
            <div className="flex justify-between px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 font-bold text-blue-700 dark:text-blue-300">
              <span>Monthly Take-Home</span>
              <span>{formatINR(result.monthlyTakeHome)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function Row({ label, value, sub, faint, bold, red }: {
  label: string; value: string; sub?: string; faint?: boolean; bold?: boolean; red?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center px-4 py-2.5 ${faint ? "opacity-60" : ""}`}>
      <div>
        <p className={`${bold ? "font-semibold text-slate-800 dark:text-slate-200" : "text-slate-600 dark:text-slate-300"}`}>{label}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-medium tabular-nums ${red ? "text-red-500 dark:text-red-400" : bold ? "text-slate-800 dark:text-slate-200" : "text-slate-700 dark:text-slate-200"}`}>
        {value}
      </span>
    </div>
  );
}
