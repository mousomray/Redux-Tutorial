import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"


// Call Api for Show Product
export const showProduct = createAsyncThunk("showProduct", async (_, { rejectWithValue }) => {
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



// createSlice area start
const productDetailsslice = createSlice({
    name: "productDetail",
    initialState: {
        products: [],
        loading: false,
        error: null,
        
    },


    extraReducers: (builder) => {
        builder


            // Show Product
            .addCase(showProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(showProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(showProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

                       
           
    },
});

export default productDetailsslice.reducer;