"use client";

import { useCallback, useEffect, useRef } from "react";
import { amountInWords, clamp } from "@/lib/calculators/format";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefix?: string;       // e.g. "₹"
  suffix?: string;       // e.g. "%", "Yr"
  showWords?: boolean;   // show amount in words (for ₹ inputs)
  formatDisplay?: (v: number) => string;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = "",
  suffix = "",
  showWords = false,
  formatDisplay,
}: SliderInputProps) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  // Update CSS custom property for gradient fill
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--range-pct", `${pct}%`);
    }
  }, [pct]);

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  const handleNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        onChange(clamp(num, min, max));
      }
    },
    [onChange, min, max]
  );

  const displayValue = formatDisplay ? formatDisplay(value) : value.toLocaleString("en-IN");
  const words = showWords ? amountInWords(value) : null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 min-w-[120px]">
          {prefix && (
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{prefix}</span>
          )}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleNumber}
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white text-right outline-none"
            aria-label={label}
          />
          {suffix && (
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-0.5">{suffix}</span>
          )}
        </div>
      </div>

      <input
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSlider}
        className="w-full"
        aria-label={label}
      />

      <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>{prefix}{min.toLocaleString("en-IN")}{suffix}</span>
        {words && (
          <span className="text-center text-slate-500 dark:text-slate-400 italic text-xs">
            {words}
          </span>
        )}
        <span>{prefix}{max.toLocaleString("en-IN")}{suffix}</span>
      </div>
    </div>
  );
}
