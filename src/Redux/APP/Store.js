import { configureStore } from "@reduxjs/toolkit"
import cartSlice from '../Fetures/Cart/Cart'

export const store = configureStore({
    reducer: {
        cartSlice
    }
})