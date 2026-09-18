import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Building2, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../shared/state/uiSlice';

export const ContactPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Service Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(showToast({ message: 'Message sent! A cooperative saathi will respond within 24 hours.', type: 'success' }));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Contact & Cooperative Federation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Have questions about service bookings, trade cooperative onboarding, or Smart India Hackathon 2026?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Cards */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-600" />
              <span>Helpline & Emergency Support</span>
            </h3>
            <p className="text-xs text-slate-500">Toll-Free 24x7 Helpline: <strong>1800-GIG-SAATHI</strong></p>
            <p className="text-xs text-slate-500">Pune Operations Office: +91 98230 44120</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>Cooperative Federation Headquarters</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pune Shramik Karmachari Sahakari Sanstha, 4th Floor, Shramik Bhavan, Kothrud, Pune - 411038
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Email Enquiries</span>
            </h3>
            <p className="text-xs text-slate-500">Public: support@gigsaathi.demo</p>
            <p className="text-xs text-slate-500">Union Partnerships: federation@gigsaathi.demo</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, {name}. The cooperative community operations team has received your inquiry.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Send us an Inquiry
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul or Priya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="Service Inquiry">Household Service Booking Inquiry</option>
                  <option value="Worker Onboarding">Join as a Trade Cooperative Worker</option>
                  <option value="Society Partnership">Residential Society Group Tie-up</option>
                  <option value="Hackathon Demo">Smart India Hackathon Evaluation Query</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can gigSaathi help your household or trade union?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
