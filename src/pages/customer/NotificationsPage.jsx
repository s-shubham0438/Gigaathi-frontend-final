import React, { useEffect } from 'react';
import { Bell, CheckCircle2, Star, ShieldCheck, MapPin, TrendingUp, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../../features/notifications/state/notificationSlice';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications(user?.id || 'cust-1'));
  }, [user?.id, dispatch]);

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead(user?.id || 'cust-1'));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Notifications & Alerts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time updates on worker assignments, arrival status, and cooperative welfare.
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 transition cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800 space-y-2">
          <Bell className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No notifications.</p>
          <p className="text-xs text-slate-400">Updates regarding your bookings will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleMarkRead(notif.id)}
              className={`flex items-start gap-3.5 rounded-2xl p-4 border transition cursor-pointer ${
                notif.isRead
                  ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-80'
                  : 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/30 shadow-xs'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  notif.type === 'BOOKING_ACCEPTED'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : notif.type === 'NEW_JOB_REQUEST'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                }`}
              >
                {notif.type === 'BOOKING_ACCEPTED' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : notif.type === 'REVIEW_REMINDER' ? (
                  <Star className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {!notif.isRead && (
                <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
