import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCooperativeOverview,
  fetchDemandForecast,
  fetchOpportunityDistribution,
  runFairAllocationSimulation,
  setAllocationCategory,
} from '../state/cooperativeSlice';
import cooperativeApi from '../api/cooperativeApi';
import { showToast } from '../../../shared/state/uiSlice';

export const useCooperative = (autoFetch = true) => {
  const dispatch = useDispatch();
  const {
    overview,
    forecastData,
    distributionData,
    allocatedCandidates,
    selectedCategory,
    status,
    error,
  } = useSelector((state) => state.cooperative);

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchCooperativeOverview());
      dispatch(fetchDemandForecast());
      dispatch(fetchOpportunityDistribution());
      dispatch(runFairAllocationSimulation(selectedCategory));
    }
  }, [autoFetch, selectedCategory, dispatch]);

  const changeCategory = (category) => {
    dispatch(setAllocationCategory(category));
    dispatch(runFairAllocationSimulation(category));
  };

  const resetDemo = async () => {
    await cooperativeApi.resetDemoState();
    dispatch(fetchCooperativeOverview());
    dispatch(fetchDemandForecast());
    dispatch(fetchOpportunityDistribution());
    dispatch(runFairAllocationSimulation(selectedCategory));
    dispatch(showToast({ message: 'Demo data restored to default pristine state', type: 'info' }));
  };

  return {
    overview,
    forecastData,
    distributionData,
    allocatedCandidates,
    selectedCategory,
    isLoading: status === 'loading',
    error,
    changeCategory,
    runAllocation: () => dispatch(runFairAllocationSimulation(selectedCategory)),
    resetDemo,
  };
};

export default useCooperative;
