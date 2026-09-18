import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  TrendingUp,
  Scale,
  ShieldCheck,
  Star,
  IndianRupee,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useCooperative } from '../../features/cooperative/hooks/useCooperative';
import FairAllocationCard from '../../features/cooperative/components/FairAllocationCard';
import DemandForecastChart from '../../features/cooperative/components/DemandForecastChart';
import OpportunityChart from '../../features/cooperative/components/OpportunityChart';

export const CooperativeDashboard = () => {
  const { overview, isLoading } = useCooperative(true);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Operational Management • Pune Shramik Karmachari Sahakari Sanstha
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Cooperative Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Real-time monitoring of collective worker welfare, algorithmic fair dispatch, and 7-day predictive household service demand.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cooperative/allocation"
            className="rounded-2xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-950 hover:bg-slate-100 transition shadow-md"
          >
            Run Fair Allocation
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Members
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {overview?.activeWorkersToday || 142} / {overview?.totalWorkers || 184}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">
            77% active today
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Today's Bookings
          </span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {overview?.todayBookingsCount || 38}
          </div>
          <span className="text-[10px] text-indigo-600 font-semibold">
            {overview?.pendingRequestsCount || 6} awaiting acceptance
          </span>
        </div>

        <div className="rounded-3xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs dark:border-purple-950 dark:bg-purple-950/30">
          <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
            Fairness Allocation Index
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-300 mt-1">
            {overview?.fairnessIndexPercent || 91}%
          </div>
          <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">
            Zero worker starvation
          </span>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs dark:border-emerald-950 dark:bg-emerald-950/30">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
            Collective Welfare Pool
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
            ₹{(overview?.welfareFundRupees || 428000).toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
            5% medical protection
          </span>
        </div>
      </div>

      {/* Core Innovation Differentiator #1: Fair Allocation Simulator Preview */}
      <section className="space-y-4">
        <FairAllocationCard category="plumbing" />
      </section>

      {/* Core Innovation Differentiator #2: 7-Day Demand Forecasting Preview */}
      <section className="space-y-4">
        <DemandForecastChart />
      </section>

      {/* Core Innovation Differentiator #3: Opportunity Distribution */}
      <section className="space-y-4">
        <OpportunityChart />
      </section>
    </div>
  );
};

export default CooperativeDashboard;
