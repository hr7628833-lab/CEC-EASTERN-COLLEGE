import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function EventCalendar({ newsEventsData, onClose }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay();

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

  const getEventStatus = (date) => {
    const news = newsEventsData.find(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    if (!news) return "";
    return today <= new Date(news.date)
      ? "bg-green-500 text-white font-semibold"
      : "bg-red-500 text-white font-semibold";
  };

  return (
    <div className="w-[360px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-white/20 transition"
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
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 bg-white/90 text-gray-700 hover:text-red-600 shadow-lg rounded-full w-8 h-8 flex items-center justify-center transition transform hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Calendar */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center font-semibold mb-2 text-gray-600 text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {[...Array(startDay)].map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const date = new Date(currentYear, currentMonth, i + 1);
            const event = newsEventsData.find(
              (event) =>
                new Date(event.date).toDateString() === date.toDateString()
            );

            const isToday =
              date.toDateString() === today.toDateString()
                ? "border-2 border-blue-500 font-bold"
                : "";

            return (
              <div
                key={i}
                onClick={() => {
                  if (event) {
                    const postEl = document.getElementById(`post-${event.id}`);
                    if (postEl) {
                      postEl.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }
                }}
                className={`flex items-center justify-center h-12 w-12 rounded-full cursor-pointer transition 
                  ${event ? "hover:bg-blue-100 text-black" : "text-gray-400 cursor-default"} 
                  ${getEventStatus(date)} 
                  ${isToday}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
