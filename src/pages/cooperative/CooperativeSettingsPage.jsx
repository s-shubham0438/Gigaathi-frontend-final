import React from 'react';
import { Building2, ShieldCheck, Check, Sparkles, Award } from 'lucide-react';
import { useCooperative } from '../../features/cooperative/hooks/useCooperative';

export const CooperativeSettingsPage = () => {
  const { resetDemo } = useCooperative(false);

  const tiers = [
    {
      name: 'Basic Trade Union',
      price: '₹999',
      period: '/month',
      desc: 'Ideal for local trade associations digitizing up to 50 active workers.',
      features: [
        'Up to 50 Worker Registrations',
        'Basic Booking Dispatch',
        'Direct Phone & Address Access',
        'Standard Rate Card Management',
      ],
      current: false,
    },
    {
      name: 'Growth Cooperative',
      price: '₹2,499',
      period: '/month',
      desc: 'For multi-trade cooperatives deploying algorithmic fair dispatch and welfare pools.',
      features: [
        'Up to 250 Worker Registrations',
        'Fair Work Allocation Algorithm Engine',
        '7-Day AI Demand Forecasting',
        'Welfare Healthcare Pool Management',
        'Bilingual Voice Accessibility Suite',
      ],
      current: true,
    },
    {
      name: 'Federation Enterprise',
      price: '₹4,999+',
      period: '/month',
      desc: 'For state-level gig worker federations managing multi-city cooperative networks.',
      features: [
        'Unlimited Worker Registrations',
        'Inter-Cooperative Workload Rebalancing',
        'Government Scheme API Integrations (e-Shram)',
        'Custom Union Collective Bargaining Tools',
        'Dedicated SLA & Federation Auditing',
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Cooperative Profile & Platform Subscription
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Illustrative business model demonstrating self-sustainable cooperative software federation.
        </p>
      </div>

      {/* Cooperative Info Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Pune Shramik Karmachari Sahakari Sanstha
            </h3>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Multi-State Cooperative Society Reg: MSCS/CR/2021/841
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Lead Administrator:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Sunita Deshmukh</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Registered Members:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">184 Verified Tradespeople</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Operating Coverage:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Kothrud, Aundh, Baner, Deccan (Pune)</span>
          </div>
        </div>
      </div>

      {/* Subscription Tiers */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Software Subscription Tiers for Cooperatives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-6 border flex flex-col justify-between transition ${
                tier.current
                  ? 'border-2 border-indigo-600 bg-white dark:bg-slate-900 shadow-xl ring-4 ring-indigo-500/10'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{tier.name}</h4>
                  {tier.current && (
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      Active Plan
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-xs text-slate-400">{tier.period}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tier.desc}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  className={`w-full rounded-2xl py-2.5 text-xs font-bold transition cursor-pointer ${
                    tier.current
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tier.current ? 'Current Plan' : 'Upgrade Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo State Reset */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Hackathon Evaluator Demo Reset
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Reset bookings, reviews, and test data back to the clean initial seed state.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDemo}
          className="rounded-2xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          Reset Demo Data
        </button>
      </div>
    </div>
  );
};

export default CooperativeSettingsPage;
