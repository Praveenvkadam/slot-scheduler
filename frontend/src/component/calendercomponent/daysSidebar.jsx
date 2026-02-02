import { Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export default function DaysSidebar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} hs`;
  };

  const days = [
    { day: 1, topic: "Topic 1" },
    { day: 2, topic: "Topic 2" },
    { day: 3, topic: "Topic 3" },
    { day: 4, topic: "Topic 4" },
    { day: 5, topic: "Topic 5" },
    { day: 6, topic: "Topic 6" },
    { day: 7, topic: "Topic 7" },
  ];

  return (
    <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-sm overflow-hidden font-sans">
      {/* Time Header */}
      <div className="bg-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-700" />
          <span className="text-gray-800 font-medium">
            {formatTime(currentTime)}
          </span>
        </div>
        
        <div className="h-8 w-px bg-gray-300" />
        
        <div className="text-gray-800 font-medium">06:00 hs</div>
      </div>

      {/* Days List */}
      <div className="bg-gray-50 px-8 py-8 space-y-5">
        {days.map((item) => (
          <div key={item.day} className="flex items-baseline gap-3">
            <span className="text-gray-700 font-semibold text-base whitespace-nowrap">
              Day {item.day}:
            </span>
            <span className="text-gray-500 text-base">{item.topic}</span>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="px-4 pb-6">
        <button className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3.5 rounded text-base transition-colors">
          Submit
        </button>
      </div>

      {/* Footer */}
      <div className="bg-purple-800 px-6 py-4 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <Instagram className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <Facebook className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <Twitter className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </div>
        
        <div className="text-white text-xs">
          For inquiry : +44 123456789
        </div>
      </div>
    </div>
  );
}