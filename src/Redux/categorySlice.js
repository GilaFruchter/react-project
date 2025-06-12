import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from './thunk';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload && typeof action.payload === 'object' && '$values' in action.payload) {
                    state.categories = action.payload.$values;
                    console.log("Categories loaded successfully (extracted $values):", state.categories);
                } else {
                    state.categories = action.payload;
                    console.log("Categories loaded successfully (direct payload):", state.categories);
                }
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;