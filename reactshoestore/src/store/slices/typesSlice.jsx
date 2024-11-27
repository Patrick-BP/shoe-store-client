import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const baseURL = "http://localhost:8001/api/shoe-types"

export const fetchTypes = createAsyncThunk('types/fetchTypes',async ()=>{
    const response = await axios.get(`${baseURL}`);
    return response.data;
})


export const createType = createAsyncThunk('types/createType', async (type) => {
    const response = await axios.post(`${baseURL}`, type);
    return response.data;
  });
  
  export const updateType = createAsyncThunk('types/updateType', async (type) => {
   
    const response = await axios.put(`${baseURL}/${type.typeId}`, type);
    return response.data;
  });
  
  export const deleteType = createAsyncThunk('types/deleteType', async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return id; // Return the deleted ID
  });

const initialState = {
  types: [],
  loading: false,
  error:null
};

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {  },
  extraReducers: (builder) =>{
    builder
        .addCase(fetchTypes.pending, (state) =>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchTypes.fulfilled, (state, action) =>{
            state.types = action.payload;
            state.loading = false;
            
        })
        .addCase(fetchTypes.rejected, (state, action) =>{
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(createType.fulfilled, (state, action) => {
            state.types.push(action.payload);
      })
      .addCase(updateType.fulfilled, (state, action) => {
        const index = state.types.findIndex((type) => type.typeId === action.payload.typeId);
        if (index !== -1) {
           
          state.types[index] = action.payload;
        }
      })
      .addCase(deleteType.fulfilled, (state, action) => {
        state.types = state.types.filter((type) => type.id !== action.payload);
      });
    }
});


export default typesSlice.reducer;
