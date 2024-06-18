import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../apicall/cartslice";


export const store = configureStore({
    reducer: {
        cart: cartSlice // For Add to cart
    },
});