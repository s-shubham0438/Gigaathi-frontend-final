import axiosInstance from "../../../shared/lib/axiosInstance";

const mapReview = (review) => ({
  id: review._id,

  customerId:
    review.customer?._id ||
    review.customer ||
    "",

  customerName:
    review.customer?.name ||
    "Customer",

  customerAvatar:
    review.customer?.profileImage ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",

  rating: Number(review.rating || 0),

  comment:
    review.comment || "",

  bookingId:
    review.booking?._id ||
    review.booking ||
    "",

  date: review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "",
});

const reviewApi = {
  // ==========================================
  // GET REVIEWS FOR PROFESSIONAL
  // ==========================================
  getProfessionalReviews: async (professionalUserId) => {
    const { data } = await axiosInstance.get(
      `/reviews/professional/${professionalUserId}`
    );

    return {
      reviews: (data.reviews || []).map(mapReview),

      stats: {
        averageRating: Number(
          data.stats?.averageRating || 0
        ),

        totalReviews: Number(
          data.stats?.totalReviews || 0
        ),
      },
    };
  },

  // ==========================================
  // CREATE REVIEW
  // ==========================================
  createReview: async ({
    bookingId,
    rating,
    comment,
  }) => {
    const { data } = await axiosInstance.post(
      "/reviews",
      {
        booking: bookingId,
        rating,
        comment: comment || "",
      }
    );

    if (!data.review) {
      throw new Error(
        data.message || "Failed to submit review"
      );
    }

    return mapReview(data.review);
  },
};

export default reviewApi;