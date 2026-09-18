import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TrustBadge = ({ text = 'Cooperative Verified', variant = 'gold', size = 'sm' }) => {
  const isGold = variant === 'gold';

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5';

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border shadow-xs transition ${sizeClasses} ${
        isGold
          ? 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
      }`}
      title="Verified through background checks, cooperative registration, and community trade peer review."
    >
      <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5 text-amber-600 dark:text-amber-400' : 'w-4 h-4 text-amber-600 dark:text-amber-400'} />
      <span>{text}</span>
    </div>
  );
};

export default TrustBadge;
