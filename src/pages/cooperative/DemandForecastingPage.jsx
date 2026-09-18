import React from 'react';
import DemandForecastChart from '../../features/cooperative/components/DemandForecastChart';
import { TrendingUp, MapPin, Users, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { mockAnalytics } from '../../mocks/data/analytics';

export const DemandForecastingPage = () => {
  const hotspots = mockAnalytics.hotspots;
  const summary = mockAnalytics.categoryDemandSummary;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Predictive Capacity Optimization</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          7-Day Service Demand Forecasting
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          AI-assisted forecasting analyzes historical society bookings, seasonal weather changes, and residential calendars to predict trade spikes and prevent customer wait times.
        </p>
      </div>

      {/* Main 7-Day Chart Component */}
      <DemandForecastChart />

      {/* Workflow Diagram: Connect Demand Forecasting with Fair Allocation */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          How Demand Forecasting Connects to Fair Work Allocation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs items-center">
          <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-bold block">STEP 1</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">Historical Society Bookings</p>
          </div>

          <div className="hidden sm:block text-slate-400 font-black">→</div>

          <div className="rounded-2xl bg-indigo-50 p-3.5 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
            <span className="text-[10px] text-indigo-500 font-bold block">STEP 2</span>
            <p className="font-bold text-indigo-700 dark:text-indigo-300 mt-1">Predicted Trade Spikes</p>
          </div>

          <div className="hidden sm:block text-slate-400 font-black">→</div>

          <div className="rounded-2xl bg-purple-50 p-3.5 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
            <span className="text-[10px] text-purple-500 font-bold block">STEP 3</span>
            <p className="font-bold text-purple-700 dark:text-purple-300 mt-1">Fair Worker Mobilization</p>
          </div>
        </div>
      </div>

      {/* High Demand Neighborhood Hotspots */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-500" />
          <span>High-Demand Geographic Clusters (Pune Metropolitan)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hotspots.map((spot) => (
            <div
              key={spot.zone}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{spot.zone}</h4>
                <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-black text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                  {spot.demandLevel}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Primary Need: <strong>{spot.primaryNeed}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Currently {spot.activeCoopWorkers} cooperative workers patrolling this cluster.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemandForecastingPage;
