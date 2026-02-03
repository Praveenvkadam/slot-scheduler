import { Clock } from "lucide-react"
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function DaysSidebar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes} hs`
  }

  const { data: bookings = [] } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await api.get("/bookings/me")
      return res.data
    },
  })

  const navigate = useNavigate()

  return (
    <div className="w-full max-w-[600px] bg-transparent rounded-lg shadow-sm font-sans flex flex-col gap-6">

      <div className="bg-[#f3f3f3] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium">
            {formatTime(currentTime)}
          </span>
        </div>

        <div className="h-8 w-px bg-white" />
        <div className="text-gray-800 font-medium">06:00 hs</div>
      </div>

      {/* Selected Slots List */}
      <div className="px-8 py-8 space-y-5 bg-[#f3f3f3]">

        {bookings.length === 0 && (
          <p className="text-gray-500 text-center">No slots selected</p>
        )}

        {bookings.map((booking) => {
          const slot = booking.slotId
          const date = new Date(slot.date)

          return (
            <div key={booking._id} className="flex gap-3 items-center justify-between">
              <div className="flex gap-3">
                <span className="font-semibold text-gray-700 whitespace-nowrap">
                  Day {slot.dayNumber}:
                </span>
                <span className="text-gray-500">{slot.topic}</span>
              </div>

              <span className="text-gray-700 font-medium text-sm">
                {date.getHours().toString().padStart(2, "0")}:
                {date.getMinutes().toString().padStart(2, "0")}
              </span>
            </div>
          )
        })}

        <div className="pt-6">
          <button className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3.5 rounded transition-colors"
          onClick={() => navigate("/scheduled")}
          >
           Submit
          </button>
        </div>
      </div>

      <div className="bg-[#f3f3f3] px-6 py-4 flex items-center justify-start gap-4 rounded-b-lg whitespace-nowrap">
        <div className="flex gap-3 shrink-0">
          {[FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp].map((Icon, i) => (
            <div key={i} className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
              <Icon className="w-3.5 h-3.5 text-white" />
            </div>
          ))}
        </div>

        <div className="text-[15px] text-gray-800 whitespace-nowrap font-bold">
          For inquiry : +44 123456789
        </div>
      </div>
    </div>
  )
}
