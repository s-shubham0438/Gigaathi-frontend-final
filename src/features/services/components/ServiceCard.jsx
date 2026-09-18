import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlistService } from '../../wishlist/state/wishlistSlice';
import { showToast } from '../../../shared/state/uiSlice';
import { useLanguage } from '../../../shared/hooks/useLanguage';

export const ServiceCard = ({ service, worker }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, isHindi } = useLanguage();
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];
  const isWishlisted = wishlistItems.some((s) => s.id === service.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlistService(service.id));
    dispatch(
      showToast({
        message: isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist',
        type: 'info',
      })
    );
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/customer/book/${service.id}${worker ? `?workerId=${worker.id}` : ''}`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Service Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-md transition hover:scale-110 hover:bg-white dark:bg-slate-900/90 dark:text-slate-200 cursor-pointer"
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'
            }`}
          />
        </button>

        {/* Emergency Badge */}
        {service.isEmergencyAvailable && (
          <span className="absolute bottom-3 left-3 rounded-full bg-rose-600/90 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white uppercase shadow-xs">
            Emergency 15m
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {service.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{service.rating}</span>
            <span className="text-[11px] font-normal text-slate-400">({service.reviewsCount})</span>
          </div>
        </div>

        <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
          {isHindi && service.hindiTitle ? service.hindiTitle : service.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Assigned/Representative Worker */}
        {worker && (
          <div className="mt-3.5 flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {worker.name}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Cooperative Saathi
                </span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-slate-400" /> {worker.distanceKm} km
            </span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
              {t('startingFrom')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                ₹{service.price}
              </span>
              <span className="text-[11px] text-slate-400">/{service.unit || 'visit'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/service/${service.id}`}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
            >
              Details
            </Link>
            <button
              onClick={handleBookClick}
              className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer"
            >
              {t('bookNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
