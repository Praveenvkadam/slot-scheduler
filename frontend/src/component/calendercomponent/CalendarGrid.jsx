import React from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ year, month }) {
  // determine if a date is disabled based on 7-on / 2-off cycle
  function isDisabledDay(date) {
    // Sunday is always disabled
    if (date.getDay() === 0) return true;

    let validDayCount = 0;

    // count non-Sunday days before this date
    for (let d = 1; d < date.getDate(); d++) {
      const current = new Date(year, month, d);
      if (current.getDay() !== 0) {
        validDayCount++;
      }
    }

    // cycle length = 9 (7 enabled + 2 disabled)
    const cycleIndex = validDayCount % 9;

    // last 2 days of cycle are disabled
    return cycleIndex >= 7;
  }

  // calculate calendar layout
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // build 6-week grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);

  return (
    <div className="w-[950px]">
      {/* weekday header */}
      <div className="grid grid-cols-7 text-center text-xl text-gray-300 mb-2">
        {DAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, i) => {
          const date = day ? new Date(year, month, day) : null;
          const disabled = !day || (date && isDisabledDay(date));

          return (
            <div
              key={`${year}-${month}-${i}`}
              className={`
                h-28 rounded-md flex items-center justify-center
                text-sm font-medium
                ${
                  disabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-amber-200 text-black cursor-pointer"
                }
              `}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
