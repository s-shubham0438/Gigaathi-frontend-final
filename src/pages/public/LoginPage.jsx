import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../shared/hooks/useLanguage';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading, error, clearError } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('customer@gigsaathi.demo');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('CUSTOMER');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await login({ email, password, role });
      if (loggedUser.role === 'WORKER') {
        navigate('/worker');
      } else if (loggedUser.role === 'COOPERATIVE') {
        navigate('/cooperative');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      // Error handled by Redux state
    }
  };

  const handleQuickDemoLogin = async (demoRole) => {
    clearError();
    if (demoRole === 'CUSTOMER') {
      setEmail('customer@gigsaathi.demo');
      setPassword('password123');
      setRole('CUSTOMER');
      try {
        await login({ email: 'customer@gigsaathi.demo', password: 'password123', role: 'CUSTOMER' });
        navigate('/customer');
      } catch (err) {}
    } else if (demoRole === 'WORKER') {
      setEmail('worker@gigsaathi.demo');
      setPassword('password123');
      setRole('WORKER');
      try {
        await login({ email: 'worker@gigsaathi.demo', password: 'password123', role: 'WORKER' });
        navigate('/worker');
      } catch (err) {}
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <img src="/logo.png" alt="gigSaathi" className="h-10 w-10 rounded-xl object-contain shadow-xs" />
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">
              gigSaathi
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Welcome to gigSaathi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to book household services or manage your cooperative work schedule.
          </p>
        </div>

        {/* Quick 1-Click Demo Login Bar (Customer & Worker Only, Admin omitted per feedback) */}
        <div className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-950 dark:bg-indigo-950/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              1-Click Smart India Hackathon Demo:
            </span>
            <span className="text-[10px] text-indigo-500 font-semibold">Instant Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('CUSTOMER')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3 text-xs font-bold text-slate-800 shadow-xs border border-indigo-100 hover:border-indigo-400 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>Customer Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('WORKER')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3 text-xs font-bold text-slate-800 shadow-xs border border-indigo-100 hover:border-indigo-400 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Worker Demo</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {error}
              </div>
            )}

            {/* Role Radio Pills */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Login as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('CUSTOMER')}
                  className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-bold border transition cursor-pointer ${
                    role === 'CUSTOMER'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('WORKER')}
                  className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-bold border transition cursor-pointer ${
                    role === 'WORKER'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Worker / कामगार</span>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Demo password: password123</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-indigo-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In to gigSaathi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 pt-4 text-center border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
