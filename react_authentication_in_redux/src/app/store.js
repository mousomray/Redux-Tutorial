import { configureStore } from "@reduxjs/toolkit"; // Import configureStore
import userDetailSlice from "../features/userDetailSlice"; // userDetail is the name of Slicer 

export const store = configureStore({
  reducer: {
    app: userDetailSlice, // Put useDetailSlice function in app reducer you put different reducer for different api
  },
});