import React, { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  CreditCard,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Camera,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useServices } from "../../features/services/hooks/useServices";
import { useWorkers } from "../../features/workers/hooks/useWorkers";
import { useBookings } from "../../features/bookings/hooks/useBookings";
import { useLanguage } from "../../shared/hooks/useLanguage";
import PhotoUploader from "../../shared/components/ui/PhotoUploader";

export const BookingFlowPage = () => {
  const { serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const workerParamId = searchParams.get("workerId");
  const categoryParam = searchParams.get("category");
  const requestModeParam = searchParams.get("requestMode");
  const isEmergency = searchParams.get("emergency") === "true";

  // Broadcast/Raise Request has its own dedicated flow now.
  // Keep this compatibility redirect so old links cannot open the individual booking UI.
  useEffect(() => {
    if (requestModeParam === "broadcast") {
      navigate(
        `/customer/raise-request?category=${encodeURIComponent(
          categoryParam || ""
        )}`,
        { replace: true }
      );
    }
  }, [requestModeParam, categoryParam, navigate]);

  const { user } = useAuth();
  const { t } = useLanguage();

  /*
   * IMPORTANT:
   * useServices() returns both:
   *   services     -> filtered services
   *   allServices  -> ALL services from backend
   *
   * Booking page MUST use allServices.
   */
  const {
    services = [],
    allServices = [],
    isLoading: servicesLoading,
    error: servicesError,
    reloadServices,
  } = useServices(true);

  const {
    workers = [],
    isLoading: workersLoading,
    error: workersError,
  } = useWorkers(true);

  const { createBooking } = useBookings(user?.id);

  const [selectedServiceId, setSelectedServiceId] = useState(serviceId || "");

  const [selectedWorkerId, setSelectedWorkerId] = useState(workerParamId || "");
  // This page is intentionally only for choosing/booking one worker.
  // Raise Request uses RaiseRequestPage.
  const bookingMode = "individual";

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [timeSlot, setTimeSlot] = useState("11:00 AM");

  const [address, setAddress] = useState(user?.address || "");

  const [requirement, setRequirement] = useState(
    isEmergency ? "Urgent emergency repair needed." : "",
  );

  const [paymentMethod, setPaymentMethod] = useState("Cash After Service");

  const [photos, setPhotos] = useState([]);

  const [bookingSuccess, setBookingSuccess] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  /*
   * --------------------------------------------------
   * SERVICE SELECTION
   * --------------------------------------------------
   */

  useEffect(() => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
  }, [serviceId]);

  /*
   * --------------------------------------------------
   * WORKER SELECTION
   * --------------------------------------------------
   */

  useEffect(() => {
    if (workerParamId) {
      setSelectedWorkerId(workerParamId);
    }
  }, [workerParamId]);

  /*
   * If worker was opened through:
   *
   * /customer/book?workerId=XXX&category=plumbing
   *
   * workerParamId is available and worker will be selected.
   */

  useEffect(() => {
    if (
      bookingMode === "individual" &&
      !workerParamId &&
      !selectedWorkerId &&
      workers.length > 0
    ) {
      setSelectedWorkerId(workers[0].id);
    }
  }, [bookingMode, workerParamId, selectedWorkerId, workers]);
  /*
   * --------------------------------------------------
   * FIND SERVICE
   * --------------------------------------------------
   *
   * Priority:
   *
   * 1. serviceId from URL
   * 2. category from URL
   * 3. first available service
   */

  useEffect(() => {
    if (serviceId) {
      return;
    }

    if (selectedServiceId) {
      return;
    }

    if (!allServices.length) {
      return;
    }

    let selectedService = null;

    // Try category first
    if (categoryParam) {
      const category = categoryParam.toLowerCase().trim();

      selectedService = allServices.find(
        (service) =>
          service.categoryId?.toLowerCase() === category ||
          service.category?.toLowerCase() === category,
      );
    }

    // Otherwise first real MongoDB service
    if (!selectedService) {
      selectedService = allServices[0];
    }

    if (selectedService?.id) {
      setSelectedServiceId(selectedService.id);
    }
  }, [serviceId, selectedServiceId, categoryParam, allServices]);

  /*
   * --------------------------------------------------
   * CURRENT SERVICE
   * --------------------------------------------------
   */

  const currentService =
    allServices.find((service) => service.id === selectedServiceId) ||
    (categoryParam
      ? allServices.find(
          (service) =>
            service.categoryId?.toLowerCase() === categoryParam.toLowerCase() ||
            service.category?.toLowerCase() === categoryParam.toLowerCase(),
        )
      : null) ||
    allServices[0];

  /*
   * --------------------------------------------------
   * CURRENT WORKER
   * --------------------------------------------------
   */

  const currentWorker =
    workers.find((worker) => worker.id === selectedWorkerId) || workers[0];

  /*
   * --------------------------------------------------
   * TIME SLOTS
   * --------------------------------------------------
   */

  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:30 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  /*
   * --------------------------------------------------
   * BOOKING SUBMIT
   * --------------------------------------------------
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!user?.id) {
      setErrorMessage("You must be logged in to create a booking.");
      return;
    }

    if (!currentService?.id) {
      setErrorMessage(
        "No service is available. Please refresh the page and try again.",
      );
      return;
    }

    if (bookingMode === "individual" && !currentWorker) {
      setErrorMessage("No worker is available for this service.");
      return;
    }

    /*
     * VERY IMPORTANT:
     *
     * currentWorker.id
     *     = ProfessionalProfile _id
     *
     * currentWorker.userId
     *     = User _id
     *
     * Backend Booking.professional expects User _id.
     */

    let professionalUserId = null;

    if (bookingMode === "individual") {
      professionalUserId =
        currentWorker?.userId ||
        currentWorker?.user?._id ||
        currentWorker?.user?.id;

      if (!professionalUserId) {
        setErrorMessage(
          "Worker account ID is missing. Please select another worker.",
        );
        return;
      }
    }

    setSubmitting(true);

    try {
      const newBooking = await createBooking({
        customerId: user.id,

        customerName: user.name || "Customer",

        customerPhone: user.phone || "",

        customerAddress: address || "Customer Address",

        /*
         * REAL MongoDB SERVICE ID
         */
        serviceId: currentService.id,

        serviceTitle:
          currentService.title || currentService.name || "Household Service",

        category:
          currentService.categoryId ||
          currentService.category ||
          categoryParam ||
          "General",

        /*
         * REAL USER ID OF WORKER
         */
        requestMode: bookingMode,

        workerId: bookingMode === "individual" ? professionalUserId : null,

        workerName:
          bookingMode === "individual"
            ? currentWorker?.name || "Worker"
            : "Finding a Saathi",

        workerPhone:
          bookingMode === "individual" ? currentWorker?.phone || "" : "",

        workerAvatar:
          bookingMode === "individual" ? currentWorker?.avatar : null,

        date,

        timeSlot,

        price: currentService.price || currentService.startingPrice || 0,

        paymentMethod,

        paymentStatus:
          paymentMethod === "Demo UPI / Online" ? "PAID" : "PENDING",

        requirementDescription: requirement || "",

        photos,
      });

      console.log("BOOKING CREATED:", newBooking);

      setBookingSuccess(newBooking);
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      setErrorMessage(
        error?.message || "Failed to create booking. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * --------------------------------------------------
   * LOADING
   * --------------------------------------------------
   */

  if (servicesLoading || workersLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />

          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Loading booking information...
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Loading services and workers
          </p>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * SERVICE UNAVAILABLE
   * --------------------------------------------------
   */

  if (!currentService && !servicesLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-lg dark:border-rose-900 dark:bg-slate-900">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
            <FileText className="h-8 w-8" />
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Service unavailable
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            No service could be loaded from the server.
          </p>

          {(servicesError || workersError) && (
            <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
              {servicesError || workersError}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                reloadServices();
              }}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
            >
              Retry
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * SUCCESS SCREEN
   * --------------------------------------------------
   */

  if (bookingSuccess) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-lg dark:bg-emerald-950 dark:text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Booking ID: #{bookingSuccess.id}
          </span>

          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {t("bookingSuccessTitle")}
          </h1>

          <p className="mx-auto max-w-md text-sm text-slate-500 dark:text-slate-400">
            {t("bookingSuccessSub")}
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <span className="block text-xs text-slate-400">Service</span>

              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {bookingSuccess.serviceTitle}
              </p>
            </div>

            <div className="text-right">
              <span className="block text-xs text-slate-400">Total</span>

              <p className="text-lg font-black text-indigo-600">
                ₹{bookingSuccess.price}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="block text-slate-400">
                {bookingSuccess.requestMode === "broadcast"
                  ? "Worker Assignment"
                  : "Assigned Saathi"}
              </span>

              <span className="font-bold text-slate-800 dark:text-slate-200">
                {bookingSuccess.requestMode === "broadcast"
                  ? "Finding a Saathi..."
                  : bookingSuccess.workerName}
              </span>
            </div>

            <div>
              <span className="block text-slate-400">Schedule</span>

              <span className="font-bold text-slate-800 dark:text-slate-200">
                {bookingSuccess.date}
                {" at "}
                {bookingSuccess.timeSlot}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={`/customer/bookings/${bookingSuccess.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            {t("trackBooking")}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/customer"
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * MAIN BOOKING PAGE
   * --------------------------------------------------
   */

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Cancel & Go Back
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
          Book a Cooperative Service
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Select schedule, add your requirements and confirm the service.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-12"
      >
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-8">
          {/* SERVICE + WORKER */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              1. Service & Assigned Worker
            </h3>
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <span className="text-xs font-semibold text-slate-400">
                  Service
                </span>

                <div className="mt-1 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-black text-slate-900 dark:text-white">
                      {currentService?.title ||
                        currentService?.name ||
                        "Service"}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {currentService?.description ||
                        "Local professional service"}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-indigo-600">
                      ₹
                      {currentService?.price ||
                        currentService?.startingPrice ||
                        0}
                    </span>
                  </div>
                </div>
              </div>

              {currentWorker ? (
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <img
                    src={currentWorker.avatar}
                    alt={currentWorker.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-xs text-slate-400">Assigned Saathi</p>

                    <h3 className="font-black text-slate-900 dark:text-white">
                      {currentWorker.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {currentWorker.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-600">
                      Verified
                    </p>

                    <p className="text-xs text-slate-400">
                      {currentWorker.rating
                        ? `${currentWorker.rating} ★`
                        : "New Saathi"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-600">
                  No worker available.
                </div>
              )}
            </div>
          </div>

          {/* DATE / TIME */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              <Calendar className="h-4 w-4 text-indigo-600" />
              2. Schedule
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-500">
                  Date
                </label>

                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Clock className="h-3 w-3" />
                  Time
                </label>

                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              <MapPin className="h-4 w-4 text-rose-500" />
              3. Service Address
            </h3>

            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Flat no., Society, Street, Landmark, City, PIN"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* PHOTOS */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              <Camera className="h-4 w-4 text-indigo-600" />
              4. Photos
            </h3>

            <PhotoUploader
              photos={photos}
              onPhotosChange={setPhotos}
              maxPhotos={4}
            />
          </div>

          {/* REQUIREMENT */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              <FileText className="h-4 w-4 text-indigo-600" />
              5. Requirement Details
            </h3>

            <textarea
              rows={4}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="Describe the problem..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* PAYMENT */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
              6. Payment Method
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("Cash After Service")}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  paymentMethod === "Cash After Service"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                    : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                }`}
              >
                <Banknote className="h-5 w-5 text-emerald-600" />

                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    Cash After Service
                  </p>

                  <p className="text-xs text-slate-400">Pay after service</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Demo UPI / Online")}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  paymentMethod === "Demo UPI / Online"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                    : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                }`}
              >
                <CreditCard className="h-5 w-5 text-indigo-600" />

                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    Demo UPI / Online
                  </p>

                  <p className="text-xs text-slate-400">Prototype payment</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
              Booking Summary
            </h3>

            <div className="space-y-3 border-b border-slate-100 pb-5 dark:border-slate-800">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service</span>

                <span className="max-w-[180px] text-right font-bold text-slate-900 dark:text-white">
                  {currentService?.title || currentService?.name}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service Fee</span>

                <span className="font-bold text-slate-900 dark:text-white">
                  ₹{currentService?.price || currentService?.startingPrice || 0}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Visit Charge</span>

                <span className="font-semibold text-emerald-600">₹0</span>
              </div>
            </div>

            <div className="my-5 flex items-center justify-between">
              <span className="text-sm font-black text-slate-900 dark:text-white">
                Estimated Total
              </span>

              <span className="text-2xl font-black text-indigo-600">
                ₹{currentService?.price || currentService?.startingPrice || 0}
              </span>
            </div>

            <button
              type="submit"
              disabled={
                submitting ||
                !currentService ||
                !currentWorker
              }
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-black text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Confirming Booking..." : "Confirm Booking"}

              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <p className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Safe & Fair Booking
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                "Your request will appear on the selected Saathi's dashboard."
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingFlowPage;
