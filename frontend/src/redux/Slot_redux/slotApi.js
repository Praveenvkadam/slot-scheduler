import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/slots",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const getSlotsApi = () => api.get("/");

export const getMyBookedSlotsApi = () => api.get("/me");

export const bookSlotApi = (slotId) =>
  api.post(`/${slotId}/book`);

export const cancelSlotApi = (slotId) =>
  api.delete(`/${slotId}/cancel`);

export const getSlotBookingsApi = (slotId) =>
  api.get(`/${slotId}/bookings`);
