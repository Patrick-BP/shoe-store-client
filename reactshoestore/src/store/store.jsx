import ordersReducer from './slices/orderSSlice'
import itemsReducer from './slices/itemsSlice'
import typesReducer from './slices/typesSlice'
import authReducer from './slices/authSlice'

import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        orders: ordersReducer,
        items: itemsReducer,
        types: typesReducer,
        auth: authReducer
    }
});


export default store;