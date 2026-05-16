"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SliderInput from "@/components/calculator/SliderInput";
import ResultSummary from "@/components/calculator/ResultSummary";
import GrowthChart from "@/components/calculator/GrowthChart";
import InsightCards from "@/components/calculator/InsightCards";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateSWP } from "@/lib/calculators/sip";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

export default function SWPCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [corpus, setCorpus] = useState(() => Number(searchParams.get("corpus")) || 1000000);
  const [withdrawal, setWithdrawal] = useState(() => Number(searchParams.get("w")) || 10000);
  const [rate, setRate] = useState(() => Number(searchParams.get("rate")) || 10);
  const [years, setYears] = useState(() => Number(searchParams.get("years")) || 10);

  useEffect(() => {
    const qs = new URLSearchParams({ corpus: String(corpus), w: String(withdrawal), rate: String(rate), years: String(years) });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [corpus, withdrawal, rate, years, router, pathname]);

  const result = useMemo(() => calculateSWP({ initialInvestment: corpus, monthlyWithdrawal: withdrawal, annualRate: rate, years }), [corpus, withdrawal, rate, years]);

  const insights = useMemo(() => {
    const list = [];
    if (result.monthsUntilDepleted) {
      list.push({ icon: "⚠️", text: `At ${formatINR(withdrawal)}/month withdrawal, your corpus gets depleted in ${result.monthsUntilDepleted} months (${(result.monthsUntilDepleted / 12).toFixed(1)} years). Consider reducing withdrawals.`, type: "warning" as const });
    } else {
      list.push({ icon: "✅", text: `Your corpus of ${formatINRCompact(corpus)} sustains ${formatINR(withdrawal)}/month for all ${years} years with ${formatINRCompact(result.finalCorpus)} remaining.`, type: "tip" as const });
    }
    const sustainableRate = (withdrawal * 12) / corpus * 100;
    list.push({ icon: "💡", text: `Your withdrawal rate is ${sustainableRate.toFixed(1)}% of corpus. The globally accepted safe withdrawal rate is 3–4%/year.`, type: "info" as const });
    return list;
  }, [result, corpus, withdrawal, years]);

  const chartData = result.yearlyBreakdown.map((r) => ({
    year: r.year, invested: 0, returns: Math.round(r.withdrawn), total: Math.round(r.corpus),
  }));

  return (
    <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
      <div className="lg:col-span-2 p-6 space-y-5">
        <SliderInput label="Initial Corpus" value={corpus} min={100000} max={100000000} step={100000} onChange={setCorpus} prefix="₹" showWords />
        <SliderInput label="Monthly Withdrawal" value={withdrawal} min={1000} max={500000} step={1000} onChange={setWithdrawal} prefix="₹" />
        <SliderInput label="Expected Annual Returns" value={rate} min={1} max={20} step={0.5} onChange={setRate} suffix="%" />
        <SliderInput label="Withdrawal Period" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" Yr" />
        <ShareBar params={{ corpus, w: withdrawal, rate, years }} title={`SWP: ${formatINR(withdrawal)}/month from ${formatINRCompact(corpus)} corpus`} />
      </div>
      <div className="lg:col-span-3 p-6 space-y-5">
        <ResultSummary cards={[
          { label: "Total Withdrawn", value: result.totalWithdrawal },
          { label: "Returns Earned", value: result.totalReturnsEarned },
          { label: "Final Corpus", value: result.finalCorpus, highlight: !result.monthsUntilDepleted },
        ]} />
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Corpus Value Over Time</p>
          <GrowthChart data={chartData} showReturns={false} />
        </div>
        <InsightCards insights={insights} />
      </div>
    </div>
  );
}
