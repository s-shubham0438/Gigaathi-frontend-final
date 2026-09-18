import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBookings,
  updateBookingStatus,
} from '../state/bookingSlice';
import { fetchWorkers } from '../../workers/state/workerSlice';
import { showToast } from '../../../shared/state/uiSlice';
import bookingApi from '../api/bookingApi';
import { mockWorkers } from '../../../mocks/data/workers';

export const useWorkerJobs = (
  workerId,
  autoFetch = true
) => {
  const dispatch = useDispatch();

  const {
    bookings,
    status,
  } = useSelector(
    (state) => state.bookings
  );

  const { workers } = useSelector(
    (state) => state.workers
  );

  useEffect(() => {
    if (autoFetch && workerId) {
      dispatch(
        fetchBookings({
          workerId,
        })
      );
      if (workers.length === 0) {
        dispatch(fetchWorkers());
      }
    }
  }, [
    autoFetch,
    workerId,
    workers.length,
    dispatch,
  ]);

  const currentWorker = useMemo(() => {
    const found = workers.find(
      (worker) =>
        worker.userId === workerId ||
        worker.id === workerId
    );
    if (found) return found;
    return (
      mockWorkers.find(
        (worker) =>
          worker.id === workerId ||
          worker.userId === workerId
      ) || null
    );
  }, [
    workers,
    workerId,
  ]);

  /*
   * IMPORTANT:
   *
   * Normal booking:
   *   booking.workerId === workerId
   *
   * Raised/broadcast booking:
   *   booking.workerId === null
   *
   * Backend already filters broadcast requests
   * by the logged-in worker's category.
   *
   * Therefore we MUST NOT filter broadcast
   * requests using workerId here.
   */

  const workerJobs = useMemo(() => {
    if (!workerId) {
      return [];
    }

    return bookings.filter((booking) => {
      /*
       * Already assigned jobs.
       */
      if (
        booking.workerId === workerId
      ) {
        return true;
      }

      /*
       * Raised/broadcast requests.
       *
       * Backend has already verified:
       * - worker category
       * - request is pending
       * - worker has not declined
       *
       * So allow them through.
       */
      if (
        booking.requestMode ===
          'broadcast' ||
        booking.requestMode ===
          'raised'
      ) {
        return (
          booking.status ===
          'REQUESTED'
        );
      }

      return false;
    });
  }, [
    bookings,
    workerId,
  ]);

  /*
   * ALL PENDING REQUESTS
   */
  const pendingRequests = useMemo(
    () =>
      workerJobs.filter(
        (booking) =>
          booking.status ===
          'REQUESTED'
      ),
    [workerJobs]
  );

  /*
   * NORMAL REQUESTS
   *
   * Customer selected this worker directly.
   */
  const normalRequests = useMemo(
    () =>
      pendingRequests.filter(
        (booking) =>
          booking.requestMode !==
            'broadcast' &&
          booking.requestMode !==
            'raised'
      ),
    [pendingRequests]
  );

  /*
   * RAISED REQUESTS
   *
   * Customer selected:
   * "Raise a Request"
   */
  const raisedRequests = useMemo(
    () =>
      pendingRequests.filter(
        (booking) =>
          booking.requestMode ===
            'broadcast' ||
          booking.requestMode ===
            'raised'
      ),
    [pendingRequests]
  );

  /*
   * UPCOMING
   */
  const upcomingJobs = useMemo(
    () =>
      workerJobs.filter(
        (booking) =>
          booking.status ===
          'ACCEPTED'
      ),
    [workerJobs]
  );

  /*
   * ACTIVE
   */
  const activeJobs = useMemo(
    () =>
      workerJobs.filter(
        (booking) =>
          booking.status ===
          'IN_PROGRESS'
      ),
    [workerJobs]
  );

  /*
   * COMPLETED
   */
  const completedJobs = useMemo(
    () =>
      workerJobs.filter(
        (booking) =>
          booking.status ===
          'COMPLETED'
      ),
    [workerJobs]
  );

  /*
   * EARNINGS
   */
  const todayEarnings =
    useMemo(() => {
      return completedJobs.reduce(
        (sum, booking) =>
          sum +
          (booking.price || 0),
        0
      );
    }, [completedJobs]);

  /*
   * ACCEPT JOB
   *
   * For broadcast requests the backend
   * performs an atomic first-worker-wins
   * operation.
   */
  const acceptJob = async (
    bookingId
  ) => {
    const result =
      await dispatch(
        updateBookingStatus({
          bookingId,
          status: 'ACCEPTED',
        })
      );

    if (
      updateBookingStatus.fulfilled.match(
        result
      )
    ) {
      dispatch(
        showToast({
          message:
            'Job accepted! Customer has been notified.',
          type: 'success',
        })
      );

      /*
       * Refresh after accepting so
       * the raised request disappears
       * and becomes an upcoming job.
       */
      if (workerId) {
        dispatch(
          fetchBookings({
            workerId,
          })
        );
      }
    } else {
      dispatch(
        showToast({
          message:
            result.payload ||
            'This request is no longer available.',
          type: 'info',
        })
      );

      if (workerId) {
        dispatch(
          fetchBookings({
            workerId,
          })
        );
      }
    }
  };

  /*
   * DECLINE JOB
   *
   * Normal request:
   *   Existing CANCELLED behavior.
   *
   * Raised request:
   *   Only this worker declines it.
   *   Other workers can still accept.
   */
  const declineJob = async (
    bookingId
  ) => {
    const booking =
      workerJobs.find(
        (job) =>
          job.id === bookingId
      );

    if (
      booking?.requestMode ===
        'broadcast' ||
      booking?.requestMode ===
        'raised'
    ) {
      try {
        await bookingApi.declineBookingRequest(
          bookingId
        );

        dispatch(
          showToast({
            message:
              'Request declined.',
            type: 'info',
          })
        );

        if (workerId) {
          dispatch(
            fetchBookings({
              workerId,
            })
          );
        }
      } catch (error) {
        dispatch(
          showToast({
            message:
              error?.response?.data
                ?.message ||
              error?.message ||
              'Unable to decline request.',
            type: 'info',
          })
        );
      }

      return;
    }

    /*
     * Existing individual booking behavior.
     */
    const result =
      await dispatch(
        updateBookingStatus({
          bookingId,
          status: 'CANCELLED',
        })
      );

    if (
      updateBookingStatus.fulfilled.match(
        result
      )
    ) {
      dispatch(
        showToast({
          message:
            'Job declined.',
          type: 'info',
        })
      );
    }
  };

  /*
   * START JOB
   */
  const startJob = async (
    bookingId
  ) => {
    const result =
      await dispatch(
        updateBookingStatus({
          bookingId,
          status: 'IN_PROGRESS',
        })
      );

    if (
      updateBookingStatus.fulfilled.match(
        result
      )
    ) {
      dispatch(
        showToast({
          message:
            'Service marked in progress.',
          type: 'success',
        })
      );
    }
  };

  /*
   * COMPLETE JOB
   */
  const completeJob = async (
    bookingId
  ) => {
    const result =
      await dispatch(
        updateBookingStatus({
          bookingId,
          status: 'COMPLETED',
        })
      );

    if (
      updateBookingStatus.fulfilled.match(
        result
      )
    ) {
      dispatch(
        showToast({
          message:
            'Service marked complete!',
          type: 'success',
        })
      );
    }
  };

  return {
    currentWorker,

    allJobs:
      workerJobs,

    pendingRequests,

    normalRequests,

    raisedRequests,

    upcomingJobs,

    activeJobs,

    completedJobs,

    todayEarnings,

    welfareBalance:
      currentWorker
        ?.welfareBalance || 0,

    isOnline:
      currentWorker
        ?.isAvailableToday ??
      true,

    isLoading:
      status === 'loading',

    acceptJob,

    declineJob,

    startJob,

    completeJob,

    reloadJobs: () =>
      workerId
        ? dispatch(
            fetchBookings({
              workerId,
            })
          )
        : null,
  };
};

export default useWorkerJobs;