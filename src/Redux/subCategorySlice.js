import { createSlice } from '@reduxjs/toolkit';
import { getAllsubCategoriesById } from './thunk';

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState: {
        subsCategories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllsubCategoriesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllsubCategoriesById.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Raw subcategory payload:", action.payload);

                if (action.payload && typeof action.payload === 'object' && '$values' in action.payload) {
                    state.subsCategories = action.payload.$values;
                    console.log("Subcategories extracted from $values:", state.subsCategories);
                } else {
                    state.subsCategories = action.payload;
                }
            })
            .addCase(getAllsubCategoriesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default subCategorySlice.reducer;