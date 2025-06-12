import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import categorySlice from "./categorySlice";
import subCategorySlice from "./subCategorySlice";


const store = configureStore({
    reducer: {
       user: UserSlice,
       category: categorySlice,
       subCategory: subCategorySlice
    }
});
export default store;