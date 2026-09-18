import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { mockAnalytics } from '../../../mocks/data/analytics';
import { TrendingUp, IndianRupee, ShieldCheck } from 'lucide-react';

export const EarningsChart = ({ data = mockAnalytics.workerWeeklyEarnings }) => {
  const totalWeekly = data.reduce((sum, d) => sum + d.amount, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 text-xs">
          <p className="font-bold text-slate-900 dark:text-white">{label}</p>
          <p className="text-emerald-600 font-extrabold text-sm mt-1">₹{payload[0].value}</p>
          <p className="text-slate-400 text-[10px] mt-0.5">{payload[0].payload.jobs} jobs completed</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Weekly Earnings Breakdown</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent daily earnings with 5% automated cooperative medical welfare allocation.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
            This Week Total
          </span>
          <span className="text-xl font-black text-slate-900 dark:text-white">
            ₹{totalWeekly.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="amount"
              fill="#4f46e5"
              radius={[10, 10, 0, 0]}
              className="hover:fill-indigo-700 transition"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;
