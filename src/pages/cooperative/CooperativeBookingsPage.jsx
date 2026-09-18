import React, { useState } from 'react';
import { Briefcase, Search, Calendar, MapPin, CheckCircle2, Star, Clock } from 'lucide-react';
import { mockDb } from '../../mocks/mockDb';
import StatusBadge from '../../shared/components/ui/StatusBadge';

export const CooperativeBookingsPage = () => {
  const [bookings, setBookings] = useState(mockDb.bookings);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = bookings.filter((b) => {
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchSearch =
      b.serviceTitle.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.workerName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          All Cooperative Bookings ({bookings.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Audited log of dispatched requests, worker acceptances, and completed household jobs.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer, worker, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table & Responsive Container */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Service & Trade</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Assigned Worker</th>
                <th className="pb-3">Schedule</th>
                <th className="pb-3">Price</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 pr-4 font-mono font-bold text-slate-600 dark:text-slate-400">
                    #{b.id}
                  </td>
                  <td className="py-3.5 pr-4 font-bold text-slate-900 dark:text-white">
                    {b.serviceTitle}
                    <span className="text-[10px] text-indigo-600 block font-normal">{b.category}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{b.customerName}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">{b.customerAddress}</p>
                  </td>
                  <td className="py-3.5 pr-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{b.workerName}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Cooperative Saathi</p>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300 block">{b.date}</span>
                    <span className="text-[10px] text-slate-400">{b.timeSlot}</span>
                  </td>
                  <td className="py-3.5 pr-4 font-black text-slate-900 dark:text-white">
                    ₹{b.price}
                  </td>
                  <td className="py-3.5 text-right">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CooperativeBookingsPage;
