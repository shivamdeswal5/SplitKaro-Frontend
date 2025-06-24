import { createSlice } from '@reduxjs/toolkit';
import { fetchGroups, deleteGroup, updateGroup } from './group-api';
import { Group } from '@/lib/types/GroupType';

interface GroupsState {
  data: Group[];
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: GroupsState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
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
        state.error = action.payload || 'Failed to fetch groups';
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.data = state.data.filter((g) => g.id !== action.payload);
        state.total -= 1;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        const index = state.data.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default groupsSlice.reducer;