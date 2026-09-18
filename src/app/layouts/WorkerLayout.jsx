import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../../shared/components/shell/Navbar';
import Toast from '../../shared/components/shell/Toast';
import { LayoutDashboard, Briefcase, Calendar, TrendingUp, User, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../shared/hooks/useLanguage';

export const WorkerLayout = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const pendingCount = useSelector((state) =>
    state.bookings.bookings.filter((b) => b.workerId === 'wrk-1' && b.status === 'REQUESTED').length
  );

  const workerNav = [
    { label: t('dashboard'), path: '/worker', icon: LayoutDashboard },
    { label: 'My Jobs', path: '/worker/jobs', icon: Briefcase, badge: pendingCount },
    { label: 'Community Jobs', path: '/worker/community/jobs', icon: TrendingUp },
    { label: 'Schedule', path: '/worker/availability', icon: Calendar },
    { label: 'Earnings', path: '/worker/earnings', icon: TrendingUp },
    { label: t('profile'), path: '/worker/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 pb-20 md:pb-0 transition-colors">
      <Navbar />

      {/* Worker Sub-navigation Bar */}
      <div className="hidden md:block border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Worker Portal / कामगार सेवा केंद्र
            </span>
          </div>

          <div className="flex items-center gap-2">
            {workerNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    active
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] font-black text-white animate-bounce">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <Toast />

      {/* Mobile Worker Fixed Bottom Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-slate-300 bg-white/98 px-2 py-2.5 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-950/98 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          {workerNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl py-1.5 transition ${
                  active
                    ? 'text-indigo-600 dark:text-indigo-400 font-black'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default WorkerLayout;
