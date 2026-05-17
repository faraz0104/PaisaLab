"use client";

import { useState, useMemo } from "react";
import { calculateNPS } from "@/lib/calculators/nps";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

export default function NPSCalculator() {
  const [currentAge,  setCurrentAge]  = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyContrib, setMonthlyContrib] = useState(5000);
  const [employerContrib, setEmployerContrib] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [annuityRate, setAnnuityRate] = useState(6);
  const [annuityPct, setAnnuityPct] = useState(40);

  const result = useMemo(
    () => calculateNPS({ currentAge, retirementAge, monthlyContribution: monthlyContrib, employerContribution: employerContrib, expectedReturn, annuityRate, annuityPct }),
    [currentAge, retirementAge, monthlyContrib, employerContrib, expectedReturn, annuityRate, annuityPct]
  );

  const totalTaxBenefit = result.taxBenefit80CCD1 + result.taxBenefit80CCD1B + result.taxBenefit80CCD2;

  return (
    <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

      {/* INPUTS */}
      <div className="lg:col-span-2 p-6 space-y-5">

        <div className="grid grid-cols-2 gap-3">
          <NumInput label="Current Age" value={currentAge} min={18} max={59} onChange={setCurrentAge} suffix="yrs" />
          <NumInput label="Retirement Age" value={retirementAge} min={currentAge + 1} max={75} onChange={setRetirementAge} suffix="yrs" />
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Monthly Contribution</label>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatINRCompact(monthlyContrib)}/mo</span>
          </div>
          <input type="range" min={500} max={100000} step={500} value={monthlyContrib}
            onChange={(e) => setMonthlyContrib(Number(e.target.value))} className="w-full accent-blue-500" />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>₹500</span><span>₹1L</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Employer Contribution</label>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{formatINRCompact(employerContrib)}/mo</span>
          </div>
          <input type="range" min={0} max={50000} step={500} value={employerContrib}
            onChange={(e) => setEmployerContrib(Number(e.target.value))} className="w-full accent-blue-500" />
          <p className="text-[10px] text-slate-400 mt-0.5">Government employees: 14% of basic. Private sector typically 10%.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumInput label="Expected Return %" value={expectedReturn} min={6} max={14} step={0.5} onChange={setExpectedReturn} suffix="%" />
          <NumInput label="Annuity Rate %" value={annuityRate} min={4} max={9} step={0.5} onChange={setAnnuityRate} suffix="%" />
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Annuity %</label>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{annuityPct}%</span>
          </div>
          <input type="range" min={40} max={100} step={10} value={annuityPct}
            onChange={(e) => setAnnuityPct(Number(e.target.value))} className="w-full accent-blue-500" />
          <p className="text-[10px] text-slate-400 mt-0.5">Minimum 40% must be used for annuity (pension). Balance is tax-free withdrawal.</p>
        </div>
      </div>

      {/* RESULTS */}
      <div className="lg:col-span-3 p-6 space-y-4">

        <div className="rounded-2xl bg-blue-600 text-white p-5">
          <p className="text-blue-100 text-sm mb-1">Total NPS Corpus at Retirement</p>
          <p className="text-4xl font-extrabold tabular-nums">{formatINR(result.totalCorpus)}</p>
          <p className="text-blue-200 text-xs mt-1">{result.yearsToRetirement} years of contributions</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Monthly Pension" value={formatINR(result.estimatedMonthlyPension)} sub={`${annuityPct}% corpus @ ${annuityRate}% annuity`} color="emerald" />
          <StatCard label="Tax-Free Withdrawal" value={formatINRCompact(result.lumpSumWithdrawal)} sub={`${100 - annuityPct}% lump sum`} color="blue" />
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Corpus Breakdown</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="Total Amount Invested" value={formatINR(result.totalInvested)} />
            <Row label="Total Returns Earned" value={formatINR(result.totalReturns)} green />
            <Row label="Annuity Corpus" value={formatINR(result.annuityCorpus)} sub="Used to buy pension" />
            <Row label="Lump Sum (Tax-Free)" value={formatINR(result.lumpSumWithdrawal)} green sub="60% withdrawal, completely tax-free" />
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 overflow-hidden">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 border-b border-emerald-200 dark:border-emerald-800">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Annual Tax Benefits</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <Row label="80CCD(1) — Your contribution (part of 80C)" value={formatINR(result.taxBenefit80CCD1)} green />
            <Row label="80CCD(1B) — Extra NPS deduction" value={formatINR(result.taxBenefit80CCD1B)} green sub="Additional ₹50,000 over 80C limit" />
            <Row label="80CCD(2) — Employer contribution" value={formatINR(result.taxBenefit80CCD2)} green sub="No upper cap for employees" />
            <div className="flex justify-between px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-700 dark:text-emerald-300">
              <span>Total Deductible</span>
              <span>{formatINR(totalTaxBenefit)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumInput({ label, value, min, max, step = 1, onChange, suffix }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</label>
      <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
        <input
          type="number" value={value} min={min} max={max} step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-base font-bold text-slate-900 dark:text-white outline-none"
        />
        {suffix && <span className="text-slate-400 text-sm ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: "emerald" | "blue" }) {
  const cls = color === "emerald"
    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
    : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300";
  return (
    <div className={`rounded-xl border p-3 ${cls}`}>
      <p className="text-xs opacity-70">{label}</p>
      <p className="text-xl font-extrabold tabular-nums mt-0.5">{value}</p>
      {sub && <p className="text-[10px] opacity-60 mt-0.5">{sub}</p>}
    </div>
  );
}

function Row({ label, value, sub, green }: { label: string; value: string; sub?: string; green?: boolean }) {
  return (
    <div className="flex justify-between items-center px-4 py-2.5">
      <div>
        <p className="text-slate-600 dark:text-slate-300">{label}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`font-medium tabular-nums ${green ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"}`}>
        {value}
      </span>
    </div>
  );
}
