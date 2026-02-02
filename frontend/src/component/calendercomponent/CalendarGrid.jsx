import React from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ year, month }) {
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  // leading empty cells
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  // month days
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  // trailing empty cells (always 6 rows = 42 cells)
  while (cells.length < 42) {
    cells.push(null);
  }

  const isToday = (day) =>
    day &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  return (
    <div className="w-[980px]"> 
      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-3xl font-semibold text-gray-300 mb-2">
        {DAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, index) => (
          <div
            key={index}
            className={`
              h-30
              rounded-md
              flex items-center justify-center
              text-sm font-medium
              ${day ? "bg-amber-200 text-black" : "bg-gray-100 text-gray-400"}
              ${isToday(day) ? "ring-2 ring-blue-500" : ""}
            `}
          >
            {day ?? "-"}
          </div>
        ))}
      </div>
    </div>
  );
}
