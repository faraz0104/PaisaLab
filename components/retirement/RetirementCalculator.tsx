"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import SliderInput from "@/components/calculator/SliderInput";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateRetirement } from "@/lib/calculators/retirement";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
] as const;

const DEFAULTS = { currentAge: 30, retirementAge: 65, savings: 50000, monthly: 500, returnRate: 8, inflation: 3, expenses: 4000 };

function fmt(n: number, symbol: string, code: string): string {
  const abs = Math.abs(n);
  if (code === "INR") {
    if (abs >= 1e7) return `${symbol}${(abs / 1e7).toFixed(2)} Cr`;
    if (abs >= 1e5) return `${symbol}${(abs / 1e5).toFixed(2)} L`;
    if (abs >= 1e3) return `${symbol}${(abs / 1e3).toFixed(1)}K`;
    return `${symbol}${Math.round(abs).toLocaleString("en-IN")}`;
  }
  if (abs >= 1e9) return `${symbol}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${symbol}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${symbol}${(abs / 1e3).toFixed(1)}K`;
  return `${symbol}${Math.round(abs).toLocaleString("en-US")}`;
}

function fmtFull(n: number, symbol: string, code: string): string {
  if (code === "INR") return `${symbol}${Math.round(n).toLocaleString("en-IN")}`;
  return `${symbol}${Math.round(n).toLocaleString("en-US")}`;
}

