import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/state/authSlice';
import serviceReducer from '../../features/services/state/serviceSlice';
import workerReducer from '../../features/workers/state/workerSlice';
import bookingReducer from '../../features/bookings/state/bookingSlice';
import cooperativeReducer from '../../features/cooperative/state/cooperativeSlice';
import notificationReducer from '../../features/notifications/state/notificationSlice';
import uiReducer from '../../shared/state/uiSlice';
import wishlistReducer from '../../features/wishlist/state/wishlistSlice';
import communityReducer from '../../features/community/state/communitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    workers: workerReducer,
    bookings: bookingReducer,
    cooperative: cooperativeReducer,
    notifications: notificationReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
