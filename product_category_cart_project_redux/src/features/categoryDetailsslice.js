import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for Show Categories
export const showCategories = createAsyncThunk("showCategories", async (_, { rejectWithValue }) => {
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




// createSlice area start
const categoryDetailsslice = createSlice({
    name: "categorydetail",
    initialState: {
        categories: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Show Categories
            .addCase(showCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(showCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(showCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



    },
});

export default categoryDetailsslice.reducer;