import { createSlice } from "@reduxjs/toolkit";
import { DeleteUserById, getAllusers, getUserById } from "./thunk";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    currentId: null,
  },
  reducers: {
    insertId: (state, action) => {
      state.currentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentUser = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.error.message || 'Failed to fetch user by ID';
      })
      .addCase(getAllusers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllusers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || 'Failed to fetch all users';
      })
      .addCase(DeleteUserById.pending, (state) => {
        state.deletionLoading = true;
        state.deletionError = null;
      })
      .addCase(DeleteUserById.fulfilled, (state, action) => {
        state.deletionLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(DeleteUserById.rejected, (state, action) => {
        state.deletionLoading = false;
        state.deletionError = action.payload;
      })
  },
});

export const { insertId } = userSlice.actions;
export default userSlice.reducer;