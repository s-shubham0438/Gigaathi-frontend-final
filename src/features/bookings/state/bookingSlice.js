import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import bookingApi from '../api/bookingApi';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (filters = {}, { rejectWithValue }) => {
    try {
      return await bookingApi.getBookings(filters);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to load bookings'
      );
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      return await bookingApi.getBookingById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to load booking'
      );
    }
  }
);

export const createNewBooking = createAsyncThunk(
  'bookings/createNewBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      return await bookingApi.createBooking(bookingData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Booking failed'
      );
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateBookingStatus',
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      return await bookingApi.updateBookingStatus({
        bookingId,
        status,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to update booking'
      );
    }
  }
);

export const cancelBookingThunk = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      if (bookingApi.cancelBooking) {
        return await bookingApi.cancelBooking(bookingId);
      }
      return await bookingApi.updateBookingStatus({
        bookingId,
        status: 'CANCELLED',
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to cancel booking'
      );
    }
  }
);

/*
 * Review functionality is still kept compatible with the
 * existing frontend.
 *
 * The actual review API can be connected later.
 */
export const submitServiceReview = createAsyncThunk(
  'bookings/submitServiceReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      if (bookingApi.submitReview) {
        return await bookingApi.submitReview(reviewData);
      }

      // Keep existing UI working until review backend is connected.
      return reviewData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Failed to submit review'
      );
    }
  }
);

const initialState = {
  bookings: [],
  selectedBooking: null,
  activeTab: 'ALL',
  status: 'idle',
  error: null,
};

export const bookingSlice = createSlice({
  name: 'bookings',

  initialState,

  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },

    clearBookingError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // FETCH BOOKINGS
      // =========================

      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })

      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload || 'Failed to load bookings';
      })

      // =========================
      // FETCH SINGLE BOOKING
      // =========================

      .addCase(fetchBookingById.pending, (state) => {
        state.error = null;
      })

      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.selectedBooking = action.payload;
      })

      .addCase(fetchBookingById.rejected, (state, action) => {
        state.error =
          action.payload || 'Failed to load booking';
      })

      // =========================
      // CREATE BOOKING
      // =========================

      .addCase(createNewBooking.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(createNewBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.bookings.unshift(action.payload);

        state.selectedBooking = action.payload;
      })

      .addCase(createNewBooking.rejected, (state, action) => {
        state.status = 'failed';

        state.error =
          action.payload || 'Booking failed';
      })

      // =========================
      // UPDATE BOOKING STATUS
      // =========================

      .addCase(updateBookingStatus.pending, (state) => {
        state.error = null;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const updatedBooking = action.payload;

        state.bookings = state.bookings.map(
          (booking) =>
            booking.id === updatedBooking.id
              ? updatedBooking
              : booking
        );

        if (
          state.selectedBooking?.id ===
          updatedBooking.id
        ) {
          state.selectedBooking = updatedBooking;
        }
      })

      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error =
          action.payload ||
          'Failed to update booking';
      })

      // =========================
      // CANCEL BOOKING
      // =========================

      .addCase(cancelBookingThunk.fulfilled, (state, action) => {
        const cancelledBooking = action.payload;
        if (cancelledBooking) {
          state.bookings = state.bookings.map((booking) =>
            booking.id === cancelledBooking.id ? cancelledBooking : booking
          );
          if (state.selectedBooking?.id === cancelledBooking.id) {
            state.selectedBooking = cancelledBooking;
          }
        }
      })

      // =========================
      // SUBMIT REVIEW
      // =========================

      .addCase(submitServiceReview.pending, (state) => {
        state.error = null;
      })

      .addCase(
        submitServiceReview.fulfilled,
        (state) => {
          state.error = null;
        }
      )

      .addCase(
        submitServiceReview.rejected,
        (state, action) => {
          state.error =
            action.payload ||
            'Failed to submit review';
        }
      );
  },
});

export const {
  setActiveTab,
  clearSelectedBooking,
  clearBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer;