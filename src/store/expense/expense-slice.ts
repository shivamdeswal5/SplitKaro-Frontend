
import { createSlice } from '@reduxjs/toolkit';
import { Expense } from '@/lib/types/ExpenseTypes';
import { fetchExpenseById } from './expense-api';

interface ExpenseState {
  byId: Record<string, Expense>;
  loading: Record<string, boolean>;
  error: Record<string, string | null>;
}

const initialState: ExpenseState = {
  byId: {},
  loading: {},
  error: {},
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    clearExpenseById: (state, action: { payload: string }) => {
      const id = action.payload;
      delete state.byId[id];
      delete state.loading[id];
      delete state.error[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseById.pending, (state, action) => {
        const id = action.meta.arg;
        state.loading[id] = true;
        state.error[id] = null;
      })
      .addCase(fetchExpenseById.fulfilled, (state, action) => {
        const expense = action.payload;
        state.byId[expense.id] = expense;
        state.loading[expense.id] = false;
      })
      .addCase(fetchExpenseById.rejected, (state, action) => {
        const id = action.meta.arg;
        state.loading[id] = false;
        state.error[id] = action.payload || 'Failed to fetch expense details';
      });
  },
});

export const { clearExpenseById } = expenseSlice.actions;
export default expenseSlice.reducer;