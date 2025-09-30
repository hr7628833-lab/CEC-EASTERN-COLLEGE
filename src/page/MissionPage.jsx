import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/Footer.jsx";

function MissionPage() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Navbar */}
      <Navbar newsDetailOpen={false} showHomeButton />

      {/* Page Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Mission, Vision & Philosophy</h1>
        <p className="text-lg italic">
          Cebu Eastern College — Nurturing Minds, Building Futures
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* GOAL Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 inline-block pb-1">
            GOAL
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Cebu Eastern College aims to produce graduates who are
            physically, mentally, morally prepared to assume their roles and
            responsibilities in the different vocational and professional
            fields where they aspire to achieve.
          </p>
        </section>

        {/* MISSION Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 inline-block pb-1">
            MISSION
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Cebu Eastern College is a Filipino-Chinese school designed to
            deliver integrated and quality education interfaced with Confucian
            teaching and pragmatic concepts and processes to train and prepare
            the youth to be active and useful participants and leaders in the
            world of work.
          </p>
        </section>

        {/* PHILOSOPHY Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 inline-block pb-1">
            PHILOSOPHY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Cebu Eastern College believes that the best education is
            eclectic education inscribed in a culture of excellence, freedom,
            and relevance.
          </p>
        </section>

        {/* VISION Section */}
        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 inline-block pb-1">
            VISION
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Cebu Eastern College is a non-stock and non-profit private
            institution with quality graduates committed to serve the local,
            national, and global communities along business, scientific and
            technological pursuits.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MissionPage;
