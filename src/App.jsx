import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import NewsCard from "./components/NewsCard.jsx";
import Footer from "./components/Footer.jsx";
import cec_mainpage from "./assets/cec-mainpage.jpg";
import HistoryPage from "./page/HistoryPage.jsx";
import MissionPage from "./page/MissionPage.jsx";

// Prevent auto scroll when news detail is open
function ScrollToTop({ newsDetailOpen }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!newsDetailOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, newsDetailOpen]);
  return null;
}

function HomePage({ setNewsDetailOpen, newsDetailOpen }) {
  const newsData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    organization: `Organization ${i + 1}`,
    content: `This is the content for news card ${i + 1}.`,
    date: `2025-09-${10 + i}`,
    type: i % 3 === 0 ? "Event" : "Update",
    title: `News Title ${i + 1}`,
  }));

  const [likes, setLikes] = useState({});
  const toggleLike = (id) => setLikes((prev) => ({ ...prev, [id]: !prev[id] }));

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const totalPages = Math.ceil(newsData.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = newsData.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    if (!newsDetailOpen) {
      const header = document.getElementById("header-section");
      if (header) header.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage, newsDetailOpen]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* Header Section */}
      <div
        id="header-section"
        className="relative text-center bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: `url(${cec_mainpage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 py-25 px-6 sm:px-12 max-w-5xl mx-auto">
          <motion.h1
            className="text-6xl font-extrabold text-white drop-shadow-lg"
            style={{ fontFamily: "Garamond, serif" }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            News and Updates
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-br from-[#b2b3ff] via-white to-[#eaf1ff] px-6 sm:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {currentCards.map((news, index) => (
            <motion.div
              key={news.id}
              id={`post-${news.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="w-full"
            >
              <NewsCard
                {...news}
                liked={!!likes[news.id]}
                toggleLike={() => toggleLike(news.id)}
                setDetailOpen={setNewsDetailOpen} // important for navbar fix
                image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-800 text-white" : "bg-blue-200 text-blue-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

function App() {
  const [newsDetailOpen, setNewsDetailOpen] = useState(false);

  const newsData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    organization: `Organization ${i + 1}`,
    content: `This is the content for news card ${i + 1}.`,
    date: `2025-09-${10 + i}`,
    type: i % 3 === 0 ? "Event" : "Update",
    title: `News Title ${i + 1}`,
  }));

  return (
    <Router>
      <ScrollToTop newsDetailOpen={newsDetailOpen} />
      <Navbar newsData={newsData} newsDetailOpen={newsDetailOpen} />
      <Routes>
        <Route
          path="/"
          element={<HomePage setNewsDetailOpen={setNewsDetailOpen} newsDetailOpen={newsDetailOpen} />}
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/mission" element={<MissionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
