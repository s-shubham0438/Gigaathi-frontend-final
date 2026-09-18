import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cooperativeApi from '../api/cooperativeApi';

export const fetchCooperativeOverview = createAsyncThunk(
  'cooperative/fetchOverview',
  async () => {
    return await cooperativeApi.getOverview();
  }
);

export const fetchDemandForecast = createAsyncThunk(
  'cooperative/fetchDemandForecast',
  async () => {
    return await cooperativeApi.getDemandForecast();
  }
);

export const fetchOpportunityDistribution = createAsyncThunk(
  'cooperative/fetchOpportunityDistribution',
  async () => {
    return await cooperativeApi.getOpportunityDistribution();
  }
);

export const runFairAllocationSimulation = createAsyncThunk(
  'cooperative/runFairAllocation',
  async (category = 'plumbing') => {
    return await cooperativeApi.runFairAllocation(category);
  }
);

const initialState = {
  overview: null,
  forecastData: null,
  distributionData: [],
  allocatedCandidates: [],
  selectedCategory: 'plumbing',
  status: 'idle',
  error: null,
};

export const cooperativeSlice = createSlice({
  name: 'cooperative',
  initialState,
  reducers: {
    setAllocationCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCooperativeOverview.fulfilled, (state, action) => {
        state.overview = action.payload;
      })
      .addCase(fetchDemandForecast.fulfilled, (state, action) => {
        state.forecastData = action.payload;
      })
      .addCase(fetchOpportunityDistribution.fulfilled, (state, action) => {
        state.distributionData = action.payload;
      })
      .addCase(runFairAllocationSimulation.fulfilled, (state, action) => {
        state.allocatedCandidates = action.payload;
      });
  },
});

export const { setAllocationCategory } = cooperativeSlice.actions;
export default cooperativeSlice.reducer;
