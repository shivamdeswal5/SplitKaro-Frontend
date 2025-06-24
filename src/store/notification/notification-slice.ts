

import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications, markNotificationAsRead } from "./notification-api";
import { Notification } from "@/lib/types/NotificationType";

interface NotificationState {
  items: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch";
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default notificationSlice.reducer;