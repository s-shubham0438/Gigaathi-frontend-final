import React, { useEffect, useState } from 'react';
import { Sparkles, MapPin, RefreshCw, CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import CommunityJobCard from '../../features/community/components/CommunityJobCard';
import bookingApi from '../../features/bookings/api/bookingApi';

export const CommunityJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('AVAILABLE'); // AVAILABLE | MY_JOBS
  const [acceptingId, setAcceptingId] = useState(null);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // In gigSaathi, workers retrieve their assigned or broadcast bookings
      const bookings = await bookingApi.getBookings({ workerId: true });
      const communityJobs = bookings.filter(
        (b) =>
          b.serviceType === 'COMMUNITY' ||
          (b.communityDetails && b.communityDetails.areaType) ||
          b.serviceTitle?.toLowerCase().includes('clean') ||
          b.description?.toLowerCase().includes('community')
      );
      setJobs(communityJobs);
    } catch (err) {
      console.warn('Failed to load worker community jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleAcceptJob = async (jobId) => {
    setAcceptingId(jobId);
    try {
      await bookingApi.updateBookingStatus({
        bookingId: jobId,
        status: 'ACCEPTED',
      });
      await loadJobs();
    } catch (err) {
      alert(err.message || 'Failed to accept community cleaning job');
    } finally {
      setAcceptingId(null);
    }
  };

  const availableJobs = jobs.filter((j) => j.status === 'REQUESTED' || j.status === 'PENDING');
  const myAcceptedJobs = jobs.filter((j) => j.status === 'ACCEPTED' || j.status === 'IN_PROGRESS' || j.status === 'COMPLETED');

  const displayedJobs = activeTab === 'AVAILABLE' ? availableJobs : myAcceptedJobs;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <Sparkles className="w-4 h-4" /> Civic Sanitation Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Community Cleaning Jobs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Accept local area sanitation tasks, earn fair cooperative wages, and upload ImageKit verification proofs.
          </p>
        </div>

        <button
          type="button"
          onClick={loadJobs}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 transition self-start sm:self-auto"
          title="Refresh Jobs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('AVAILABLE')}
          className={`pb-3 px-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'AVAILABLE'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Available Broadcasts
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold">
            {availableJobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('MY_JOBS')}
          className={`pb-3 px-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'MY_JOBS'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          My Active & Completed Jobs
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold">
            {myAcceptedJobs.length}
          </span>
        </button>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Scanning for nearby civic cleaning opportunities...</p>
        </div>
      ) : displayedJobs.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {activeTab === 'AVAILABLE' ? 'No New Community Broadcasts' : 'No Active Community Jobs'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {activeTab === 'AVAILABLE'
              ? 'All neighbourhood cleaning drives are currently staffed. Check back shortly!'
              : 'You have not claimed any civic sanitation jobs yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedJobs.map((job) => (
            <CommunityJobCard
              key={job.id}
              job={job}
              onAccept={handleAcceptJob}
              isAccepting={acceptingId === job.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityJobsPage;
