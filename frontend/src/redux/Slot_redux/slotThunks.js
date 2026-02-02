import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  getSlotsApi,
  getMyBookedSlotsApi,
  bookSlotApi,
  cancelSlotApi,
  getSlotBookingsApi,
} from "./slotApi"

export const fetchSlots = createAsyncThunk(
  "slots/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSlotsApi()
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const fetchMyBookedSlots = createAsyncThunk(
  "slots/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyBookedSlotsApi()
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const bookSlot = createAsyncThunk(
  "slots/book",
  async (slotId, { rejectWithValue }) => {
    try {
      const res = await bookSlotApi(slotId)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const cancelSlotBooking = createAsyncThunk(
  "slots/cancel",
  async (slotId, { rejectWithValue }) => {
    try {
      const res = await cancelSlotApi(slotId)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const fetchSlotBookings = createAsyncThunk(
  "slots/fetchBookings",
  async (slotId, { rejectWithValue }) => {
    try {
      const res = await getSlotBookingsApi(slotId)
      return { slotId, bookings: res.data }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)
