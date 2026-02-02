import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/batches",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const generateMonthlyBatchesApi = (data) =>
  api.post("/generate", data);

export const fetchBatchesApi = (params) =>
  api.get("/", { params });

export const getBatchByIdApi = (id) =>
  api.get(`/${id}`);
