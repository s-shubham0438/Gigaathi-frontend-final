import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { mockUsers } from '../../../mocks/data/users';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.login(credentials);
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.register(payload);
    } catch (err) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getCurrentUser();
    } catch (err) {
      return rejectWithValue(err.message || 'Not authenticated');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await authApi.logout();
    return null;
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  initialized: false,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    // Used when there is no saved session.
    // This allows the public landing page to render immediately.
    initializeWithoutSession: (state) => {
      state.initialized = true;
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },

    switchRoleDirectly: (state, action) => {
      const targetRole = action.payload;
      const demoUser = mockUsers.find((u) => u.role === targetRole);
      if (demoUser) {
        state.user = { ...demoUser };
      } else if (state.user) {
        state.user.role = targetRole;
      }
      state.isAuthenticated = true;
      state.initialized = true;
      localStorage.setItem('hasSession', 'true');
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
        state.error = null;

        localStorage.setItem('hasSession', 'true');
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.initialized = true;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
        state.error = null;

        localStorage.setItem('hasSession', 'true');
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.initialized = true;
      })

      // CHECK EXISTING SESSION
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
        state.status = 'succeeded';
        state.error = null;
      })

      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
        state.status = 'idle';
        state.error = null;

        localStorage.removeItem('hasSession');
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
        state.status = 'idle';
        state.error = null;

        localStorage.removeItem('hasSession');
      });
  },
});

export const {
  initializeWithoutSession,
  switchRoleDirectly,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;