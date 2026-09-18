import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, User, Phone, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import CleaningTimeline from '../../features/community/components/CleaningTimeline';
import CleaningProof from '../../features/community/components/CleaningProof';
import CommunityFeedback from '../../features/community/components/CommunityFeedback';
import StatusBadge from '../../shared/components/ui/StatusBadge';
import bookingApi from '../../features/bookings/api/bookingApi';
import communityApi from '../../features/community/api/communityApi';

export const CommunityRequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      const data = await bookingApi.getBookingById(id);
      setBooking(data);
    } catch (err) {
      console.error('Failed to load booking details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this community drive request?')) return;
    setActionLoading(true);
    try {
      await bookingApi.cancelBooking(id);
      await fetchDetails();
    } catch (err) {
      alert(err.message || 'Failed to cancel request');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 mt-2">Loading community drive details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <p className="text-sm font-bold text-slate-800">Drive request not found or has been removed.</p>
        <button
          onClick={() => navigate('/customer/community/requests')}
          className="text-xs text-indigo-600 font-bold"
        >
          Return to Community Requests
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
    workerName,
    workerPhone,
    photos,
  } = booking;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <button
        type="button"
        onClick={() => navigate('/customer/community/requests')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Drives
      </button>

      {/* Main Header Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {communityDetails?.areaType?.replace(/_/g, ' ') || 'Civic Area'}
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {communityDetails?.cleaningType?.replace(/_/g, ' ') || 'Community Sanitation Drive'}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {address}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block font-semibold">Community Allocation</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{price}</span>
            <span className="block text-[10px] text-slate-400">Direct Worker Compensation</span>
          </div>
        </div>

        {/* Timeline Stepper */}
        <CleaningTimeline currentStatus={status} />

        {/* Quick Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <div>
              <span className="text-[10px] text-slate-400 block">Drive Date</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{date || 'Scheduled'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Clock className="w-4 h-4 text-indigo-500" />
            <div>
              <span className="text-[10px] text-slate-400 block">Time Slot</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{timeSlot || 'Flexible'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl col-span-2 sm:col-span-1">
            <User className="w-4 h-4 text-indigo-500" />
            <div>
              <span className="text-[10px] text-slate-400 block">Assigned Saathi</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{workerName || 'Searching nearby...'}</span>
            </div>
          </div>
        </div>

        {description && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Citizen Instructions:</span>
            {description}
          </div>
        )}
      </div>

      {/* ImageKit Visual Proof Section */}
      <CleaningProof
        bookingId={id}
        existingProofBefore={communityDetails?.proofBefore?.length ? communityDetails.proofBefore : photos}
        existingProofAfter={communityDetails?.proofAfter || []}
        readOnly={true}
      />

      {/* Rating / Review if Completed */}
      {status === 'COMPLETED' && (
        <CommunityFeedback bookingId={id} />
      )}

      {/* Action Buttons */}
      {status === 'REQUESTED' && (
        <div className="flex justify-end">
          <button
            type="button"
            disabled={actionLoading}
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition"
          >
            Cancel Request
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityRequestDetailsPage;
