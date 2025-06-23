import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchGroups = createAsyncThunk(
  "groups/fetch",
  async (
    {
      userId,
      page = 1,
      limit = 10,
    }: { userId: string; page?: number; limit?: number },
    thunkAPI
  ) => {
    try {
      const res = await api.get(
        `/groups/user/${userId}?page=${page}&limit=${limit}`
      );
      return {
        groups: res.data.data,
        totalCount: res.data.totalCount,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch groups"
      );
    }
  }
);
