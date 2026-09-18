import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, Play, FileCheck } from 'lucide-react';
import CleaningTimeline from '../../features/community/components/CleaningTimeline';
import CleaningProof from '../../features/community/components/CleaningProof';
import StatusBadge from '../../shared/components/ui/StatusBadge';
import bookingApi from '../../features/bookings/api/bookingApi';
import communityApi from '../../features/community/api/communityApi';

export const CommunityJobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchJob = async () => {
    try {
      const data = await bookingApi.getBookingById(id);
      setJob(data);
    } catch (err) {
      console.error('Failed to load job details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    setStatusUpdating(true);
    try {
      await bookingApi.updateBookingStatus({
        bookingId: id,
        status: newStatus,
      });
      await fetchJob();
    } catch (err) {
      alert(err.message || 'Failed to update job status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSaveProof = async (proofData) => {
    try {
      await communityApi.submitCleaningProof(id, proofData);
      await fetchJob();
    } catch (err) {
      console.error('Failed to save proof:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 mt-2">Loading civic sanitation assignment...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <p className="text-sm font-bold text-slate-800">Job assignment not found.</p>
        <button
          onClick={() => navigate('/worker/community/jobs')}
          className="text-xs text-emerald-600 font-bold"
        >
          Return to Community Jobs
        </button>
      </div>
    );
  }

  const {
    address,
    date,
    timeSlot,
    price,
    status,
    description,
    communityDetails,
    customerName,
    customerPhone,
    photos,
  } = job;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <button
        type="button"
        onClick={() => navigate('/worker/community/jobs')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Community Jobs
      </button>

      {/* Main Header Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {communityDetails?.areaType?.replace(/_/g, ' ') || 'Civic Cleaning'}
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {communityDetails?.cleaningType?.replace(/_/g, ' ') || 'Civic Sanitation Duty'}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {address}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block font-semibold">Your Guaranteed Earning</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{price}</span>
            <span className="block text-[10px] text-slate-400">Direct Worker Payout</span>
          </div>
        </div>

        {/* Timeline Stepper */}
        <CleaningTimeline currentStatus={status} />

        {/* Worker Action Control Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {(status === 'REQUESTED' || status === 'PENDING') && (
            <button
              type="button"
              disabled={statusUpdating}
              onClick={() => handleUpdateStatus('ACCEPTED')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" /> Accept Assignment
            </button>
          )}

          {status === 'ACCEPTED' && (
            <button
              type="button"
              disabled={statusUpdating}
              onClick={() => handleUpdateStatus('IN_PROGRESS')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition disabled:opacity-50"
            >
              <Play className="w-4 h-4" /> Start Cleaning Task
            </button>
          )}

          {status === 'IN_PROGRESS' && (
            <button
              type="button"
              disabled={statusUpdating}
              onClick={() => handleUpdateStatus('COMPLETED')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition disabled:opacity-50"
            >
              <FileCheck className="w-4 h-4" /> Complete Task & Request Payout
            </button>
          )}

          {customerPhone && (
            <a
              href={`tel:${customerPhone}`}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-500" /> Contact Citizen ({customerName})
            </a>
          )}
        </div>

        {/* Instructions */}
        {description && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Citizen Notes & Spot Location:</span>
            {description}
          </div>
        )}
      </div>

      {/* ImageKit Visual Proof Management (Worker can upload before/after photos) */}
      <CleaningProof
        bookingId={id}
        existingProofBefore={communityDetails?.proofBefore?.length ? communityDetails.proofBefore : photos}
        existingProofAfter={communityDetails?.proofAfter || []}
        isWorker={true}
        readOnly={status === 'COMPLETED'}
        onSaveProof={handleSaveProof}
      />
    </div>
  );
};

export default CommunityJobDetailsPage;
