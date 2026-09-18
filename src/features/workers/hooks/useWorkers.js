import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchWorkers,
  fetchWorkerById,
  clearSelectedWorker,
} from '../state/workerSlice';

export const useWorkers = (
  autoFetch = false,
  filters = {}
) => {
  const dispatch = useDispatch();

  const {
    workers,
    selectedWorker,
    status,
    error,
  } = useSelector((state) => state.workers);

  const category = filters?.category || 'all';
  const location = filters?.location || '';

  useEffect(() => {
    if (autoFetch) {
      dispatch(
        fetchWorkers({
          category,
          location,
        })
      );
    }
  }, [
    autoFetch,
    category,
    location,
    dispatch,
  ]);

  // Available workers first
  const nearbyWorkers = useMemo(() => {
    return [...workers]
      .filter((worker) => worker.isAvailableToday)
      .sort(
        (a, b) =>
          a.distanceKm - b.distanceKm
      );
  }, [workers]);

  // Highest rated workers
  const topRatedWorkers = useMemo(() => {
    return [...workers].sort(
      (a, b) => b.rating - a.rating
    );
  }, [workers]);

  // Client-side category filter
  const getWorkersByCategory = (categoryName) => {
    if (!categoryName || categoryName === 'all') {
      return workers;
    }

    return workers.filter(
      (worker) =>
        worker.category?.toLowerCase() ===
        categoryName.toLowerCase()
    );
  };

  const loadWorkers = (params = {}) => {
    return dispatch(fetchWorkers(params));
  };

  const loadWorkerById = (id) => {
    return dispatch(fetchWorkerById(id));
  };

  return {
    workers,

    nearbyWorkers,

    topRatedWorkers,

    selectedWorker,

    isLoading: status === 'loading',

    error,

    getWorkersByCategory,

    loadWorkers,

    loadWorkerById,

    clearSelected: () =>
      dispatch(clearSelectedWorker()),

    reloadWorkers: () =>
      dispatch(
        fetchWorkers({
          category,
          location,
        })
      ),
  };
};

export default useWorkers;
