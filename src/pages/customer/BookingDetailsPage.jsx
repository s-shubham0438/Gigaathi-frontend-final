import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CreditCard,
  Camera,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useBookings } from '../../features/bookings/hooks/useBookings';
import { useAuth } from '../../features/auth/hooks/useAuth';
import BookingTimeline from '../../features/bookings/components/BookingTimeline';
import StatusBadge from '../../shared/components/ui/StatusBadge';
import StarRating from '../../shared/components/ui/StarRating';

export const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loadBookingById, selectedBooking, isLoading, submitReview, cancelBooking } = useBookings(
    user?.id || 'cust-1'
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      loadBookingById(id);
    }
  }, [id]);

  if (isLoading || !selectedBooking) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center space-y-3">
        <div className="h-9 w-9 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading booking details...</p>
      </div>
    );
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await submitReview({
      bookingId: selectedBooking.id,
      workerId: selectedBooking.workerId,
      rating,
      comment,
      customerName: user?.name || 'Amit Sharma',
      customerAvatar: user?.avatar,
    });
    setReviewSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/customer/bookings')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all bookings</span>
        </button>

        <StatusBadge status={selectedBooking.status} />
      </div>

      {/* Main Details Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Booking Tracking • ID #{selectedBooking.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {selectedBooking.serviceTitle}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cooperative regulated service dispatch
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium block">Total Price</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{selectedBooking.price}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              Payment: {selectedBooking.paymentMethod}
            </span>
          </div>
        </div>

        {/* 4-Stage Timeline Visualizer */}
        <div className="py-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Live Service Tracking Status
          </h3>
          <BookingTimeline timeline={selectedBooking.timeline} currentStatus={selectedBooking.status} />
        </div>

        {/* Assigned Worker Info */}
        <div className="rounded-2xl bg-indigo-50/50 p-4 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={selectedBooking.workerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
              alt={selectedBooking.workerName}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
            />
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
                Assigned Cooperative Saathi
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedBooking.workerName}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cooperative Verified Trade Professional
              </p>
            </div>
          </div>

          <a
            href={`tel:${selectedBooking.workerPhone || '+919822155678'}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-indigo-700 shadow-xs border border-indigo-200 hover:bg-indigo-50 dark:bg-slate-900 dark:border-indigo-800 dark:text-indigo-300"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Worker ({selectedBooking.workerPhone || '+91 98221 55678'})</span>
          </a>
        </div>

        {/* Schedule & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Scheduled Visit Time:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>{selectedBooking.date} at {selectedBooking.timeSlot}</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Service Address:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 leading-snug flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{selectedBooking.customerAddress}</span>
            </p>
          </div>
        </div>

        {/* Attached Damage Photos if any (user comment support) */}
        {selectedBooking.photos && selectedBooking.photos.length > 0 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-indigo-600" />
              Attached Damage Photos for Parts Estimation
            </span>
            <div className="flex flex-wrap gap-3">
              {selectedBooking.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Broken item photo ${i + 1}`}
                  className="h-20 w-20 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
              ))}
            </div>
          </div>
        )}

        {/* Cancel Button if pending */}
        {(selectedBooking.status === 'REQUESTED' || selectedBooking.status === 'ACCEPTED') && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => cancelBooking(selectedBooking.id)}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
            >
              Cancel Booking Request
            </button>
          </div>
        )}
      </div>

      {/* Review Section if Completed */}
      {selectedBooking.status === 'COMPLETED' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Customer Feedback & Rating
          </h3>

          {selectedBooking.review || reviewSubmitted ? (
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Review submitted: ⭐ {selectedBooking.review?.rating || rating}/5 stars
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  "{selectedBooking.review?.comment || comment}"
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Rate your service with {selectedBooking.workerName}:
                </span>
                <StarRating rating={rating} interactive={true} onRate={setRating} size="md" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Review comments:
                </label>
                <textarea
                  rows={2}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Was the work done properly? How was the behavior and pricing?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
