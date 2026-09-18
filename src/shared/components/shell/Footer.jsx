import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Users, TrendingUp, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="gigSaathi" className="h-8 w-8 rounded-lg object-contain" />
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">
                gigSaathi
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('tagline')}. A cooperative gig platform designed for Smart India Hackathon 2026. Empowering informal workers through algorithmic fair allocation and community-based service delivery.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Cooperative Verified</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/services?category=plumbing" className="hover:text-indigo-600 dark:hover:text-indigo-400">Plumbing Services</Link></li>
              <li><Link to="/services?category=electrical" className="hover:text-indigo-600 dark:hover:text-indigo-400">Electricians</Link></li>
              <li><Link to="/services?category=cleaning" className="hover:text-indigo-600 dark:hover:text-indigo-400">Deep Home Cleaning</Link></li>
              <li><Link to="/services?category=appliance" className="hover:text-indigo-600 dark:hover:text-indigo-400">AC & Appliance Repair</Link></li>
              <li><Link to="/services?category=carpentry" className="hover:text-indigo-600 dark:hover:text-indigo-400">Carpentry & Assembly</Link></li>
              <li><Link to="/services?category=community" className="hover:text-indigo-600 dark:hover:text-indigo-400">Community & Elderly Care</Link></li>
            </ul>
          </div>

          {/* Col 3: Differentiators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
              Cooperative System
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-600" /> <span>Worker Welfare Fund (5%)</span></li>
              <li className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> <span>Fair Opportunity Dispatch</span></li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> <span>Trade Union Peer Review</span></li>
              <li className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-indigo-600" /> <span>Low Digital Literacy Support</span></li>
              <li><Link to="/about" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Read Research & Whitepaper</Link></li>
            </ul>
          </div>

          {/* Col 4: Emergency Helpline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              24x7 Emergency Help
            </h4>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3 dark:border-indigo-950 dark:bg-indigo-950/40">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                <PhoneCall className="w-4 h-4" />
                <span>1800-GIG-SAATHI</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Toll-free emergency helpline for water bursts, electrical fire risks, or worker assistance.
              </p>
            </div>
            <p className="text-[10px] text-slate-400">
              Smart India Hackathon 2026 Innovation Showcase Prototype. All mock backend data is stored securely in your browser session.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 gigSaathi Cooperative Platform. Developed for SIH 2026.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link to="/about" className="hover:underline">Cooperative Bylaws</Link>
            <Link to="/services" className="hover:underline">Transparency Reports</Link>
            <Link to="/contact" className="hover:underline">Federation Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
