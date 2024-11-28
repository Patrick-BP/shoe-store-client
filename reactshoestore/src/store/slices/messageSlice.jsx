import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    message: '',
    isGood: false,
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message;
      state.isGood = action.payload.isGood;
    },
    clearMessage(state) {
      state.message = '';
      state.isGood = false;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
