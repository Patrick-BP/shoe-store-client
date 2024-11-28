import ordersReducer from './slices/orderSSlice'
import itemsReducer from './slices/itemsSlice'
import typesReducer from './slices/typesSlice'
import authReducer from './slices/authSlice'
import messagesReducer from './slices/messageSlice'

import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        orders: ordersReducer,
        items: itemsReducer,
        types: typesReducer,
        auth: authReducer,
        message: messagesReducer
    }
});


export default store;