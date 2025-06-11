import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCustomers = createAsyncThunk(
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