import { createSlice } from '@reduxjs/toolkit';
import { fetchGroups } from './group-api';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.groups;
        state.total = action.payload.totalCount;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupsSlice.reducer;