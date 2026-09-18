import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationApi from '../api/notificationApi';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (recipientId) => {
    return await notificationApi.getNotifications(recipientId);
  }
);

export const markNotificationRead = createAsyncThunk(
  'notifications/markRead',
  async (id) => {
    return await notificationApi.markAsRead(id);
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  'notifications/markAllRead',
  async (recipientId) => {
    await notificationApi.markAllAsRead(recipientId);
    return recipientId;
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  status: 'idle',
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        if (action.payload) {
          state.notifications = state.notifications.map((n) =>
            n.id === action.payload.id ? action.payload : n
          );
          state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
        }
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({ ...n, isRead: true }));
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;
