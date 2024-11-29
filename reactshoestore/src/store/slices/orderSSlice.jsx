import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const baseURL = "http://localhost:8002/api/billing"
const baseURLShoeItem = "http://localhost:8000/api/shoe-item"


export const saveOrder = createAsyncThunk('orders/saveOrder', async(
    order, {dispatch, getState, rejectWithValue})=>{
        try {

        const savedOrder = await axios.post(`${baseURL}/new`, order);

          // subtract the item quantity
          const selectedItem = getState().items.items.find(item => item.id === order.shoeId);
          console.log("find :",selectedItem)
          if(selectedItem){
            const updateQuantity = selectedItem.quantity - order.quantity;
            console.log(selectedItem.quantity - order.quantity)
            await axios.patch(`${baseURLShoeItem}/${order.shoeId}/stock?quantity=${updateQuantity}` )
          }

          return savedOrder;

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    totalAmount: 0,
  },
  reducers: {
    addOrder(state, action) {
      const order = action.payload;
      state.orders.push(order);
      state.totalAmount += order.unitPrice * order.quantity;
    },
    deleteOrder(state, action) {
      const shoeId = action.payload;
      const orderToRemove = state.orders.find((order) => order.shoeId === shoeId);
      if (orderToRemove) {
        state.totalAmount -= orderToRemove.unitPrice * orderToRemove.quantity;
        state.orders = state.orders.filter((order) => order.shoeId !== shoeId);
      }
    },
    clearOrders(state) {
      state.orders = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addOrder, deleteOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
