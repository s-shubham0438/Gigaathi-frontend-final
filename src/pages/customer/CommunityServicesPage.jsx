import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, ArrowRight, ShieldCheck, MapPin, Building, Trees, Clock, CheckCircle2 } from 'lucide-react';

export const CommunityServicesPage = () => {
  const serviceCategories = [
    {
      title: 'Community Cleaning & Sanitation',
      desc: 'Streets, parks, colony compounds, stormwater drains, and open waste hotspots.',
      icon: Sparkles,
      link: '/customer/community/cleaning',
      badge: 'Popular',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Active Community Requests',
      desc: 'Track citizen-initiated drives, verified before & after photo proofs, and statuses.',
      icon: Clock,
      link: '/customer/community/requests',
      badge: 'Live Tracker',
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  const benefits = [
    { title: 'Verified ImageKit Proof', desc: 'Mandatory before & after photo verification for transparent cleanliness.' },
    { title: 'Fair Living Wages', desc: 'Direct allocation to cooperative Saathi sanitation workers with zero middlemen.' },
    { title: 'Neighbourhood Impact', desc: 'Report dumping zones and solve public hygiene challenges collaboratively.' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-6">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 text-white p-8 md:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Swachh Saathi Initiative
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Clean Neighbourhoods, Empowered Communities.
          </h1>
          <p className="text-sm md:text-base text-teal-50">
            Book certified civic and community sanitation workers for colony grounds, public lanes, societies, and green parks. Guaranteed before/after visual proof.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/customer/community/cleaning"
              className="px-6 py-3 rounded-2xl bg-white text-teal-800 font-black text-sm hover:bg-teal-50 shadow-lg transition inline-flex items-center gap-2"
            >
              Post Cleaning Request <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/customer/community/requests"
              className="px-6 py-3 rounded-2xl bg-black/20 hover:bg-black/30 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition inline-flex items-center gap-2"
            >
              View Active Drives
            </Link>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">
          Civic Sanitation Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.link}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition gap-1">
                  Open Service <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {benefits.map((b, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{b.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityServicesPage;
