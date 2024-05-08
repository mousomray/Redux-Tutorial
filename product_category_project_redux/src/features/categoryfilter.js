import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Call Api for Category details 
export const cdetails = createAsyncThunk("cdetails", async (category, { rejectWithValue }) => {
    try {
        const apiurl = `https://dummyjson.com/products/category/${category}`
        const response = await axios.get(apiurl);
        console.log("Fetching Cdetails data", response);
        return response?.data?.products
    } catch (error) {
        console.log("Error Fetching Cdetails Data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const categoryfilter = createSlice({
    name: "categoryfilter",
    initialState: {
        myfilter: [],
        loading: false,
        error: null,
        
    },

    extraReducers: (builder) => {
        builder


            //Category Details
            .addCase(cdetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(cdetails.fulfilled, (state, action) => {
                state.loading = false;
                state.myfilter = action.payload;
            })
            .addCase(cdetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



    },
});

export default categoryfilter.reducer;