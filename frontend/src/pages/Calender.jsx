import { useState, useMemo } from "react";
import CalendarGrid from "../component/calendercomponent/CalendarGrid";
import DaysSidebar from "../component/calendercomponent/daysSidebar";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* ───────── MONTH SIDEBAR ───────── */

function MonthSidebar({ activeMonth, onSelect }) {
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg py-2 px-1 gap-2 w-12">
      {MONTHS.map((m, i) => {
        const active = i === activeMonth;

        return (
          <button
            key={m}
            onClick={() => onSelect(i)}
            className={`
              w-10 h-10 flex items-center justify-center
              rounded text-xs font-medium transition
              ${
                active
                  ? "bg-transparent text-black"
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

export default function Calendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  /* ───────── MONTH NAVIGATION ───────── */

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
    setMonth(selectedMonth);
  };

  /* ───────── LABEL ───────── */

  const monthLabel = useMemo(() => {
    return new Date(year, month).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }, [year, month]);

  /* ───────── RENDER ───────── */

  return (
    <div className="w-full max-w-8xl mx-auto p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Select your slots
        </h2>

        <div className="flex flex-col items-center gap-1">
          {/* STATIC LABEL */}
          <span className="text-xl font-bold text-black uppercase tracking-wide">
            Month Scheduler
          </span>

          {/* MONTH CONTROLS */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100"
            >
              ‹
            </button>

            <span className="text-lg font-bold text-[#9989ca] min-w-[180px]  text-center">
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
      </div>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
        <div className="w-full lg:flex-1">
          <CalendarGrid year={year} month={month} />
        </div>

        {/* DAYS SIDEBAR */}
        <div className="w-full lg:w-[380px] lg:shrink-0">
          <DaysSidebar />
        </div>

        {/* MONTH SIDEBAR */}
        <div className="hidden lg:flex w-12 justify-center">
          <MonthSidebar
            activeMonth={month}
            onSelect={handleMonthSelect}
          />
        </div>
      </div>
    </div>
  );
}
