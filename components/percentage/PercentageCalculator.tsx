"use client";

import { useState } from "react";

type Mode = "basic" | "whatpct" | "change" | "increase" | "reverse";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "basic",    label: "% of Number",    desc: "What is X% of Y?" },
  { id: "whatpct",  label: "X is What %",    desc: "X is what % of Y?" },
  { id: "change",   label: "% Change",       desc: "% change from X to Y" },
  { id: "increase", label: "Increase/Decrease", desc: "Increase or decrease by %" },
  { id: "reverse",  label: "Reverse %",      desc: "X is Y% of what number?" },
];

function round(n: number, d = 4): number {
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("basic");

  // basic: what is A% of B?
  const [a1, setA1] = useState("15");
  const [b1, setB1] = useState("200");

  // whatpct: A is what % of B?
  const [a2, setA2] = useState("30");
  const [b2, setB2] = useState("200");

  // change: from A to B, what % change?
  const [a3, setA3] = useState("80");
  const [b3, setB3] = useState("100");

  // increase: A increased/decreased by B%
  const [a4, setA4] = useState("500");
  const [b4, setB4] = useState("20");
  const [dir, setDir] = useState<"increase" | "decrease">("increase");

  // reverse: A is B% of what?
  const [a5, setA5] = useState("30");
  const [b5, setB5] = useState("15");

  const results = {
    basic:    !isNaN(+a1) && !isNaN(+b1) ? round((+a1 / 100) * +b1) : null,
    whatpct:  !isNaN(+a2) && +b2 !== 0   ? round((+a2 / +b2) * 100) : null,
    change:   !isNaN(+a3) && +a3 !== 0   ? round(((+b3 - +a3) / +a3) * 100) : null,
    increase: !isNaN(+a4) && !isNaN(+b4) ? round(dir === "increase" ? +a4 * (1 + +b4 / 100) : +a4 * (1 - +b4 / 100)) : null,
    reverse:  !isNaN(+a5) && +b5 !== 0   ? round((+a5 / +b5) * 100) : null,
  };

  const changeIsPositive = (results.change ?? 0) >= 0;

  return (
    <div className="p-6 space-y-6">

      {/* Mode selector */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              mode === m.id
                ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Mode panels ── */}

      {mode === "basic" && (
        <CalcPanel
          question="What is % of?"
          result={results.basic}
          formula={`${a1}% × ${b1} = ${results.basic}`}
          color="emerald"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-500 text-sm">What is</span>
            <NumInput value={a1} onChange={setA1} suffix="%" width="w-24" />
            <span className="text-slate-500 text-sm">of</span>
            <NumInput value={b1} onChange={setB1} width="w-32" />
            <span className="text-slate-500 text-sm">?</span>
          </div>
          {results.basic !== null && (
            <ResultBig color="emerald">= {results.basic.toLocaleString("en-US")}</ResultBig>
          )}
        </CalcPanel>
      )}

      {mode === "whatpct" && (
        <CalcPanel
          question="X is what percent of Y?"
          result={results.whatpct}
          formula={`(${a2} ÷ ${b2}) × 100 = ${results.whatpct}%`}
          color="blue"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <NumInput value={a2} onChange={setA2} width="w-32" />
            <span className="text-slate-500 text-sm">is what % of</span>
            <NumInput value={b2} onChange={setB2} width="w-32" />
            <span className="text-slate-500 text-sm">?</span>
          </div>
          {results.whatpct !== null && (
            <ResultBig color="blue">= {results.whatpct.toLocaleString("en-US")}%</ResultBig>
          )}
        </CalcPanel>
      )}

      {mode === "change" && (
        <CalcPanel
          question="What is the percentage change?"
          result={results.change}
          formula={`((${b3} − ${a3}) ÷ ${a3}) × 100 = ${results.change}%`}
          color={changeIsPositive ? "emerald" : "red"}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-slate-500 text-sm">From</span>
            <NumInput value={a3} onChange={setA3} width="w-32" />
            <span className="text-slate-500 text-sm">to</span>
            <NumInput value={b3} onChange={setB3} width="w-32" />
          </div>
          {results.change !== null && (
            <ResultBig color={changeIsPositive ? "emerald" : "red"}>
              {changeIsPositive ? "▲" : "▼"} {Math.abs(results.change).toLocaleString("en-US")}%
              <span className="text-sm font-normal ml-2">{changeIsPositive ? "increase" : "decrease"}</span>
            </ResultBig>
          )}
        </CalcPanel>
      )}

      {mode === "increase" && (
        <CalcPanel
          question={`Increase or decrease a number by a percentage`}
          result={results.increase}
          formula={dir === "increase" ? `${a4} × (1 + ${b4}%) = ${results.increase}` : `${a4} × (1 − ${b4}%) = ${results.increase}`}
          color="violet"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <NumInput value={a4} onChange={setA4} width="w-32" />
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
              <button onClick={() => setDir("increase")} className={`px-3 py-2 transition-colors ${dir === "increase" ? "bg-emerald-500 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"}`}>
                + Increase
              </button>
              <button onClick={() => setDir("decrease")} className={`px-3 py-2 transition-colors ${dir === "decrease" ? "bg-red-500 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"}`}>
                − Decrease
              </button>
            </div>
            <span className="text-slate-500 text-sm">by</span>
            <NumInput value={b4} onChange={setB4} suffix="%" width="w-24" />
          </div>
          {results.increase !== null && (
            <div className="flex items-center gap-4 mt-2">
              <ResultBig color="violet">= {results.increase.toLocaleString("en-US")}</ResultBig>
              <span className="text-sm text-slate-500">
                ({dir === "increase" ? "+" : "−"}{round(Math.abs(results.increase - +a4)).toLocaleString("en-US")} difference)
              </span>
            </div>
          )}
        </CalcPanel>
      )}

      {mode === "reverse" && (
        <CalcPanel
          question="X is Y% of what number?"
          result={results.reverse}
          formula={`${a5} ÷ (${b5} ÷ 100) = ${results.reverse}`}
          color="amber"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <NumInput value={a5} onChange={setA5} width="w-32" />
            <span className="text-slate-500 text-sm">is</span>
            <NumInput value={b5} onChange={setB5} suffix="%" width="w-24" />
            <span className="text-slate-500 text-sm">of what number?</span>
          </div>
          {results.reverse !== null && (
            <ResultBig color="amber">= {results.reverse.toLocaleString("en-US")}</ResultBig>
          )}
        </CalcPanel>
      )}

      {/* All 5 results summary */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">All Calculations at a Glance</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">What is {a1}% of {b1}?</p>
            <p className="font-bold text-emerald-600 dark:text-emerald-400">{results.basic?.toLocaleString("en-US") ?? "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{a2} is what % of {b2}?</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">{results.whatpct?.toLocaleString("en-US") ?? "—"}%</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">% change from {a3} to {b3}</p>
            <p className={`font-bold ${changeIsPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
              {results.change !== null ? `${results.change > 0 ? "+" : ""}${results.change.toLocaleString("en-US")}%` : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{a4} {dir}d by {b4}%</p>
            <p className="font-bold text-violet-600 dark:text-violet-400">{results.increase?.toLocaleString("en-US") ?? "—"}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function NumInput({ value, onChange, suffix, width = "w-32" }: { value: string; onChange: (v: string) => void; suffix?: string; width?: string }) {
  return (
    <div className={`flex items-center gap-1 ${width} border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2.5`}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-sm outline-none"
      />
      {suffix && <span className="text-slate-400 text-sm shrink-0">{suffix}</span>}
    </div>
  );
}

function ResultBig({ children, color }: { children: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    blue:    "text-blue-600 dark:text-blue-400",
    red:     "text-red-500 dark:text-red-400",
    violet:  "text-violet-600 dark:text-violet-400",
    amber:   "text-amber-600 dark:text-amber-400",
  };
  return (
    <p className={`text-3xl font-extrabold mt-3 tabular-nums ${colorMap[color] ?? colorMap.emerald}`}>
      {children}
    </p>
  );
}

function CalcPanel({ question, result, formula, color, children }: { question: string; result: number | null; formula: string; color: string; children: React.ReactNode }) {
  const bgMap: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
    blue:    "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    red:     "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    violet:  "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
    amber:   "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  };
  return (
    <div className={`rounded-2xl border p-5 space-y-4 ${bgMap[color] ?? bgMap.emerald}`}>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{question}</p>
      {children}
      {result !== null && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-white/60 dark:bg-slate-800/60 rounded-lg px-3 py-1.5 inline-block">
          {formula}
        </p>
      )}
    </div>
  );
}
