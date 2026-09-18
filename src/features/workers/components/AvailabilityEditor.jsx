import React, { useState } from 'react';
import { Calendar, Clock, Check, X, Save } from 'lucide-react';
import { useLanguage } from '../../../shared/hooks/useLanguage';

export const AvailabilityEditor = ({ initialAvailability = {}, onSave }) => {
  const { t } = useLanguage();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [schedule, setSchedule] = useState(() => {
    const base = {};
    daysOfWeek.forEach((day) => {
      base[day] = initialAvailability[day] || {
        available: day !== 'Sunday',
        start: '09:00',
        end: '19:00',
      };
    });
    return base;
  });

  const handleToggleDay = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available,
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(schedule);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Weekly Work Schedule & Availability</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Turn days on/off to let customers and cooperative dispatchers know when you are available for assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Schedule</span>
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {daysOfWeek.map((day) => {
          const slot = schedule[day];
          const isAvail = slot.available;

          return (
            <div
              key={day}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3.5 border transition ${
                isAvail
                  ? 'border-indigo-100 bg-indigo-50/30 dark:border-indigo-950 dark:bg-indigo-950/20'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 opacity-70'
              }`}
            >
              {/* Day & Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleDay(day)}
                  className={`flex h-7 w-7 items-center justify-center rounded-xl transition cursor-pointer ${
                    isAvail
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 dark:bg-slate-700'
                  }`}
                  aria-label={`Toggle ${day}`}
                >
                  {isAvail ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4" />}
                </button>
                <span className={`text-sm font-bold ${isAvail ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                  {day}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isAvail ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                  {isAvail ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Time Slots */}
              {isAvail ? (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> From:
                  </span>
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                  <span className="text-slate-400">To:</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">No bookings on this day</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityEditor;
