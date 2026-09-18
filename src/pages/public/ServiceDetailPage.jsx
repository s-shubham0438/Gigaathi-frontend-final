import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Clock,
  CheckCircle2,
  MapPin,
  Heart,
  ArrowLeft,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useServices } from '../../features/services/hooks/useServices';
import { useWorkers } from '../../features/workers/hooks/useWorkers';
import { useLanguage } from '../../shared/hooks/useLanguage';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlistService } from '../../features/wishlist/state/wishlistSlice';
import { showToast } from '../../shared/state/uiSlice';

export const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, isHindi } = useLanguage();
  const { loadServiceById, selectedService, isLoading, reloadServices } = useServices(true);
  const { workers } = useWorkers(true);

  const wishlistItems = useSelector((state) => state.wishlist.items) || [];
  const isWishlisted = wishlistItems.some((s) => s.id === id);

  useEffect(() => {
    if (id) {
      loadServiceById(id);
    }
  }, [id]);

  if (isLoading || !selectedService) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center space-y-4">
        <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Loading service details...</p>
      </div>
    );
  }

  const matchingWorker = workers.find((w) => w.category === selectedService.categoryId) || workers[0];

  const handleWishlistToggle = () => {
    dispatch(toggleWishlistService(selectedService.id));
    dispatch(
      showToast({
        message: isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist',
        type: 'info',
      })
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to services</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative overflow-hidden rounded-3xl aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800 shadow-md">
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="h-full w-full object-cover"
            />
            {selectedService.isEmergencyAvailable && (
              <span className="absolute top-4 left-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-md">
                15m Emergency Fast Dispatch
              </span>
            )}
            <button
              type="button"
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-md hover:scale-110 transition cursor-pointer dark:bg-slate-900/90 dark:text-slate-200"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'
                }`}
              />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {selectedService.category}
              </span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{selectedService.rating}</span>
                <span className="text-xs font-normal text-slate-400">({selectedService.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isHindi && selectedService.hindiTitle ? selectedService.hindiTitle : selectedService.title}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedService.description}
            </p>
          </div>

          {/* Service Inclusions */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              What's Included in this Service
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedService.inclusions?.map((inc, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{inc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Card & Booking CTA */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <div>
              <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">
                Transparent Rate Card
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  ₹{selectedService.price}
                </span>
                <span className="text-xs text-slate-500">/{selectedService.unit || 'visit'}</span>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Cooperative Rate (Zero Aggregator Markup)
              </p>
            </div>

            {/* Assigned Representative Saathi */}
            {matchingWorker && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-950 dark:bg-indigo-950/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                  Nearest Available Saathi
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={matchingWorker.avatar}
                    alt={matchingWorker.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {matchingWorker.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ⭐ {matchingWorker.rating} ({matchingWorker.completedJobs} jobs done) • {matchingWorker.distanceKm} km away
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <Link
              to={`/customer/book/${selectedService.id}?workerId=${matchingWorker?.id || ''}`}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3.5 text-sm font-black text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Proceed to Book Service</span>
            </Link>

            <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Estimated duration: <strong>{selectedService.duration || '45 mins'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cooperative 30-day rework guarantee included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
