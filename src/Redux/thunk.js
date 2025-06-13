import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllusers = createAsyncThunk(
    'users/fetchData',
    async () => {
        const response = await fetch('http://localhost:5032/api/users/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;  
    }
);
export const getUserById = createAsyncThunk(
  'byId/fetchData',
  async (userId) => {
    const response = await fetch(`http://localhost:5032/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }

    const data = await response.json();
    return data;
  }
);


export const createNewUserAsyncAction = createAsyncThunk(
    'customers/createNewCustomer',
    async (customerData) => {
        const response = await fetch('http://localhost:5032/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });

        if (!response.ok) {
            console.log('Response:', response);
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`);
        }        

        const data = await response.json();
        return data;  
    }
);

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5032/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json(); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const getAllsubCategoriesById = createAsyncThunk(
  'subCategory/getAllById',
  async (categoryId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5032/api/subcategory/subs/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json(); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const getResponseFromApi = createAsyncThunk(
  'api/getResponse',
  async (endpoint, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5032/api/${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const addPromptAsync = createAsyncThunk(
  "prompts/addPrompt",
  async ({ userId, categoryId, subCategoryId, prompt1 }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5032/api/Prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          categoryId,
          subCategoryId,
          prompt1,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add prompt");
      }
      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//add getUserPromptsAsync
// export const getUserPromptsAsync = createAsyncThunk(
//   "prompts/getUserPrompts",
//   async (userId, thunkAPI) => {
//     try {
//       const response = await fetch(`http://localhost:5032/api/Prompts/user/${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch user prompts");
//       }
//       return await response.json();
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );