import React from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function ScheduledClasses() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  /* -------- FETCH USER BOOKINGS -------- */
  const { data: bookings = [] } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await api.get("/bookings/me")
      return res.data
    },
  })

  /* -------- DELETE BOOKING -------- */
  const cancelMutation = useMutation({
    mutationFn: async (slotId) => {
      await api.delete(`/bookings/${slotId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBookings"])
    },
  })

  /* -------- GROUP BOOKINGS BY MONTH -------- */
  const grouped = bookings.reduce((acc, booking) => {
    const slot = booking.slotId
    const date = new Date(slot.date)
    const key = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`

    if (!acc[key]) acc[key] = []
    acc[key].push(slot)
    return acc
  }, {})

  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Scheduled Classes</h1>
        <button
          className="bg-purple-700 text-white px-5 py-2 rounded-md"
          onClick={() => navigate("/")}
        >
          Add New Slot
        </button>
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No classes scheduled yet
        </p>
      )}

      <div className="space-y-10">
        {Object.entries(grouped).map(([month, classes]) => (
          <div key={month} className="grid grid-cols-[150px_1fr] gap-6">
            <div className="text-lg font-medium leading-snug">
              {month.split(" ")[0]} <br /> {month.split(" ")[1]}
            </div>

            <div className="grid grid-cols-7 gap-6">
              {classes.map((slot) => {
                const date = new Date(slot.date)

                return (
                  <div key={slot._id} className="space-y-3">
                    <div className="bg-purple-100 h-36 rounded-md p-3 flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-xl">Day {slot.dayNumber}</p>
                        <p className="text-xs text-gray-600 font-semibold">
                          {slot.topic}
                        </p>
                      </div>
                      <p className="text-right text-2xl font-semibold">
                        {date.getDate().toString().padStart(2, "0")}
                      </p>
                    </div>

                    <button
                      onClick={() => cancelMutation.mutate(slot._id)}
                      className="w-full border border-gray-400 rounded-md py-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
