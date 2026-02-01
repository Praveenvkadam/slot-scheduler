import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth_redux/authSlice';

const store=configureStore({
    reducer:{
        auth:authReducer,
    },
});

export default store;