import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/auth",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerApi = (data) => api.post("/register", data);
export const loginApi = (data) => api.post("/login", data);
export const resetPasswordApi = (data) => api.post("/reset-password", data);
export const profileApi = () => api.get("/profile");
