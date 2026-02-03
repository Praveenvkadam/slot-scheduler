import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/* ---------- SLOTS (with topics from backend) ---------- */
export function useSlots() {
  return useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const res = await api.get("/slots")
      return res.data   // slots contain date, dayNumber, topic, etc.
    },
  })
}

/* ---------- BOOK SLOT ---------- */
export function useBookSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (slotId) => {
      const res = await api.post(`/bookings/${slotId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"])
      queryClient.invalidateQueries(["myBookings"])
    },
  })
}
