import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { Settlement } from '@/lib/types/SettlementType';

export const fetchGroupBalances = createAsyncThunk<
  Record<string, number>,
  string, 
  { rejectValue: string }
>('settlements/fetchGroupBalances', async (groupId, thunkAPI) => {
  try {
    const response = await api.get(`/settlements/group/${groupId}/balances`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to fetch balances'
    );
  }
});

export interface CreateSettlementPayload {
  paidById: string;
  paidToId: string;
  groupId: string;
  amount: number;
  note?: string;
}

export const createSettlement = createAsyncThunk<
  Settlement,
  CreateSettlementPayload,
  { rejectValue: string }
>('settlements/create', async (payload, thunkAPI) => {
  try {
    const res = await api.post<Settlement>('/settlements', payload);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to create settlement'
    );
  }
});
