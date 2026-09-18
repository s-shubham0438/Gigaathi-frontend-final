import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Play, FileCheck } from 'lucide-react';

export const CleaningTimeline = ({ currentStatus = 'REQUESTED' }) => {
  const steps = [
    { key: 'REQUESTED', label: 'Requested', icon: Clock, desc: 'Posted to community pool' },
    { key: 'ACCEPTED', label: 'Accepted', icon: CheckCircle2, desc: 'Saathi worker assigned' },
    { key: 'IN_PROGRESS', label: 'In Progress', icon: Play, desc: 'Sanitation work ongoing' },
    { key: 'COMPLETED', label: 'Completed', icon: FileCheck, desc: 'Cleaned & proof verified' },
  ];

  const getStatusIndex = (status) => {
    switch (status?.toUpperCase()) {
      case 'REQUESTED':
      case 'PENDING':
        return 0;
      case 'ACCEPTED':
        return 1;
      case 'IN_PROGRESS':
        return 2;
      case 'COMPLETED':
        return 3;
      case 'CANCELLED':
        return -1;
      default:
        return 0;
    }
  };

  const currentIndex = getStatusIndex(currentStatus);

  if (currentStatus?.toUpperCase() === 'CANCELLED') {
    return (
      <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-semibold">
        <AlertCircle className="w-4 h-4" /> This community cleaning request was cancelled.
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/60 shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] font-bold mt-2 whitespace-nowrap ${
                  isCurrent
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : isDone
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span className="text-[9px] text-slate-400 hidden sm:block">{step.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CleaningTimeline;
