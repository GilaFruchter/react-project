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
export const createNewUser = createAsyncThunk(
    'customers/createNewUser',
    async (customerData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5032/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                return rejectWithValue(errorData);
            }
            const data = await response.json();
            return data; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
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

export const GetPromptById=createAsyncThunk(
  "prompts/GetPromptById",
  async (promptId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5032/api/Prompts/${promptId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch prompt");
      }
      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const DeleteUserById = createAsyncThunk(
  "users/DeleteUserById",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5032/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return userId; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
