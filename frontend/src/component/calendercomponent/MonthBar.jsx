export default function MonthBar({ activeMonth, onChange, className = "" }) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  return (
    <div
      className={`flex flex-col bg-[#b3a3c3c8] justify-between items-center h-150
     rounded-md py-3 px-1 ${className}`}
    >
      {months.map((m, i) => (
        <button
          key={m}
          onClick={() => onChange(i)}
          className={`text-xs px-2 py-1  rounded transition
            ${
              i === activeMonth
                ? "bg-[#9f8fd7] text-white font-semibold"
                : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
