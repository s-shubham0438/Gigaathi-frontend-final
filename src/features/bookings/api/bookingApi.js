import axiosInstance from "../../../shared/lib/axiosInstance";

const normalizeStatus = (status) => {
  const map = {
    pending: "REQUESTED",
    accepted: "ACCEPTED",
    completed: "COMPLETED",
    cancelled: "CANCELLED",
    in_progress: "IN_PROGRESS",
  };

  return (
    map[status] ||
    String(status || "").toUpperCase()
  );
};

const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toISOString().split("T")[0];
};

const mapBooking = (b) => ({
  id: b._id,

  // Customer
  customerId:
    b.customer?._id || b.customer,

  customerName:
    b.customer?.name || "Customer",

  customerPhone:
    b.customer?.phone || "",

  customerEmail:
    b.customer?.email || "",

  // Worker
  workerId:
    b.professional?._id ||
    b.professional ||
    null,

  workerName:
    b.professional?.name ||
    (
      b.requestMode === "broadcast"
        ? "Searching for Saathi"
        : "Worker"
    ),

  workerPhone:
    b.professional?.phone || "",

  workerEmail:
    b.professional?.email || "",

  // Service
  serviceId:
    b.service?._id || b.service,

  serviceTitle:
    b.service?.name ||
    b.service?.title ||
    "Service",

  category:
    b.service?.category || "",

  // Request mode
  requestMode:
    b.requestMode || "individual",

  isBroadcast:
    b.requestMode === "broadcast",

  declinedBy:
    b.declinedBy || [],

  // Address
  customerAddress:
    b.address || "",

  address:
    b.address || "",

  // Date / Time
  date: formatDate(b.date),

  timeSlot:
    b.timeSlot || "",

  // Price
  price:
    b.price || 0,

  // Status
  status:
    normalizeStatus(b.status),

  // Requirements
  requirementDescription:
    b.description || "",

  description:
    b.description || "",

  photos:
    b.photos || [],

  // Payment
  paymentMethod:
    b.paymentMethod ||
    "Cash After Service",

  paymentStatus:
    b.paymentStatus || "PENDING",

  // Community Specific Details
  serviceType:
    b.serviceType || "HOUSEHOLD",

  communityDetails:
    b.communityDetails || null,

  createdAt:
    b.createdAt,

  updatedAt:
    b.updatedAt,
});

export const bookingApi = {
  /*
  |--------------------------------------------------------------------------
  | GET BOOKINGS
  |--------------------------------------------------------------------------
  */

  getBookings: async (filters = {}) => {
    let response;

    if (
      filters.workerId ||
      filters.professionalId
    ) {
      response =
        await axiosInstance.get(
          "/bookings/professional"
        );
    } else if (
      filters.customerId
    ) {
      response =
        await axiosInstance.get(
          "/bookings/customer"
        );
    } else {
      response =
        await axiosInstance.get(
          "/bookings/customer"
        );
    }

    return (
      response.data.bookings || []
    ).map(mapBooking);
  },

  /*
  |--------------------------------------------------------------------------
  | GET SINGLE
  |--------------------------------------------------------------------------
  */

  getBookingById: async (id) => {
    const { data } =
      await axiosInstance.get(
        `/bookings/${id}`
      );

    if (!data.booking) {
      throw new Error(
        "Booking not found"
      );
    }

    return mapBooking(
      data.booking
    );
  },

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  createBooking: async (
    bookingData
  ) => {
    const isBroadcast =
      bookingData.requestMode ===
      "broadcast";

    const payload = {
      /*
       * IMPORTANT:
       * Broadcast requests do NOT send a professional.
       */
      ...(isBroadcast
        ? {}
        : {
            professional:
              bookingData.professionalId ||
              bookingData.workerId,
          }),

      service:
        bookingData.serviceId,

      address:
        bookingData.customerAddress ||
        bookingData.address,

      date:
        bookingData.date,

      timeSlot:
        bookingData.timeSlot || "",

      description:
        bookingData.requirementDescription ||
        bookingData.description ||
        "",

      price:
        bookingData.price || 0,

      paymentMethod:
        bookingData.paymentMethod ||
        "Cash After Service",

      paymentStatus:
        bookingData.paymentStatus ||
        "PENDING",

      photos:
        bookingData.photos || [],

      requestMode:
        isBroadcast
          ? "broadcast"
          : "individual",

      serviceType:
        bookingData.serviceType || "HOUSEHOLD",

      communityDetails:
        bookingData.communityDetails || undefined,
    };

    const { data } =
      await axiosInstance.post(
        "/bookings",
        payload
      );

    if (!data.booking) {
      throw new Error(
        data.message ||
          "Booking failed"
      );
    }

    return mapBooking(
      data.booking
    );
  },

  /*
  |--------------------------------------------------------------------------
  | UPDATE STATUS
  |--------------------------------------------------------------------------
  */

  updateBookingStatus: async ({
    bookingId,
    status,
  }) => {
    const statusMap = {
      REQUESTED: "pending",
      ACCEPTED: "accepted",
      COMPLETED: "completed",
      CANCELLED: "cancelled",
      IN_PROGRESS: "in_progress",
    };

    const backendStatus =
      statusMap[status] ||
      String(status).toLowerCase();

    const { data } =
      await axiosInstance.patch(
        `/bookings/${bookingId}/status`,
        {
          status: backendStatus,
        }
      );

    if (!data.booking) {
      throw new Error(
        data.message ||
          "Booking status update failed"
      );
    }

    return mapBooking(
      data.booking
    );
  },

  /*
  |--------------------------------------------------------------------------
  | DECLINE BROADCAST REQUEST
  |--------------------------------------------------------------------------
  */

  declineBookingRequest:
    async (bookingId) => {
      const { data } =
        await axiosInstance.patch(
          `/bookings/${bookingId}/decline`
        );

      if (!data.booking) {
        throw new Error(
          data.message ||
            "Failed to decline request"
        );
      }

      return mapBooking(
        data.booking
      );
    },

  /*
  |--------------------------------------------------------------------------
  | CANCEL
  |--------------------------------------------------------------------------
  */

  cancelBooking: async (
    bookingId
  ) => {
    const { data } =
      await axiosInstance.patch(
        `/bookings/${bookingId}/cancel`
      );

    if (!data.booking) {
      throw new Error(
        data.message ||
          "Booking cancellation failed"
      );
    }

    return mapBooking(
      data.booking
    );
  },

  /*
  |--------------------------------------------------------------------------
  | REVIEW
  |--------------------------------------------------------------------------
  */

  submitReview: async ({
    bookingId,
    rating,
    comment,
  }) => {
    const { data } =
      await axiosInstance.post(
        "/reviews",
        {
          booking: bookingId,
          rating,
          comment:
            comment || "",
        }
      );

    if (!data.review) {
      throw new Error(
        data.message ||
          "Failed to submit review"
      );
    }

    return data.review;
  },
};

export default bookingApi;