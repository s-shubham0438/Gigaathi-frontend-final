
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../shared/hooks/useLanguage';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') || 'CUSTOMER';

  const { register, isLoading, error } = useAuth();
  const { t } = useLanguage();

  const [role, setRole] = useState(initialRole);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [category, setCategory] = useState('plumbing');
  const [city, setCity] = useState('Indore');

  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('500');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await register({
        name,
        email,
        phone,
        password,
        role,
        city,

        // Worker fields
        category,
        experience: Number(experience) || 0,
        hourlyRate: Number(hourlyRate) || 500,
        skills: skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        description,
      });

      if (newUser.role === 'WORKER') {
        navigate('/worker');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      // Error is already handled by Redux
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-lg space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <img
              src="/logo.png"
              alt="gigSaathi"
              className="h-10 w-10 rounded-xl object-contain shadow-xs"
            />

            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">
              gigSaathi
            </span>
          </Link>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Join the Cooperative Ecosystem
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign up as a household customer or join as a local worker.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error */}
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {error}
              </div>
            )}

            {/* Role */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Register as:
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
                  Customer
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
                  Worker Saathi
                </button>

              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name
              </label>

              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Email
                </label>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                  <input
                    type="tel"
                    required
                    placeholder="+91 98221 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                  />
                </div>
              </div>

            </div>

            {/* Worker Fields */}
            {role === 'WORKER' && (
              <div className="rounded-2xl bg-indigo-50/60 p-4 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 space-y-4">

                <div className="text-xs font-black text-indigo-900 dark:text-indigo-200">
                  Worker / Trade Details
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                    Primary Trade / Skill
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrician</option>
                    <option value="cleaning">Deep Cleaning</option>
                    <option value="appliance">Appliance Repair</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="gardening">Gardening</option>
                    <option value="community">Community & Elder Care</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                    Experience (Years)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="5"
                    className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                    Hourly Rate (₹)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                    Skills
                  </label>

                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Pipe repair, Tap repair, Leakage"
                    className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />

                  <p className="text-[10px] text-indigo-600 mt-1">
                    Separate skills using commas.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                    About You
                  </label>

                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell customers about your experience..."
                    className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>

              </div>
            )}

            {/* City */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                City / Region
              </label>

              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                <input
                  type="text"
                  required={role === 'WORKER'}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Indore, Madhya Pradesh"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-indigo-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </span>

              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="mt-5 pt-4 text-center border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Already have an account?{' '}

            <Link
              to="/login"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

