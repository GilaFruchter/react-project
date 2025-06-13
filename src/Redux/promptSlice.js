// src/Redux/promptSlice.js (או הקובץ המתאים ל-slice של הפרומפטים שלך)

import { createSlice } from '@reduxjs/toolkit';
import { GetPromptById } from './thunk'; // ודא שהייבוא נכון

const promptSlice = createSlice({
  name: 'prompt',
  initialState: {
    prompts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetPromptById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.prompts = [];
      })
      .addCase(GetPromptById.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload; 
        state.error = null; 
      })
      .addCase(GetPromptById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch prompts for user.';
        state.prompts = []; 
      });
  },
});

export default promptSlice.reducer;