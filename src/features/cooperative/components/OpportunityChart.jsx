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
import { Scale, Info } from 'lucide-react';

export const OpportunityChart = () => {
  const distribution = mockAnalytics.opportunityDistribution;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 text-xs">
          <p className="font-bold text-slate-900 dark:text-white">{data.worker}</p>
          <p className="text-slate-500">{data.category}</p>
          <p className="text-indigo-600 font-extrabold mt-1">{data.jobsAssignedThisMonth} jobs assigned</p>
          <p className="text-emerald-600 font-semibold text-[10px]">Fairness Index: {data.fairnessScore}%</p>
          <p className="text-slate-400 text-[10px] mt-0.5">{data.status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 mb-1 border border-emerald-200 dark:border-emerald-800">
            <Scale className="w-3.5 h-3.5" />
            <span>Fair Work Distribution Index: 91%</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Worker Opportunity Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verifies that work is distributed equitably across cooperative members rather than captured by top algorithms.
          </p>
        </div>
      </div>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="worker"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="jobsAssignedThisMonth" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/40 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-200">Fairness Principle:</strong> Fairness does not mean identical job counts regardless of skill or availability. It guarantees that qualified workers are never starved of opportunities while active and preventing burnout on overloaded workers.
        </p>
      </div>
    </div>
  );
};

export default OpportunityChart;
