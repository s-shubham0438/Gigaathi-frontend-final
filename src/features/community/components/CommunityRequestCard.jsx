import React from 'react';
import { MapPin, Calendar, Clock, Sparkles, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../../shared/components/ui/StatusBadge';

export const CommunityRequestCard = ({ request }) => {
  const {
    id,
    address,
    date,
    timeSlot,
    price,
    status,
    description,
    communityDetails,
    workerName,
    photos,
  } = request;

  const areaTypeLabel = communityDetails?.areaType?.replace(/_/g, ' ') || 'Community Area';
  const cleaningTypeLabel = communityDetails?.cleaningType?.replace(/_/g, ' ') || 'General Clean';
  const coverImage = photos?.[0] || communityDetails?.proofBefore?.[0] || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80';

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900 transition flex flex-col justify-between">
      <div>
        {/* Top Cover / Status Banner */}
        <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={coverImage}
            alt={cleaningTypeLabel}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shadow-sm">
              {areaTypeLabel}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <StatusBadge status={status} />
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h4 className="text-base font-bold line-clamp-1">{cleaningTypeLabel}</h4>
            <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-indigo-400" />
              <span className="truncate">{address}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{date || 'Flexible Date'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{timeSlot || 'Morning'}</span>
            </div>
          </div>

          {workerName && (
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 text-[11px]">Saathi:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{workerName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Community Fund</span>
          <span className="text-sm font-black text-slate-900 dark:text-white">₹{price}</span>
        </div>
        <Link
          to={`/customer/community/requests/${id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
        >
          Track Job <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default CommunityRequestCard;
