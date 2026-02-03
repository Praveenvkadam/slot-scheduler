import React, { useState } from "react"
import { useSlots, useBookSlot } from "../../query/useBooking"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarGrid({ year, month }) {
  const [selectedKey, setSelectedKey] = useState(null)
  const [modal, setModal] = useState(null)

  const { data: slots = [] } = useSlots()
  const bookMutation = useBookSlot()

  /* ---------- FIXED DATE COMPARISON (NO TIMEZONE BUG) ---------- */
  function isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  function getSlotByDate(day) {
    const dateObj = new Date(year, month, day)
    return slots.find((s) => isSameDay(new Date(s.date), dateObj))
  }

  async function handleClick(day) {
    const key = `${year}-${month}-${day}`
    setSelectedKey(key)

    const slot = getSlotByDate(day)
    if (!slot) return

    try {
      await bookMutation.mutateAsync(slot._id)

      setModal({
        date: new Date(slot.date),
        dayNumber: slot.dayNumber,
        topic: slot.topic?.title || slot.topic,
      })
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed")
    }
  }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length < 42) cells.push(null)

  return (
    <>
      <div className="w-[950px]">
        {/* Weekday header */}
        <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
          {DAYS.map((d) => <div key={d}>{d}</div>)}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, i) => {
            if (!day) {
              return <div key={i} className="h-28 rounded-md bg-gray-100" />
            }

            const slot = getSlotByDate(day)
            const isDisabled = !slot
            const isSelected = selectedKey === `${year}-${month}-${day}`

            return (
              <div
                key={`${year}-${month}-${day}`}
                onClick={!isDisabled ? () => handleClick(day) : undefined}
                className={`h-28 rounded-md p-3 flex flex-col justify-between
                  transition-all duration-150 ease-out
                 ${
                    isDisabled
                      ? "bg-gray-100 text-gray-400"
                      : isSelected
                        ? "bg-[#664275] text-white"
                        : "bg-[#e2daff] text-black cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                  }
                  }`}
              >
                {!isDisabled && (
                  <>
                    <div className="text-sm font-semibold">
                      Day {slot.dayNumber}
                    </div>
                    <div className="text-xs opacity-90">
                      {slot.topic?.title || slot.topic}
                    </div>
                  </>
                )}

                <div className="text-xs text-right opacity-70">
                  {day.toString().padStart(2, "0")}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Booking Success Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[320px] p-6 shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-3 text-green-600">
              You have booked this slot
            </h2>
            <div className="text-sm space-y-1 text-gray-700">
              <p><strong>Date:</strong> {modal.date.toDateString()}</p>
              <p><strong>Day:</strong> {modal.dayNumber}</p>
              <p><strong>Topic:</strong> {modal.topic}</p>
            </div>
            <button
              onClick={() => setModal(null)}
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
