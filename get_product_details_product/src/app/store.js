import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice";

export const store = configureStore({
    reducer: {
        app: userDetail, // Use can create multiple reducer 
    },
});
