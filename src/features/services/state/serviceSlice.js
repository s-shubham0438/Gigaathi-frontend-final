import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serviceApi from '../api/serviceApi';

export const fetchCategories = createAsyncThunk(
  'services/fetchCategories',
  async () => {
    return await serviceApi.getCategories();
  }
);

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (params = {}) => {
    return await serviceApi.getServices(params);
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id) => {
    return await serviceApi.getServiceById(id);
  }
);

const initialState = {
  categories: [],
  services: [],
  selectedService: null,
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'recommended',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.selectedService = action.payload;
      });
  },
});

export const { setActiveCategory, setSearchQuery, setSortBy, clearSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
