import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       
       // For Add to Cart Item
        addToCart(state, action) {
            const { id, ...item } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.push({ id, quantity: 1, ...item });
            }
        },
        
        // For Remove Cart Item
        removeCartItem(state, action) {
            return state.filter(item => item.id !== action.payload);
        },
        
        // For Increament Quantity
        incrementQuantity(state, action) {
            const { id } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity++;
            }
        },
        
        // For Decreament Quantity
        decrementQuantity(state, action) {
            const { id } = action.payload;
            const item = state.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
        }
    }
});

export const { addToCart, removeCartItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
