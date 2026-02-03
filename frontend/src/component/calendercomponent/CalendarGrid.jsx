import React, { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TOPICS = [
  "Topic 1",
  "Topic 2",
  "Topic 3",
  "Topic 4",
  "Topic 5",
  "Topic 6",
  "Topic 7",
];

export default function CalendarGrid({ year, month, onDayClick }) {
  const [selectedKey, setSelectedKey] = useState(null);

  function getDayMeta(date) {
    // Sunday always disabled
    if (date.getDay() === 0) {
      return { disabled: true };
    }

    let nonSundayIndex = 0;

    // count non-Sunday days before this date
    for (let d = 1; d < date.getDate(); d++) {
      const current = new Date(year, month, d);
      if (current.getDay() !== 0) {
        nonSundayIndex++;
      }
    }

    // 7 active + 2 gap = 9 day cycle
    const cycleIndex = nonSundayIndex % 9;

    // gap days
    if (cycleIndex >= 7) {
      return { disabled: true };
    }

    const dayNumber = cycleIndex + 1;

    return {
      disabled: false,
      dayNumber,
      topic: TOPICS[dayNumber - 1],
    };
  }

  function handleClick(day, meta) {
    const key = `${year}-${month}-${day}`;
    setSelectedKey(key);

    if (onDayClick) {
      onDayClick({
        date: new Date(year, month, day),
        dayNumber: meta.dayNumber,
        topic: meta.topic,
      });
    }
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);

  return (
    <div className="w-[950px]">
      {/* Weekday header */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
        {DAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {cells.map((day, i) => {
          if (!day) {
            return (
              <div
                key={i}
                className="h-28 rounded-md bg-gray-100"
              />
            );
          }

          const date = new Date(year, month, day);
          const meta = getDayMeta(date);
          const isSelected =
            selectedKey === `${year}-${month}-${day}`;

          return (
            <div
              key={`${year}-${month}-${day}`}
              onClick={
                !meta.disabled
                  ? () => handleClick(day, meta)
                  : undefined
              }
              className={`
                h-28 rounded-md p-3 flex flex-col justify-between
                transition-all duration-150 ease-out
                ${
                  meta.disabled
                    ? "bg-gray-100 text-gray-400"
                    : `
                      bg-purple-700 text-white cursor-pointer
                      hover:-translate-y-0.5 hover:shadow-lg
                      active:scale-[0.97] active:bg-purple-800
                      ${
                        isSelected
                          ? "ring-2 ring-white ring-offset-2 ring-offset-purple-700"
                          : ""
                      }
                    `
                }
              `}
            >
              {!meta.disabled && (
                <>
                  <div className="text-sm font-semibold">
                    Day {meta.dayNumber}
                  </div>
                  <div className="text-xs opacity-90">
                    {meta.topic}
                  </div>
                </>
              )}

              <div className="text-xs text-right opacity-70">
                {day.toString().padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
