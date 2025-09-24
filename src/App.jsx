import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import NewsCard from "./components/NewsCard.jsx";

function App() {
  const newsData = [
    {
      id: 1,
      organization: "Student Council",
      content: "We will have a general assembly this Friday at the auditorium.",
      date: "2025-09-28",
      type: "Announcement",
      title: "General Assembly",
    },
    {
      id: 2,
      organization: "Sports Club",
      content: "Our basketball team won the interschool championship!",
      date: "2025-09-20",
      type: "Update",
      title: "Basketball Victory",
    },
    {
      id: 3,
      organization: "Science Club",
      content: "Join us for the upcoming Science Fair on September 25–26.",
      date: "2025-09-25",
      type: "Event",
      title: "Science Fair",
    },
    {
      id: 4,
      organization: "Science Club",
      content: "Join us for the upcoming Science Fair on September 25–26.",
      date: "2025-09-25",
      type: "Event",
      title: "Science Fair Repeat",
    },
  ];

  // Store likes in App state (id → true/false)
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar newsData={newsData} />

      <div className="min-h-screen bg-gray-100 pt-20 p-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Latest News
        </h1>

        {/* News Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newsData.map((news) => (
            <NewsCard
              key={news.id}
              {...news}
              liked={!!likes[news.id]}
              toggleLike={() => toggleLike(news.id)}
              image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full py-4 bg-blue-600 text-white text-center shadow-inner">
          <p className="text-sm">
            © 2025 CEBU EASTERN COLLEGE. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
