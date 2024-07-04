import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Pages/cartslice";


export const store = configureStore({
    reducer: {
        cart: cartSlice // For Add to cart
    },
});