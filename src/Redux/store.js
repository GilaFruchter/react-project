import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import categorySlice from "./categorySlice";
import subCategorySlice from "./subCategorySlice";
import promptSlice from "./promptSlice";

const store = configureStore({
    reducer: {
       user: UserSlice,
       category: categorySlice,
       subCategory: subCategorySlice,
        prompt: promptSlice 
    }
});
export default store;