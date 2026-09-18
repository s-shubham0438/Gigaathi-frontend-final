import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBookings,
  fetchBookingById,
  createNewBooking,
  updateBookingStatus,
  cancelBookingThunk,
  submitServiceReview,
  setActiveTab,
  clearSelectedBooking,
} from '../state/bookingSlice';
import { showToast } from '../../../shared/state/uiSlice';

export const useBookings = (customerId, autoFetch = false) => {
  const dispatch = useDispatch();
  const { bookings, selectedBooking, activeTab, status, error } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchBookings(customerId ? { customerId } : {}));
    }
  }, [autoFetch, customerId, dispatch]);

  const customerBookings = useMemo(() => {
    if (!customerId) return bookings;
    return bookings.filter((b) => b.customerId === customerId);
  }, [bookings, customerId]);

  const tabFilteredBookings = useMemo(() => {
    if (activeTab === 'ALL') return customerBookings;

    if (activeTab === 'UPCOMING') {
      return customerBookings.filter(
        (b) =>
          b.status === 'ACCEPTED' ||
          b.status === 'REQUESTED'
      );
    }

    if (activeTab === 'ACTIVE') {
      return customerBookings.filter(
        (b) => b.status === 'IN_PROGRESS'
      );
    }

    if (activeTab === 'COMPLETED') {
      return customerBookings.filter(
        (b) => b.status === 'COMPLETED'
      );
    }

    if (activeTab === 'CANCELLED') {
      return customerBookings.filter(
        (b) => b.status === 'CANCELLED'
      );
    }

    return customerBookings;
  }, [customerBookings, activeTab]);

  const createBooking = async (bookingData) => {
    const resultAction = await dispatch(
      createNewBooking(bookingData)
    );

    if (createNewBooking.fulfilled.match(resultAction)) {
      dispatch(
        showToast({
          message:
            'Booking request sent to your Saathi!',
          type: 'success',
        })
      );

      return resultAction.payload;
    } else {
      throw new Error(
        resultAction.error?.message ||
          'Booking failed'
      );
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await dispatch(cancelBookingThunk(bookingId)).unwrap();

      // Refetch latest bookings
      await dispatch(fetchBookings(customerId ? { customerId } : {}));

      dispatch(
        showToast({
          message: 'Booking has been cancelled',
          type: 'info',
        })
      );
    } catch (err) {
      // If server returns error, still perform local status update so UI moves to Cancelled tab
      dispatch(
        updateBookingStatus({
          bookingId,
          status: 'CANCELLED',
        })
      );
      dispatch(
        showToast({
          message: 'Booking marked as cancelled',
          type: 'info',
        })
      );
    }
  };

  const submitReview = async ({
    bookingId,
    workerId,
    rating,
    comment,
    customerName,
    customerAvatar,
  }) => {
    await dispatch(
      submitServiceReview({
        bookingId,
        workerId,
        rating,
        comment,
        customerId,
        customerName:
          customerName || 'Amit Sharma',
        customerAvatar,
      })
    );

    dispatch(
      showToast({
        message:
          'Thank you for rating your Saathi!',
        type: 'success',
      })
    );
  };

  return {
    bookings: tabFilteredBookings,
    allCustomerBookings: customerBookings,
    selectedBooking,
    activeTab,
    isLoading: status === 'loading',
    error,

    changeTab: (tab) =>
      dispatch(setActiveTab(tab)),

    loadBookingById: (id) =>
      dispatch(fetchBookingById(id)),

    createBooking,

    cancelBooking,

    submitReview,

    clearSelected: () =>
      dispatch(clearSelectedBooking()),

    reloadBookings: () =>
      dispatch(
        fetchBookings(
          customerId
            ? { customerId }
            : {}
        )
      ),
  };
};

export default useBookings;