import React, { useState } from 'react';
import { Scale, Users, ShieldCheck, CheckCircle, Info, Sparkles, MapPin, Award } from 'lucide-react';
import { mockDb } from '../../../mocks/mockDb';

export const FairAllocationCard = ({ category = 'plumbing' }) => {
  const [selectedTrade, setSelectedTrade] = useState(category);
  const candidateScores = mockDb.calculateFairAllocation(mockDb.workers, selectedTrade);

  const trades = [
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'electrical', name: 'Electrician' },
    { id: 'cleaning', name: 'Deep Cleaning' },
    { id: 'appliance', name: 'Appliance Repair' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 mb-1 border border-purple-200 dark:border-purple-800">
            <Scale className="w-3.5 h-3.5" />
            <span>Algorithmic Fair Dispatch Engine — SIH 2026 Core Innovation</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Opportunity Allocation Scoring Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Balances skill suitability and proximity with workload equalization to eliminate worker starvation.
          </p>
        </div>

        {/* Trade Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {trades.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTrade(t.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedTrade === t.id
                  ? 'bg-white text-indigo-600 shadow-xs dark:bg-slate-900 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithmic Weight Explanation Banner */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center rounded-2xl bg-indigo-50/50 p-3 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Skill Match</span>
          <span className="font-extrabold text-indigo-700 dark:text-indigo-300">25% Weight</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Availability</span>
          <span className="font-extrabold text-indigo-700 dark:text-indigo-300">25% Weight</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Proximity/Distance</span>
          <span className="font-extrabold text-indigo-700 dark:text-indigo-300">20% Weight</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Workload Balance</span>
          <span className="font-extrabold text-purple-700 dark:text-purple-300">30% Anti-Overload</span>
        </div>
      </div>

      {/* Ranked Candidate List */}
      <div className="mt-5 space-y-3">
        {candidateScores.slice(0, 5).map((candidate, rank) => {
          const scores = candidate.allocationScores;
          const isTopPick = rank === 0;

          return (
            <div
              key={candidate.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-4 border transition ${
                isTopPick
                  ? 'border-emerald-300 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20 shadow-xs'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black shrink-0 ${
                    isTopPick
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  #{rank + 1}
                </div>

                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {candidate.name}
                    </h4>
                    {isTopPick && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Recommended Dispatch
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>⭐ {candidate.rating}</span>
                    <span>•</span>
                    <span>{candidate.completedJobs} jobs done</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {candidate.distanceKm} km</span>
                  </p>
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="flex items-center gap-4 text-xs font-semibold justify-between sm:justify-end">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Workload: {candidate.currentWorkloadScore}%</div>
                  <div className="text-[10px] text-purple-600 dark:text-purple-400">Opportunity Need: High</div>
                </div>

                <div className="text-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1.5 border border-indigo-100 dark:border-indigo-900">
                  <span className="text-[9px] uppercase tracking-wider text-indigo-400 block font-bold">Fairness Score</span>
                  <span className="text-base font-black text-indigo-700 dark:text-indigo-300">
                    {scores.finalScore}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FairAllocationCard;
