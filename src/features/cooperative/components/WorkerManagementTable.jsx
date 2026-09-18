import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, Search, Filter, Phone, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockDb } from '../../../mocks/mockDb';

export const WorkerManagementTable = () => {
  const [workers, setWorkers] = useState(mockDb.workers);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = workers.filter((w) => {
    const matchSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'all' || w.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleToggleStatus = (id) => {
    const updated = mockDb.toggleWorkerOnlineStatus(id);
    if (updated) {
      setWorkers([...mockDb.workers]);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Cooperative Worker Roster ({workers.length} Registered)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor real-time availability, ratings, and workload balancing across trade unions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
            />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Trades</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrician</option>
            <option value="cleaning">Cleaning</option>
            <option value="carpentry">Carpentry</option>
            <option value="appliance">Appliance</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="mt-5 hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <th className="pb-3">Worker</th>
              <th className="pb-3">Trade & Coop</th>
              <th className="pb-3">Rating</th>
              <th className="pb-3">Jobs</th>
              <th className="pb-3">Workload Index</th>
              <th className="pb-3">Availability</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2.5">
                    <img src={w.avatar} alt={w.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{w.name}</p>
                      <p className="text-[10px] text-slate-400">{w.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 pr-4">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 capitalize block">
                    {w.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{w.cooperativeName}</span>
                </td>
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{w.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">({w.reviewsCount} reviews)</span>
                </td>
                <td className="py-3.5 pr-4 font-bold text-slate-800 dark:text-slate-200">
                  {w.completedJobs} done
                </td>
                <td className="py-3.5 pr-4">
                  <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full ${w.currentWorkloadScore > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${w.currentWorkloadScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{w.currentWorkloadScore}% capacity</span>
                </td>
                <td className="py-3.5 pr-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      w.isAvailableToday
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${w.isAvailableToday ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {w.isAvailableToday ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleToggleStatus(w.id)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition cursor-pointer"
                  >
                    {w.isAvailableToday ? 'Set Offline' : 'Set Online'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Zero horizontal overflow) */}
      <div className="mt-4 md:hidden space-y-3">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={w.avatar} alt={w.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{w.name}</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 capitalize">{w.category}</p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  w.isAvailableToday
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {w.isAvailableToday ? 'Online' : 'Offline'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-white dark:bg-slate-900 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-400 block">Rating</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">⭐ {w.rating}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Jobs Done</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{w.completedJobs}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Workload</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{w.currentWorkloadScore}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400">{w.phone}</span>
              <button
                onClick={() => handleToggleStatus(w.id)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {w.isAvailableToday ? 'Set Offline' : 'Set Online'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerManagementTable;
