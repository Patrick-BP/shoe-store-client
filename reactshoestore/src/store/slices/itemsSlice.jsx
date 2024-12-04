import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const baseURL = "http://localhost:8080/api/shoe-item"


export const fetchItems = createAsyncThunk('items/fetchItems', async()=>{
    const response = await axios.get(`${baseURL}/all`);
    return response.data
  
});
export const createItem = createAsyncThunk('items/createItem', async(item)=>{
    const response = await axios.post(`${baseURL}/new`,item)
    return response.data
});
export const updateItem = createAsyncThunk('items/updateItem', async(item)=>{
    const response = await axios.put(`${baseURL}/${item.id}`, item)
    return response.data

});
export const deleteItem = createAsyncThunk('items/deleteItem', async(id)=>{
     await axios.delete(`${baseURL}/${id}`)
    return id;

});

const initialState = {
  items: [],
  loading:false,
  error: false
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
      builder
        .addCase(fetchItems.pending, (state, action)=>{
              state.loading = true;
              state.error = null;
        })
        .addCase(fetchItems.fulfilled, (state, action)=>{
              state.loading = false;
              state.items = action.payload;
         
        })
        .addCase(fetchItems.rejected, (state, action)=>{
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(createItem.fulfilled, (state, action)=>{
          state.items.push(action.payload)
          
        })
        .addCase(updateItem.fulfilled, (state, action)=>{
          const index = state.items.findIndex(item => item.id === action.items.id);
          if(index !== -1){
            state.items[index] = action.payload;
          }
          
        })
  }
});


export default itemsSlice.reducer;
