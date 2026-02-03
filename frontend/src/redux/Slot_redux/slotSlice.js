import { createSlice } from "@reduxjs/toolkit"
import { fetchSlots } from "./slotThunks"

const slotSlice = createSlice({
  name: "slot",
  initialState: { slots: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSlots.fulfilled, (state, action) => {
      state.slots = action.payload
    })
  }
})

export default slotSlice.reducer
