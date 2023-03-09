import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { cartItem: [], totalQuantity: 0, showCart: false, notification: null, changed: false };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartToggle: (state) => {
            state.showCart = !state.showCart;
        },
        showNotification: (state, action) => {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        },
        replaceCart: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity;
            state.cartItem = action.payload.cartItem;
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItem.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.cartItem.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        deleteFromCart: (state, action) => {
            const { id, price } = action.payload;
            const existingItem = state.cartItem.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.cartItem = state.cartItem.filter(item => item.id !== id);
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