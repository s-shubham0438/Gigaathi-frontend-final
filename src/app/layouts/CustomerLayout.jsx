import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../../shared/components/shell/Navbar';
import Footer from '../../shared/components/shell/Footer';
import Toast from '../../shared/components/shell/Toast';
import { Home, Compass, Calendar, Heart, Bell, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../shared/hooks/useLanguage';

export const CustomerLayout = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const unreadCount = useSelector((state) => state.notifications.unreadCount) || 0;
  const wishlistCount = useSelector((state) => state.wishlist.items?.length) || 0;

  const navItems = [
    { label: t('home'), path: '/customer', icon: Home },
    { label: t('services'), path: '/services', icon: Compass },
    { label: t('bookings'), path: '/customer/bookings', icon: Calendar },
    { label: t('wishlist'), path: '/customer/wishlist', icon: Heart, badge: wishlistCount },
    { label: t('profile'), path: '/customer/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;
  const isAIChatPage = location.pathname === '/customer/ai-chat';

  return (
    <div className={`flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 pb-20 md:pb-0 transition-colors ${isAIChatPage ? 'overflow-hidden' : ''}`}>
      <Navbar />

      {/* Sub-header customer desktop bar */}
      <div className="hidden md:block border-b border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Customer Hub:
            </span>
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">📍 Delivery: <strong>Kothrud, Pune</strong></span>
          </div>
        </div>
      </div>

      <main className={`flex-1 min-h-0 ${isAIChatPage ? 'overflow-hidden' : ''}`}>
        <Outlet />
      </main>

      {!isAIChatPage && <Footer />}
      <Toast />

      {/* Mobile Bottom Navigation Bar (Fixed) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-950/95 shadow-xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition ${
                  active
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CustomerLayout;
