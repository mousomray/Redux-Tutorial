import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
// import { endpoints } from "../Endpoints/endpoint"; You can direct import endpoint like this 
import { myendpoints } from "../Endpoints/endpoint"; // You can also import endpoint like this 


// Call Api for Product
export const product = createAsyncThunk("product", async (_, { rejectWithValue }) => {
    try {
        const apiurl = myendpoints[0]; //[0] means First array element 
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Product List", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Product List data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Single Product
export const singleproduct = createAsyncThunk("singleproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${myendpoints[0]}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Single Product", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Single Product data", error);
        return rejectWithValue(error.response.data);
    }
});