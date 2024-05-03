import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Call Api for Read User
export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "https://dummyjson.com/products"
        const response = await axios.get(apiurl);
        console.log("Fetching Read user data", response);
        return response.data.products;
    } catch (error) {
        console.log("Error Fetching Read user data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Delete User
export const detailsuser = createAsyncThunk("detailsuser", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `https://dummyjson.com/products/${id}`
        const response = await axios.get(apiurl);
        console.log("Fetching Details data", response);
        return response.data
    } catch (error) {
        console.log("Error Fetching delete data", error);
        return rejectWithValue(error.response.data);
    }
});


// createSlice area start
const userDetailSlice = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        getData: [],
    },


    extraReducers: (builder) => {
        builder


            // Show User
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            
            // Details User
            .addCase(detailsuser.pending, (state) => {
                state.loading = true;
            })
            .addCase(detailsuser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(detailsuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default userDetailSlice.reducer;