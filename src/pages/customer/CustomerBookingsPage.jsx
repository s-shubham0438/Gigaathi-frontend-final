import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, ArrowRight, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useBookings } from '../../features/bookings/hooks/useBookings';
import { useLanguage } from '../../shared/hooks/useLanguage';
import StatusBadge from '../../shared/components/ui/StatusBadge';
import StarRating from '../../shared/components/ui/StarRating';

export const CustomerBookingsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { bookings, activeTab, changeTab, cancelBooking, submitReview } = useBookings(
    user?.id || 'cust-1',
    true
  );

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const tabs = [
    { id: 'ALL', label: 'All Bookings' },
    { id: 'UPCOMING', label: 'Upcoming' },
    { id: 'ACTIVE', label: 'In Progress' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const handleOpenReview = (booking) => {
    setReviewBooking(booking);
    setReviewRating(5);
    setReviewComment('');
    setReviewModalOpen(true);
  };

  const handleSubmitReviewModal = async (e) => {
    e.preventDefault();
    if (!reviewBooking) return;
    await submitReview({
      bookingId: reviewBooking.id,
      workerId: reviewBooking.workerId,
      rating: reviewRating,
      comment: reviewComment || 'Great service by our cooperative saathi!',
      customerName: user?.name || 'Amit Sharma',
      customerAvatar: user?.avatar,
    });
    setReviewModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          My Service Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track upcoming visits, view past service records, and rate your cooperative professionals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => changeTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800 space-y-3">
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            No bookings found in this category.
          </p>
          <p className="text-xs text-slate-400">
            Book trusted local workers with guaranteed rates and no surge pricing.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
          >
            Explore Services
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">
                    ID: #{booking.id}
                  </span>
                  <StatusBadge status={booking.status} />
                </div>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Requested on {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Service Details */}
                <div className="md:col-span-6 space-y-1">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
                    {booking.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {booking.serviceTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{booking.customerAddress}</span>
                  </p>
                </div>

                {/* Assigned Worker & Schedule */}
                <div className="md:col-span-3 space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={booking.workerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                      alt={booking.workerName}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{booking.workerName}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{booking.date} at {booking.timeSlot}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="md:col-span-3 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    ₹{booking.price}
                  </span>

                  <div className="flex items-center gap-2">
                    {booking.status === 'REQUESTED' || booking.status === 'ACCEPTED' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => cancelBooking(booking.id)}
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-950/40 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <Link
                          to={`/customer/bookings/${booking.id}`}
                          className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
                        >
                          Track
                        </Link>
                      </>
                    ) : booking.status === 'IN_PROGRESS' ? (
                      <Link
                        to={`/customer/bookings/${booking.id}`}
                        className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition flex items-center gap-1"
                      >
                        <span>Live Tracking</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : booking.status === 'COMPLETED' ? (
                      booking.review ? (
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Rated {booking.review.rating}/5</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenReview(booking)}
                          className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition cursor-pointer shadow-xs flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 fill-white" />
                          <span>Rate & Review</span>
                        </button>
                      )
                    ) : (
                      <span className="text-xs text-slate-400 italic">No actions</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rate & Review Modal */}
      {reviewModalOpen && reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Rate Service & Worker
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReviewModal} className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500">Service: {reviewBooking.serviceTitle}</p>
                <p className="text-xs font-semibold text-slate-500">Worker: {reviewBooking.workerName}</p>
              </div>

              <div className="text-center py-2 space-y-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  How was your experience?
                </span>
                <StarRating
                  rating={reviewRating}
                  interactive={true}
                  onRate={setReviewRating}
                  size="lg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Write your review
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details about punctuality, quality of repair, and pricing..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
              >
                Submit Review to Cooperative
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerBookingsPage;
