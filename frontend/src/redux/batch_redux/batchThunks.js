import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  initMonthApi,
  getBatchesApi,
  getBatchSlotsApi,
} from "./batchApi"

export const initMonth = createAsyncThunk("batch/initMonth", async (data) => {
  const res = await initMonthApi(data)
  return res.data
})

export const fetchBatches = createAsyncThunk("batch/getAll", async () => {
  const res = await getBatchesApi()
  return res.data
})

export const fetchBatchSlots = createAsyncThunk(
  "batch/getSlots",
  async (batchId) => {
    const res = await getBatchSlotsApi(batchId)
    return res.data
  }
)
