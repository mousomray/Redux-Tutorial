import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for All Product
export const allproduct = createAsyncThunk("allproduct", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'products?skip=0&limit=100'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching All Product data", response);
        return response?.data?.products
    } catch (error) {
        console.log("Error Fetching show data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api For Search  
export const search = createAsyncThunk("search", async (query, { rejectWithValue }) => {
    try {
        const apiurl = `products/search?q=${query}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Search Data", response);
        return response?.data?.products
    } catch (error) {
        console.log("Error Fetching Search Data", error);
        return rejectWithValue(error.response.data);
    }
});