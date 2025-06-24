
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { Group } from "@/lib/types/GroupType";

interface FetchGroupsParams {
  userId: string;
  page?: number;
  limit?: number;
}

interface FetchGroupsResponse {
  groups: Group[];
  totalCount: number;
}

export const fetchGroups = createAsyncThunk<
  FetchGroupsResponse,
  FetchGroupsParams,
  { rejectValue: string }
>("groups/fetch", async ({ userId, page = 1, limit = 10 }, thunkAPI) => {
  try {
    const res = await api.get(`/groups/user/${userId}?page=${page}&limit=${limit}`);
    return {
      groups: res.data.data,
      totalCount: res.data.total,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch groups"
    );
  }
});

export const deleteGroup = createAsyncThunk<
  string,
  string, 
  { rejectValue: string }
>('groups/delete', async (groupId, thunkAPI) => {
  try {
    await api.delete(`/groups/delete-group/${groupId}`);
    return groupId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to delete group'
    );
  }
});

export const updateGroup = createAsyncThunk<
  Group,
  { groupId: string; name: string },
  { rejectValue: string }
>('groups/update', async ({ groupId, name }, thunkAPI) => {
  try {
    const res = await api.patch(`/groups/update-group/${groupId}`, { name });
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to update group'
    );
  }
});

export const fetchGroupById = createAsyncThunk<
  Group,
  string,
  { rejectValue: string }
>("groups/fetchById", async (groupId, thunkAPI) => {
  try {
    const res = await api.get(`/groups/${groupId}`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch group"
    );
  }
});
