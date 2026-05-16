"use client";

import { useState, useMemo } from "react";
import { calculateTax, type TaxInputs } from "@/lib/calculators/tax";
import { formatINR, formatINRCompact } from "@/lib/calculators/format";

type AgeGroup = "below60" | "60to79" | "above80";

const AGE_GROUPS: { id: AgeGroup; label: string; sub: string }[] = [
  { id: "below60", label: "General",      sub: "Below 60" },
  { id: "60to79",  label: "Senior",       sub: "Age 60–79" },
  { id: "above80", label: "Super Senior", sub: "Age 80+" },
];

const INCOME_PRESETS = [500000, 800000, 1200000, 1500000, 2000000, 3000000];

export default function TaxCalculator() {
  // Core
  const [ageGroup, setAgeGroup]       = useState<AgeGroup>("below60");
  const [grossIncome, setGrossIncome] = useState(1200000);
  const [otherIncome, setOtherIncome] = useState(0);

  // Primary deductions
  const [section80C, setSection80C]               = useState(0);
  const [section80D, setSection80D]               = useState(0);
  const [homeLoanInterest, setHomeLoanInterest]   = useState(0);
  const [npsEmployee, setNpsEmployee]             = useState(0);

  // HRA section
  const [showHRA, setShowHRA]         = useState(false);
  const [basicSalary, setBasicSalary] = useState(0);
  const [hraReceived, setHraReceived] = useState(0);
  const [rentPaid, setRentPaid]       = useState(0);
  const [metroCity, setMetroCity]     = useState(false);

  // More deductions
  const [showMore, setShowMore]                         = useState(false);
  const [npsEmployer, setNpsEmployer]                   = useState(0);
  const [savingsInterest, setSavingsInterest]           = useState(0);
  const [educationLoanInterest, setEducationLoanInterest] = useState(0);
  const [donations80G, setDonations80G]                 = useState(0);
  const [professionalTax, setProfessionalTax]           = useState(0);
  const [rentPaidNoHRA, setRentPaidNoHRA]               = useState(0);

  const [activeRegime, setActiveRegime] = useState<"new" | "old">("new");

  const inputs: TaxInputs = useMemo(() => ({
    grossIncome, ageGroup, otherIncome,
    basicSalary: basicSalary || undefined,
    hraReceived, rentPaid, metroCity,
    section80C, section80D, homeLoanInterest, npsEmployee,
    npsEmployer, savingsInterest, educationLoanInterest,
    donations80G, professionalTax, rentPaidNoHRA,
  }), [
    grossIncome, ageGroup, otherIncome, basicSalary,
    hraReceived, rentPaid, metroCity, section80C, section80D,
    homeLoanInterest, npsEmployee, npsEmployer, savingsInterest,
    educationLoanInterest, donations80G, professionalTax, rentPaidNoHRA,
  ]);

  const result = useMemo(() => calculateTax(inputs), [inputs]);
  const current = activeRegime === "new" ? result.new : result.old;
  const max80D   = ageGroup !== "below60" ? 50000 : 25000;

  return (
    <div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">

        {/* ── INPUT PANEL ── */}
        <div className="lg:col-span-2 p-6 space-y-5">

          {/* Age group */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Age Group</p>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-semibold">
              {AGE_GROUPS.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setAgeGroup(ag.id)}
                  className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-colors ${
                    ageGroup === ag.id
                      ? "bg-brand text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{ag.label}</span>
                  <span className={`text-[10px] font-normal ${ageGroup === ag.id ? "text-white/80" : "text-slate-400"}`}>{ag.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gross income */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Gross Annual Income</label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-2">
              <span className="text-slate-500 font-medium mr-2">₹</span>
              <input
                type="number"
                value={grossIncome}
                min={0}
                step={10000}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full bg-transparent text-xl font-bold text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {INCOME_PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setGrossIncome(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    grossIncome === p
                      ? "bg-brand/20 text-brand border border-brand/40"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  ₹{p >= 100000 ? `${p / 100000}L` : `${p / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          {/* Other income */}
          <NumRow label="Other Income (FD, Rental…)" value={otherIncome} onChange={setOtherIncome} hint="Added to gross for tax" />

          {/* Primary deductions */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Old Regime Deductions</p>
            <NumRow label="80C — PPF, ELSS, LIC…"       value={section80C}       onChange={setSection80C}       max={150000} badge="max ₹1.5L" />
            <NumRow label={`80D — Health Insurance`}     value={section80D}       onChange={setSection80D}       max={max80D} badge={`max ₹${max80D / 1000}K`} />
            <NumRow label="24(b) — Home Loan Interest"   value={homeLoanInterest} onChange={setHomeLoanInterest} max={200000} badge="max ₹2L" />
            <NumRow label="80CCD(1B) — NPS Employee"     value={npsEmployee}      onChange={setNpsEmployee}      max={50000}  badge="max ₹50K" />
          </div>

          {/* HRA accordion */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setShowHRA(!showHRA)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <span>🏠 HRA Details</span>
              <span className="text-slate-400 text-xs">{showHRA ? "▲" : "▼"}</span>
            </button>
            {showHRA && (
              <div className="px-4 pb-3 pt-1 space-y-0 bg-white dark:bg-slate-900">
                <NumRow label="HRA Received"             value={hraReceived}  onChange={setHraReceived} />
                <NumRow label="Annual Rent Paid"         value={rentPaid}     onChange={setRentPaid} />
                <NumRow label="Basic Salary (for HRA %)" value={basicSalary}  onChange={setBasicSalary} hint="Defaults to 40% of gross" />
                <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Metro City?</span>
                  <button
                    onClick={() => setMetroCity(!metroCity)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${metroCity ? "bg-brand" : "bg-slate-300 dark:bg-slate-600"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${metroCity ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* More deductions accordion */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setShowMore(!showMore)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <span>➕ More Deductions</span>
              <span className="text-slate-400 text-xs">{showMore ? "▲" : "▼"}</span>
            </button>
            {showMore && (
              <div className="px-4 pb-3 pt-1 bg-white dark:bg-slate-900">
                <NumRow label="80CCD(2) — Employer NPS"  value={npsEmployer}             onChange={setNpsEmployer}             hint="Up to 14% of basic (new & old)" />
                <NumRow label={ageGroup !== "below60" ? "80TTB — All Interest (max ₹50K)" : "80TTA — Savings Interest (max ₹10K)"}
                                                          value={savingsInterest}         onChange={setSavingsInterest}         max={ageGroup !== "below60" ? 50000 : 10000} />
                <NumRow label="80E — Education Loan Interest" value={educationLoanInterest} onChange={setEducationLoanInterest} hint="No limit" />
                <NumRow label="80G — Donations (50% deductible)" value={donations80G}     onChange={setDonations80G}           hint="Enter full donation amount" />
                <NumRow label="Professional Tax"          value={professionalTax}         onChange={setProfessionalTax}         max={2500} badge="max ₹2,500" />
                <NumRow label="80GG — Rent (no HRA)"      value={rentPaidNoHRA}           onChange={setRentPaidNoHRA}           hint="If you don't receive HRA" />
              </div>
            )}
          </div>
        </div>

        {/* ── RESULT PANEL ── */}
        <div className="lg:col-span-3 p-6 space-y-4">

          {/* Regime toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            {(["new", "old"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegime(r)}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors relative ${
                  activeRegime === r
                    ? "bg-brand text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {r === "new" ? "New Regime" : "Old Regime"}
                {result.betterRegime === r && (
                  <span className="ml-1.5 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">✓ Better</span>
                )}
              </button>
            ))}
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-2 gap-3">
            {(["new", "old"] as const).map((r) => {
              const reg = result[r];
              return (
                <div
                  key={r}
                  onClick={() => setActiveRegime(r)}
                  className={`rounded-xl p-4 border transition-colors cursor-pointer ${
                    activeRegime === r
                      ? "border-brand bg-brand/5 dark:bg-brand/10"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {r === "new" ? "New Regime" : "Old Regime"}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white result-value">
                    {formatINRCompact(reg.totalTax)}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{reg.effectiveRate.toFixed(1)}% effective</p>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400">In-hand / month</p>
                    <p className="text-sm font-semibold text-brand">{formatINR(reg.inHandMonthly)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* You save */}
          {result.savings > 0 && (
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-2.5 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {result.betterRegime === "new" ? "New" : "Old"} regime saves {formatINR(result.savings)}/year
              </span>
              <span className="text-emerald-500 text-xs">({formatINR(result.savings / 12)}/mo)</span>
            </div>
          )}

          {/* Tax breakdown */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                {activeRegime === "new" ? "New" : "Old"} Regime — Full Breakdown
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <BreakRow label="Gross Income"         value={formatINR(current.grossIncome)} />
              {current.totalIncome !== current.grossIncome && (
                <BreakRow label="+ Other Income"     value={formatINR(current.totalIncome - current.grossIncome)} color="slate" />
              )}
              <BreakRow label="Total Income"         value={formatINR(current.totalIncome)} bold />
              <BreakRow label="Total Deductions"     value={`− ${formatINR(current.deductions)}`} color="green" />
              <BreakRow label="Taxable Income"       value={formatINR(current.taxableIncome)} bold />

              {current.slabBreakdown.map((s) => (
                <BreakRow key={s.slab} label={`${s.slab} @${s.rate}%`} value={formatINR(s.tax)} indent />
              ))}

              {current.rebate87A > 0 && (
                <BreakRow label="87A Rebate"         value={`− ${formatINR(current.rebate87A)}`} color="green" />
              )}
              {current.marginalRelief > 0 && (
                <BreakRow label="Marginal Relief"    value={`− ${formatINR(current.marginalRelief)}`} color="green" />
              )}

              <BreakRow label="Tax After Rebate"       value={formatINR(current.totalTax - current.surcharge - current.cess)} bold />

              {current.surcharge > 0 && (
                <BreakRow label="Surcharge"          value={formatINR(current.surcharge)} />
              )}
              <BreakRow label="4% Health & Education Cess" value={formatINR(current.cess)} />

              <div className="flex justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-900 dark:text-white">
                <span>Total Tax Payable</span>
                <span className="text-red-600 dark:text-red-400">{formatINR(current.totalTax)}</span>
              </div>
            </div>
          </div>

          {/* Tax optimizer */}
          {result.optimizer.additional80C > 0 && result.optimizer.taxSaving80C > 0 && (
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
              <span className="text-xl shrink-0">💡</span>
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Tax Saving Opportunity</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                  Invest {formatINR(result.optimizer.additional80C)} more in 80C (PPF, ELSS, LIC) under the old regime to save{" "}
                  <strong>{formatINR(result.optimizer.taxSaving80C)}</strong> in tax.
                </p>
              </div>
            </div>
          )}

          {/* Deductions breakdown */}
          <DeductionSummary inputs={inputs} totalDeductions={current.deductions} ageGroup={ageGroup} regime={activeRegime} />
        </div>
      </div>
    </div>
  );
}

/* ── helpers ── */

function NumRow({
  label, value, onChange, max, badge, hint,
}: {
  label: string; value: number; onChange: (v: number) => void;
  max?: number; badge?: string; hint?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex-1 min-w-0 mr-3">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-tight">{label}</p>
        {hint && <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>}
        {badge && <p className="text-[10px] text-brand mt-0.5">{badge}</p>}
      </div>
      <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 shrink-0">
        <span className="text-slate-400 text-xs">₹</span>
        <input
          type="number"
          value={value}
          min={0}
          max={max}
          step={1000}
          onChange={(e) => onChange(Math.min(Number(e.target.value), max ?? Infinity))}
          className="w-24 bg-transparent text-sm font-semibold text-slate-900 dark:text-white text-right outline-none"
        />
      </div>
    </div>
  );
}

function BreakRow({ label, value, bold, indent, color }: {
  label: string; value: string; bold?: boolean; indent?: boolean; color?: string;
}) {
  const valueColor = color === "green"
    ? "text-emerald-600 dark:text-emerald-400"
    : color === "slate"
    ? "text-slate-500"
    : "text-slate-700 dark:text-slate-200";
  return (
    <div className={`flex justify-between px-4 py-2 ${bold ? "bg-slate-50/50 dark:bg-slate-800/50 font-semibold text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
      <span className={indent ? "pl-3" : ""}>{label}</span>
      <span className={`font-medium ${valueColor} ${bold ? "font-semibold" : ""}`}>{value}</span>
    </div>
  );
}

function DeductionSummary({ inputs, totalDeductions, ageGroup, regime }: {
  inputs: TaxInputs;
  totalDeductions: number;
  ageGroup: string;
  regime: "new" | "old";
}) {
  const stdDeduction = regime === "new" ? 75000 : 50000;
  const max80D = ageGroup !== "below60" ? 50000 : 25000;
  const maxInterest = ageGroup !== "below60" ? 50000 : 10000;

  const items: { label: string; value: number }[] = [
    { label: "Standard Deduction",       value: stdDeduction },
    { label: "80C",                       value: Math.min(inputs.section80C ?? 0, 150000) },
    { label: "80D",                       value: Math.min(inputs.section80D ?? 0, max80D) },
    { label: "24(b) Home Loan",           value: Math.min(inputs.homeLoanInterest ?? 0, 200000) },
    { label: "80CCD(1B) NPS",             value: Math.min(inputs.npsEmployee ?? 0, 50000) },
    { label: "80CCD(2) Employer NPS",     value: Math.min(inputs.npsEmployer ?? 0, (inputs.basicSalary ?? inputs.grossIncome * 0.4) * 0.14) },
    { label: "80E Education Loan",        value: inputs.educationLoanInterest ?? 0 },
    { label: "80G Donations (50%)",       value: (inputs.donations80G ?? 0) * 0.5 },
    { label: "80TTA/TTB Interest",        value: Math.min(inputs.savingsInterest ?? 0, maxInterest) },
    { label: "Professional Tax",          value: Math.min(inputs.professionalTax ?? 0, 2500) },
  ].filter((i) => i.value > 0);

  if (items.length <= 1) return null;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Deductions Applied</p>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{item.label}</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">− {formatINR(item.value)}</span>
          </div>
        ))}
        <div className="flex justify-between px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50">
          <span>Total Deductions</span>
          <span className="text-emerald-600 dark:text-emerald-400">− {formatINR(totalDeductions)}</span>
        </div>
      </div>
    </div>
  );
}
