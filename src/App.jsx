import { useState } from "react"; 
import "./App.css";
import Navbar from "./components/navbar.jsx";
import NewsCard from "./components/NewsCard.jsx"; 

function App() {
  const [count, setCount] = useState(0);

  const newsData = [
    {
      organization: "Student Council",
      content: "We will have a general assembly this Friday at the auditorium.",
      date: "2025-09-28",
      type: "Announcement",
    },
    {
      organization: "Sports Club",
      content: "Our basketball team won the interschool championship!",
      date: "2025-09-20",
      type: "Update",
    },
    {
      organization: "Science Club",
      content: "Join us for the upcoming Science Fair on September 25–26.",
      date: "2025-09-25",
      type: "Event",
    },
    {
      organization: "Science Club",
      content: "Join us for the upcoming Science Fair on September 25–26.",
      date: "2025-09-25",
      type: "Event",
    },
  ];

  return (
    <div>
      {/* Navbar now handles EventCalendar in dropdown */}
      <Navbar newsData={newsData} />

      <div className="min-h-screen bg-gray-100 pt-20 p-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Latest News
        </h1>

        {/* News Section with adjustable spacing */}
        <div className="grid gap-2 sm:grid-cols-7 lg:grid-cols-4">
          {newsData.map((news, index) => (
            <NewsCard
              key={index}
              organization={news.organization}
              content={news.content}
              date={news.date}
              type={news.type}
              image="https://via.placeholder.com/600x300"
              title={news.title}
            />
          ))}
        </div>
          {/* Footer */}
       <footer className="fixed bottom-0 left-0 w-full py-4 bg-blue-600 text-white text-center shadow-inner">
  <p className="text-sm">© 2025 Your School News Portal. All rights reserved.</p>
</footer>
      </div>
    </div>
  );
}

export default App;
