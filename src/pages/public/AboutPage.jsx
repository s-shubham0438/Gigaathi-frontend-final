import React from 'react';
import { ShieldCheck, Scale, TrendingUp, Users, Heart, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Smart India Hackathon 2026 Problem Statement
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Reinventing Local Gig Work Through Cooperatives
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          How gigSaathi transforms informal household labor into a dignified, democratic, and algorithmically fair ecosystem.
        </p>
      </div>

      {/* Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6 sm:p-8 dark:border-rose-950 dark:bg-rose-950/20 space-y-4">
          <div className="inline-block rounded-xl bg-rose-100 p-2 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold text-xs">
            The Problem: Exploitative Aggregators
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fragmented & Exploitative</h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
            <li>Commercial platforms extract 20% to 35% commission from every job.</li>
            <li>Opaque algorithms create "worker starvation" where few workers are overloaded while the majority receive no leads.</li>
            <li>Zero social security, healthcare insurance, or collective representation for informal trades.</li>
            <li>Low digital literacy leaves older, experienced craftsmen excluded from modern apps.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 dark:border-emerald-950 dark:bg-emerald-950/20 space-y-4">
          <div className="inline-block rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs">
            The gigSaathi Solution: Cooperative Equity
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Democratic & Equitable</h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
            <li>Trade cooperatives own and govern their service guidelines and rate cards.</li>
            <li>5% of booking proceeds automatically fund collective medical and emergency welfare accounts.</li>
            <li>Proprietary Fair Allocation Algorithm balances skill matching with anti-starvation opportunity spread.</li>
            <li>High-accessibility UI featuring Hindi voice assistance and extra-large touch targets.</li>
          </ul>
        </div>
      </div>

      {/* 5 Core Pillars */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center">
          The 5 Core Pillars of gigSaathi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 w-fit">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Fair Work Allocation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Mathematical scoring balances proximity with worker capacity to ensure equitable distribution across union members.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">7-Day Demand Forecast</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Predictive modeling analyzes neighborhood service cycles so cooperatives can mobilize worker shifts without overworking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 w-fit">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Worker Empowerment</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Collective welfare accounts, transparent hourly rates, and trade-certified skills validation.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trust & Verification</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every worker is verified through cooperative registry, peer review, and background police verification.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 w-fit">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Low Digital Literacy First</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Simplified visual indicators, audio voice cues in regional languages, and minimum navigation barriers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-2xl bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300 w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Community Delivery</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Direct connection between local residential societies and neighborhood trade cooperative branches.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-md transition"
        >
          <span>Explore Services on gigSaathi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
