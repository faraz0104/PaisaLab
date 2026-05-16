"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SliderInput from "@/components/calculator/SliderInput";
import ResultSummary from "@/components/calculator/ResultSummary";
import GrowthChart from "@/components/calculator/GrowthChart";
import DonutChart from "@/components/calculator/DonutChart";
import InsightCards from "@/components/calculator/InsightCards";
import ShareBar from "@/components/calculator/ShareBar";
import { formatINRCompact } from "@/lib/calculators/format";

export default function LumpsumCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [principal, setPrincipal] = useState(() => Number(searchParams.get("amt")) || 100000);
  const [rate, setRate] = useState(() => Number(searchParams.get("rate")) || 12);
  const [years, setYears] = useState(() => Number(searchParams.get("years")) || 10);

  useEffect(() => {
    const qs = new URLSearchParams({ amt: String(principal), rate: String(rate), years: String(years) });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [principal, rate, years, router, pathname]);

  const result = useMemo(() => {
    const maturity = principal * Math.pow(1 + rate / 100, years);
    const returns = maturity - principal;
    const yearlyBreakdown = Array.from({ length: years }, (_, i) => {
      const yr = i + 1;
      const total = principal * Math.pow(1 + rate / 100, yr);
      return { year: yr, invested: principal, returns: total - principal, total };
    });
    return { investedAmount: principal, estimatedReturns: returns, totalValue: maturity, yearlyBreakdown };
  }, [principal, rate, years]);

  const insights = useMemo(() => [
    {
      icon: "📈",
      text: `₹${principal.toLocaleString("en-IN")} invested today at ${rate}% CAGR becomes ${formatINRCompact(result.totalValue)} in ${years} years.`,
      type: "tip" as const,
    },
    {
      icon: "⏱️",
      text: `Rule of 72: At ${rate}%, your money doubles every ~${(72 / rate).toFixed(1)} years. That's ${Math.floor(years / (72 / rate))} full doublings in your ${years}-year period.`,
      type: "info" as const,
    },
  ], [principal, rate, years, result]);

  const chartData = result.yearlyBreakdown.map((r) => ({
    year: r.year, invested: Math.round(r.invested), returns: Math.round(r.returns), total: Math.round(r.total),
  }));

  return (
    <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
      <div className="lg:col-span-2 p-6 space-y-5">
        <SliderInput label="Investment Amount" value={principal} min={1000} max={10000000} step={1000} onChange={setPrincipal} prefix="₹" showWords />
        <SliderInput label="Expected Annual Returns" value={rate} min={1} max={30} step={0.5} onChange={setRate} suffix="%" />
        <SliderInput label="Investment Period" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" Yr" />
        <ShareBar params={{ amt: principal, rate, years }} title={`Lumpsum of ₹${(principal / 100000).toFixed(1)}L grows to ${formatINRCompact(result.totalValue)}`} />
      </div>
      <div className="lg:col-span-3 p-6 space-y-5">
        <ResultSummary cards={[
          { label: "Invested Amount", value: result.investedAmount },
          { label: "Est. Returns", value: result.estimatedReturns },
          { label: "Total Value", value: result.totalValue, highlight: true },
        ]} />
        <div className="grid sm:grid-cols-2 gap-4">
          <GrowthChart data={chartData} showReturns />
          <DonutChart data={[
            { name: "Invested", value: Math.round(result.investedAmount), color: "#64748b" },
            { name: "Returns", value: Math.round(result.estimatedReturns), color: "#10b981" },
          ]} total={result.totalValue} />
        </div>
        <InsightCards insights={insights} />
      </div>
    </div>
  );
}
