import { createSlice } from "@reduxjs/toolkit"
import { fetchMyBookings } from "./bookingThunks"

const bookingSlice = createSlice({
  name: "booking",
  initialState: { bookings: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyBookings.fulfilled, (state, action) => {
      state.bookings = action.payload
    })
  }
})

export default bookingSlice.reducer
