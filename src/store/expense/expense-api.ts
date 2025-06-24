import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { CreateExpensePayload } from "@/lib/types/ExpenseType";

export const createExpense = createAsyncThunk<
  any,
  CreateExpensePayload,
  { rejectValue: string }
>("expenses/create", async (payload, thunkAPI) => {
  try {
    const res = await api.post("/expenses", payload);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to create expense"
    );
  }
});

export const deleteExpense = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>('expenses/delete', async (expenseId, thunkAPI) => {
  try {
    await api.delete(`/expenses/${expenseId}`);
    return { id: expenseId };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to delete expense'
    );
  }
});

export const updateExpense = createAsyncThunk<
  any,
  { expenseId: string; data: Partial<CreateExpensePayload> },
  { rejectValue: string }
>('expenses/update', async ({ expenseId, data }, thunkAPI) => {
  try {
    const res = await api.patch(`/expenses/${expenseId}`, data);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to update expense'
    );
  }
})