import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"


// Call Api for Show Product
export const showproduct = createAsyncThunk("showproduct", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "products?skip=0&limit=100"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Product data", response);
        return response?.data?.products;
    } catch (error) {
        console.log("Error Fetching Product Data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Details product
export const detailsproduct = createAsyncThunk("detailsproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `products/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Details data", response);
        return response.data
    } catch (error) {
        console.log("Error Fetching Details data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Show Categories
export const showcategories = createAsyncThunk("showcategories", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "products/categories"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Categories data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Categories Data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Category details 
export const categorydetails = createAsyncThunk("categorydetails", async (slug, { rejectWithValue }) => {
    try {
        const apiurl = `products/category/${slug}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Category Details data", response);
        return response?.data?.products
    } catch (error) {
        console.log("Error Fetching Category Details Data", error);
        return rejectWithValue(error.response.data);
    }
});   



