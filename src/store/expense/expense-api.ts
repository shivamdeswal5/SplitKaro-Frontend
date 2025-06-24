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