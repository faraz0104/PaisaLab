"use client";

import { useState, useMemo } from "react";
import InsightCards from "@/components/calculator/InsightCards";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateGSTExclusive, calculateGSTInclusive, GST_SLAB_EXAMPLES, type GSTSlab } from "@/lib/calculators/gst";
import { formatINR } from "@/lib/calculators/format";

const SLABS: GSTSlab[] = [0, 3, 5, 12, 18, 28];

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [slab, setSlab] = useState<GSTSlab>(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [rawAmount, setRawAmount] = useState("10000");

  const result = useMemo(() => {
    if (mode === "exclusive") return calculateGSTExclusive(amount, slab);
    return calculateGSTInclusive(amount, slab);
  }, [amount, slab, mode]);

  const handleAmountChange = (val: string) => {
    setRawAmount(val);
    const n = parseFloat(val.replace(/,/g, ""));
    if (!isNaN(n) && n >= 0) setAmount(n);
  };

  const examples = GST_SLAB_EXAMPLES[slab] ?? [];

  const insights = [
    {
      icon: "🧾",
      text: `On ₹${amount.toLocaleString("en-IN")} (${mode}), GST @ ${slab}% = ${formatINR(result.gstAmount)}. CGST: ${formatINR(result.cgst)} + SGST: ${formatINR(result.sgst)} (intra-state) or IGST: ${formatINR(result.igst)} (inter-state).`,
      type: "info" as const,
    },
    ...(slab === 28
      ? [{
          icon: "⚠️",
          text: "28% GST applies to luxury goods and sin goods. Some items also attract Compensation Cess on top of 28% GST.",
          type: "warning" as const,
        }]
      : []),
  ];

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Inputs */}
        <div className="lg:col-span-2 p-6 space-y-5">
          {/* Mode toggle */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
              Calculation Mode
            </label>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              {(["exclusive", "inclusive"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                    mode === m
                      ? "bg-brand text-white"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {m === "exclusive" ? "Add GST to price" : "Extract GST from price"}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {mode === "exclusive"
                ? "Enter the base price before GST"
                : "Enter the final price that includes GST"}
            </p>
          </div>

          {/* Amount input */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
              {mode === "exclusive" ? "Original Price (excl. GST)" : "Total Price (incl. GST)"}
            </label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
              <span className="text-slate-500 dark:text-slate-400 font-medium mr-2">₹</span>
              <input
                type="text"
                value={rawAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
                placeholder="Enter amount"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* GST slab selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
              GST Slab
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SLABS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlab(s)}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                    slab === s
                      ? "bg-brand/10 border-brand text-brand dark:text-brand-light"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand"
                  }`}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>

          {/* Examples */}
          {examples.length > 0 && (
            <div>
              <p className="text-xs text-slate-400 mb-1">Examples at {slab}% slab:</p>
              <div className="flex flex-wrap gap-1">
                {examples.map((ex) => (
                  <span key={ex} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-slate-500 dark:text-slate-400">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          )}

          <ShareBar params={{ amount, slab, mode }} title={`GST calculation: ${formatINR(result.gstAmount)} on ${formatINR(amount)} @ ${slab}%`} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 p-6 space-y-5">
          {/* Big result cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Original Amount</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white result-value">{formatINR(result.originalAmount)}</p>
            </div>
            <div className="rounded-xl bg-brand/10 dark:bg-brand/20 border border-brand/30 p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-brand result-value">{formatINR(result.totalAmount)}</p>
            </div>
          </div>

          {/* GST breakdown */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">GST Breakdown</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { label: `CGST @ ${slab / 2}%`, value: result.cgst, note: "Intra-state" },
                { label: `SGST @ ${slab / 2}%`, value: result.sgst, note: "Intra-state" },
                { label: `IGST @ ${slab}%`, value: result.igst, note: "Inter-state" },
                { label: `Total GST`, value: result.gstAmount, highlight: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-5 py-3 ${row.highlight ? "bg-amber-50 dark:bg-amber-900/20" : ""}`}
                >
                  <div>
                    <span className={`text-sm font-medium ${row.highlight ? "text-amber-700 dark:text-amber-400" : "text-slate-700 dark:text-slate-300"}`}>
                      {row.label}
                    </span>
                    {row.note && <span className="text-xs text-slate-400 ml-2">({row.note})</span>}
                  </div>
                  <span className={`text-sm font-bold tabular-nums ${row.highlight ? "text-amber-700 dark:text-amber-400" : "text-slate-900 dark:text-white"}`}>
                    {formatINR(row.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <InsightCards insights={insights} />
        </div>
      </div>
    </div>
  );
}
