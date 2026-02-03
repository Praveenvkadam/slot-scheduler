import { createSlice } from "@reduxjs/toolkit"
import { fetchBatches, fetchBatchSlots } from "./batchThunks"

const batchSlice = createSlice({
  name: "batch",
  initialState: { batches: [], slots: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.batches = action.payload
      })
      .addCase(fetchBatchSlots.fulfilled, (state, action) => {
        state.slots = action.payload
      })
  }
})

export default batchSlice.reducer
