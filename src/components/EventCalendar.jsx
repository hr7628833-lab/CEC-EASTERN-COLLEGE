import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function EventCalendar({ newsEventsData, onClose }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay();

  // ✅ Move to previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // ✅ Move to next month
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
      ? "bg-green-200 text-green-800 font-semibold"
      : "bg-red-200 text-red-800 font-semibold";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="bg-white rounded-xl shadow-lg w-[700px]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white rounded-t-xl">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-blue-500 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h2 className="text-lg font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-blue-500 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-red-100 transition"
            >
              <X className="w-6 h-6 text-white hover:text-red-600" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(startDay)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const date = new Date(currentYear, currentMonth, i + 1);
              return (
                <div
                  key={i}
                  className={`h-14 flex items-center justify-center border rounded cursor-pointer hover:bg-gray-100 transition ${getEventStatus(
                    date
                  )}`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
