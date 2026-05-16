"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import SliderInput from "@/components/calculator/SliderInput";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateMortgage } from "@/lib/calculators/mortgage";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
] as const;

const DEFAULTS = { price: 300000, down: 60000, rate: 7, term: 30 };

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

export default function MortgageCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState(() => Number(searchParams.get("price")) || DEFAULTS.price);
  const [down, setDown] = useState(() => Number(searchParams.get("down")) || DEFAULTS.down);
  const [rate, setRate] = useState(() => Number(searchParams.get("rate")) || DEFAULTS.rate);
  const [term, setTerm] = useState(() => Number(searchParams.get("term")) || DEFAULTS.term);
  const [currCode, setCurrCode] = useState(() => searchParams.get("c") || "USD");
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");
  const [tableExpanded, setTableExpanded] = useState(false);

  const currency = CURRENCIES.find((c) => c.code === currCode) ?? CURRENCIES[0];

  // Keep down payment ≤ home price
  const safeDown = Math.min(down, price);

  useEffect(() => {
    const qs = new URLSearchParams({ price: String(price), down: String(safeDown), rate: String(rate), term: String(term), c: currCode });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [price, safeDown, rate, term, currCode, router, pathname]);

  const result = useMemo(
    () => calculateMortgage({ homePrice: price, downPayment: safeDown, annualRate: rate, termYears: term }),
    [price, safeDown, rate, term]
  );

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    principal: Math.round(row.principal),
    interest: Math.round(row.interest),
    balance: Math.round(row.balance),
  }));

  const visibleRows = tableExpanded ? result.yearlyBreakdown : result.yearlyBreakdown.slice(0, 5);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: number }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Year {label}</p>
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
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                  }`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          <SliderInput label="Home Price" value={price} min={50000} max={2000000} step={5000}
            onChange={setPrice} prefix={currency.symbol} formatDisplay={(v) => v.toLocaleString("en-US")} />

          <SliderInput label="Down Payment" value={safeDown} min={0} max={price} step={1000}
            onChange={setDown} prefix={currency.symbol} formatDisplay={(v) => v.toLocaleString("en-US")} />

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2">
            <span>Down payment:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{result.downPaymentPct.toFixed(1)}%</span>
            <span>· Loan:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{fmt(result.loanAmount, currency.symbol, currCode)}</span>
          </div>

          <SliderInput label="Annual Interest Rate" value={rate} min={0.5} max={20} step={0.1}
            onChange={setRate} suffix="%" />

          <SliderInput label="Loan Term" value={term} min={5} max={30} step={1}
            onChange={setTerm} suffix=" Yr" />

          <ShareBar
            params={{ price, down: safeDown, rate, term, c: currCode }}
            title={`${fmtFull(price, currency.symbol, currCode)} home → ${fmt(result.monthlyPayment, currency.symbol, currCode)}/mo mortgage payment`}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 p-6 space-y-5">

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-1">Monthly Payment</p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                {fmtFull(result.monthlyPayment, currency.symbol, currCode)}
              </p>
            </div>
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Total Interest</p>
              <p className="text-lg font-bold text-red-500 dark:text-red-400 tabular-nums">
                {fmt(result.totalInterest, currency.symbol, currCode)}
              </p>
            </div>
            <div className="rounded-xl p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Total Payment</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                {fmt(result.totalPayment, currency.symbol, currCode)}
              </p>
            </div>
          </div>

          {/* Interest % badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full px-3 py-1 text-xs font-semibold">
              Interest = {result.loanAmount > 0 ? ((result.totalInterest / result.loanAmount) * 100).toFixed(0) : 0}% of loan amount
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
              {result.downPaymentPct.toFixed(1)}% down · {term} yr term
            </span>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-1 mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
              {(["chart", "table"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab === "chart" ? "Payoff Chart" : "Amortization"}
                </button>
              ))}
            </div>

            {activeTab === "chart" ? (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mgPrincipal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="mgInterest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `Yr ${v}`} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={56} tickFormatter={(v) => fmt(v, currency.symbol, currCode)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600 dark:text-slate-300">{v}</span>} />
                  <Area type="monotone" dataKey="principal" name="Principal Paid" stackId="1" stroke="#3b82f6" strokeWidth={2} fill="url(#mgPrincipal)" />
                  <Area type="monotone" dataKey="interest" name="Interest Paid" stackId="1" stroke="#ef4444" strokeWidth={2} fill="url(#mgInterest)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Year</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Principal Paid</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Interest Paid</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {visibleRows.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">Yr {row.year}</td>
                          <td className="px-4 py-2.5 text-right text-blue-600 dark:text-blue-400 tabular-nums">{fmt(row.principal, currency.symbol, currCode)}</td>
                          <td className="px-4 py-2.5 text-right text-red-500 dark:text-red-400 tabular-nums">{fmt(row.interest, currency.symbol, currCode)}</td>
                          <td className="px-4 py-2.5 text-right font-semibold text-slate-900 dark:text-white tabular-nums">{fmt(row.balance, currency.symbol, currCode)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.yearlyBreakdown.length > 5 && (
                  <button onClick={() => setTableExpanded(!tableExpanded)}
                    className="w-full py-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    {tableExpanded ? "▲ Show Less" : `▼ Show All ${result.yearlyBreakdown.length} Years`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Cost of Borrowing</p>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                You pay <strong>{fmt(result.totalInterest, currency.symbol, currCode)}</strong> in interest on a <strong>{fmt(result.loanAmount, currency.symbol, currCode)}</strong> loan — {result.loanAmount > 0 ? ((result.totalInterest / result.loanAmount) * 100).toFixed(0) : 0}% extra over {term} years.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 p-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Tip: Extra Payments</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Paying <strong>{fmtFull(result.monthlyPayment + 100, currency.symbol, currCode)}/mo</strong> (just $100 extra) could save years off your mortgage and thousands in interest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
