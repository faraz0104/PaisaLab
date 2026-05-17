"use client";

import { useState, useMemo } from "react";
import { calculateHRA } from "@/lib/calculators/hra";
import { formatINR } from "@/lib/calculators/format";

export default function HRACalculator() {
  const [basicSalary,  setBasicSalary]  = useState(480000);  // annual
  const [hraReceived,  setHraReceived]  = useState(240000);
  const [rentPaid,     setRentPaid]     = useState(216000);
  const [isMetro,      setIsMetro]      = useState(true);

  const result = useMemo(
    () => calculateHRA({ basicSalary, hraReceived, rentPaid, isMetro }),
    [basicSalary, hraReceived, rentPaid, isMetro]
  );

  const winningLimit = Math.min(result.limit1_hraReceived, result.limit2_rentMinusBasicPct, result.limit3_pctOfBasic);

  return (
    <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

      {/* INPUTS */}
      <div className="lg:col-span-2 p-6 space-y-5">

        <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold mb-1">
          {([true, false] as const).map((m) => (
            <button key={String(m)} onClick={() => setIsMetro(m)}
              className={`flex-1 py-2.5 transition-colors ${isMetro === m ? "bg-blue-500 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"}`}>
              {m ? "Metro City (50% of basic)" : "Non-Metro (40% of basic)"}
            </button>
          ))}
        </div>

        <AmountInput label="Annual Basic Salary" value={basicSalary} onChange={setBasicSalary}
          helper={`Monthly: ${formatINR(basicSalary / 12)}`} />

        <AmountInput label="Annual HRA Received from Employer" value={hraReceived} onChange={setHraReceived}
          helper={`Monthly: ${formatINR(hraReceived / 12)}`} />

        <AmountInput label="Annual Rent Paid" value={rentPaid} onChange={setRentPaid}
          helper={`Monthly: ${formatINR(rentPaid / 12)}`} />

        {!result.isEligible && (
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3 text-xs text-amber-700 dark:text-amber-300">
            HRA exemption requires you to be paying rent AND receiving HRA. If you live in your own house or no HRA is received, no exemption applies.
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="lg:col-span-3 p-6 space-y-4">

        <div className={`rounded-2xl p-5 text-white ${result.isEligible ? "bg-blue-600" : "bg-slate-400"}`}>
          <p className="text-blue-100 text-sm mb-1">HRA Exemption (Annual)</p>
          <p className="text-4xl font-extrabold tabular-nums">{formatINR(result.exemption)}</p>
          <p className="text-blue-200 text-xs mt-1">Monthly: {formatINR(result.exemption / 12)}</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Three Limits — Lowest Wins</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <LimitRow
              label="Limit 1: Actual HRA received"
              value={result.limit1_hraReceived}
              active={winningLimit === result.limit1_hraReceived}
            />
            <LimitRow
              label={`Limit 2: Rent paid − 10% of Basic (${formatINR(basicSalary * 0.1)})`}
              value={result.limit2_rentMinusBasicPct}
              active={winningLimit === result.limit2_rentMinusBasicPct}
            />
            <LimitRow
              label={`Limit 3: ${isMetro ? "50" : "40"}% of Basic Salary`}
              value={result.limit3_pctOfBasic}
              active={winningLimit === result.limit3_pctOfBasic}
            />
            <div className="flex justify-between px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 font-bold text-blue-700 dark:text-blue-300">
              <span>HRA Exemption (minimum of above)</span>
              <span>{formatINR(result.exemption)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Tax Impact</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="Total HRA Received" value={formatINR(hraReceived)} />
            <Row label="HRA Exempt from Tax" value={formatINR(result.exemption)} green />
            <Row label="Taxable HRA (added to income)" value={formatINR(result.taxableHRA)} red={result.taxableHRA > 0} />
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-800 dark:text-amber-300">
          <strong>Note:</strong> HRA exemption is available ONLY under the <strong>Old Tax Regime</strong>. Under the New Regime, the entire HRA received is taxable. If you pay high rent, the old regime may save you more tax.
        </div>
      </div>
    </div>
  );
}

function AmountInput({ label, value, onChange, helper }: { label: string; value: number; onChange: (v: number) => void; helper?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
        <span className="text-slate-400 mr-2 font-medium">₹</span>
        <input
          type="number" value={value} min={0} step={1000}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
        />
      </div>
      {helper && <p className="text-[11px] text-slate-400 mt-1 ml-1">{helper}</p>}
    </div>
  );
}

function LimitRow({ label, value, active }: { label: string; value: number; active: boolean }) {
  return (
    <div className={`flex justify-between items-center px-4 py-2.5 ${active ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}`}>
      <div className="flex items-center gap-2">
        {active && <span className="text-emerald-500 text-xs font-bold shrink-0">✓ MIN</span>}
        <p className={`text-slate-600 dark:text-slate-300 ${active ? "font-semibold" : ""}`}>{label}</p>
      </div>
      <span className={`font-medium tabular-nums ${active ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-500"}`}>
        {formatINR(value)}
      </span>
    </div>
  );
}

function Row({ label, value, green, red }: { label: string; value: string; green?: boolean; red?: boolean }) {
  return (
    <div className="flex justify-between items-center px-4 py-2.5">
      <p className="text-slate-600 dark:text-slate-300">{label}</p>
      <span className={`font-medium tabular-nums ${green ? "text-emerald-600 dark:text-emerald-400" : red ? "text-red-500 dark:text-red-400" : "text-slate-700 dark:text-slate-200"}`}>
        {value}
      </span>
    </div>
  );
}
