import { createAsyncThunk } from "@reduxjs/toolkit"
import { getSlotsApi, getSlotAvailabilityApi } from "./slotApi"

export const fetchSlots = createAsyncThunk("slot/getAll", async () => {
  const res = await getSlotsApi()
  return res.data
})

export const fetchSlotAvailability = createAsyncThunk(
  "slot/availability",
  async (slotId) => {
    const res = await getSlotAvailabilityApi(slotId)
    return { slotId, data: res.data }
  }
)
