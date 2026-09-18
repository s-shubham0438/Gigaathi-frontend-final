import React from 'react';
import { Check, Clock, Play, CheckCheck, X } from 'lucide-react';

export const BookingTimeline = ({ timeline = [], currentStatus = 'REQUESTED' }) => {
  const isCancelled = currentStatus === 'CANCELLED';

  const defaultSteps = [
    { status: 'REQUESTED', label: 'Booking Requested' },
    { status: 'ACCEPTED', label: 'Worker Accepted' },
    { status: 'IN_PROGRESS', label: 'Service In Progress' },
    { status: 'COMPLETED', label: 'Service Completed' },
  ];

  const getStepState = (stepStatus) => {
    if (isCancelled) {
      if (stepStatus === 'REQUESTED') return 'completed';
      return 'cancelled';
    }

    const order = ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="py-4">
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-2">
        {defaultSteps.map((step, idx) => {
          const state = getStepState(step.status);
          const timelineEntry = timeline.find((t) => t.status === step.status);
          const time = timelineEntry?.time || '';

          return (
            <div key={step.status} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1 relative">
              {/* Connector line for desktop */}
              {idx < defaultSteps.length - 1 && (
                <div
                  className={`hidden sm:block absolute top-4 left-1/2 w-full h-1 -z-0 transition-colors ${
                    state === 'completed'
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              )}

              {/* Node Indicator */}
              <div
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                  state === 'completed'
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                    : state === 'active'
                    ? 'border-indigo-600 bg-white text-indigo-600 ring-4 ring-indigo-100 dark:bg-slate-900 dark:ring-indigo-950/80 animate-pulse'
                    : 'border-slate-300 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-900'
                }`}
              >
                {state === 'completed' ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : state === 'active' ? (
                  <Play className="w-4 h-4 fill-indigo-600" />
                ) : (
                  <span className="text-xs font-bold text-slate-400">{idx + 1}</span>
                )}
              </div>

              {/* Text Info */}
              <div className="sm:text-center">
                <p
                  className={`text-xs font-bold ${
                    state === 'active'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : state === 'completed'
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {timelineEntry?.label || step.label}
                </p>
                {time && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                    {time}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isCancelled && (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-center text-xs font-bold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400 flex items-center justify-center gap-2">
          <X className="w-4 h-4" />
          <span>This booking was cancelled.</span>
        </div>
      )}
    </div>
  );
};

export default BookingTimeline;
