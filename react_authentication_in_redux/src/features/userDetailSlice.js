import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// Call Api for Register
export const register = createAsyncThunk("register", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/user/signup'
        const response = await axios.post(apiurl, data);
        if (response && response?.data?.status === 200) {
            console.log("Fetching Register data", response);
            toast.success(response?.data?.message)
            return response.data;
        } else {
            console.log("Error Fetching Register Data", response);
            toast.error(response?.data?.message)
            return response.data;
        }
    } catch (error) {
        console.log("Error Fetching Register data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Login
export const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/user/signin'
        const response = await axios.post(apiurl, data);
        if (response && response?.data?.status === 200) {
            console.log("Fetching Login data", response);
            toast.success(response?.data?.message)
            return response.data;
        } else {
            console.log("Error Fetching Login Data", response);
            toast.error(response?.data?.message)
            return response.data;
        }
    } catch (error) {
        console.log("Error Fetching Login data", error);
        toast.error(error?.response?.data?.message)
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
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default userDetailSlice.reducer;