export default function RetirementCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentAge, setCurrentAge] = useState(() => Number(searchParams.get("ca")) || DEFAULTS.currentAge);
  const [retirementAge, setRetirementAge] = useState(() => Number(searchParams.get("ra")) || DEFAULTS.retirementAge);
  const [savings, setSavings] = useState(() => Number(searchParams.get("s")) || DEFAULTS.savings);
  const [monthly, setMonthly] = useState(() => Number(searchParams.get("m")) || DEFAULTS.monthly);
  const [returnRate, setReturnRate] = useState(() => Number(searchParams.get("r")) || DEFAULTS.returnRate);
  const [inflation, setInflation] = useState(() => Number(searchParams.get("inf")) || DEFAULTS.inflation);
  const [expenses, setExpenses] = useState(() => Number(searchParams.get("exp")) || DEFAULTS.expenses);
  const [currCode, setCurrCode] = useState(() => searchParams.get("c") || "USD");
  const [tableExpanded, setTableExpanded] = useState(false);

  const currency = CURRENCIES.find((c) => c.code === currCode) ?? CURRENCIES[0];

  const safeRetirementAge = Math.max(retirementAge, currentAge + 1);

  useEffect(() => {
    const qs = new URLSearchParams({ ca: String(currentAge), ra: String(safeRetirementAge), s: String(savings), m: String(monthly), r: String(returnRate), inf: String(inflation), exp: String(expenses), c: currCode });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [currentAge, safeRetirementAge, savings, monthly, returnRate, inflation, expenses, currCode, router, pathname]);

  const result = useMemo(() => calculateRetirement({
    currentAge, retirementAge: safeRetirementAge, currentSavings: savings,
    monthlyContribution: monthly, annualReturn: returnRate,
    inflationRate: inflation, monthlyExpenses: expenses,
  }), [currentAge, safeRetirementAge, savings, monthly, returnRate, inflation, expenses]);

  const chartData = result.yearlyBreakdown.map((row) => ({
    age: row.age,
    savings: Math.round(row.savings),
    contributions: Math.round(row.contributions + savings),
    growth: Math.round(row.growth),
  }));

  const visibleRows = tableExpanded ? result.yearlyBreakdown : result.yearlyBreakdown.slice(0, 5);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: number }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Age {label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {fmt(p.value, currency.symbol, currCode)}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

        {/* Inputs */}
        <div className="lg:col-span-2 p-6 space-y-5">

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Currency</label>
            <div className="flex flex-wrap gap-1.5">
              {CURRENCIES.map((c) => (
                <button key={c.code} onClick={() => setCurrCode(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    currCode === c.code
                      ? "bg-violet-500 text-white border-violet-500"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-violet-400"
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SliderInput label="Current Age" value={currentAge} min={18} max={70} step={1} onChange={setCurrentAge} suffix=" yrs" />
            <SliderInput label="Retirement Age" value={safeRetirementAge} min={currentAge + 1} max={80} step={1} onChange={setRetirementAge} suffix=" yrs" />
          </div>

          <SliderInput label="Current Savings" value={savings} min={0} max={1000000} step={1000}
            onChange={setSavings} prefix={currency.symbol} formatDisplay={(v) => v.toLocaleString("en-US")} />

          <SliderInput label="Monthly Contribution" value={monthly} min={0} max={10000} step={50}
            onChange={setMonthly} prefix={currency.symbol} formatDisplay={(v) => v.toLocaleString("en-US")} />

          <SliderInput label="Monthly Expenses at Retirement" value={expenses} min={500} max={20000} step={100}
            onChange={setExpenses} prefix={currency.symbol} formatDisplay={(v) => v.toLocaleString("en-US")} />

          <SliderInput label="Expected Annual Return" value={returnRate} min={1} max={15} step={0.5} onChange={setReturnRate} suffix="%" />

          <SliderInput label="Inflation Rate" value={inflation} min={0} max={10} step={0.5} onChange={setInflation} suffix="%" />

          <ShareBar
            params={{ ca: currentAge, ra: safeRetirementAge, s: savings, m: monthly, r: returnRate, inf: inflation, exp: expenses, c: currCode }}
            title={`Retire at ${safeRetirementAge} with ${fmt(result.corpusAtRetirement, currency.symbol, currCode)} corpus`}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 p-6 space-y-5">

          {/* On-track badge */}
          <div className={`rounded-xl p-4 border ${result.isSufficient ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{result.isSufficient ? "✅" : "⚠️"}</span>
              <div>
                <p className={`font-bold text-sm ${result.isSufficient ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                  {result.isSufficient ? "On Track for Retirement!" : "Shortfall Detected"}
                </p>
                <p className={`text-xs mt-0.5 ${result.isSufficient ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                  {result.isSufficient
                    ? `Surplus of ${fmt(result.surplusOrShortfall, currency.symbol, currCode)} above target corpus`
                    : `Shortfall of ${fmt(Math.abs(result.surplusOrShortfall), currency.symbol, currCode)} — increase savings or return rate`}
                </p>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl p-3 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
              <p className="text-xs text-violet-700 dark:text-violet-400 font-medium mb-1">Corpus at Retirement</p>
              <p className="text-base font-bold text-violet-700 dark:text-violet-300 tabular-nums">{fmt(result.corpusAtRetirement, currency.symbol, currCode)}</p>
            </div>
            <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Target Corpus (25×)</p>
              <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{fmt(result.corpusNeeded, currency.symbol, currCode)}</p>
            </div>
            <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Monthly Income (4% rule)</p>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{fmtFull(result.safeMonthlyIncome, currency.symbol, currCode)}</p>
            </div>
            <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Expenses at Retirement</p>
              <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{fmtFull(result.inflationAdjustedExpenses, currency.symbol, currCode)}/mo</p>
            </div>
          </div>

          {/* Growth chart */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Wealth Accumulation</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rtContrib" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="rtGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
                <XAxis dataKey="age" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}`} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={56} tickFormatter={(v) => fmt(v, currency.symbol, currCode)} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="contributions" name="Contributions" stackId="1" stroke="#64748b" strokeWidth={2} fill="url(#rtContrib)" />
                <Area type="monotone" dataKey="growth" name="Investment Growth" stackId="1" stroke="#8b5cf6" strokeWidth={2} fill="url(#rtGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Year table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Age</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Total Contributed</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Growth</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Total Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {visibleRows.map((row) => (
                    <tr key={row.age} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-2.5 font-medium text-slate-700 dark:text-slate-200">{row.age}</td>
                      <td className="px-4 py-2.5 text-right text-slate-600 dark:text-slate-300 tabular-nums">{fmt(row.contributions + savings, currency.symbol, currCode)}</td>
                      <td className="px-4 py-2.5 text-right text-violet-600 dark:text-violet-400 tabular-nums">{fmt(row.growth, currency.symbol, currCode)}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-slate-900 dark:text-white tabular-nums">{fmt(row.savings, currency.symbol, currCode)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.yearlyBreakdown.length > 5 && (
              <button onClick={() => setTableExpanded(!tableExpanded)}
                className="w-full py-2.5 text-xs font-semibold text-violet-600 dark:text-violet-400 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {tableExpanded ? "▲ Show Less" : `▼ Show All ${result.yearlyBreakdown.length} Years`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
