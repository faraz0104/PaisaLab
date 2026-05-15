"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatINRCompact } from "@/lib/calculators/format";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  total?: number;
  totalLabel?: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold text-slate-900 dark:text-white">{payload[0].name}</p>
        <p className="text-slate-600 dark:text-slate-300">{formatINRCompact(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function DonutChart({ data, total, totalLabel }: DonutChartProps) {
  const filteredData = data.filter((d) => d.value > 0);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={600}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-slate-600 dark:text-slate-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      {total !== undefined && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: "-12px" }}>
          <p className="text-xs text-slate-500 dark:text-slate-400">{totalLabel ?? "Total Value"}</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{formatINRCompact(total)}</p>
        </div>
      )}
    </div>
  );
}
