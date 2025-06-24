import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { Notification } from "@/lib/types/NotificationType";

export const fetchNotifications = createAsyncThunk<
  Notification[],
  string,
  { rejectValue: string }
>("notifications/fetchAll", async (userId, thunkAPI) => {
  try {
    const res = await api.get(`/notifications/user/${userId}`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to load notifications");
  }
});

export const markNotificationAsRead = createAsyncThunk<
  Notification,
  string,
  { rejectValue: string }
>("notifications/markAsRead", async (id, thunkAPI) => {
  try {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to mark as read");
  }
});

