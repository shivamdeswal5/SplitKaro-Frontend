import { createSlice } from '@reduxjs/toolkit';
import { fetchGroupBalances } from './settlement-api';

interface BalancesState {
  balances: Record<string, number>;
  loading: boolean;
  error: string | null;
}

const initialState: BalancesState = {
  balances: {},
  loading: false,
  error: null,
};

const settlementSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGroupBalances.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupBalances.fulfilled, (state, action) => {
        state.balances = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroupBalances.rejected, (state, action) => {
        state.error = action.payload || 'Failed';
        state.loading = false;
      });
  },
});

export default settlementSlice.reducer;