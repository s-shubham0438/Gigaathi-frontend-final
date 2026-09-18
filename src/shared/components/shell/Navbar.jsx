import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  Globe,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Briefcase,
  Layers,
  Sparkles,
  Heart,
  Calendar,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isCustomer, isWorker, isCooperative, logout, switchRole } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const unreadCount = useSelector((state) => state.notifications.unreadCount) || 0;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleRoleSelect = (newRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'CUSTOMER') navigate('/customer');
    else if (newRole === 'WORKER') navigate('/worker');
    else if (newRole === 'COOPERATIVE') navigate('/cooperative');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="gigSaathi Logo"
              className="h-9 w-9 rounded-xl object-contain shadow-xs transition group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">
                gigSaathi
              </span>
              <span className="hidden sm:inline text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-1 tracking-wide">
                Cooperative Gig Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link
              to="/"
              className={`rounded-xl px-3 py-1.5 transition ${
                isActive('/') ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/services"
              className={`rounded-xl px-3 py-1.5 transition ${
                isActive('/services') ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('services')}
            </Link>
            <Link
              to="/customer/community"
              className={`rounded-xl px-3 py-1.5 transition ${
                isActive('/customer/community') ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Community Cleaning
            </Link>
            <Link
              to="/about"
              className={`rounded-xl px-3 py-1.5 transition ${
                isActive('/about') ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              About Cooperative
            </Link>
            <Link
              to="/contact"
              className={`rounded-xl px-3 py-1.5 transition ${
                isActive('/contact') ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Right Actions: Theme Toggle, Language Selector, Demo Switcher, Auth */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle (English / Hindi) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Toggle between English and Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Toggle Dark/Light Mode"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* AI Saathi — customer-only assistant */}
          {isAuthenticated && isCustomer && (
            <Link
              to="/customer/ai-chat"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 dark:shadow-none"
              title="Open AI Saathi"
            >
              <Bot className="h-3.5 w-3.5" />
              <span>AI Saathi</span>
            </Link>
          )}

          {/* Notifications button */}
          <Link
            to={isWorker ? '/worker/jobs' : '/customer/notifications'}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Quick Demo Role Switcher for SIH Presentation */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 px-3 py-1.5 text-xs font-bold text-indigo-900 dark:from-indigo-950/60 dark:to-blue-950/60 dark:border-indigo-800 dark:text-indigo-200 hover:shadow-xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>
                Role: {user?.role || 'Guest'}
              </span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Switch Demo Persona
                </p>
                <button
                  onClick={() => handleRoleSelect('CUSTOMER')}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <p>Customer View</p>
                    <p className="text-[10px] font-normal text-slate-400">Amit Sharma (Search & Book)</p>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelect('WORKER')}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <div className="text-left">
                    <p>Worker View</p>
                    <p className="text-[10px] font-normal text-slate-400">Rahul Verma (Jobs & Earnings)</p>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelect('COOPERATIVE')}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-purple-600" />
                  <div className="text-left">
                    <p>Cooperative Portal</p>
                    <p className="text-[10px] font-normal text-slate-400">Fair Allocation & Demand</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* User Auth or Direct Dashboard CTA */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={isWorker ? '/worker' : isCooperative ? '/cooperative' : '/customer'}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-xs shadow-indigo-200 dark:shadow-none transition"
              >
                {t('dashboard')}
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition"
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-xs transition"
              >
                {t('register')}
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-800 dark:text-slate-200"
            >
              {t('home')}
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-800 dark:text-slate-200"
            >
              {t('services')}
            </Link>
            {isAuthenticated && isCustomer && (
              <Link
                to="/customer/ai-chat"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-2.5 text-xs font-bold text-white shadow-sm"
              >
                <Bot className="h-4 w-4" />
                AI Saathi
              </Link>
            )}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-800 dark:text-slate-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 text-slate-800 dark:text-slate-200"
            >
              Contact
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase">Switch View</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { handleRoleSelect('CUSTOMER'); setMobileMenuOpen(false); }}
                className="rounded-xl bg-blue-50 dark:bg-blue-950/50 p-2 text-xs font-semibold text-blue-700 dark:text-blue-300"
              >
                Customer
              </button>
              <button
                onClick={() => { handleRoleSelect('WORKER'); setMobileMenuOpen(false); }}
                className="rounded-xl bg-emerald-50 dark:bg-emerald-950/50 p-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
              >
                Worker
              </button>
              <button
                onClick={() => { handleRoleSelect('COOPERATIVE'); setMobileMenuOpen(false); }}
                className="rounded-xl bg-purple-50 dark:bg-purple-950/50 p-2 text-xs font-semibold text-purple-700 dark:text-purple-300"
              >
                Cooperative
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
