import { useState } from "react";
import { Calendar, Heart, X } from "lucide-react";

function NewsCard({ organization, content, date, type, image, title, liked, toggleLike }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden flex flex-col relative">
        
        {/* Like button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md 
                     hover:bg-gray-100 transition transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Heart
            className={`w-6 h-6 transition-transform duration-300 ${
              liked ? "text-red-500 fill-red-500 scale-110" : "text-gray-400 scale-100"
            }`}
          />
        </button>

        {/* Image */}
        {image && (
          <div className="overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-55 object-cover hover:scale-105 transition-transform duration-500 rounded-t-2xl"
            />
          </div>
        )}

        {/* Content Preview */}
        <div className="p-5 pt-2 flex flex-col">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full shadow-sm">
              {type}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-blue-500" />
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug hover:text-blue-600 transition">
            {title || "Untitled News"}
          </h3>

          <p className="text-gray-600 text-sm mb-5 flex-grow leading-relaxed">
            {content.substring(0, 90)}...
          </p>

          <div className="flex justify-between items-center text-sm border-t pt-4">
            <span className="text-gray-500 font-medium">{organization}</span>

            {/* Gradient Read More Button */}
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
                         hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 dark:focus:ring-blue-800 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         transition-all"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
            >
             
            </button>

            {/* Modal Content */}
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm mb-4">{content}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full shadow-sm">
                {type}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-blue-500" />
                {new Date(date).toLocaleDateString()}
              </span>
            </div>

            {/* Gradient Close Button at bottom */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="text-white bg-gradient-to-br from-red-500 to-pink-500 
                           hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
                           focus:ring-red-300 dark:focus:ring-red-800 
                           font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                           transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsCard;
