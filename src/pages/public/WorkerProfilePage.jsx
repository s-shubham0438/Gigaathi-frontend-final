import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Calendar,
  ArrowLeft,
} from "lucide-react";

import { useWorkers } from "../../features/workers/hooks/useWorkers";
import { useLanguage } from "../../shared/hooks/useLanguage";
import reviewApi from "../../features/workers/api/reviewApi";

export const WorkerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    loadWorkerById,
    selectedWorker,
    isLoading,
  } = useWorkers(true);

  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  const [reviewsLoading, setReviewsLoading] =
    useState(true);

  useEffect(() => {
    if (id) {
      loadWorkerById(id);
    }
  }, [id]);

  // ==========================================
  // LOAD REAL REVIEWS
  // ==========================================

  useEffect(() => {
    const loadReviews = async () => {
      if (!selectedWorker?.userId) {
        return;
      }

      try {
        setReviewsLoading(true);

        const result =
          await reviewApi.getProfessionalReviews(
            selectedWorker.userId
          );

        setReviews(result.reviews || []);

        setReviewStats({
          averageRating:
            Number(
              result.stats?.averageRating || 0
            ),

          totalReviews:
            Number(
              result.stats?.totalReviews || 0
            ),
        });
      } catch (error) {
        console.error(
          "FAILED TO LOAD REVIEWS:",
          error
        );

        setReviews([]);
        setReviewStats({
          averageRating: 0,
          totalReviews: 0,
        });
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [selectedWorker?.userId]);

  if (isLoading && !selectedWorker) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-sm font-semibold text-slate-500">
          Loading worker profile...
        </div>
      </div>
    );
  }

  if (!selectedWorker) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500">
          Worker profile not found.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const worker = selectedWorker;

  const averageRating =
    Number(reviewStats.averageRating || 0);

  const totalReviews =
    Number(reviewStats.totalReviews || 0);

  // ==========================================
  // TRUSTED SAATHI
  // More than 4.0 average rating
  // ==========================================

  const isTrusted =
    totalReviews > 0 &&
    averageRating > 4;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* ==========================================
          MAIN PROFILE CARD
      ========================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">

          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl object-cover ring-4 ring-indigo-50 dark:ring-slate-800 shadow-md"
              />

              {worker.isAvailableToday && (
                <span
                  className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
                  title="Available Today"
                />
              )}
            </div>

            {/* Worker information */}
            <div className="space-y-1">

              <div className="flex items-center gap-2 flex-wrap">

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {worker.name}
                </h1>

                {/* Existing verification */}
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Saathi
                </span>

                {/* TRUSTED BADGE */}
                {isTrusted && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Trusted Saathi
                  </span>
                )}

              </div>

              <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
                {worker.category} Specialist •{" "}
                {worker.experienceYears} Years Experience
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Member of{" "}
                <strong>
                  {worker.cooperativeName}
                </strong>
              </p>

              <div className="flex items-center gap-3 pt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {worker.distanceKm} km away
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {worker.responseTimeMinutes}m avg response
                </span>
              </div>

            </div>
          </div>

          {/* Book CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block text-right">
                Standard Rate
              </span>

              <span className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{worker.hourlyRate}/hr
              </span>
            </div>

            <Link
              to={`/customer/book?workerId=${worker.id}&category=${worker.category}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-black text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Book this Saathi</span>
            </Link>

          </div>
        </div>

        {/* ==========================================
            STATS
        ========================================== */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 dark:border-slate-800 text-center">

          {/* Rating */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40">

            <span className="text-xs text-slate-400 block font-medium">
              Customer Rating
            </span>

            <div className="flex items-center justify-center gap-1.5 mt-1">

              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />

              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                {averageRating > 0
                  ? averageRating.toFixed(1)
                  : "No rating"}
              </span>

            </div>

          </div>

          {/* Review count */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40">

            <span className="text-xs text-slate-400 block font-medium">
              Customer Reviews
            </span>

            <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">
              {totalReviews}{" "}
              {totalReviews === 1
                ? "Review"
                : "Reviews"}
            </span>

          </div>

          {/* Completed jobs */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40">

            <span className="text-xs text-slate-400 block font-medium">
              Completed Jobs
            </span>

            <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">
              {worker.completedJobs} Jobs
            </span>

          </div>

          {/* Languages */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40">

            <span className="text-xs text-slate-400 block font-medium">
              Spoken Languages
            </span>

            <span className="text-xs font-bold text-slate-900 dark:text-white block mt-1 truncate">
              {worker.languages?.join(", ") ||
                "Hindi, English"}
            </span>

          </div>

        </div>

        {/* ==========================================
            RATING STAR DISPLAY
        ========================================== */}

        <div className="py-6 border-b border-slate-100 dark:border-slate-800">

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                ))}
              </div>

              <span className="text-lg font-black text-slate-900 dark:text-white">
                {averageRating > 0
                  ? averageRating.toFixed(1)
                  : "0.0"}
                /5
              </span>

            </div>

            <span className="text-xs text-slate-500">
              Based on {totalReviews} verified{" "}
              {totalReviews === 1
                ? "customer review"
                : "customer reviews"}
            </span>

          </div>

        </div>

        {/* ==========================================
            ABOUT
        ========================================== */}

        <div className="py-6 space-y-4">

          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            About {worker.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {worker.about}
          </p>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">
            Trade Skills & Specializations
          </h4>

          <div className="flex flex-wrap gap-2">
            {worker.skills?.map((skill) => (
              <span
                key={skill}
                className="rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900"
              >
                ✓ {skill}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* ==========================================
          REAL CUSTOMER REVIEWS
      ========================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Customer Reviews
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              {totalReviews} verified{" "}
              {totalReviews === 1
                ? "customer has"
                : "customers have"}{" "}
              reviewed this Saathi
            </p>

          </div>

          <div className="flex items-center gap-2">

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {averageRating.toFixed(1)}
            </span>

          </div>

        </div>

        {reviewsLoading ? (
          <div className="py-8 text-center">
            <p className="text-xs text-slate-400">
              Loading reviews...
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-8 text-center">
            <Star className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />

            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-3">
              No reviews yet
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Reviews from completed jobs will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-3"
              >

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-2.5">

                    <img
                      src={review.customerAvatar}
                      alt={review.customerName}
                      className="h-9 w-9 rounded-full object-cover"
                    />

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {review.customerName}
                      </h5>

                      <span className="text-[10px] text-slate-400">
                        {review.date}
                      </span>
                    </div>

                  </div>

                  <div className="flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                      )
                    )}

                  </div>

                </div>

                {review.comment && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{review.comment}"
                  </p>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default WorkerProfilePage;