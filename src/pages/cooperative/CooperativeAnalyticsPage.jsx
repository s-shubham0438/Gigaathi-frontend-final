import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Users, ShieldCheck, Award, Heart } from 'lucide-react';
import { useCooperative } from '../../features/cooperative/hooks/useCooperative';

export const CooperativeAnalyticsPage = () => {
  const { overview } = useCooperative(true);

  const categoryShare = [
    { name: 'Cleaning', value: 34, color: '#10b981' },
    { name: 'Plumbing', value: 26, color: '#0ea5e9' },
    { name: 'Electrician', value: 20, color: '#f59e0b' },
    { name: 'Appliance', value: 12, color: '#6366f1' },
    { name: 'Others', value: 8, color: '#8b5cf6' },
  ];

  const monthlyGrowth = [
    { month: 'Apr', volume: 210000, jobs: 420 },
    { month: 'May', volume: 265000, jobs: 510 },
    { month: 'Jun', volume: 310000, jobs: 620 },
    { month: 'Jul', volume: 345000, jobs: 690 },
    { month: 'Aug', volume: 390000, jobs: 780 },
    { month: 'Sep (Current)', volume: 428600, jobs: 860 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Cooperative Business Intelligence & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Metrics demonstrating informal labor formalization, cooperative revenue retention, and welfare fund growth.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Volume</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">₹4.28L</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+24.2% YoY</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completion Rate</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">98.2%</p>
          <span className="text-[10px] text-slate-400">Industry avg: 86%</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Rating</span>
          <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">4.89 / 5.0</p>
          <span className="text-[10px] text-slate-400">From 1,240 reviews</span>
        </div>

        <div className="rounded-3xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs dark:border-purple-950 dark:bg-purple-950/30">
          <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider block">Welfare Fund Pool</span>
          <p className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-300 mt-1">₹4.28 Lakhs</p>
          <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">100% solvency</span>
        </div>
      </div>

      {/* Two Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Growth Trends Line Chart */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            6-Month Cooperative Volume & Job Volume
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="volume" name="Cooperative Volume (₹)" stroke="#4f46e5" strokeWidth={3} />
                <Line type="monotone" dataKey="jobs" name="Total Jobs Done" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trade Category Breakdown Pie */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Trade Category Share
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CooperativeAnalyticsPage;
