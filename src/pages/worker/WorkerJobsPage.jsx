import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Clock3,
  MapPin,
  User,
  Check,
  X,
  Play,
  CheckCheck,
  Camera,
  RefreshCw,
  IndianRupee,
  Phone,
  Inbox,
} from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useWorkerJobs } from '../../features/bookings/hooks/useWorkerJobs';
import StatusBadge from '../../shared/components/ui/StatusBadge';

export const WorkerJobsPage = () => {
  const { user } = useAuth();

  // IMPORTANT:
  // Backend bookings use the professional's User _id.
  // Do NOT use user.workerId or the old mock "wrk-1".
  const workerId = user?.id;

  const {
    allJobs,
    pendingRequests,
    upcomingJobs,
    activeJobs,
    completedJobs,
    acceptJob,
    declineJob,
    startJob,
    completeJob,
    reloadJobs,
    isLoading,
  } = useWorkerJobs(workerId, true);

  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = [
    {
      id: 'ALL',
      label: 'All Jobs',
      count: allJobs.length,
      icon: Briefcase,
    },
    {
      id: 'REQUESTED',
      label: 'New Requests',
      count: pendingRequests.length,
      icon: Inbox,
    },
    {
      id: 'ACCEPTED',
      label: 'Upcoming',
      count: upcomingJobs.length,
      icon: Calendar,
    },
    {
      id: 'IN_PROGRESS',
      label: 'In Progress',
      count: activeJobs.length,
      icon: Clock3,
    },
    {
      id: 'COMPLETED',
      label: 'Completed',
      count: completedJobs.length,
      icon: CheckCheck,
    },
  ];

  const filteredJobs = allJobs.filter((job) => {
    if (activeTab === 'ALL') return true;
    return job.status === activeTab;
  });

  const getTabColors = (tabId, active) => {
    if (!active) {
      return 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800';
    }

    switch (tabId) {
      case 'REQUESTED':
        return 'bg-amber-500 text-white shadow-md shadow-amber-200 dark:shadow-none';
      case 'ACCEPTED':
        return 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none';
      case 'IN_PROGRESS':
        return 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none';
      case 'COMPLETED':
        return 'bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none';
      default:
        return 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900';
    }
  };

  const getStatusAccent = (status) => {
    switch (status) {
      case 'REQUESTED':
        return 'bg-amber-400';
      case 'ACCEPTED':
        return 'bg-indigo-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'COMPLETED':
        return 'bg-emerald-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-slate-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'REQUESTED':
        return 'New Request';
      case 'ACCEPTED':
        return 'Upcoming';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (!workerId) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto flex max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-900">
              <User className="h-7 w-7 text-red-500" />
            </div>

            <h2 className="mt-4 text-lg font-black text-red-800 dark:text-red-300">
              Worker account not found
            </h2>

            <p className="mt-2 text-sm text-red-700/80 dark:text-red-300/70">
              Please log in again to access your jobs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur">
                <Briefcase className="h-3.5 w-3.5" />
                Worker Jobs
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                My Jobs & Service Requests
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-indigo-100">
                Manage customer requests, appointments and active services
                from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={reloadJobs}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-black backdrop-blur transition-all duration-200 hover:bg-white/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              {isLoading ? 'Refreshing...' : 'Refresh Jobs'}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Total
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                  {allJobs.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-amber-500/20 dark:from-amber-500/10 dark:to-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Requests
                </p>
                <p className="mt-1 text-2xl font-black text-amber-700 dark:text-amber-300">
                  {pendingRequests.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <Inbox className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-indigo-500/20 dark:from-indigo-500/10 dark:to-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Upcoming
                </p>
                <p className="mt-1 text-2xl font-black text-indigo-700 dark:text-indigo-300">
                  {upcomingJobs.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-emerald-500/20 dark:from-emerald-500/10 dark:to-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Completed
                </p>
                <p className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  {completedJobs.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CheckCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 ${getTabColors(
                    tab.id,
                    isActive
                  )}`}
                >
                  <Icon className="h-3.5 w-3.5" />

                  <span>{tab.label}</span>

                  <span
                    className={`min-w-[20px] rounded-full px-1.5 py-0.5 text-[9px] font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Tab Heading */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {filteredJobs.length === 0
                ? 'Nothing to show here right now.'
                : `${filteredJobs.length} ${
                    filteredJobs.length === 1 ? 'job' : 'jobs'
                  } found`}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 ? (
          <div className="overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              {activeTab === 'REQUESTED' ? (
                <Inbox className="h-8 w-8 text-amber-500" />
              ) : activeTab === 'ACCEPTED' ? (
                <Calendar className="h-8 w-8 text-indigo-500" />
              ) : activeTab === 'IN_PROGRESS' ? (
                <Clock3 className="h-8 w-8 text-blue-500" />
              ) : activeTab === 'COMPLETED' ? (
                <CheckCheck className="h-8 w-8 text-emerald-500" />
              ) : (
                <Briefcase className="h-8 w-8 text-slate-400" />
              )}
            </div>

            <h3 className="mt-5 text-base font-black text-slate-800 dark:text-slate-200">
              {activeTab === 'REQUESTED'
                ? 'No new requests'
                : activeTab === 'ACCEPTED'
                ? 'No upcoming jobs'
                : activeTab === 'IN_PROGRESS'
                ? 'No active jobs'
                : activeTab === 'COMPLETED'
                ? 'No completed jobs yet'
                : 'No jobs found'}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
              {activeTab === 'REQUESTED'
                ? 'New customer service requests will appear here when they are assigned to you.'
                : activeTab === 'ACCEPTED'
                ? 'Jobs you accept will appear here as upcoming appointments.'
                : activeTab === 'IN_PROGRESS'
                ? 'When you start an accepted job, it will move here.'
                : activeTab === 'COMPLETED'
                ? 'Your completed services will be shown here.'
                : 'Once a customer books your service, the job will appear here automatically.'}
            </p>
          </div>
        ) : (
          /* Jobs */
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Status Accent */}
                <div
                  className={`absolute left-0 top-0 h-full w-1.5 ${getStatusAccent(
                    job.status
                  )}`}
                />

                <div className="p-5 pl-6 sm:p-6 sm:pl-7">
                  {/* Top Row */}
                  <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                            job.status === 'REQUESTED'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                              : job.status === 'ACCEPTED'
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                              : job.status === 'IN_PROGRESS'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                              : job.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {getStatusLabel(job.status)}
                        </span>

                        {job.category && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                            {job.category}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
                        {job.serviceTitle || 'Service Request'}
                      </h3>

                      <p className="mt-1 text-[10px] font-medium text-slate-400">
                        Booking ID: {job.id}
                      </p>
                    </div>

                    {/* Earnings */}
                    <div className="flex w-fit items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 dark:bg-emerald-500/10">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <IndianRupee className="h-3.5 w-3.5" />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                          Earning
                        </p>

                        <p className="text-base font-black text-emerald-700 dark:text-emerald-300">
                          ₹{job.price || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
                    {/* Customer + Service */}
                    <div className="space-y-4 lg:col-span-8">
                      {/* Customer */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          <User className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                            Customer
                          </p>

                          <p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {job.customerName || 'Customer'}
                          </p>

                          {job.customerPhone && (
                            <a
                              href={`tel:${job.customerPhone}`}
                              className="mt-0.5 flex w-fit items-center gap-1 text-xs font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400"
                            >
                              <Phone className="h-3 w-3" />
                              {job.customerPhone}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />

                            <div className="min-w-0">
                              <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                                Service Address
                              </p>

                              <p className="mt-1 text-xs font-semibold leading-5 text-slate-700 dark:text-slate-200">
                                {job.customerAddress || 'Address not provided'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                          <div className="flex items-start gap-2">
                            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

                            <div>
                              <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                                Schedule
                              </p>

                              <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {job.date || 'Not specified'}
                              </p>

                              {job.timeSlot && (
                                <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                  {job.timeSlot}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Note */}
                      {job.requirementDescription && (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
                          <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                            Customer Requirement
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                            {job.requirementDescription}
                          </p>
                        </div>
                      )}

                      {/* Photo */}
                      {job.photos && job.photos.length > 0 && (
                        <div>
                          <p className="mb-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide text-slate-400">
                            <Camera className="h-3.5 w-3.5" />
                            Customer Photo
                          </p>

                          <div className="flex gap-2">
                            {job.photos.slice(0, 3).map((photo, index) => (
                              <img
                                key={`${photo}-${index}`}
                                src={photo}
                                alt="Customer service requirement"
                                className="h-16 w-16 rounded-xl border border-slate-200 object-cover transition-transform duration-200 hover:scale-105 dark:border-slate-700"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                      {job.status === 'REQUESTED' && (
                        <>
                          <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
                            <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                              New customer request
                            </p>

                            <p className="mt-0.5 text-[10px] leading-4 text-amber-700/70 dark:text-amber-300/70">
                              Accept this job to add it to your upcoming
                              appointments.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => declineJob(job.id)}
                              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-red-500/10"
                            >
                              <X className="h-3.5 w-3.5" />
                              Decline
                            </button>

                            <button
                              type="button"
                              onClick={() => acceptJob(job.id)}
                              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Accept
                            </button>
                          </div>
                        </>
                      )}

                      {job.status === 'ACCEPTED' && (
                        <>
                          <div className="rounded-xl bg-indigo-50 p-3 dark:bg-indigo-500/10">
                            <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                              Job accepted
                            </p>

                            <p className="mt-0.5 text-[10px] leading-4 text-indigo-700/70 dark:text-indigo-300/70">
                              Start the job when you arrive at the customer's
                              location.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => startJob(job.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95"
                          >
                            <Play className="h-4 w-4 fill-current" />
                            Start Job
                          </button>
                        </>
                      )}

                      {job.status === 'IN_PROGRESS' && (
                        <>
                          <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-500/10">
                            <p className="text-xs font-bold text-blue-800 dark:text-blue-300">
                              Service in progress
                            </p>

                            <p className="mt-0.5 text-[10px] leading-4 text-blue-700/70 dark:text-blue-300/70">
                              Mark the service as completed once the work is
                              finished.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => completeJob(job.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95"
                          >
                            <CheckCheck className="h-4 w-4" />
                            Complete Service
                          </button>
                        </>
                      )}

                      {job.status === 'COMPLETED' && (
                        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                              <CheckCheck className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-xs font-black">
                                Service Completed
                              </p>

                              <p className="text-[10px] text-emerald-700/70 dark:text-emerald-300/70">
                                Payment: {job.paymentStatus || 'PENDING'}
                              </p>
                            </div>
                          </div>

                          {job.review && (
                            <div className="mt-3 border-t border-emerald-200 pt-3 dark:border-emerald-500/20">
                              <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                                ⭐ Customer rating: {job.review.rating}/5
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {job.status === 'CANCELLED' && (
                        <div className="rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
                          <p className="text-xs font-black text-red-700 dark:text-red-300">
                            Job Cancelled
                          </p>

                          <p className="mt-1 text-[10px] text-red-600/70 dark:text-red-300/70">
                            This service request is no longer active.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerJobsPage;
