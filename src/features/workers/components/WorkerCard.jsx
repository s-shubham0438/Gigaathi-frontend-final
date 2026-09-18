import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  MapPin,
  Briefcase,
} from 'lucide-react';

export const WorkerCard = ({ worker }) => {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">

      <div>

        {/* --------------------------------------------- */}
        {/* PROFILE */}
        {/* --------------------------------------------- */}
        <div className="flex items-start gap-3.5">

          <div className="relative shrink-0">

            <img
              src={worker.avatar}
              alt={worker.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-50 dark:ring-slate-800"
            />

            {worker.isAvailableToday && (
              <span
                className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
                title="Available Now"
              />
            )}

          </div>

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-1.5 flex-wrap">

              <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                {worker.name}
              </h4>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">

                <ShieldCheck className="w-3 h-3" />

                Verified

              </span>

            </div>

            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 capitalize mt-0.5">
              {worker.category} Specialist
            </p>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {worker.location || 'Local Worker'}
            </p>

          </div>

        </div>

        {/* --------------------------------------------- */}
        {/* STATS */}
        {/* --------------------------------------------- */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2.5 text-center dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">

          <div>

            <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-900 dark:text-white">

              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />

              <span>
                {worker.rating > 0
                  ? worker.rating.toFixed(1)
                  : 'New'}
              </span>

            </div>

            <span className="text-[10px] text-slate-400">
              rating
            </span>

          </div>

          <div className="border-x border-slate-200 dark:border-slate-700">

            <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-900 dark:text-white">

              <Briefcase className="w-3.5 h-3.5" />

              <span>
                {worker.experience || 0} yrs
              </span>

            </div>

            <span className="text-[10px] text-slate-400">
              experience
            </span>

          </div>

          <div>

            <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-900 dark:text-white">

              <MapPin className="w-3.5 h-3.5 text-slate-400" />

              <span>
                {worker.location || 'Local'}
              </span>

            </div>

            <span className="text-[10px] text-slate-400">
              location
            </span>

          </div>

        </div>

        {/* --------------------------------------------- */}
        {/* SKILLS */}
        {/* --------------------------------------------- */}
        <div className="mt-3 flex flex-wrap gap-1.5">

          {worker.skills?.length > 0 ? (
            worker.skills
              .slice(0, 4)
              .map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))
          ) : (
            <span className="text-[11px] text-slate-400">
              General {worker.category} services
            </span>
          )}

        </div>

      </div>

      {/* --------------------------------------------- */}
      {/* FOOTER */}
      {/* --------------------------------------------- */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">

        <div>

          <span className="text-[10px] text-slate-400 block font-medium">
            Standard rate
          </span>

          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
            ₹{worker.hourlyRate || 0}/hr
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Link
            to={`/worker-profile/${worker.id}`}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition"
          >
            Profile
          </Link>

          <Link
            to={`/customer/book?workerId=${worker.id}&category=${worker.category}`}
            className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-sm"
          >
            Book Saathi
          </Link>

        </div>

      </div>

    </div>
  );
};

export default WorkerCard;
