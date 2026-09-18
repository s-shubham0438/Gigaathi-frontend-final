import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  Users,
  Scale,
  TrendingUp,
  ArrowRight,
  Heart,
  Star,
  CheckCircle,
  PhoneCall,
  Sparkles,
  Award,
} from 'lucide-react';
import { useLanguage } from '../../shared/hooks/useLanguage';
import { useServices } from '../../features/services/hooks/useServices';
import { useWorkers } from '../../features/workers/hooks/useWorkers';
import CategoryGrid from '../../features/services/components/CategoryGrid';
import ServiceCard from '../../features/services/components/ServiceCard';
import WorkerCard from '../../features/workers/components/WorkerCard';
import EmergencyCard from '../../features/services/components/EmergencyCard';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { categories, popularServices } = useServices(true);
  const { topRatedWorkers } = useWorkers(true);
  const [heroSearch, setHeroSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/services?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 Innovation Prototype</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Working Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-2xl rounded-2xl sm:rounded-3xl border-2 border-indigo-100 bg-white p-2 shadow-xl shadow-indigo-100/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-3 px-3 py-2 w-full">
                <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl sm:rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition cursor-pointer shrink-0"
              >
                {t('findService')}
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/services"
                className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition shadow-sm"
              >
                {t('findService')}
              </Link>
              <Link
                to="/register?role=WORKER"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
              >
                {t('joinAsWorker')}
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-200/80 dark:border-slate-800/80 w-full text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">100% Verified</p>
                  <p className="text-slate-400 text-[11px]">Cooperative certified</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Fair Wages</p>
                  <p className="text-slate-400 text-[11px]">Direct trade union pricing</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">AI Dispatch</p>
                  <p className="text-slate-400 text-[11px]">Demand-balanced jobs</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Worker Welfare</p>
                  <p className="text-slate-400 text-[11px]">5% medical fund</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24x7 Emergency Help Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EmergencyCard />
      </div>

      {/* Swachh Saathi: Community Cleaning Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-800 via-emerald-700 to-indigo-800 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-teal-100">
              <Sparkles className="w-3.5 h-3.5" /> Civic Sanitation Initiative
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Swachh Saathi — Community & Public Sanitation
            </h3>
            <p className="text-sm text-teal-50 leading-relaxed">
              Empowering citizens to mobilize certified cooperative sanitation workers for local streets, parks, colonies, and open drains. Every drive is verified with transparent ImageKit before & after photos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              to="/customer/community/cleaning"
              className="px-6 py-3.5 rounded-2xl bg-white text-teal-900 font-extrabold text-xs uppercase tracking-wider text-center hover:bg-teal-50 shadow-md transition"
            >
              Post Cleaning Drive
            </Link>
            <Link
              to="/customer/community"
              className="px-6 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition"
            >
              Explore Hub
            </Link>
          </div>
        </div>
      </section>

      {/* 12 Service Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('categories')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore 12 skilled trade and community service cooperatives in Pune & Mumbai
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <CategoryGrid categories={categories} />
      </section>

      {/* Popular Cooperative Services */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('popularServices')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Highest-rated household repairs with standard cooperative rate cards
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1"
          >
            <span>{t('exploreServices')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Recommended Local Workers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('recommendedWorkers')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Cooperative-certified professionals with background checks and customer reviews
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedWorkers.slice(0, 3).map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

      {/* How gigSaathi Works Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              How gigSaathi Protects Both Customers & Workers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Unlike commercial aggregators that charge exorbitant 25-30% commissions, gigSaathi is operated by worker cooperatives with transparent algorithms.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Customer Request</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Describe the household issue, pick a convenient time, or upload photos of broken taps/wiring for exact parts estimation.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white font-black text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Fair Work Dispatch</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our cooperative algorithm matches suitable nearby workers while ensuring no active worker is starved of job opportunities.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Service & Welfare</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Service is completed at cooperative regulated card rates. 95% goes directly to the worker and 5% funds collective health insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperative Differentiators Highlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Scale className="w-3.5 h-3.5" />
              <span>Smart India Hackathon Differentiator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              A Cooperative Model, Not a Monopoly.
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Commercial gig apps treat workers as disposable contractors, leading to algorithmic burnout, high customer fees, and poor service reliability. gigSaathi organizes trades into democratic cooperatives where workers have equity, collective insurance, and predictable demand forecasting.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Anti-Starvation Work Allocation</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Algorithms prevent super-workers from taking 100% of jobs while qualified workers sit idle.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">7-Day Demand Forecasting</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Cooperatives anticipate society repair spikes and mobilize shifts in advance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Low Digital Literacy Accessibility</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Bilingual Hindi/English interface with simulated speech guidance and extra large touch buttons.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/cooperative"
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 shadow-sm transition"
              >
                <span>View Cooperative Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Live Ecosystem Health Snapshot
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-indigo-50/60 p-4 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
                <span className="text-xs text-slate-500">Fairness Index</span>
                <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-1">91%</p>
                <span className="text-[10px] text-emerald-600 font-semibold">+4% vs target</span>
              </div>

              <div className="rounded-2xl bg-emerald-50/60 p-4 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
                <span className="text-xs text-slate-500">Welfare Fund</span>
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">₹4.28L</p>
                <span className="text-[10px] text-slate-400">Emergency cover</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Active Trade Unions</span>
                <span className="font-bold text-slate-900 dark:text-white">3 Cooperatives</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Verified Trade Workers</span>
                <span className="font-bold text-slate-900 dark:text-white">184 Professionals</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Customer Satisfaction</span>
                <span className="font-bold text-emerald-600">4.89 / 5.0 (98%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to experience reliable household services?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
            Book cooperative-verified plumbers, electricians, cleaners, and appliance technicians in your neighborhood today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/services"
              className="rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 hover:bg-slate-100 shadow-lg transition"
            >
              Book a Service Now
            </Link>
            <Link
              to="/login"
              className="rounded-2xl border-2 border-white/80 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              Demo Quick Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
