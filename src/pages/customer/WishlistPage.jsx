import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlistService } from '../../features/wishlist/state/wishlistSlice';
import ServiceCard from '../../features/services/components/ServiceCard';

export const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistServices = useSelector((state) => state.wishlist.items) || [];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Saved Services & Saathis
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Your saved household repairs and favorite cooperative professionals.
        </p>
      </div>

      {wishlistServices.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800 space-y-3">
          <Heart className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            Your wishlist is empty.
          </p>
          <p className="text-xs text-slate-400">
            Save services while browsing to book them quickly whenever repairs are needed.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
