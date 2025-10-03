import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function EventCalendar({ newsEventsData, setNewsEventsData }) {
  const [today, setToday] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay();

  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const eventColors = [
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-blue-700",
    "bg-indigo-500",
  ];

  const handleDateClick = (date) => {
    const clickedDate = normalizeDate(date);
    const cardId = `post-${clickedDate.toISOString().slice(0, 10)}`;
    const postEl = document.getElementById(cardId);
    if (postEl) postEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-[360px] max-h-[80vh] bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50 border border-white/20">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-white/20 transition transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold tracking-wide flex-1 text-center">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-white/20 transition transform hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Body */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-500 uppercase text-xs tracking-wide">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {[...Array(startDay)].map((_, i) => (
            <div key={`empty-${i}`} className="h-12 w-12" />
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const date = new Date(currentYear, currentMonth, i + 1);

            const events = newsEventsData.filter(
              (news) =>
                normalizeDate(news.date).getTime() === normalizeDate(date).getTime()
            );

            return (
              <div
                key={i}
                onClick={() => handleDateClick(date)}
                className="h-12 w-12 border rounded-lg flex items-center justify-center relative cursor-pointer bg-white hover:shadow-sm transition-all duration-200"
              >
                {/* Date number */}
                <span className="absolute top-1 left-1 text-[10px] text-gray-400">
                  {i + 1}
                </span>

                {/* Event badges inside the small box */}
                <div className="flex flex-col gap-[2px] w-full h-full justify-center items-center px-1">
                  {events.map((event, idx) => (
                    <div
                      key={idx}
                      className={`${eventColors[idx % eventColors.length]} text-white text-[8px] leading-tight rounded-md px-1 py-[1px] w-full truncate`}
                    >
                      <div className="font-bold">
                        {event.title || "Event"}
                      </div>
                      <div className="opacity-90 text-[7px]">
                        {event.subtitle || "Subtitle"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
