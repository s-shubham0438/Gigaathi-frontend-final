import React from "react";
import { UserRoundCheck, Users } from "lucide-react";

const BookingModeToggle = ({ mode, onChange }) => {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="grid grid-cols-2 gap-2">
        {/* Individual Booking */}
        <button
          type="button"
          onClick={() => onChange("individual")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
            mode === "individual"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          <UserRoundCheck className="h-5 w-5" />

          <span>
            Choose a Worker
          </span>
        </button>

        {/* Raise Request */}
        <button
          type="button"
          onClick={() => onChange("broadcast")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
            mode === "broadcast"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          <Users className="h-5 w-5" />

          <span>
            Raise a Request
          </span>
        </button>
      </div>

      {/* Explanation */}
      <div className="mt-3 rounded-xl bg-indigo-50 px-4 py-3 text-center dark:bg-indigo-950/40">
        {mode === "broadcast" ? (
          <>
            <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Request Multiple Workers
            </p>

            <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
              Your request will be sent to workers
              registered in this service category.
              The first worker to accept gets the job.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Book a Specific Worker
            </p>

            <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
              Choose a specific worker and send
              the booking request directly to them.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModeToggle;