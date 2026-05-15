"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatINRCompact } from "@/lib/calculators/format";

interface GrowthDataPoint {
  year: number;
  invested: number;
  returns: number;
  total: number;
}

interface GrowthChartProps {
  data: GrowthDataPoint[];
  showReturns?: boolean;  // show invested vs returns breakdown
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string | number }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-200">Year {label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
            {p.name}: {formatINRCompact(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GrowthChart({ data, showReturns = true }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `Yr ${v}`}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => formatINRCompact(v)}
          width={56}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span className="text-xs text-slate-600 dark:text-slate-300">{value}</span>
          )}
        />
        {showReturns ? (
          <>
            <Area
              type="monotone"
              dataKey="invested"
              name="Invested"
              stackId="1"
              stroke="#64748b"
              strokeWidth={2}
              fill="url(#colorInvested)"
            />
            <Area
              type="monotone"
              dataKey="returns"
              name="Returns"
              stackId="1"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorReturns)"
            />
          </>
        ) : (
          <Area
            type="monotone"
            dataKey="total"
            name="Total Value"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorReturns)"
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
