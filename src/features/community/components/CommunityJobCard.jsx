import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../../shared/components/ui/StatusBadge';

export const CommunityJobCard = ({ job, onAccept, isAccepting }) => {
  const {
    id,
    address,
    date,
    timeSlot,
    price,
    status,
    description,
    communityDetails,
    customerName,
    photos,
  } = job;

  const areaTypeLabel = communityDetails?.areaType?.replace(/_/g, ' ') || 'Community Zone';
  const cleaningTypeLabel = communityDetails?.cleaningType?.replace(/_/g, ' ') || 'Sanitation Task';
  const coverImage = photos?.[0] || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80';

  const isPending = status === 'REQUESTED' || status === 'PENDING';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition space-y-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={coverImage}
            alt={cleaningTypeLabel}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-[10px] font-extrabold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                {areaTypeLabel}
              </span>
              <StatusBadge status={status} />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {cleaningTypeLabel}
            </h4>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {address}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-slate-400 uppercase font-semibold block">Payout</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{price}</span>
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
          {description}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {date || 'Today'}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-500" /> {timeSlot || 'Morning'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isPending && onAccept && (
            <button
              type="button"
              disabled={isAccepting}
              onClick={() => onAccept(id)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Accept Job
            </button>
          )}
          <Link
            to={`/worker/community/jobs/${id}`}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1 transition"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityJobCard;
