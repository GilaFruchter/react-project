import { createSlice } from "@reduxjs/toolkit";
import { addPromptAsync } from "./thunk";

const promptSlice = createSlice({
  name: "prompts",
  initialState: {
    prompts: [],
    loading: false,
    error: null,
    lastPrompt: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPromptAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPromptAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.lastPrompt = action.payload;
        state.prompts.push(action.payload);
      })
      .addCase(addPromptAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promptSlice.reducer;