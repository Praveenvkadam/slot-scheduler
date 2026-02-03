import React, { useState } from "react"
import { X } from "lucide-react"
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

const SelectedSlots = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [confirmSlot, setConfirmSlot] = useState(null)
  const [successSlot, setSuccessSlot] = useState(null)

  /* ---------- FETCH MY BOOKINGS ---------- */
  const { data: bookings = [] } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await api.get("/bookings/me")
      return res.data
    },
    enabled: isOpen,
  })

  /* ---------- CANCEL BOOKING ---------- */
  const cancelMutation = useMutation({
    mutationFn: async (slotId) => {
      await api.delete(`/bookings/${slotId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBookings"])
      setSuccessSlot(confirmSlot)
      setConfirmSlot(null)
    },
  })

  if (!isOpen) return null

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/25 backdrop-blur-md"
          onClick={onClose}
        />

        <div className="relative z-10 w-[95vw] max-w-none bg-white/85 backdrop-blur-lg rounded-2xl border border-white/40 shadow-2xl p-10">
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-gray-700 hover:bg-gray-800 text-white rounded-full p-2"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-center mb-8 text-gray-950">
            Selected Slots
          </h2>

          <div className="mb-8">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${bookings.length || 1}, minmax(0, 1fr))`,
              }}
            >
              {bookings.map((booking, index) => {
                const slot = booking.slotId
                const date = new Date(slot.date)

                return (
                  <div key={booking._id} className="flex flex-col">
                    <div className="text-xs font-semibold text-gray-900 mb-2 text-center">
                      {index + 1} Schedule
                    </div>

                    <div className="bg-[#664275] rounded-lg p-4 text-white shadow-md flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold">
                          {date.getDate().toString().padStart(2, "0")}
                        </div>
                        <div>
                          <div className="text-sm font-semibold leading-tight">
                            Day {slot.dayNumber}
                          </div>
                          <div className="text-sm leading-tight">
                            {slot.topic}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setConfirmSlot(slot)}
                      className="mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={onClose}
              className="px-10 py-2.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate("/scheduled")}
              className="px-10 py-2.5 bg-[#664275] text-white rounded-md"
            >
              Ok
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM DELETE POPUP */}
      {confirmSlot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[320px] p-6 shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-3 text-red-600">
              Do you want to delete the slot?
            </h2>

            <div className="text-sm text-gray-700 mb-4">
              <p><strong>Date:</strong> {new Date(confirmSlot.date).toDateString()}</p>
              <p><strong>Day:</strong> Day {confirmSlot.dayNumber}</p>
              <p><strong>Topic:</strong> {confirmSlot.topic}</p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmSlot(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => cancelMutation.mutate(confirmSlot._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {successSlot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[320px] p-6 shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-3 text-green-600">
              Your slot deleted successfully
            </h2>

            <div className="text-sm text-gray-700 mb-4">
              <p><strong>Date:</strong> {new Date(successSlot.date).toDateString()}</p>
              <p><strong>Day:</strong> Day {successSlot.dayNumber}</p>
              <p><strong>Topic:</strong> {successSlot.topic}</p>
            </div>

            <button
              onClick={() => setSuccessSlot(null)}
              className="px-4 py-2 bg-[#664275] text-white rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SelectedSlots
