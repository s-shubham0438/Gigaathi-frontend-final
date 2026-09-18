import React from 'react';
import { MapPin, Calendar, Clock, Volume2, Check, X, User, IndianRupee } from 'lucide-react';
import { useLanguage } from '../../../shared/hooks/useLanguage';
import { useVoiceGuide } from '../../../shared/hooks/useVoiceGuide';

export const JobRequestCard = ({ booking, onAccept, onDecline }) => {
  const { t } = useLanguage();
  const { speak, isSpeaking } = useVoiceGuide();

  const handleSpeakDetails = () => {
    const text = `नया काम आया है। ग्राहक का नाम ${booking.customerName}। सेवा ${booking.serviceTitle}। दूरी लगभग 2 किलोमीटर। अनुमानित कमाई ${booking.price} रुपये।`;
    speak(text, 'hi-IN');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white p-5 sm:p-6 shadow-xl dark:border-indigo-900 dark:bg-slate-900 animate-fade-in">
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            NEW SERVICE REQUEST / नया काम
          </span>
        </div>

        {/* Audio Speech Button for Low Digital Literacy */}
        <button
          type="button"
          onClick={handleSpeakDetails}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
            isSpeaking
              ? 'bg-amber-500 text-white animate-pulse'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300'
          }`}
          title="बोलकर सुनाएं (Audio Voice Guidance)"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isSpeaking ? 'सुन रहे हैं...' : '🔊 आवाज़ में सुनें'}</span>
        </button>
      </div>

      {/* Main Job Details */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Service Required / सेवा
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {booking.serviceTitle}
          </h3>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="font-semibold">{booking.customerName}</span>
              <span className="text-slate-400 text-xs">({booking.customerPhone})</span>
            </div>

            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{booking.customerAddress}</span>
            </div>
          </div>
        </div>

        {/* Schedule & Earnings Card */}
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-2 text-center pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Date</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{booking.date}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Time Slot</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{booking.timeSlot}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Estimated Earning:
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{booking.price}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Note / Broken Item Photos if provided */}
      {booking.requirementDescription && (
        <div className="mt-4 rounded-xl bg-amber-50/60 p-3 text-xs text-amber-900 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-800/60">
          <span className="font-bold block mb-0.5">Problem Details / समस्या विवरण:</span>
          <p>{booking.requirementDescription}</p>
          {booking.photos && booking.photos.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">Attached Photo:</span>
              <img src={booking.photos[0]} alt="Broken item" className="h-10 w-10 rounded-lg object-cover border border-amber-300" />
            </div>
          )}
        </div>
      )}

      {/* Prominent Large Touch Action Buttons for Low Literacy */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => onDecline(booking.id)}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white py-4 px-4 text-sm sm:text-base font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5 text-rose-500 stroke-[3]" />
          <span>{t('declineJob')}</span>
        </button>

        <button
          type="button"
          onClick={() => onAccept(booking.id)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 px-4 text-sm sm:text-base font-black text-white hover:bg-emerald-700 transition cursor-pointer shadow-lg shadow-emerald-200 dark:shadow-none"
        >
          <Check className="w-5 h-5 text-white stroke-[3]" />
          <span>{t('acceptJob')}</span>
        </button>
      </div>
    </div>
  );
};

export default JobRequestCard;
