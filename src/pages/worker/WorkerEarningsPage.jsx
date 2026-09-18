import React from 'react';
import { TrendingUp, IndianRupee, ShieldCheck, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useWorkerJobs } from '../../features/bookings/hooks/useWorkerJobs';
import EarningsChart from '../../features/workers/components/EarningsChart';

export const WorkerEarningsPage = () => {
  const { user } = useAuth();
  const workerId = user?.workerId || 'wrk-1';
  const { todayEarnings, welfareBalance, completedJobs, currentWorker } = useWorkerJobs(workerId, true);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Earnings & Welfare Balance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Full breakdown of your direct income, transparent payouts, and cooperative welfare credits.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Today's Earnings</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            ₹{todayEarnings.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">100% paid to worker</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">This Week</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            ₹8,600
          </p>
          <span className="text-[10px] text-slate-400 font-medium">19 jobs completed</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">This Month</span>
          <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            ₹32,450
          </p>
          <span className="text-[10px] text-indigo-600 font-semibold">+18% vs last month</span>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
            Welfare Balance
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
            ₹{welfareBalance.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
            Health & pension fund
          </span>
        </div>
      </div>

      {/* Interactive Recharts Chart */}
      <EarningsChart />

      {/* Welfare Fund Explanation Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-950 dark:bg-indigo-950/40 space-y-3">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>How the Cooperative Welfare Fund Works for You</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          For every service booking completed on gigSaathi, 5% is contributed into your personal emergency medical welfare account without deducting from your baseline pay. This fund covers outpatient treatments, accidental injury cover, and zero-interest trade equipment loans through the <strong>Pune Workers Cooperative</strong>.
        </p>
      </div>
    </div>
  );
};

export default WorkerEarningsPage;
