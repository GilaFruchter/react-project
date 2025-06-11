import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./thunk";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userById: null,
    },
    reducers: {
        insertId: (state, action) => {
            state.id = action.payload;
            console.log("insertId action payload:", action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.users = null;
            })
            .addCase(getUserById.rejected, (state) => {
                state.users = null;
            })
    }
});
export const { insertId } = userSlice.actions;
export default userSlice.reducer;
