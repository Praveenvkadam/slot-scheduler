import React from "react";
import { useNavigate } from "react-router-dom";

const data = {
  "October 2024": [
    { day: "Day 2", topic: "Topic 2", date: "02" },
    { day: "Day 4", topic: "Topic 4", date: "04" },
    { day: "Day 2", topic: "Topic 2", date: "12" },
    { day: "Day 3", topic: "Topic 3", date: "14" },
    { day: "Day 1", topic: "Topic 1", date: "22" },
    { day: "Day 4", topic: "Topic 4", date: "25" },
    { day: "Day 7", topic: "Topic 7", date: "29" },
  ],
  "November 2024": [
    { day: "Day 2", topic: "Topic 2", date: "04" },
    { day: "Day 4", topic: "Topic 4", date: "09" },
    { day: "Day 2", topic: "Topic 2", date: "12" },
    { day: "Day 3", topic: "Topic 3", date: "16" },
    { day: "Day 1", topic: "Topic 1", date: "20" },
    { day: "Day 4", topic: "Topic 4", date: "24" },
    { day: "Day 7", topic: "Topic 7", date: "25" },
  ],
};

export default function ScheduledClasses() {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Scheduled Classes</h1>

        <button
          className="bg-purple-700 text-white px-5 py-2 rounded-md"
          onClick={() => navigate("/")}
        >
          Add New Slot
        </button>
      </div>

      <div className="space-y-10">
        {Object.entries(data).map(([month, classes]) => (
          <div key={month} className="grid grid-cols-[150px_1fr] gap-6">
            <div className="text-lg font-medium leading-snug">
              {month.split(" ")[0]}
              <br />
              {month.split(" ")[1]}
            </div>

            <div className="grid grid-cols-7 gap-6">
              {classes.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="bg-purple-100 h-36 rounded-md p-3 flex flex-col justify-between">
                    <div>
                      <p className="font-medium text-xl">{item.day}</p>
                      <p className="text-xs text-gray-600 font-semibold">
                        {item.topic}
                      </p>
                    </div>
                    <p className="text-right text-2xl font-semibold">
                      {item.date}
                    </p>
                  </div>

                  <button className="w-full border border-gray-400 rounded-md py-1 text-sm">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
