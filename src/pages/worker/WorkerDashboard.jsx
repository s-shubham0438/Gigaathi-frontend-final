import React from 'react';
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  Phone,
  RefreshCw,
  TrendingUp,
  UserRound,
  Wallet,
  X,
  Play,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useWorkerJobs } from '../../features/bookings/hooks/useWorkerJobs';

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
  bgClass,
  description,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl transition-all duration-300 group-hover:scale-150 ${bgClass}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {title}
            </p>

            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
              {value}
            </p>

            {description && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
        <Icon className="h-7 w-7 text-slate-400" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-slate-200">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};

const JobInfo = ({ job }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/70">
        <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Customer
          </p>

          <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
            {job.customerName || 'Customer'}
          </p>
        </div>
      </div>

      {job.customerPhone && (
        <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/70">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Phone
            </p>

            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
              {job.customerPhone}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/70">
        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Date
          </p>

          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {job.date || 'Not specified'}
          </p>
        </div>
      </div>

      {job.timeSlot && (
        <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/70">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Time
            </p>

            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {job.timeSlot}
            </p>
          </div>
        </div>
      )}

      {job.customerAddress && (
        <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/70 sm:col-span-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Service Address
            </p>

            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {job.customerAddress}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const JobCard = ({
  job,
  type,
  onAccept,
  onDecline,
  onStart,
  onComplete,
  isRaised = false,
}) => {
  const isRequest = type === 'request';
  const isUpcoming = type === 'upcoming';
  const isActive = type === 'active';
  const isCompleted = type === 'completed';

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`h-1 ${
          isRequest
            ? isRaised
              ? 'bg-violet-500'
              : 'bg-amber-400'
            : isUpcoming
            ? 'bg-indigo-500'
            : isActive
            ? 'bg-blue-500'
            : 'bg-emerald-500'
        }`}
      />

      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                  isRequest
                    ? isRaised
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    : isUpcoming
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                    : isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                }`}
              >
                {isRequest
                  ? isRaised
                    ? 'Raised Request'
                    : 'New Request'
                  : isUpcoming
                  ? 'Upcoming'
                  : isActive
                  ? 'In Progress'
                  : 'Completed'}
              </span>

              {job.category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {job.category}
                </span>
              )}
            </div>

            <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
              {job.serviceTitle || 'Service Request'}
            </h3>

            {isRaised && (
              <p className="mt-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                Category-based request — first worker to accept gets the job.
              </p>
            )}
          </div>

          <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-right dark:bg-emerald-500/10">
            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Earning
            </p>

            <p className="text-lg font-black text-emerald-700 dark:text-emerald-300">
              ₹{job.price || 0}
            </p>
          </div>
        </div>

        <JobInfo job={job} />

        {job.requirementDescription && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
              Customer Requirement
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
              {job.requirementDescription}
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <span className="text-[10px] font-medium text-slate-400">
            Booking ID: {job.id}
          </span>

          {isRequest && (
            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                onClick={() => onDecline(job.id)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-red-500/10"
              >
                <X className="h-3.5 w-3.5" />
                Decline
              </button>

              <button
                type="button"
                onClick={() => onAccept(job.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 ${
                  isRaised
                    ? 'bg-violet-600 hover:bg-violet-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Accept
              </button>
            </div>
          )}

          {isUpcoming && (
            <button
              type="button"
              onClick={() => onStart(job.id)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95 sm:w-auto"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Start Job
            </button>
          )}

          {isActive && (
            <button
              type="button"
              onClick={() => onComplete(job.id)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-95 sm:w-auto"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Completed
            </button>
          )}

          {isCompleted && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Service Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorkerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const workerId = user?.id;

  const {
    currentWorker,
    pendingRequests,
    normalRequests,
    raisedRequests,
    upcomingJobs,
    activeJobs,
    completedJobs,
    todayEarnings,
    welfareBalance,
    isOnline,
    isLoading,
    acceptJob,
    declineJob,
    startJob,
    completeJob,
    reloadJobs,
  } = useWorkerJobs(workerId, true);

  if (!workerId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <p className="font-bold text-red-700 dark:text-red-400">
            Worker information not available.
          </p>

          <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/70">
            Please login again to access your dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur">
                  Worker Dashboard
                </span>

                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black ${
                    isOnline
                      ? 'bg-emerald-400/20 text-emerald-100'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isOnline ? 'bg-emerald-300' : 'bg-slate-300'
                    }`}
                  />

                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Welcome, {user?.name || currentWorker?.name || 'Worker'} 👋
              </h1>

              <p className="mt-1 text-sm text-indigo-100">
                Manage your service requests, appointments and earnings.
              </p>
            </div>

            <button
              type="button"
              onClick={reloadJobs}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-black backdrop-blur transition-all duration-200 hover:bg-white/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isLoading ? 'animate-spin' : ''
                }`}
              />

              {isLoading ? 'Refreshing...' : 'Refresh Jobs'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="New Requests"
            value={pendingRequests.length}
            icon={Briefcase}
            iconClass="bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
            bgClass="bg-amber-400"
            description={
              pendingRequests.length > 0
                ? 'Action required'
                : 'No pending requests'
            }
          />

          <StatCard
            title="Upcoming"
            value={upcomingJobs.length}
            icon={CalendarDays}
            iconClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
            bgClass="bg-indigo-400"
            description="Accepted appointments"
          />

          <StatCard
            title="In Progress"
            value={activeJobs.length}
            icon={Clock3}
            iconClass="bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            bgClass="bg-blue-400"
            description="Currently active"
          />

          <StatCard
            title="Completed"
            value={completedJobs.length}
            icon={CheckCircle2}
            iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            bgClass="bg-emerald-400"
            description="Jobs completed"
          />
        </div>

        {/* Earnings */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Today's Earnings
                </p>

                <p className="mt-2 text-3xl font-black">
                  ₹{todayEarnings || 0}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-100">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Based on completed services
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <IndianRupee className="h-7 w-7" />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-100">
                  Welfare Balance
                </p>

                <p className="mt-2 text-3xl font-black">
                  ₹{welfareBalance || 0}
                </p>

                <p className="mt-2 text-xs text-violet-100">
                  Your worker welfare fund
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <Wallet className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Normal Requests */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Normal Requests
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Customers who directly selected you.
              </p>
            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              {normalRequests.length}{' '}
              {normalRequests.length === 1 ? 'REQUEST' : 'REQUESTS'}
            </span>
          </div>

          {normalRequests.length === 0 ? (
            <EmptyState
              icon={UserRound}
              title="No normal requests"
              description="Direct bookings from customers will appear here."
            />
          ) : (
            <div className="space-y-4">
              {normalRequests.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  type="request"
                  isRaised={false}
                  onAccept={acceptJob}
                  onDecline={declineJob}
                  onStart={startJob}
                  onComplete={completeJob}
                />
              ))}
            </div>
          )}
        </section>

        {/* Raised Requests */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Raised Requests
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Category-based requests raised by customers.
              </p>
            </div>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-black text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
              {raisedRequests.length}{' '}
              {raisedRequests.length === 1 ? 'REQUEST' : 'REQUESTS'}
            </span>
          </div>

          {raisedRequests.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No raised requests"
              description="Requests raised for your service category will appear here."
            />
          ) : (
            <div className="space-y-4">
              {raisedRequests.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  type="request"
                  isRaised={true}
                  onAccept={acceptJob}
                  onDecline={declineJob}
                  onStart={startJob}
                  onComplete={completeJob}
                />
              ))}
            </div>
          )}
        </section>

        {/* Upcoming + Active */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Upcoming Jobs
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Accepted appointments waiting to start.
                </p>
              </div>

              <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-black text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                {upcomingJobs.length}
              </span>
            </div>

            {upcomingJobs.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title="No upcoming jobs"
                description="Accepted customer appointments will appear here."
              />
            ) : (
              <div className="space-y-4">
                {upcomingJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    type="upcoming"
                    onAccept={acceptJob}
                    onDecline={declineJob}
                    onStart={startJob}
                    onComplete={completeJob}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Active Jobs
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Services currently being handled.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                {activeJobs.length}
              </span>
            </div>

            {activeJobs.length === 0 ? (
              <EmptyState
                icon={Clock3}
                title="No active jobs"
                description="Jobs that you start will appear here until you mark the service as completed."
              />
            ) : (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    type="active"
                    onAccept={acceptJob}
                    onDecline={declineJob}
                    onStart={startJob}
                    onComplete={completeJob}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Completed */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Recently Completed
              </h2>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Your completed service history.
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              {completedJobs.length}
            </span>
          </div>

          {completedJobs.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="No completed jobs yet"
              description="Once you complete a service, it will appear here."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {completedJobs.slice(0, 6).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  type="completed"
                  onAccept={acceptJob}
                  onDecline={declineJob}
                  onStart={startJob}
                  onComplete={completeJob}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default WorkerDashboard;