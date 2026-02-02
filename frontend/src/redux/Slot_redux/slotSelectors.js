export const selectSlots = (state) => state.slots.slots

export const selectMyBookings = (state) =>
  state.slots.myBookings

export const selectSlotBookings = (slotId) => (state) =>
  state.slots.slotBookings[slotId] || []

export const selectSlotLoading = (state) =>
  state.slots.loading

export const selectSlotError = (state) =>
  state.slots.error
