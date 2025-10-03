import React from "react";

function MissionPage() {
  const sections = [
    {
      title: "GOAL",
      content:
        "The Cebu Eastern College aims to produce graduates who are physically, mentally, morally prepared to assume their roles and responsibilities in the different vocational and professional fields where they aspire to achieve.",
    },
    {
      title: "MISSION",
      content:
        "The Cebu Eastern College is a Filipino-Chinese school designed to deliver integrated and quality education interfaced with Confucian teaching and pragmatic concepts and processes to train and prepare the youth to be active and useful participants and leaders in the world of work.",
    },
    {
      title: "PHILOSOPHY",
      content:
        "The Cebu Eastern College believes that the best education is eclectic education inscribed in a culture of excellence, freedom, and relevance.",
    },
    {
      title: "VISION",
      content:
        "The Cebu Eastern College is a non-stock and non-profit private institution with quality graduates committed to serve the local, national, and global communities along business, scientific and technological pursuits.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Mission, Vision & Philosophy
        </h1>
        <p className="text-lg italic opacity-90">
          Cebu Eastern College — Nurturing Minds, Building Futures
        </p>
      </header>

      {/* Timeline Style Sections */}
      <main className="max-w-5xl mx-auto px-6 py-16 relative">
        <div className="border-l-4 border-blue-600 pl-6 space-y-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-md p-8 transition transform hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Dot on the timeline */}
              <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow"></div>

              {/* Content */}
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MissionPage;
