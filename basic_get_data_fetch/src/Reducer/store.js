import { configureStore } from "@reduxjs/toolkit"; // Import configureStore
import Productslice from "./Productslice"; // Import Productslice function from productslice.js file

export const store = configureStore({
  reducer: {
    myproduct: Productslice,
  },
});