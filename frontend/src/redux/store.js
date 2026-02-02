import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth_redux/authSlice';
import slotReducer from './Slot_redux/slotSlice';
import batchReducer from './batch_redux/batchSlice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        slots:slotReducer,
        batches:batchReducer,

    },
});

export default store;