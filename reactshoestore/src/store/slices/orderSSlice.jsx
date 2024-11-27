import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: []
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers:{
        addOrder(state, action){
            state.orders.push(action.payload)
        },
        deleteOrder(state, action){
                state.orders.filter(order => order.id !== action.payload)
        },
        setOrders(state, action){
            state.orders = action.payload
        }
    }
})

export const {addOrder, deleteOrder, setOrders} = ordersSlice.actions
export default ordersSlice.reducer;