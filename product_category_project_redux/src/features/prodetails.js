import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

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

// createSlice area start
const prodetails = createSlice({
    name: "productdetails",
    initialState: {
        singleproduct: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(detailsproduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(detailsproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.singleproduct = action.payload;
            })
            .addCase(detailsproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default prodetails.reducer;