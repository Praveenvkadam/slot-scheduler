import { createSlice } from "@reduxjs/toolkit";
import { generateMonthlyBatches, fetchBatches } from "./batchThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
  generated: false,
};

const batchSlice = createSlice({
  name: "batches",
  initialState,
  reducers: {
    resetBatchStatus(state) {
      state.generated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GENERATE
      .addCase(generateMonthlyBatches.pending, (state) => {
        state.loading = true;
        state.generated = false;
        state.error = null;
      })
      .addCase(generateMonthlyBatches.fulfilled, (state) => {
        state.loading = false;
        state.generated = true;
      })
      .addCase(generateMonthlyBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBatchStatus } = batchSlice.actions;
export default batchSlice.reducer;
