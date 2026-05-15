"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SliderInput from "@/components/calculator/SliderInput";
import ResultSummary from "@/components/calculator/ResultSummary";
import GrowthChart from "@/components/calculator/GrowthChart";
import InsightCards from "@/components/calculator/InsightCards";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateFD, calculateRD, BANK_FD_RATES, type CompoundFrequency } from "@/lib/calculators/fd";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

type Mode = "fd" | "rd";

interface FDCalculatorProps {
  mode?: Mode;
}

export default function FDCalculator({ mode = "fd" }: FDCalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [principal, setPrincipal] = useState(() => Number(searchParams.get("principal")) || 100000);
  const [rate, setRate] = useState(() => Number(searchParams.get("rate")) || 7.0);
  const [years, setYears] = useState(() => Number(searchParams.get("years")) || 5);
  const [frequency, setFrequency] = useState<CompoundFrequency>("quarterly");

  useEffect(() => {
    const qs = new URLSearchParams({ principal: String(principal), rate: String(rate), years: String(years) });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [principal, rate, years, router, pathname]);

  const result = useMemo(() => {
    if (mode === "rd") {
      return calculateRD({ monthlyDeposit: principal, annualRate: rate, years });
    }
    return calculateFD({ principal, annualRate: rate, years, frequency });
  }, [principal, rate, years, frequency, mode]);

  const insights = useMemo(() => {
    const invested = mode === "fd" ? principal : (result as ReturnType<typeof calculateRD>).investedAmount ?? principal * years * 12;
    const maturity = mode === "fd" ? (result as ReturnType<typeof calculateFD>).maturityAmount : (result as ReturnType<typeof calculateRD>).maturityAmount;
    return [
      {
        icon: "🏦",
        text: `Your ${mode === "fd" ? "deposit" : "monthly deposits"} of ${formatINRCompact(principal)} ${mode === "rd" ? "× " + years * 12 + " months" : ""} grows to ${formatINRCompact(maturity)} — earning ${formatINRCompact(maturity - invested)} in interest.`,
        type: "tip" as const,
      },
      {
        icon: "💡",
        text: `Effective annual yield: ${mode === "fd" ? (result as ReturnType<typeof calculateFD>).effectiveRate?.toFixed(2) + "%" : rate + "%"} due to quarterly compounding.`,
        type: "info" as const,
      },
      {
        icon: "⚠️",
        text: `FD interest is taxable as per your income slab. TDS of 10% applies if annual interest exceeds ₹40,000 (₹50,000 for senior citizens).`,
        type: "warning" as const,
      },
    ];
  }, [result, principal, rate, years, mode]);

  const maturity = mode === "fd"
    ? (result as ReturnType<typeof calculateFD>).maturityAmount
    : (result as ReturnType<typeof calculateRD>).maturityAmount;

  const interest = mode === "fd"
    ? (result as ReturnType<typeof calculateFD>).totalInterest
    : (result as ReturnType<typeof calculateRD>).totalInterest;

  const invested = mode === "fd"
    ? principal
    : (result as ReturnType<typeof calculateRD>).investedAmount;

  const chartData = result.yearlyBreakdown.map((r) => ({
    year: r.year,
    invested: Math.round(r.invested),
    returns: Math.round(r.interest),
    total: Math.round(r.total),
  }));

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Inputs */}
        <div className="lg:col-span-2 p-6 space-y-5">
          <SliderInput
            label={mode === "fd" ? "Deposit Amount" : "Monthly Deposit"}
            value={principal}
            min={1000}
            max={mode === "fd" ? 10000000 : 100000}
            step={1000}
            onChange={setPrincipal}
            prefix="₹"
            showWords
          />
          <SliderInput
            label="Interest Rate (per annum)"
            value={rate}
            min={1}
            max={15}
            step={0.1}
            onChange={setRate}
            suffix="%"
          />
          <SliderInput
            label="Duration"
            value={years}
            min={1}
            max={10}
            step={1}
            onChange={setYears}
            suffix=" Yr"
          />

          {mode === "fd" && (
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                Compounding Frequency
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["monthly", "quarterly", "half-yearly", "yearly"] as CompoundFrequency[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      frequency === f
                        ? "bg-brand/10 border-brand text-brand dark:text-brand-light"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ShareBar params={{ principal, rate, years }} title={`My ${mode.toUpperCase()} matures to ${formatINRCompact(maturity)}`} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 p-6 space-y-5">
          <ResultSummary
            cards={[
              { label: "Amount Invested", value: invested },
              { label: "Interest Earned", value: interest },
              { label: "Maturity Amount", value: maturity, highlight: true },
            ]}
          />

          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Growth Over Time</p>
            <GrowthChart data={chartData} showReturns />
          </div>

          <InsightCards insights={insights} />

          {/* Bank rates table */}
          {mode === "fd" && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Current FD Rates (1-year tenure)
              </h3>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <th className="text-left px-3 py-2 font-semibold text-slate-500 dark:text-slate-400">Bank</th>
                      <th className="text-right px-3 py-2 font-semibold text-slate-500 dark:text-slate-400">1 Year</th>
                      <th className="text-right px-3 py-2 font-semibold text-slate-500 dark:text-slate-400">3 Year</th>
                      <th className="text-right px-3 py-2 font-semibold text-slate-500 dark:text-slate-400">5 Year</th>
                      <th className="text-right px-3 py-2 font-semibold text-slate-500 dark:text-slate-400 hidden sm:table-cell">Senior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {BANK_FD_RATES.map((b) => (
                      <tr key={b.bank} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-3 py-2 font-medium text-slate-700 dark:text-slate-200">{b.bank}</td>
                        <td className="px-3 py-2 text-right text-slate-600 dark:text-slate-300">{b.rate1yr}%</td>
                        <td className="px-3 py-2 text-right text-slate-600 dark:text-slate-300">{b.rate3yr}%</td>
                        <td className="px-3 py-2 text-right text-slate-600 dark:text-slate-300">{b.rate5yr}%</td>
                        <td className="px-3 py-2 text-right text-brand dark:text-brand-light hidden sm:table-cell">{b.seniorRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mt-1">Rates are indicative. Check with your bank for latest rates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
