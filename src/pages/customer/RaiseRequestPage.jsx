import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  Radio,
  RefreshCw,
  ShieldCheck,
  UserRound,
  UsersRound,
  XCircle,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useServices } from "../../features/services/hooks/useServices";
import { useBookings } from "../../features/bookings/hooks/useBookings";
import PhotoUploader from "../../shared/components/ui/PhotoUploader";

const getCategoryName = (category = "") => {
  const value = String(category).toLowerCase();
  const names = {
    plumbing: "Plumbing",
    electrical: "Electrician",
    electrician: "Electrician",
    carpentry: "Carpentry",
    cleaning: "Deep Cleaning",
    appliance: "Appliance Repair",
    painting: "Painting & Waterproofing",
    gardening: "Gardening & Plant Care",
    "home-maintenance": "Home Maintenance",
    beauty: "Salon & Personal Care",
    tutoring: "Home Tutoring",
    moving: "Moving & Shifting",
    community: "Community Assistance",
  };
  return names[value] || category || "Service";
};

const WaitingState = ({ booking, onCancel, onViewBookings }) => {
  const assigned = Boolean(booking?.workerId);

  const statusText = {
    REQUESTED: "Looking for an available worker…",
    ACCEPTED: "A worker has accepted your request!",
    IN_PROGRESS: "Your worker is on the way.",
    COMPLETED: "Service completed.",
    CANCELLED: "Request cancelled.",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          {!assigned && booking?.status === "REQUESTED" && (
            <span className="absolute h-24 w-24 rounded-full bg-blue-500/20 animate-ping" />
          )}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30">
            {assigned ? <CheckCircle2 className="h-8 w-8" /> : <Radio className="h-7 w-7" />}
          </div>
        </div>
        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          {assigned ? "Worker Assigned" : "Request Live"}
        </p>
        <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
          {assigned ? "Your Saathi is assigned" : "Waiting for a Saathi"}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500 dark:text-slate-400">
          {statusText[booking?.status] || "Your request is being processed."}
        </p>
      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/60 dark:bg-blue-950/20">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
            {assigned ? <UserRound className="h-5 w-5" /> : <UsersRound className="h-5 w-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {assigned ? "Assigned Worker" : "Broadcast Request"}
            </p>
            <p className="mt-1 text-base font-black text-slate-900 dark:text-white">
              {booking?.workerName || "Searching for Saathi"}
            </p>
            {assigned && booking?.workerPhone && (
              <a
                href={`tel:${booking.workerPhone}`}
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400"
              >
                <Phone className="h-3 w-3" /> {booking.workerPhone}
              </a>
            )}
            {!assigned && (
              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                The request is visible to workers in the selected category. The first eligible worker to accept gets the job.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Service</p>
          <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">{booking?.serviceTitle || "Service"}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Request ID</p>
          <p className="mt-1 truncate text-sm font-bold text-slate-800 dark:text-slate-200">{booking?.id || "—"}</p>
        </div>
      </div>

      {booking?.status === "REQUESTED" && (
        <button
          type="button"
          onClick={onCancel}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/60 dark:bg-slate-900 dark:text-rose-400 dark:hover:bg-rose-950/30"
        >
          <XCircle className="h-4 w-4" /> Cancel Request
        </button>
      )}

      <button
        type="button"
        onClick={onViewBookings}
        className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-black text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        View My Bookings
      </button>
    </div>
  );
};

export const RaiseRequestPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const { user } = useAuth();
  const { allServices = [], isLoading: servicesLoading, error: servicesError, reloadServices } = useServices(true);
  const { createBooking, cancelBooking, loadBookingById } = useBookings(user?.id);

  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [requirement, setRequirement] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState("As soon as possible");
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const categoryServices = useMemo(() => {
    const category = categoryParam.toLowerCase().trim();
    if (!category) return allServices;
    return allServices.filter(
      (service) =>
        service.categoryId?.toLowerCase() === category ||
        service.category?.toLowerCase() === category ||
        service.category?.toLowerCase() === getCategoryName(category).toLowerCase()
    );
  }, [allServices, categoryParam]);

  const selectedService = allServices.find((service) => service.id === selectedServiceId) || categoryServices[0];

  useEffect(() => {
    if (selectedService?.id && !selectedServiceId) setSelectedServiceId(selectedService.id);
  }, [selectedService, selectedServiceId]);

  useEffect(() => {
    if (!submittedBooking?.id || submittedBooking.status !== "REQUESTED") return;
    const timer = setInterval(async () => {
      try {
        const action = await loadBookingById(submittedBooking.id);
        if (action?.payload) setSubmittedBooking(action.payload);
      } catch (_) {}
    }, 4000);
    return () => clearInterval(timer);
  }, [submittedBooking?.id, submittedBooking?.status, loadBookingById]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!selectedService?.id || !address.trim()) {
      setError("Please select a service and enter your address.");
      return;
    }
    setSubmitting(true);
    try {
      const booking = await createBooking({
        customerId: user?.id,
        customerName: user?.name || "Customer",
        customerPhone: phone || user?.phone || "",
        customerAddress: address.trim(),
        serviceId: selectedService.id,
        serviceTitle: selectedService.title || selectedService.name || "Household Service",
        category: selectedService.categoryId || selectedService.category || categoryParam || "General",
        requestMode: "broadcast",
        workerId: null,
        workerName: "Finding a Saathi",
        date,
        timeSlot,
        price: selectedService.price || selectedService.startingPrice || 0,
        paymentMethod: "Cash After Service",
        paymentStatus: "PENDING",
        requirementDescription: requirement.trim(),
        photos,
      });
      setSubmittedBooking(booking);
      setStep(3);
    } catch (err) {
      setError(err?.message || "Failed to raise the request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!submittedBooking?.id) return;
    try {
      await cancelBooking(submittedBooking.id);
      setSubmittedBooking((prev) => ({ ...prev, status: "CANCELLED" }));
    } catch (_) {}
  };

  if (!categoryParam) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-xl rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-xl dark:border-amber-900/50 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Choose a worker category first</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Go back to the customer dashboard and raise a request from the category selector.</p>
          <button onClick={() => navigate("/customer")} className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 px-4 py-8 text-white">
        <div className="mx-auto max-w-4xl">
          <button onClick={() => navigate(-1)} className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur transition hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
              <Radio className="h-3.5 w-3.5" /> Raise a Request
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{getCategoryName(categoryParam)}</span>
          </div>
          <h1 className="mt-3 text-2xl font-black sm:text-3xl">Find an available Saathi for you</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">Your request will be shared with eligible workers in this category. The first worker to accept is automatically assigned to you.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-3 text-xs font-bold text-slate-400">
          {["Service", "Details", "Waiting"].map((label, index) => {
            const n = index + 1;
            return <React.Fragment key={label}><div className={`flex items-center gap-2 ${step >= n ? "text-blue-600 dark:text-blue-400" : ""}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full ${step > n ? "bg-emerald-500 text-white" : step === n ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800"}`}>{step > n ? <CheckCircle2 className="h-4 w-4" /> : n}</span>{label}</div>{n < 3 && <div className={`h-px w-10 sm:w-20 ${step > n ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"}`} />}</React.Fragment>;
          })}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 sm:p-8">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Choose the service</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Category: {getCategoryName(categoryParam)}</p>
              </div>
              {servicesLoading ? <div className="flex justify-center py-12"><Loader2 className="h-7 w-7 animate-spin text-blue-600" /></div> : servicesError ? <div className="rounded-2xl bg-rose-50 p-5 text-sm text-rose-600 dark:bg-rose-950/20 dark:text-rose-300">{servicesError}<button onClick={reloadServices} className="ml-3 font-bold">Retry</button></div> : categoryServices.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">No service is currently available in this category.</div> : <div className="grid gap-3 sm:grid-cols-2">{categoryServices.map((service) => <button key={service.id} type="button" onClick={() => setSelectedServiceId(service.id)} className={`rounded-2xl border-2 p-4 text-left transition ${selectedService?.id === service.id ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30" : "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800"}`}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-black text-slate-900 dark:text-white">{service.title || service.name}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{service.description || "Local professional service"}</p></div>{selectedService?.id === service.id && <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />}</div><p className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400"><IndianRupee className="h-3 w-3" />{service.price || service.startingPrice || 0}+</p></button>)}</div>}
              <div className="flex justify-end"><button type="button" disabled={!selectedService} onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Continue <ArrowRight className="h-4 w-4" /></button></div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><h2 className="text-xl font-black text-slate-900 dark:text-white">Request details</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tell workers where and when you need the service.</p></div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20"><p className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Selected service</p><p className="mt-1 font-black text-slate-900 dark:text-white">{selectedService?.title || selectedService?.name}</p></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2"><span className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300"><MapPin className="h-3.5 w-3.5 text-blue-600" /> Service address *</span><textarea required rows={3} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat, society, street, landmark, city" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></label>
                <label className="space-y-2"><span className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300"><Phone className="h-3.5 w-3.5 text-blue-600" /> Contact number</span><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></label>
                <label className="space-y-2"><span className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300"><Clock3 className="h-3.5 w-3.5 text-blue-600" /> Preferred time</span><select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option>As soon as possible</option><option>09:00 AM</option><option>11:00 AM</option><option>01:30 PM</option><option>03:30 PM</option><option>05:00 PM</option><option>06:30 PM</option></select></label>
                <label className="space-y-2"><span className="text-xs font-bold text-slate-600 dark:text-slate-300">Date</span><input type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></label>
                <label className="space-y-2 sm:col-span-2"><span className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300"><FileText className="h-3.5 w-3.5 text-blue-600" /> Problem description</span><textarea rows={4} value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="Briefly describe what needs to be fixed…" className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></label>
              </div>
              <PhotoUploader photos={photos} onPhotosChange={setPhotos} maxPhotos={4} />
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><p className="text-xs leading-5 text-emerald-700 dark:text-emerald-300">Your request is broadcast only to eligible workers for this category. The first worker who successfully accepts it is atomically assigned to your booking.</p></div></div>
              {error && <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</p>}
              <div className="flex gap-3"><button type="button" onClick={() => setStep(1)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Back</button><button type="submit" disabled={submitting || !selectedService || !address.trim()} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Raising Request…</> : <>Raise Request <ArrowRight className="h-4 w-4" /></>}</button></div>
            </form>
          )}

          {step === 3 && submittedBooking && <WaitingState booking={submittedBooking} onCancel={handleCancel} onViewBookings={() => navigate("/customer/bookings")} />}
        </div>

        {step < 3 && <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><Radio className="h-5 w-5 text-blue-600" /><p className="mt-2 text-xs font-black text-slate-800 dark:text-slate-200">Broadcast to category</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><UsersRound className="h-5 w-5 text-indigo-600" /><p className="mt-2 text-xs font-black text-slate-800 dark:text-slate-200">First eligible worker</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><ShieldCheck className="h-5 w-5 text-emerald-600" /><p className="mt-2 text-xs font-black text-slate-800 dark:text-slate-200">Safe booking flow</p></div></div>}
      </div>
    </div>
  );
};

export default RaiseRequestPage;
