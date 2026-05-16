"use client";

import { useState, useEffect, useCallback } from "react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar",         symbol: "$"  },
  { code: "EUR", name: "Euro",              symbol: "€"  },
  { code: "GBP", name: "British Pound",     symbol: "£"  },
  { code: "INR", name: "Indian Rupee",      symbol: "₹"  },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar",   symbol: "C$" },
  { code: "JPY", name: "Japanese Yen",      symbol: "¥"  },
  { code: "CHF", name: "Swiss Franc",       symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan",      symbol: "¥"  },
  { code: "SGD", name: "Singapore Dollar",  symbol: "S$" },
  { code: "AED", name: "UAE Dirham",        symbol: "د.إ"},
  { code: "SAR", name: "Saudi Riyal",       symbol: "﷼"  },
  { code: "HKD", name: "Hong Kong Dollar",  symbol: "HK$"},
  { code: "NZD", name: "New Zealand Dollar",symbol: "NZ$"},
  { code: "MXN", name: "Mexican Peso",      symbol: "$"  },
  { code: "BRL", name: "Brazilian Real",    symbol: "R$" },
  { code: "ZAR", name: "South African Rand",symbol: "R"  },
  { code: "KRW", name: "South Korean Won",  symbol: "₩"  },
  { code: "THB", name: "Thai Baht",         symbol: "฿"  },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "PKR", name: "Pakistani Rupee",   symbol: "₨"  },
  { code: "BDT", name: "Bangladeshi Taka",  symbol: "৳"  },
  { code: "NGN", name: "Nigerian Naira",    symbol: "₦"  },
  { code: "EGP", name: "Egyptian Pound",    symbol: "£"  },
  { code: "TRY", name: "Turkish Lira",      symbol: "₺"  },
  { code: "SEK", name: "Swedish Krona",     symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone",   symbol: "kr" },
  { code: "DKK", name: "Danish Krone",      symbol: "kr" },
  { code: "PLN", name: "Polish Zloty",      symbol: "zł" },
];

// Fallback rates vs USD (approximate, used if API fails)
const FALLBACK: Record<string, number> = {
  USD:1,EUR:0.93,GBP:0.79,INR:84.0,AUD:1.57,CAD:1.37,JPY:154,CHF:0.91,
  CNY:7.25,SGD:1.35,AED:3.67,SAR:3.75,HKD:7.83,NZD:1.69,MXN:17.2,
  BRL:5.05,ZAR:18.9,KRW:1350,THB:35.5,MYR:4.7,IDR:16000,PKR:279,
  BDT:110,NGN:1600,EGP:48.5,TRY:32.5,SEK:10.5,NOK:10.7,DKK:6.9,PLN:4.0,
};

const POPULAR_PAIRS = [
  ["USD","EUR"],["USD","GBP"],["USD","INR"],["USD","CAD"],
  ["EUR","GBP"],["EUR","INR"],["GBP","INR"],["USD","JPY"],
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK);
  const [rateDate, setRateDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch live rates from free API (no key required)
  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json")
      .then((r) => r.json())
      .then((data) => {
        const raw: Record<string, number> = data.usd;
        // Normalise keys to uppercase
        const normalised: Record<string, number> = { USD: 1 };
        Object.keys(raw).forEach((k) => { normalised[k.toUpperCase()] = raw[k]; });
        setRates(normalised);
        setRateDate(data.date ?? "");
        setUsingFallback(false);
      })
      .catch(() => {
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const convert = useCallback((amt: number, fromCode: string, toCode: string): number => {
    const rateFrom = rates[fromCode] ?? 1;
    const rateTo   = rates[toCode]   ?? 1;
    return (amt / rateFrom) * rateTo;
  }, [rates]);

  const numAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const result = convert(numAmount, from, to);
  const inverseRate = convert(1, to, from);
  const directRate  = convert(1, from, to);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  const fromCurr = CURRENCIES.find((c) => c.code === from);
  const toCurr   = CURRENCIES.find((c) => c.code === to);

  function formatResult(n: number): string {
    if (n >= 1e9) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
    if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }

  return (
    <div className="p-6 space-y-6">

      {/* Main converter */}
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">

        {/* From */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Amount</label>
          <div className="flex gap-2">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-32 px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="1000"
            />
          </div>
        </div>

        {/* Swap */}
        <button
          onClick={swap}
          className="flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-emerald-600 hover:border-emerald-400 transition-colors self-end mb-0.5"
          aria-label="Swap currencies"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Converted To</label>
          <div className="flex gap-2">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-32 px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
            <div className="flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-lg font-bold tabular-nums flex items-center">
              {loading ? (
                <span className="text-sm text-slate-400 animate-pulse">Loading…</span>
              ) : (
                formatResult(result)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rate info */}
      {!loading && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3">
          <span>
            <strong>1 {from}</strong> = <strong className="text-emerald-600 dark:text-emerald-400">{formatResult(directRate)} {to}</strong>
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:block">|</span>
          <span>
            <strong>1 {to}</strong> = <strong className="text-emerald-600 dark:text-emerald-400">{formatResult(inverseRate)} {from}</strong>
          </span>
          {rateDate && (
            <span className="ml-auto text-xs text-slate-400">
              {usingFallback ? "⚠️ Approximate rates" : `Live rates · ${rateDate}`}
            </span>
          )}
          {usingFallback && (
            <span className="text-xs text-amber-600 dark:text-amber-400">⚠️ Using approximate rates — live rate fetch failed</span>
          )}
        </div>
      )}

      {/* Popular pairs */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Popular Conversions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {POPULAR_PAIRS.map(([f, t]) => {
            const rate = convert(1, f, t);
            return (
              <button
                key={`${f}-${t}`}
                onClick={() => { setFrom(f); setTo(t); setAmount("1"); }}
                className="flex flex-col items-start px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-left"
              >
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{f} → {t}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">
                  1 {f} = {formatResult(rate)} {t}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversion table */}
      {!loading && (
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            {from} to {to} — Quick Reference
          </p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">{fromCurr?.symbol} {from}</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">{toCurr?.symbol} {to}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 5, 10, 50, 100, 500, 1000, 5000, 10000].map((v) => (
                  <tr key={v} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-200 tabular-nums">{v.toLocaleString("en-US")}</td>
                    <td className="px-4 py-2 text-right font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatResult(convert(v, from, to))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
