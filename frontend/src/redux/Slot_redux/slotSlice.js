import { createSlice } from "@reduxjs/toolkit"
import {
  fetchSlots,
  fetchMyBookedSlots,
  bookSlot,
  cancelSlotBooking,
  fetchSlotBookings,
} from "./slotThunks"

const initialState = {
  slots: [],
  myBookings: [],
  slotBookings: {},
  loading: false,
  error: null,
}

const slotSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    clearSlotError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false
        state.slots = action.payload
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchMyBookedSlots.fulfilled, (state, action) => {
        state.myBookings = action.payload
      })

      .addCase(bookSlot.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(cancelSlotBooking.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(fetchSlotBookings.fulfilled, (state, action) => {
        state.slotBookings[action.payload.slotId] =
          action.payload.bookings
      })
  },
})

export const { clearSlotError } = slotSlice.actions
export default slotSlice.reducer
