import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  Radio,
  Users,
  Phone,
  AlertTriangle,
  IndianRupee,
  RefreshCw,
  XCircle,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useServices } from "../../features/services/hooks/useServices";
import { useBookings } from "../../features/bookings/hooks/useBookings";

/* ─────────────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────────────── */
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Pick Service" },
    { id: 2, label: "Your Details" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                currentStep > step.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : currentStep === step.id
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-200 scale-110"
                  : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                step.id
              )}
            </div>
            <span
              className={`mt-1.5 text-[10px] font-semibold whitespace-nowrap ${
                currentStep === step.id
                  ? "text-rose-600 dark:text-rose-400"
                  : currentStep > step.id
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {step.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-20 sm:w-32 mx-1 mt-[-14px] rounded-full transition-all duration-500 ${
                currentStep > step.id
                  ? "bg-emerald-400"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   LIVE TRACKER
───────────────────────────────────────────────────── */
const LiveTracker = ({ booking, onCancel, onViewBookings }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isProfessionalAssigned =
    booking?.workerId &&
    booking?.workerName &&
    booking?.workerName !== "Searching for Saathi";

  const statusLabel = {
    REQUESTED: "Searching for a Saathi…",
    ACCEPTED: "A Saathi has accepted your request!",
    IN_PROGRESS: "Your Saathi is on the way!",
    COMPLETED: "Service completed!",
    CANCELLED: "Request cancelled",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Pulsing broadcast animation */}
      {!isProfessionalAssigned && booking?.status !== "CANCELLED" && (
        <div className="flex flex-col items-center py-8">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-24 w-24 rounded-full bg-rose-400 opacity-20 animate-ping" />
            <span
              className="absolute inline-flex h-16 w-16 rounded-full bg-rose-400 opacity-35 animate-ping"
              style={{ animationDelay: "0.4s" }}
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-rose-500 text-white shadow-xl">
              <Radio className="w-7 h-7" />
            </div>
          </div>
          <p className="mt-5 text-base font-bold text-slate-800 dark:text-white">
            Broadcasting your request…
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Connecting you with the nearest available Saathi
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-full bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 px-4 py-1.5 text-sm font-mono font-bold text-rose-600 dark:text-rose-400">
            <Clock className="w-4 h-4" />
            {formatTime(elapsed)}
          </div>
        </div>
      )}

      {/* Professional assigned */}
      {isProfessionalAssigned && (
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                Saathi Assigned!
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {booking.workerName}
              </p>
            </div>
          </div>
          {booking.workerPhone && (
            <a
              href={`tel:${booking.workerPhone}`}
              className="flex items-center gap-2 w-fit rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700 transition"
            >
              <Phone className="w-4 h-4" />
              Call Saathi
            </a>
          )}
        </div>
      )}

      {/* Status card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Request Status
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              booking?.status === "ACCEPTED" || booking?.status === "IN_PROGRESS"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : booking?.status === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            {statusLabel[booking?.status] || booking?.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-400 text-xs">Service</p>
            <p className="font-semibold text-slate-800 dark:text-white mt-0.5">
              {booking?.serviceTitle || "Service"}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Address</p>
            <p className="font-semibold text-slate-800 dark:text-white mt-0.5 truncate">
              {booking?.address || "—"}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Mode</p>
            <p className="font-semibold text-slate-800 dark:text-white mt-0.5 flex items-center gap-1">
              <Radio className="w-3 h-3 text-rose-500" /> Broadcast
            </p>
          </div>
          {booking?.price > 0 && (
            <div>
              <p className="text-slate-400 text-xs">Est. Price</p>
              <p className="font-semibold text-slate-800 dark:text-white mt-0.5 flex items-center gap-0.5">
                <IndianRupee className="w-3.5 h-3.5" />
                {booking.price}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onViewBookings}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 text-sm font-bold hover:opacity-90 transition"
        >
          View All Bookings
          <ArrowRight className="w-4 h-4" />
        </button>

        {booking?.status === "REQUESTED" && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 px-5 py-3 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <XCircle className="w-4 h-4" />
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   CATEGORY EMOJI HELPER
───────────────────────────────────────────────────── */
function getCategoryEmoji(category = "") {
  const c = String(category).toLowerCase();
  if (c.includes("plumb")) return "🔧";
  if (c.includes("electr")) return "⚡";
  if (c.includes("clean")) return "🧹";
  if (c.includes("carpenter") || c.includes("wood")) return "🪚";
  if (c.includes("paint")) return "🎨";
  if (c.includes("pest")) return "🐛";
  if (c.includes("ac") || c.includes("appliance") || c.includes("hvac")) return "❄️";
  if (c.includes("security") || c.includes("cctv")) return "📹";
  if (c.includes("maid") || c.includes("cook")) return "🍳";
  if (c.includes("garden") || c.includes("lawn")) return "🌿";
  return "🛠️";
}

/* ─────────────────────────────────────────────────────
   MAIN PAGE EXPORT
───────────────────────────────────────────────────── */
export const UrgentBookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    allServices = [],
    isLoading: servicesLoading,
    reloadServices,
  } = useServices(true);
  const { createBooking, cancelBooking, loadBookingById } = useBookings(user?.id);

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [error, setError] = useState(null);

  // Form
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const pollRef = useRef(null);

  /* Poll for status after submission */
  useEffect(() => {
    if (!submittedBooking?.id) return;
    const terminal = ["ACCEPTED", "IN_PROGRESS", "CANCELLED", "COMPLETED"];
    if (terminal.includes(submittedBooking.status)) return;

    pollRef.current = setInterval(async () => {
      try {
        const action = await loadBookingById(submittedBooking.id);
        const fresh = action?.payload;
        if (fresh && fresh.status !== submittedBooking.status) {
          setSubmittedBooking(fresh);
        }
      } catch (_) {}
    }, 5000);

    return () => clearInterval(pollRef.current);
  }, [submittedBooking?.id, submittedBooking?.status]);

  /* Derived */
  const filteredServices = allServices.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q)
    );
  });

  const selectedService = allServices.find((s) => s.id === selectedServiceId);

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const timeSlot = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  /* Handlers */
  const handleSubmit = async () => {
    if (!selectedServiceId || !address.trim()) {
      setError("Please select a service and enter your address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const booking = await createBooking({
        serviceId: selectedServiceId,
        customerAddress: address.trim(),
        date: today,
        timeSlot,
        requirementDescription: description.trim() || "Urgent service request",
        requestMode: "broadcast",
        paymentMethod: "Cash After Service",
        paymentStatus: "PENDING",
        price: selectedService?.price || 0,
      });
      setSubmittedBooking(booking);
      setStep(3);
    } catch (err) {
      setError(err?.message || "Failed to broadcast request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelSubmitted = async () => {
    if (!submittedBooking?.id) return;
    await cancelBooking(submittedBooking.id);
    setSubmittedBooking((prev) => ({ ...prev, status: "CANCELLED" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 px-4 py-8 text-white">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3" /> Urgent Booking
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Need help right now?
          </h1>
          <p className="mt-2 text-sm text-rose-100 max-w-lg">
            Skip the scheduling. Broadcast your request instantly to all
            available Saathis nearby — fastest one gets the job.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-rose-100">
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" /> Broadcast to all workers
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Live tracking
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> First-responder model
            </span>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-24 h-48 w-48 rounded-full bg-white/10" />
      </div>

      {/* ── Card ── */}
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 p-6 sm:p-8">

          {step < 3 && <StepIndicator currentStep={step} />}

          {/* ── STEP 1: Service Selection ── */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  What do you need?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select the service category for your urgent request
                </p>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services…"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900/30 transition"
              />

              {servicesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-slate-400">
                  <AlertTriangle className="w-10 h-10 mb-2" />
                  <p className="text-sm">No services found</p>
                  <button
                    type="button"
                    onClick={reloadServices}
                    className="mt-3 flex items-center gap-1.5 text-xs text-rose-500 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Retry
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                  {filteredServices.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`relative group rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                        selectedServiceId === service.id
                          ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                          : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-rose-300 hover:shadow-md"
                      }`}
                    >
                      {selectedServiceId === service.id && (
                        <span className="absolute top-2 right-2">
                          <CheckCircle2 className="w-4 h-4 text-rose-500" />
                        </span>
                      )}
                      <div className="mb-2 text-2xl">
                        {getCategoryEmoji(service.categoryId || service.category)}
                      </div>
                      <p
                        className={`text-xs font-bold leading-tight ${
                          selectedServiceId === service.id
                            ? "text-rose-700 dark:text-rose-300"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {service.title}
                      </p>
                      {service.price > 0 && (
                        <p className="mt-1 text-[10px] text-slate-400 flex items-center gap-0.5">
                          <IndianRupee className="w-2.5 h-2.5" />
                          {service.price}+
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {error && (
                <p className="text-xs text-rose-600 text-center">{error}</p>
              )}

              <button
                type="button"
                onClick={() => {
                  if (!selectedServiceId) {
                    setError("Please select a service to continue.");
                    return;
                  }
                  setError(null);
                  setStep(2);
                }}
                disabled={!selectedServiceId}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 text-white px-5 py-3 text-sm font-bold hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-lg shadow-rose-300/40"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── STEP 2: Details ── */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Your Details
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Where should we send your Saathi?
                </p>
              </div>

              {/* Selected service pill */}
              {selectedService && (
                <div className="flex items-center gap-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 px-4 py-3">
                  <div className="text-xl">
                    {getCategoryEmoji(selectedService.categoryId || selectedService.category)}
                  </div>
                  <div>
                    <p className="text-xs text-rose-500 font-semibold">
                      Selected Service
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {selectedService.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="ml-auto text-xs text-slate-400 hover:text-rose-500 transition font-semibold"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Your Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 4B, Sunshine Apts, Kothrud, Pune"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900/30 transition"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900/30 transition"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  Problem Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Briefly describe the issue (e.g. leaking pipe under kitchen sink)…"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900/30 transition resize-none"
                />
              </div>

              {/* Notice */}
              <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  Your request will be{" "}
                  <strong>broadcast to all available Saathis</strong> in your
                  area. The first professional to accept gets the job. Service
                  starts as soon as possible — usually within 30–60 minutes.
                </p>
              </div>

              {error && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || !address.trim()}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-600 text-white px-5 py-3 text-sm font-bold hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-rose-300/40"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Broadcasting…
                    </>
                  ) : (
                    <>
                      <Radio className="w-4 h-4" />
                      Broadcast Now
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Live Tracker ── */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                    Request Live
                  </p>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Your urgent request is out!
                  </h2>
                </div>
              </div>

              <LiveTracker
                booking={submittedBooking}
                onCancel={handleCancelSubmitted}
                onViewBookings={() => navigate("/customer/bookings")}
              />
            </div>
          )}
        </div>

        {/* Trust signals */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "⚡", label: "Instant Broadcast" },
            { icon: "🛡️", label: "Verified Saathis" },
            { icon: "💰", label: "Pay After Service" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 shadow-sm"
            >
              <div className="text-xl">{item.icon}</div>
              <p className="mt-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UrgentBookingPage;
