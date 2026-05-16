"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import SliderInput from "@/components/calculator/SliderInput";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateCompound } from "@/lib/calculators/compound";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
] as const;

const FREQ_OPTIONS = [
  { label: "Annually", value: 1 },
  { label: "Semi-Ann.", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

const DEFAULTS = { principal: 10000, rate: 8, years: 10, freq: 12, monthly: 100 };

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

export default function CompoundCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [principal, setPrincipal] = useState(() => Number(searchParams.get("p")) || DEFAULTS.principal);
  const [rate, setRate] = useState(() => Number(searchParams.get("r")) || DEFAULTS.rate);
  const [years, setYears] = useState(() => Number(searchParams.get("y")) || DEFAULTS.years);
  const [freq, setFreq] = useState(() => Number(searchParams.get("f")) || DEFAULTS.freq);
  const [monthly, setMonthly] = useState(() => Number(searchParams.get("m")) || DEFAULTS.monthly);
  const [currCode, setCurrCode] = useState(() => (searchParams.get("c") as string) || "USD");
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  const currency = CURRENCIES.find((c) => c.code === currCode) ?? CURRENCIES[0];

  useEffect(() => {
    const qs = new URLSearchParams({
      p: String(principal), r: String(rate), y: String(years),
      f: String(freq), m: String(monthly), c: currCode,
    });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [principal, rate, years, freq, monthly, currCode, router, pathname]);

  const result = useMemo(
    () => calculateCompound({ principal, annualRate: rate, years, compoundFreq: freq, monthlyContribution: monthly }),
    [principal, rate, years, freq, monthly]
  );

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: Math.round(row.invested),
    interest: Math.round(row.interest),
    total: Math.round(row.total),
  }));

  const doublingYears = rate > 0 ? (72 / rate).toFixed(1) : "—";

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: number }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Year {label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {fmt(p.value, currency.symbol, currCode)}
          </p>
        ))}
      </div>
    );
  };

  const [tableExpanded, setTableExpanded] = useState(false);
  const visibleRows = tableExpanded ? result.yearlyBreakdown : result.yearlyBreakdown.slice(0, 5);

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

        {/* Inputs */}
        <div className="lg:col-span-2 p-6 space-y-5">

          {/* Currency selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Currency</label>
            <div className="flex flex-wrap gap-1.5">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrCode(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    currCode === c.code
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          <SliderInput
            label="Initial Principal"
            value={principal}
            min={1000}
            max={1000000}
            step={1000}
            onChange={setPrincipal}
            prefix={currency.symbol}
            formatDisplay={(v) => v.toLocaleString("en-US")}
          />

          <SliderInput
            label="Annual Interest Rate"
            value={rate}
            min={0.5}
            max={30}
            step={0.5}
            onChange={setRate}
            suffix="%"
          />

          <SliderInput
            label="Investment Period"
            value={years}
            min={1}
            max={50}
            step={1}
            onChange={setYears}
            suffix=" Yr"
          />

          <SliderInput
            label="Monthly Contribution"
            value={monthly}
            min={0}
            max={10000}
            step={50}
            onChange={setMonthly}
            prefix={currency.symbol}
            formatDisplay={(v) => v.toLocaleString("en-US")}
          />

          {/* Compounding frequency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Compounding Frequency</label>
            <div className="flex flex-wrap gap-1.5">
              {FREQ_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFreq(opt.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    freq === opt.value
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <ShareBar
            params={{ p: principal, r: rate, y: years, f: freq, m: monthly, c: currCode }}
            title={`${fmtFull(principal, currency.symbol, currCode)} grows to ${fmt(result.totalValue, currency.symbol, currCode)} in ${years} years at ${rate}%`}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 p-6 space-y-5">

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Total Invested</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {fmt(result.totalInvested, currency.symbol, currCode)}
              </p>
            </div>
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Interest Earned</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {fmt(result.totalInterest, currency.symbol, currCode)}
              </p>
            </div>
            <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mb-1">Total Value</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                {fmt(result.totalValue, currency.symbol, currCode)}
              </p>
            </div>
          </div>

          {/* Return badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1 text-xs font-semibold">
              +{result.absoluteReturn.toFixed(1)}% total return
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
              Doubles every ~{doublingYears} yrs (Rule of 72)
            </span>
          </div>

          {/* Chart / Table tabs */}
          <div>
            <div className="flex gap-1 mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
              <button
                onClick={() => setActiveTab("chart")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "chart"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Growth Chart
              </button>
              <button
                onClick={() => setActiveTab("table")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "table"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Year-by-Year
              </button>
            </div>

            {activeTab === "chart" ? (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ciInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="ciInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={56} tickFormatter={(v) => fmt(v, currency.symbol, currCode)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-slate-600 dark:text-slate-300">{value}</span>} />
                  <Area type="monotone" dataKey="invested" name="Invested" stackId="1" stroke="#64748b" strokeWidth={2} fill="url(#ciInvested)" />
                  <Area type="monotone" dataKey="interest" name="Interest" stackId="1" stroke="#10b981" strokeWidth={2} fill="url(#ciInterest)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide">Year</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide">Invested</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide">Interest</th>
                        <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wide">Total Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {visibleRows.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">Yr {row.year}</td>
                          <td className="px-4 py-2.5 text-right text-slate-700 dark:text-slate-200 tabular-nums">{fmt(row.invested, currency.symbol, currCode)}</td>
                          <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 tabular-nums">{fmt(row.interest, currency.symbol, currCode)}</td>
                          <td className="px-4 py-2.5 text-right font-semibold text-slate-900 dark:text-white tabular-nums">{fmt(row.total, currency.symbol, currCode)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.yearlyBreakdown.length > 5 && (
                  <button
                    onClick={() => setTableExpanded(!tableExpanded)}
                    className="w-full py-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {tableExpanded ? "▲ Show Less" : `▼ Show All ${result.yearlyBreakdown.length} Years`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-4">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Interest vs Principal</p>
              <p className="text-sm text-emerald-800 dark:text-emerald-300">
                Interest ({fmt(result.totalInterest, currency.symbol, currCode)}) is{" "}
                <strong>{result.totalInvested > 0 ? ((result.totalInterest / result.totalInvested) * 100).toFixed(0) : 0}%</strong> of your total invested amount.
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Rule of 72</p>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                At {rate}%, your money doubles approximately every <strong>{doublingYears} years</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
