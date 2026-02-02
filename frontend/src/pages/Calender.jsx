import { useState, useMemo } from "react";
import CalendarGrid from "../component/calendercomponent/CalendarGrid";
import DaysSidebar from "../component/calendercomponent/DaysSidebar";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* ───────── MONTH SIDEBAR ───────── */

function MonthSidebar({ activeMonth, onSelect }) {
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg py-2 px-1 gap-2">
      {MONTHS.map((m, i) => {
        const active = i === activeMonth;

        return (
          <button
            key={m}
            onClick={() => onSelect(i)}
            className={`
              w-10 h-10 flex items-center justify-center
              rounded text-xs font-medium transition rotate-90
              ${
                active
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-gray-700 hover:bg-purple-200"
              }
            `}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}

/* ───────── MAIN CALENDAR ───────── */

export default function Calendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  /* SINGLE SOURCE OF TRUTH */
  const setCalendarMonth = (newMonth) => {
    if (newMonth < 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else if (newMonth > 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth(newMonth);
    }
  };

  const prevMonth = () => setCalendarMonth(month - 1);
  const nextMonth = () => setCalendarMonth(month + 1);

  const handleMonthSelect = (selectedMonth) => {
    if (selectedMonth < month) {
      setYear((y) => y + 1);
    }
    setMonth(selectedMonth);
  };

  const monthLabel = useMemo(() => {
    return new Date(year, month).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }, [year, month]);

  return (
    <div className="w-full max-w-8xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          Select your slots
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100"
          >
            ‹
          </button>

          <span className="text-lg font-medium text-[#9B8ACF] min-w-[180px] text-center">
            {monthLabel}
          </span>

          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100"
          >
            ›
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex gap-12 items-start">
        {/* CALENDAR GRID */}
        <div className="flex-1">
          <CalendarGrid year={year} month={month} />
        </div>

        {/* DAYS SIDEBAR */}
        <div className="w-[320px] shrink-0">
          <DaysSidebar />
        </div>

        {/* MONTH SIDEBAR */}
        <div className="w-12 ml-6 flex justify-center">
          <MonthSidebar
            activeMonth={month}
            onSelect={handleMonthSelect}
          />
        </div>
      </div>
    </div>
  );
}
