import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../../shared/components/shell/Navbar';
import Toast from '../../shared/components/shell/Toast';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Scale,
  TrendingUp,
  BarChart3,
  Settings,
  RotateCcw,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useCooperative } from '../../features/cooperative/hooks/useCooperative';

export const CooperativeLayout = () => {
  const location = useLocation();
  const { resetDemo } = useCooperative(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { label: 'Overview Dashboard', path: '/cooperative', icon: LayoutDashboard },
    { label: 'Worker Management', path: '/cooperative/workers', icon: Users },
    { label: 'Fair Work Allocation', path: '/cooperative/allocation', icon: Scale },
    { label: '7-Day Demand Forecast', path: '/cooperative/demand', icon: TrendingUp },
    { label: 'All Bookings', path: '/cooperative/bookings', icon: Briefcase },
    { label: 'Analytics & Trends', path: '/cooperative/analytics', icon: BarChart3 },
    { label: 'Federation & Settings', path: '/cooperative/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 w-full">
          {/* Cooperative Sidebar for Desktop */}
          <aside className="hidden lg:block space-y-6">
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-950 dark:bg-indigo-950/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Pune Workers Cooperative
                  </h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> Reg: MSCS/CR/841
                  </span>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Reset Demo State Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={resetDemo}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white py-2.5 px-3 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer shadow-xs"
                title="Reset mock data to default pristine state for demonstration"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </aside>

          {/* Mobile Navigation Tabs for Cooperative */}
          <div className="lg:hidden mb-4 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap ${
                      active
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main Workspace */}
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <Toast />
    </div>
  );
};

export default CooperativeLayout;
