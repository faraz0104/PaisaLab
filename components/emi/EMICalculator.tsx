"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SliderInput from "@/components/calculator/SliderInput";
import ResultSummary from "@/components/calculator/ResultSummary";
import GrowthChart from "@/components/calculator/GrowthChart";
import DonutChart from "@/components/calculator/DonutChart";
import BreakdownTable from "@/components/calculator/BreakdownTable";
import InsightCards from "@/components/calculator/InsightCards";
import ShareBar from "@/components/calculator/ShareBar";
import { calculateEMI } from "@/lib/calculators/emi";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

type LoanType = "general" | "home" | "car" | "personal";

const RATE_DEFAULTS: Record<LoanType, number> = {
  general: 10,
  home: 8.5,
  car: 9.5,
  personal: 14,
};

const PRINCIPAL_DEFAULTS: Record<LoanType, number> = {
  general: 500000,
  home: 3000000,
  car: 700000,
  personal: 300000,
};

const PRINCIPAL_MAX: Record<LoanType, number> = {
  general: 10000000,
  home: 50000000,
  car: 5000000,
  personal: 5000000,
};

interface EMICalculatorProps {
  loanType?: LoanType;
}

export default function EMICalculator({ loanType = "general" }: EMICalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [principal, setPrincipal] = useState(() =>
    Number(searchParams.get("principal")) || PRINCIPAL_DEFAULTS[loanType]
  );
  const [rate, setRate] = useState(() =>
    Number(searchParams.get("rate")) || RATE_DEFAULTS[loanType]
  );
  const [years, setYears] = useState(() =>
    Number(searchParams.get("years")) || (loanType === "home" ? 20 : loanType === "personal" ? 3 : 7)
  );
  const [prepayment, setPrepayment] = useState(0);
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  useEffect(() => {
    const qs = new URLSearchParams({ principal: String(principal), rate: String(rate), years: String(years) });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [principal, rate, years, router, pathname]);

  const result = useMemo(
    () => calculateEMI({ principal, annualRate: rate, years, prepayment }),
    [principal, rate, years, prepayment]
  );

  const baseResult = useMemo(
    () => calculateEMI({ principal, annualRate: rate, years }),
    [principal, rate, years]
  );

  const insights = useMemo(() => {
    const list = [];
    list.push({
      icon: "💳",
      text: `Your monthly EMI is ${formatINR(result.emi)}. Over ${years} years, you'll pay ${formatINRCompact(result.totalAmount)} total — ${formatINRCompact(result.totalInterest)} in interest.`,
      type: "info" as const,
    });
    list.push({
      icon: "📊",
      text: `Interest makes up ${result.interestPercent.toFixed(1)}% of your total payment. For every ₹1 borrowed, you pay ₹${(result.totalAmount / principal).toFixed(2)} back.`,
      type: "info" as const,
    });
    if (years > 10) {
      const shorterResult = calculateEMI({ principal, annualRate: rate, years: years - 5 });
      list.push({
        icon: "⏩",
        text: `Reduce tenure by 5 years (to ${years - 5} yr): EMI goes up ${formatINR(shorterResult.emi - result.emi)}/month but you save ${formatINRCompact(result.totalInterest - shorterResult.totalInterest)} in interest.`,
        type: "tip" as const,
      });
    }
    return list;
  }, [result, principal, rate, years]);

  const chartData = result.yearlyBreakdown.map((r) => ({
    year: r.year,
    invested: Math.round(r.principal),
    returns: Math.round(r.interest),
    total: Math.round(r.balance),
  }));

  const donutData = [
    { name: "Principal", value: Math.round(principal), color: "#10b981" },
    { name: "Total Interest", value: Math.round(result.totalInterest), color: "#f97316" },
  ];

  const tableColumns = [
    { key: "principal", label: "Principal Paid", format: "currency" as const },
    { key: "interest", label: "Interest Paid", format: "currency" as const },
    { key: "balance", label: "Balance", format: "currency" as const },
  ];

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Inputs */}
        <div className="lg:col-span-2 p-6 space-y-5">
          <SliderInput
            label="Loan Amount"
            value={principal}
            min={10000}
            max={PRINCIPAL_MAX[loanType]}
            step={10000}
            onChange={setPrincipal}
            prefix="₹"
            showWords
          />
          <SliderInput
            label="Interest Rate (per annum)"
            value={rate}
            min={1}
            max={30}
            step={0.1}
            onChange={setRate}
            suffix="%"
          />
          <SliderInput
            label="Loan Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            suffix=" Yr"
          />
          {(loanType === "home") && (
            <SliderInput
              label="Annual Prepayment (optional)"
              value={prepayment}
              min={0}
              max={500000}
              step={10000}
              onChange={setPrepayment}
              prefix="₹"
            />
          )}

          {/* EMI badge */}
          <div className="rounded-xl bg-brand/10 dark:bg-brand/20 border border-brand/30 p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly EMI</p>
            <p className="text-3xl font-bold text-brand">{formatINR(result.emi)}</p>
          </div>

          <ShareBar
            params={{ principal, rate, years }}
            title={`My loan EMI: ${formatINR(result.emi)}/month for a ₹${(principal / 100000).toFixed(1)}L loan`}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3 p-6 space-y-5">
          <ResultSummary
            cards={[
              { label: "Principal Amount", value: principal },
              { label: "Total Interest", value: result.totalInterest },
              { label: "Total Payment", value: result.totalAmount, highlight: true },
            ]}
          />

          <div>
            <div className="flex gap-1 mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
              {(["chart", "table"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {tab === "chart" ? "Chart" : "Amortization"}
                </button>
              ))}
            </div>

            {activeTab === "chart" ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Outstanding Balance</p>
                  <GrowthChart data={chartData} showReturns={false} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Principal vs Interest</p>
                  <DonutChart data={donutData} total={result.totalAmount} totalLabel="Total Payment" />
                </div>
              </div>
            ) : (
              <BreakdownTable rows={result.yearlyBreakdown} columns={tableColumns} initialRows={5} />
            )}
          </div>

          <InsightCards insights={insights} />
        </div>
      </div>
    </div>
  );
}
