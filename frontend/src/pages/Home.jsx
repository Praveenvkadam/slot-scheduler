import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CalendarGrid from "../component/calendercomponent/CalendarGrid";
import DaysSidebar from "../component/calendercomponent/daysSidebar";
import SelectedSlotsModal from "../component/popup_components/SelectedSlots";
import MonthBar from "../component/calendercomponent/MonthBar";

import { useLogout } from "../query/useLogout";

export default function Home() {
  const today = new Date();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const logout = useLogout();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handlePrevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const monthLabel = useMemo(() => {
    return new Date(year, month).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }, [year, month]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <SelectedSlotsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="w-full max-w-8xl mx-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold">Select your slots</h2>

          {/* AUTH BUTTON */}
          <div>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded bg-purple-600 text-white"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Logout
              </button>
            )}
          </div>

          <div className="flex flex-col items-end">
            <span className="text-lg font-semibold mb-2">
              Monthly Schedule
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                ←
              </button>

              <span className="text-sm font-bold text-purple-600">
                {monthLabel}
              </span>

              <button
                onClick={handleNextMonth}
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <CalendarGrid year={year} month={month} />
          </div>

          <div className="flex">
            <DaysSidebar />
            <div className="ml-2 flex items-start">
              <MonthBar activeMonth={month} onChange={setMonth} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
