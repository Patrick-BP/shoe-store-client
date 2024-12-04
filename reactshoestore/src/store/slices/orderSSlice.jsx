import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const baseURL = "http://localhost:8080/api/billing"
const baseURLShoeItem = "http://localhost:8080/api/shoe-item"

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async()=>{
  const response = await axios.get(`${baseURL}/all`);
  return response.data;
});
export const fetchOrdersByOrderNo = createAsyncThunk('orders/fetchOrdersByOrderNo', async(orderNo)=>{
  const response = await axios.get(`${baseURL}/order?order=${orderNo}`)
  return response.data
});
export const saveOrder = createAsyncThunk('orders/saveOrder', async(
    order, {dispatch, getState, rejectWithValue})=>{
        try {

        const savedOrder = await axios.post(`${baseURL}/new`, order);

          // subtract the item quantity
          const selectedItem = getState().items.items.find(item => item.id === order.shoeId);
          
          if(selectedItem){
            const updateQuantity = selectedItem.quantity - order.quantity;
            await axios.patch(`${baseURLShoeItem}/${order.shoeId}/stock?quantity=${updateQuantity}` )
          }
          
         
          return savedOrder.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    completedOrder:[],
    allCompletedOrders:[],
    loading:false,
    error: false,
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
        
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // completed order
      .addCase(fetchOrdersByOrderNo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByOrderNo.fulfilled, (state, action) => {
        state.loading = false;
        state.completedOrder = action.payload
      })
      .addCase(fetchOrdersByOrderNo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // All completed orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        const orderArray = [];

        action.payload.forEach(element => {
            const findOrder = action.payload.filter(order=> order.orderNo === element.orderNo);
            const exists = orderArray.map(item => item.orderNo).includes(element.orderNo);
       
            if(!exists){
                const totalSum = findOrder.reduce((acc, curr)=> acc + curr.total , 0);
                orderArray.push({orderNo: findOrder[0].orderNo ,customerName: findOrder[0].customerName, customerMobile:findOrder[0].customerMobile , totalCost:totalSum, orderDate:findOrder[0].orderDate})
            }
        });
    

        state.allCompletedOrders = orderArray
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export const { addOrder, deleteOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
