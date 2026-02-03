import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  bookSlotApi,
  cancelBookingApi,
  getMyBookingsApi,
} from "./bookingApi"

export const bookSlot = createAsyncThunk("booking/book", async (slotId) => {
  const res = await bookSlotApi(slotId)
  return res.data
})

export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (slotId) => {
    const res = await cancelBookingApi(slotId)
    return res.data
  }
)

export const fetchMyBookings = createAsyncThunk("booking/my", async () => {
  const res = await getMyBookingsApi()
  return res.data
})
