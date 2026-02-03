import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth_redux/authSlice';
import slotReducer from './Slot_redux/slotSlice';
import batchReducer from './batch_redux/batchSlice';
import bookingReducer from './booking_redux/bookingSlice';
const store=configureStore({
    reducer:{
        auth:authReducer,
        slots:slotReducer,
        batches:batchReducer,
        bookings:bookingReducer,
    },
});

export default store;