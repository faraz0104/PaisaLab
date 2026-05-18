"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SliderInput from "@/components/calculator/SliderInput";
import ResultSummary from "@/components/calculator/ResultSummary";
import DonutChart from "@/components/calculator/DonutChart";
import GrowthChart from "@/components/calculator/GrowthChart";
import BreakdownTable from "@/components/calculator/BreakdownTable";
import InsightCards from "@/components/calculator/InsightCards";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateSIP, calculateStepUpSIP } from "@/lib/calculators/sip";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

interface SIPCalculatorProps {
  mode?: "standard" | "stepup";
  initialAmount?: number;
  initialRate?: number;
  initialYears?: number;
}

const DEFAULTS = { amount: 5000, rate: 12, years: 10, stepUp: 10 };

export default function SIPCalculator({ mode = "standard", initialAmount, initialRate, initialYears }: SIPCalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialise from props first, then URL params, then defaults
  const [amount, setAmount] = useState(() =>
    (initialAmount ?? Number(searchParams.get("amt"))) || DEFAULTS.amount
  );
  const [rate, setRate] = useState(() =>
    (initialRate ?? Number(searchParams.get("rate"))) || DEFAULTS.rate
  );
  const [years, setYears] = useState(() =>
    (initialYears ?? Number(searchParams.get("years"))) || DEFAULTS.years
  );
  const [stepUp, setStepUp] = useState(() =>
    Number(searchParams.get("stepup")) || DEFAULTS.stepUp
  );
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  // Sync state into URL without navigation (for shareable links)
  useEffect(() => {
    const qs = new URLSearchParams({
      amt: String(amount),
      rate: String(rate),
      years: String(years),
      ...(mode === "stepup" ? { stepup: String(stepUp) } : {}),
    });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [amount, rate, years, stepUp, mode, router, pathname]);

  // All maths happen here — instant, no button needed
  const result = useMemo(() => {
    if (mode === "stepup") {
      return calculateStepUpSIP({ monthlyAmount: amount, annualRate: rate, years, annualStepUp: stepUp });
    }
    return calculateSIP({ monthlyAmount: amount, annualRate: rate, years });
  }, [amount, rate, years, stepUp, mode]);

  // Smart insights
  const insights = useMemo(() => {
    const list = [];
    const returnPct = result.absoluteReturn.toFixed(1);
    list.push({
      icon: "📊",
      text: `Your money grows by ${returnPct}% — from ${formatINRCompact(result.investedAmount)} invested to ${formatINRCompact(result.totalValue)} total value.`,
      type: "tip" as const,
    });

    // Rule of 72
    const doubling = (72 / rate).toFixed(1);
    list.push({
      icon: "⏱️",
      text: `At ${rate}% annual return, your investment doubles roughly every ${doubling} years (Rule of 72).`,
      type: "info" as const,
    });

    if (result.estimatedReturns > result.investedAmount) {
      list.push({
        icon: "🎯",
        text: `Your returns (${formatINRCompact(result.estimatedReturns)}) exceed your invested amount (${formatINRCompact(result.investedAmount)}) — the power of compounding!`,
        type: "tip" as const,
      });
    }

    if (mode === "standard" && amount < 10000) {
      const doubled = calculateSIP({ monthlyAmount: amount * 2, annualRate: rate, years });
      list.push({
        icon: "💡",
        text: `If you double your SIP to ${formatINR(amount * 2)}/month, your corpus grows to ${formatINRCompact(doubled.totalValue)} — ${formatINRCompact(doubled.totalValue - result.totalValue)} more!`,
        type: "info" as const,
      });
    }

    return list;
  }, [result, rate, amount, mode]);

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: Math.round(row.invested),
    returns: Math.round(row.returns),
    total: Math.round(row.total),
  }));

  const donutData = [
    { name: "Invested Amount", value: Math.round(result.investedAmount), color: "#64748b" },
    { name: "Est. Returns", value: Math.round(result.estimatedReturns), color: "#10b981" },
  ];

  const tableColumns = [
    { key: "invested", label: "Invested", format: "currency" as const },
    { key: "returns", label: "Returns", format: "currency" as const },
    { key: "total", label: "Total Value", format: "currency" as const },
  ];

  return (
    <div>
      {/* Two-column layout */}
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Inputs — 2/5 */}
        <div className="lg:col-span-2 p-6 space-y-6">
          <SliderInput
            label="Monthly SIP Amount"
            value={amount}
            min={500}
            max={200000}
            step={500}
            onChange={setAmount}
            prefix="₹"
            showWords
          />
          <SliderInput
            label="Expected Annual Returns"
            value={rate}
            min={1}
            max={30}
            step={0.5}
            onChange={setRate}
            suffix="%"
          />
          <SliderInput
            label="Investment Period"
            value={years}
            min={1}
            max={40}
            step={1}
            onChange={setYears}
            suffix=" Yr"
          />
          {mode === "stepup" && (
            <SliderInput
              label="Annual Step-Up"
              value={stepUp}
              min={0}
              max={50}
              step={1}
              onChange={setStepUp}
              suffix="%"
            />
          )}

          <ShareBar
            params={{ amt: amount, rate, years, ...(mode === "stepup" ? { stepup: stepUp } : {}) }}
            title={`My SIP of ₹${amount.toLocaleString("en-IN")}/month for ${years} years at ${rate}% will grow to ${formatINRCompact(result.totalValue)}`}
          />
        </div>

        {/* Results — 3/5 */}
        <div className="lg:col-span-3 p-6 space-y-5">
          {/* Summary cards */}
          <ResultSummary
            cards={[
              { label: "Invested Amount", value: result.investedAmount },
              { label: "Est. Returns", value: result.estimatedReturns, isNegative: false },
              { label: "Total Value", value: result.totalValue, highlight: true },
            ]}
          />

          {/* Chart tabs */}
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    Wealth Growth
                  </p>
                  <GrowthChart data={chartData} showReturns />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                    Principal vs Returns
                  </p>
                  <DonutChart
                    data={donutData}
                    total={result.totalValue}
                    totalLabel="Total Value"
                  />
                </div>
              </div>
            ) : (
              <BreakdownTable
                rows={result.yearlyBreakdown}
                columns={tableColumns}
                initialRows={5}
              />
            )}
          </div>

          {/* Insights */}
          <InsightCards insights={insights} />
        </div>
      </div>
    </div>
  );
}
