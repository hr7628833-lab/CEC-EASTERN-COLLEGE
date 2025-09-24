import { useState } from "react";
import { Calendar, Heart } from "lucide-react";

function NewsCard({ organization, content, date, type, image, title }) {
  const [showFull, setShowFull] = useState(false);
  const [liked, setLiked] = useState(false);

  const helveticaStyle = { fontFamily: 'Helvetica, Arial, sans-serif' };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col relative">
        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <Heart
            className={`w-5 h-5 ${
              liked ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Image */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Type + Date */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-500" style={helveticaStyle}>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
              {type}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-2" style={helveticaStyle}>
            {title}
          </h3>

          {/* Content preview */}
          <p className="text-gray-600 text-sm mb-4 flex-grow" style={helveticaStyle}>
            {showFull ? content : `${content.substring(0, 80)}...`}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm border-t pt-3" style={helveticaStyle}>
            <span className="text-gray-500">{organization}</span>
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {showFull ? "Read Less →" : "Read More →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
