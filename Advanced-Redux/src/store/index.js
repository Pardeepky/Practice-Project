import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { cartItem: [], totalQuantity: 0, showCart: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartToggle: (state) => {
            state.showCart = !state.showCart;
        }
    }
})

const store = configureStore(cartSlice);

export const cartActions = cartSlice.actions;

export default store