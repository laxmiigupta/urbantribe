import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../../../UI/Api/axiosConfig"

export const fetchCart = createAsyncThunk("fetchCart", (token)=>{
    return API?.get("/cart/getAll/", {
        headers: {
            Authorization: "Bearer " + token,
        },
    })?.then((res) => {
        return res?.data
    })?.catch((err)=>{
        console.log("=====err=======>", err)
    })
})

const cartSlice = createSlice({
    name: "cart",
    initialState: { cartData: [], cartId: "", isRefresh: true },
    reducers: {
        refetch: (state) => {
            state.isRefresh = !state.isRefresh
        },
    },
    extraReducers: (builder) =>{
        builder?.addCase(fetchCart.fulfilled, (state, { payload }) => {
            state.cartId = payload.cartId
            state.cartData = payload.data
        })
    }
})

export default cartSlice.reducer
export const { refetch } = cartSlice.actions    