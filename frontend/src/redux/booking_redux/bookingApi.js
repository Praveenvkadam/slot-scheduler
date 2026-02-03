import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/bookings",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const bookSlotApi = (slotId) => api.post(`/${slotId}`)
export const cancelBookingApi = (slotId) => api.delete(`/${slotId}`)
export const getMyBookingsApi = () => api.get("/me")
