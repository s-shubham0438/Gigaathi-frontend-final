import React, { useState } from 'react';
import { User, Phone, MapPin, ShieldCheck, Award, Briefcase, Star, Clock, Check, LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useWorkerJobs } from '../../features/bookings/hooks/useWorkerJobs';
import { useDispatch } from 'react-redux';
import { showToast } from '../../shared/state/uiSlice';

export const WorkerProfilePage = () => {
  const { user, logout } = useAuth();
  const workerId = user?.workerId || 'wrk-1';
  const { currentWorker } = useWorkerJobs(workerId, true);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || currentWorker?.name || 'Rahul Verma');
  const [phone, setPhone] = useState(user?.phone || currentWorker?.phone || '+91 98221 55678');
  const [hourlyRate, setHourlyRate] = useState(currentWorker?.hourlyRate || 350);
  const [about, setAbout] = useState(
    currentWorker?.about ||
      'Dedicated plumber with 7 years of field experience in Kothrud and Deccan. Member of Pune Workers Cooperative since 2022.'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    dispatch(showToast({ message: 'Worker profile and rate card updated!', type: 'success' }));
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Worker Saathi Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          View your verified trade credentials, cooperative membership status, and rate card.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={currentWorker?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
            alt="Worker"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover ring-4 ring-indigo-50 dark:ring-slate-800 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {currentWorker?.name || name}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Saathi
              </span>
            </div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold capitalize mt-0.5">
              {currentWorker?.category || 'Plumbing'} Specialist • {currentWorker?.cooperativeName || 'Pune Workers Cooperative'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span>⭐ {currentWorker?.rating || 4.88} rating</span>
              <span>•</span>
              <span>{currentWorker?.completedJobs || 386} jobs completed</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Standard Hourly Rate (₹)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full sm:w-48 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
            />
            <p className="text-[10px] text-slate-400 mt-1">Regulated by cooperative baseline ceiling.</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              About & Experience Bio
            </label>
            <textarea
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-950/40 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
            >
              {saved && <Check className="w-4 h-4" />}
              <span>{saved ? 'Saved!' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
