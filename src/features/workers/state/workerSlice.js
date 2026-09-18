import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workerApi from '../api/workerApi';

export const fetchWorkers = createAsyncThunk(
  'workers/fetchWorkers',
  async (params = {}, { rejectWithValue }) => {
    try {
      return await workerApi.getWorkers(params);
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch workers'
      );
    }
  }
);

export const fetchWorkerById = createAsyncThunk(
  'workers/fetchWorkerById',
  async (id, { rejectWithValue }) => {
    try {
      return await workerApi.getWorkerById(id);
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch worker'
      );
    }
  }
);

const initialState = {
  workers: [],
  selectedWorker: null,
  status: 'idle',
  error: null,
};

export const workerSlice = createSlice({
  name: 'workers',

  initialState,

  reducers: {
    clearSelectedWorker: (state) => {
      state.selectedWorker = null;
    },

    clearWorkers: (state) => {
      state.workers = [];
      state.status = 'idle';
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ------------------------------------------------
      // GET WORKERS
      // ------------------------------------------------
      .addCase(fetchWorkers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workers = action.payload;
        state.error = null;
      })

      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload || 'Failed to fetch workers';
      })

      // ------------------------------------------------
      // GET SINGLE WORKER
      // ------------------------------------------------
      .addCase(fetchWorkerById.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchWorkerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedWorker = action.payload;
        state.error = null;
      })

      .addCase(fetchWorkerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload || 'Failed to fetch worker';
      });
  },
});

export const {
  clearSelectedWorker,
  clearWorkers,
} = workerSlice.actions;

export default workerSlice.reducer;

