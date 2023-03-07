import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter = state.counter + 5;
        },
        decrement(state) {
            state.counter = state.counter - 5;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
})

const initialAuthState = { isAuthenticated: false }

const authSlice = createSlice({
    name: 'authorise',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = !state.isAuthenticated
        },
        logout(state) {
            state.isAuthenticated = !state.isAuthenticated
        }
    }
})


const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer
    }
});

export const authActions = authSlice.actions

export const counterActions = counterSlice.actions

export default store;