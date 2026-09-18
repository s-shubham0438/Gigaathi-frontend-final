import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { mockAnalytics } from '../../../mocks/data/analytics';
import { TrendingUp, AlertTriangle, Users, CheckCircle2 } from 'lucide-react';

export const DemandForecastChart = () => {
  const forecastData = mockAnalytics.demandForecast;
  const summary = mockAnalytics.categoryDemandSummary;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 mb-1 border border-blue-200 dark:border-blue-800">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Predictive Modeling (Prototype Simulation)</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            7-Day Service Demand Forecasting
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Analyzes historical household service seasonality and society schedules to mobilize worker shifts in advance.
          </p>
        </div>
      </div>

      {/* Recharts Multi-line Trend */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '11px' }} />
            <Line type="monotone" dataKey="cleaning" name="Deep Cleaning" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="plumbing" name="Plumbing" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="electrical" name="Electrician" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="appliance" name="Appliance" stroke="#6366f1" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Suggested Cooperative Actions */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Automated Shift Mobilization Alerts
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {summary.slice(0, 3).map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{item.predictedChange}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Action: Activate {item.recommendedStaff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemandForecastChart;
