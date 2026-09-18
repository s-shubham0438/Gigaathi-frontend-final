import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import communityApi from '../api/communityApi';

export const fetchCommunityRequests = createAsyncThunk(
  'community/fetchRequests',
  async (params, { rejectWithValue }) => {
    try {
      return await communityApi.getCommunityRequests(params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCommunityRequest = createAsyncThunk(
  'community/createRequest',
  async (formData, { rejectWithValue }) => {
    try {
      return await communityApi.createCommunityRequest(formData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  requests: [],
  selectedRequest: null,
  loading: false,
  error: null,
  successMessage: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCommunityRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchCommunityRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createCommunityRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommunityRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.unshift(action.payload);
        state.successMessage = 'Community cleaning request posted successfully!';
      })
      .addCase(createCommunityRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedRequest, clearError, clearSuccess } = communitySlice.actions;
export default communitySlice.reducer;
