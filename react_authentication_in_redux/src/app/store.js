import { configureStore } from "@reduxjs/toolkit"; // Import configureStore
import userDetail from "../features/userDetailSlice"; // userDetail is the name of Slicer 

export const store = configureStore({
  reducer: {
    app: userDetail, // Put useDetail name in app reducer you can create multiple reducer
  },
});