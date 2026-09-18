import React from 'react';
import { Clock, CheckCircle2, PlayCircle, CheckCheck, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const StatusBadge = ({ status }) => {
  const { t } = useLanguage();

  switch (status) {
    case 'REQUESTED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          {t('statusRequested')}
        </span>
      );
    case 'ACCEPTED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          {t('statusAccepted')}
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800">
          <PlayCircle className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
          {t('statusInProgress')}
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
          {t('statusCompleted')}
        </span>
      );
    case 'CANCELLED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          {t('statusCancelled')}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
          <AlertTriangle className="w-3.5 h-3.5" />
          {status}
        </span>
      );
  }
};

export default StatusBadge;
