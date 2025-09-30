import { useState, useEffect } from "react";
import { Calendar, Heart, X } from "lucide-react";

function NewsCard({ organization, content, date, type, image, title, liked, toggleLike, setDetailOpen: setParentDetailOpen }) {
  const [detailOpen, setDetailOpen] = useState(false);

  // Lock scroll and notify App
  useEffect(() => {
    if (detailOpen) {
      document.body.classList.add("overflow-hidden");
      if (setParentDetailOpen) setParentDetailOpen(true);
    } else {
      document.body.classList.remove("overflow-hidden");
      if (setParentDetailOpen) setParentDetailOpen(false);
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [detailOpen, setParentDetailOpen]);

  const typeColors = {
    announcement: "bg-red-100 text-red-600 border border-red-300",
    update: "bg-blue-100 text-blue-600 border border-blue-300",
    event: "bg-green-100 text-green-600 border border-green-300",
    meeting: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    training: "bg-purple-100 text-purple-600 border border-purple-300",
    general: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Card content */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden flex flex-col relative">
        <button onClick={toggleLike} className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full shadow-md hover:bg-gray-100">
          <Heart className={`w-6 h-6 ${liked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
        </button>

        {image && <img src={image} alt={title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500 rounded-t-2xl" />}

        <div className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
            <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${typeColors[type?.toLowerCase()] || "bg-gray-100 text-gray-600"}`}>{type}</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-blue-500" /> {new Date(date).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{content.substring(0, 90)}...</p>
          <div className="flex justify-between items-center text-sm border-t pt-3">
            <span className="text-gray-500 font-medium text-sm">{organization}</span>
            <button onClick={() => setDetailOpen(true)} className="relative px-4 py-2 text-sm uppercase tracking-wider text-gray-900 group">
              <span>Read More</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Detail */}
      {detailOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col mt-16">
          <div className="flex justify-between items-center p-4 border-b shadow">
            <h1 className="text-xl font-bold">News Detail</h1>
            <button onClick={() => setDetailOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {image && <img src={image} alt={title} className="w-full max-h-[50vh] object-contain rounded-lg mb-6" />}
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-3">
              <h2 className="text-2xl font-bold">{title}</h2>
              <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${typeColors[type?.toLowerCase()] || "bg-gray-100 text-gray-600"}`}>{type}</span>
            </div>
            <p className="text-gray-500 mb-4 max-w-4xl mx-auto">{organization}</p>
            <p className="text-gray-700 mb-6 max-w-4xl mx-auto">{content}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm max-w-4xl mx-auto">
              <Calendar size={16} className="text-blue-500" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsCard;
