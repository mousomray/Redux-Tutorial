import { configureStore } from "@reduxjs/toolkit";
import productDetail from "../features/productDetailsslice" // For Show Product 
import categorydetail from "../features/categoryDetailsslice" // For Show Category
import categoryfilter from "../features/categoryfilter" // For Category filter 
import productdetails from "../features/prodetails" // For Product Details



export const store = configureStore({
    reducer: {
        product: productDetail,  // For Show show Product 
        category: categorydetail, // For Show Category  
        cfilter: categoryfilter, // For Categorywise filter 
        pdetails: productdetails // For Product Details

    },
});