import React from 'react';
import FairAllocationCard from '../../features/cooperative/components/FairAllocationCard';
import OpportunityChart from '../../features/cooperative/components/OpportunityChart';
import { Scale, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const FairAllocationPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800 mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>Core Hackathon Differentiator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Algorithmic Fair Work Allocation System
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          In commercial platforms, opaque dispatch algorithms favor a tiny subset of workers while stranding the rest without income. gigSaathi's open cooperative algorithm calculates multi-factor opportunity weights to balance trade suitability with workload equalization.
        </p>
      </div>

      {/* Interactive Scoring Matrix Simulation */}
      <FairAllocationCard />

      {/* Opportunity Distribution Across Workers */}
      <OpportunityChart />

      {/* Algorithmic Methodology Details */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          The 4 Pillars of the gigSaathi Allocation Model
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 space-y-1.5 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              1. Skill Qualification (25%)
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Verifies trade certifications, tools held, and specific job sub-specialization (e.g. sanitary pipe welding vs tap washer replacement).
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 space-y-1.5 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              2. Real-Time Proximity (20%)
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Minimizes unpaid transit time and reduces emissions by prioritizing workers residing or currently present within a 3 km cluster.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 space-y-1.5 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              3. Availability & Shift Health (25%)
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Respects the worker's declared schedule and enforces reasonable daily rest intervals to prevent fatigue-related accidents.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 space-y-1.5 border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              4. Anti-Starvation Workload Equalizer (30%)
            </h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Calculates rolling 30-day earnings across all union members. Workers with lower recent income receive priority dispatch scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairAllocationPage;
