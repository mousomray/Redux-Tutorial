import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // AsyncThunk handle async function in redux , and createSlice slice the state
import axios from "axios";


// Call Api for Show Product
export const showProduct = createAsyncThunk("showProduct", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "https://fakestoreapi.com/products"
        const response = await axios.get(apiurl);
        console.log("Fetching Product Data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Read user data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const Productslice = createSlice({
    name: "productdetails",
    initialState: {
        products: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Show User
            .addCase(showProduct.pending, (state) => {
                state.loading = true; // If promise Pending 
            })
            .addCase(showProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload; // If Promise Fullfilled
            })
            .addCase(showProduct.rejected, (state, action) => {
                state.loading = false; // If Prmise Reject
                state.error = action.payload;
            })

    },
});

export default Productslice.reducer;