import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { cartItem: [], totalQuantity: 0, showCart: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartToggle: (state) => {
            state.showCart = !state.showCart;
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItem.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.cartItem.push({ 
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: 1, 
                    totalPrice: newItem.price, 
                    name: newItem.title })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        deleteFromCart: (state, action) => {
            const {id, price} = action.payload;
            const existingItem = state.cartItem.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
               state.cartItem =  state.cartItem.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - price;
            }
        }
    }
})

const store = configureStore(cartSlice);

export const cartActions = cartSlice.actions;

export default store