import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  generateMonthlyBatchesApi,
  fetchBatchesApi,
} from "./batchApi";

export const generateMonthlyBatches = createAsyncThunk(
  "batches/generateMonthly",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await generateMonthlyBatchesApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchBatches = createAsyncThunk(
  "batches/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetchBatchesApi(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
