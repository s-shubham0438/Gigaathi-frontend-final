import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Calendar,
  Sparkles,
  ArrowRight,
  Loader2,
  Users,
  Send,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useLanguage } from "../../shared/hooks/useLanguage";
import { useServices } from "../../features/services/hooks/useServices";
import { useWorkers } from "../../features/workers/hooks/useWorkers";
import { useBookings } from "../../features/bookings/hooks/useBookings";

import CategoryGrid from "../../features/services/components/CategoryGrid";
import ServiceCard from "../../features/services/components/ServiceCard";
import WorkerCard from "../../features/workers/components/WorkerCard";
import EmergencyCard from "../../features/services/components/EmergencyCard";
import StatusBadge from "../../shared/components/ui/StatusBadge";

export const CustomerHome = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { t } = useLanguage();

  const {
    categories = [],
    popularServices = [],
  } = useServices(true);

  const {
    workers = [],
    nearbyWorkers = [],
    isLoading: workersLoading,
    error: workersError,
  } = useWorkers(true);

  const { bookings = [] } = useBookings(
    user?.id || "cust-1",
    true
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  // Raise Request modal state
  const [showRaiseRequest, setShowRaiseRequest] =
    useState(false);

  const [requestCategory, setRequestCategory] =
    useState("");

  const [requestLoading, setRequestLoading] =
    useState(false);

  const activeBooking = bookings.find(
    (b) =>
      b.status === "ACCEPTED" ||
      b.status === "IN_PROGRESS" ||
      b.status === "REQUESTED"
  );

  const filteredWorkers = useMemo(() => {
    if (
      !selectedCategory ||
      selectedCategory === "all"
    ) {
      return nearbyWorkers;
    }

    return workers.filter(
      (worker) =>
        worker.isAvailableToday &&
        worker.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
    );
  }, [
    workers,
    nearbyWorkers,
    selectedCategory,
  ]);

  const categoriesWithWorkerCount = useMemo(() => {
    return categories.map((category) => {
      const count = workers.filter(
        (worker) =>
          worker.category?.toLowerCase() ===
          category.id?.toLowerCase()
      ).length;

      return {
        ...category,
        count,
      };
    });
  }, [categories, workers]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/services?q=${encodeURIComponent(
          search.trim()
        )}`
      );
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Open Raise Request modal
  const openRaiseRequest = () => {
    setRequestCategory("");
    setShowRaiseRequest(true);
  };

  // Close Raise Request modal
  const closeRaiseRequest = () => {
    if (requestLoading) return;

    setShowRaiseRequest(false);
    setRequestCategory("");
  };

  // Open the dedicated Raise Request flow.
  // Individual worker booking remains on /customer/book.
  const handleRaiseRequest = () => {
    if (!requestCategory) return;

    setRequestLoading(true);

    navigate(
      `/customer/raise-request?category=${encodeURIComponent(
        requestCategory
      )}`
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">

      {/* =========================================================
          WELCOME BANNER
      ========================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium text-blue-100">
            Welcome back 👋
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            {user?.name
              ? `Hello, ${user.name}!`
              : "Find the right professional for you"}
          </h1>

          <p className="mt-3 text-blue-100 text-sm sm:text-base">
            Book trusted local professionals for all your
            home and service needs.
          </p>
        </div>

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-20 h-48 w-48 rounded-full bg-white/10" />
      </section>

      {/* =========================================================
          COMMUNITY CLEANING SPOTLIGHT BANNER
      ========================================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-teal-100">
              <Sparkles className="w-3 h-3" /> Swachh Neighbourhood
            </span>
            <h2 className="text-xl font-black">Community & Civic Cleaning Drives</h2>
            <p className="text-xs text-teal-100 leading-relaxed">
              Organize street sweeping, open drain sanitation, and park cleanup with direct Saathi worker assignment & ImageKit verified proofs.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/customer/community/cleaning')}
              className="px-4 py-2.5 rounded-xl bg-white text-teal-800 text-xs font-black hover:bg-teal-50 transition shadow"
            >
              Post Drive
            </button>
            <button
              type="button"
              onClick={() => navigate('/customer/community/requests')}
              className="px-4 py-2.5 rounded-xl bg-black/20 text-white text-xs font-bold hover:bg-black/30 border border-white/20 transition"
            >
              Live Drives
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          URGENT BOOKING BANNER
      ========================================================= */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-rose-100">
              <Zap className="w-3 h-3" /> Emergency / Urgent
            </span>
            <h2 className="text-xl font-black">Need Immediate Help?</h2>
            <p className="text-xs text-rose-100 leading-relaxed">
              Skip scheduling — broadcast your request instantly to all available Saathis. First to accept gets the job.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/customer/urgent-booking')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-rose-700 text-xs font-black hover:bg-rose-50 transition shadow shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            Book Urgently
          </button>
        </div>
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 right-16 h-36 w-36 rounded-full bg-white/10" />
      </section>

      {/* =========================================================
          ACTIVE BOOKING
      ========================================================= */}
      {activeBooking && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Active Booking
                </p>

                <h2 className="mt-1 font-semibold text-gray-900">
                  {activeBooking.serviceName ||
                    activeBooking.service?.name ||
                    "Your service booking"}
                </h2>

                <div className="mt-2">
                  <StatusBadge
                    status={activeBooking.status}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/bookings")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              View Booking
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </section>
      )}

      {/* =========================================================
          SEARCH
      ========================================================= */}
      <section>
        <form
          onSubmit={handleSearchSubmit}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search for a service..."
            className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-28 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </section>

      {/* =========================================================
          RAISE A REQUEST
      ========================================================= */}
      <section>
        <button
          type="button"
          onClick={openRaiseRequest}
          className="group w-full overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm transition group-hover:scale-105">
              <Send className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Raise a Request
                </h2>

                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  Need a worker?
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-600">
                Don't want to choose a specific worker?
                Raise a request and available workers from
                your selected category can accept it.
              </p>
            </div>

            <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-1" />
          </div>
        </button>
      </section>

      {/* =========================================================
          EMERGENCY
      ========================================================= */}
      <EmergencyCard />

      {/* =========================================================
          CATEGORIES
      ========================================================= */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Browse Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Find professionals based on your needs
            </p>
          </div>
        </div>

        <CategoryGrid
          categories={categoriesWithWorkerCount}
          activeCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </section>

      {/* =========================================================
          WORKERS
      ========================================================= */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedCategory === "all"
                  ? "Available Workers"
                  : "Workers in this Category"}
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Choose a professional and book directly
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() =>
                setSelectedCategory("all")
              }
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          )}
        </div>

        {workersLoading ? (
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center gap-3 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading workers...
            </div>
          </div>
        ) : workersError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              Unable to load workers
            </p>

            <p className="mt-1 text-sm text-red-600">
              Please try again later.
            </p>
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <Users className="mx-auto h-10 w-10 text-gray-300" />

            <h3 className="mt-4 font-semibold text-gray-900">
              No workers found
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              You can raise a request for this category
              instead.
            </p>

            <button
              type="button"
              onClick={openRaiseRequest}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              Raise a Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          POPULAR SERVICES
      ========================================================= */}
      {popularServices.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Popular Services
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Services customers commonly book
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          RAISE REQUEST MODAL
      ========================================================= */}
      {showRaiseRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={closeRaiseRequest}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 p-6 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                    <Send className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Raise a Request
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                      Select the type of worker you need
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeRaiseRequest}
                disabled={requestLoading}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category Selection */}
            <div className="p-6 overflow-visible">
              {categoriesWithWorkerCount.length ===
              0 ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800">
                  <Wrench className="mx-auto h-10 w-10 text-gray-400" />

                  <p className="mt-3 font-medium text-gray-900 dark:text-white">
                    No categories available
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                    Please try again later.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {categoriesWithWorkerCount.map(
                      (category) => {
                        const isSelected =
                          requestCategory ===
                          category.id;

                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() =>
                              setRequestCategory(
                                category.id
                              )
                            }
                            className={`rounded-2xl border p-3 sm:p-4 text-left transition ${
                              isSelected
                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                          >
                            <div
                              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <Wrench className="h-5 w-5" />
                            </div>

                            <p className="font-semibold text-gray-900 dark:text-white">
                              {category.name}
                            </p>

                            {category.hindiName && (
                              <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">
                                {category.hindiName}
                              </p>
                            )}

                            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                              {category.count || 0}{" "}
                              workers available
                            </p>
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Explanation */}
                  <div className="mt-5 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                      How Raise a Request works
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-700 dark:text-blue-300">
                      Your request will be sent to available
                      workers in the selected category. The
                      first worker to accept the request gets
                      the job.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 p-5 dark:border-slate-800 dark:bg-slate-800/60 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeRaiseRequest}
                disabled={requestLoading}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRaiseRequest}
                disabled={
                  !requestCategory ||
                  requestLoading
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {requestLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;