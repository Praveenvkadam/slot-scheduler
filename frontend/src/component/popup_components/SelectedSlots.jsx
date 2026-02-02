import React, { useState } from "react";
import { X } from "lucide-react";
import {useNavigate} from "react-router-dom"

const SelectedSlots = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([
    { id: 1, schedule: "1st Schedule", day: "02", dayLabel: "Day 2", topic: "Topic 2" },
    { id: 2, schedule: "2nd Schedule", day: "04", dayLabel: "Day 4", topic: "Topic 4" },
    { id: 3, schedule: "3rd Schedule", day: "12", dayLabel: "Day 2", topic: "Topic 2" },
    { id: 4, schedule: "4th Schedule", day: "14", dayLabel: "Day 3", topic: "Topic 3" },
    { id: 5, schedule: "5th Schedule", day: "22", dayLabel: "Day 1", topic: "Topic 1" },
    { id: 6, schedule: "6th Schedule", day: "25", dayLabel: "Day 4", topic: "Topic 4" },
    { id: 7, schedule: "7th Schedule", day: "29", dayLabel: "Day 7", topic: "Topic 7" },
  ]);

  const deleteSlot = (id) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  if (!isOpen) return null;

  return (
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
            style={{ gridTemplateColumns: `repeat(${slots.length}, minmax(0, 1fr))` }}
          >
            {slots.map((slot) => (
              <div key={slot.id} className="flex flex-col">
                <div className="text-xs font-semibold text-gray-900 mb-2 text-center">
                  {slot.schedule}
                </div>

                <div className="bg-[#664275] rounded-lg p-4 text-white shadow-md flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold">{slot.day}</div>
                    <div>
                      <div className="text-sm font-semibold leading-tight">
                        {slot.dayLabel}
                      </div>
                      <div className="text-sm leading-tight">
                        {slot.topic}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="mt-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Delete
                </button>
              </div>
            ))}
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
            onClick={()=>{
                navigate("/scheduled")
            }}
            className="px-10 py-2.5 bg-[#664275] text-white rounded-md hover:from-purple-700 hover:to-purple-800"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSlots;
