import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "../assets/cec.jpg";
import EventCalendar from "./EventCalendar";


function Navbar({ newsData, newsDetailOpen, calendarOpen, setCalendarOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [orgDropdown, setOrgDropdown] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const calendarRef = useRef(null);
  const calendarButtonRef = useRef(null);
  const aboutRef = useRef(null);
  const orgRef = useRef(null);

  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (newsDetailOpen) {
        setShowNavbar(true);
        return;
      }
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, newsDetailOpen]);

  useEffect(() => {
    if (newsDetailOpen) setShowNavbar(true);
  }, [newsDetailOpen]);

  useEffect(() => {
    setShowNavbar(true);
    setLastScrollY(window.scrollY);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        calendarButtonRef.current &&
        !calendarRef.current.contains(event.target) &&
        !calendarButtonRef.current.contains(event.target)
      ) {
        setCalendarOpen(false);
      }

      if (aboutRef.current && !aboutRef.current.contains(event.target))
        setAboutOpen(false);
      if (orgRef.current && !orgRef.current.contains(event.target))
        setOrgDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setCalendarOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md shadow-md ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-white/90 border-b border-gray-200" : "bg-white/10 border-b border-white/20"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="CEC Logo" className="h-12 w-12 object-cover rounded-full" />
            <span
              className={`text-2xl font-bold tracking-wide transition ${
                scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"
              }`}
            >
              CEBU EASTERN COLLEGE
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center relative">
            {(location.pathname === "/history" || location.pathname === "/mission") && (
              <Link
                to="/"
                className={`font-medium transition ${
                  scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"
                }`}
              >
                Home
              </Link>
            )}

            {/* Organization Dropdown */}
            <div ref={orgRef} className="relative">
              <button
                onClick={() => setOrgDropdown(!orgDropdown)}
                className={`inline-flex items-center gap-x-1.5 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition ${
                  scrolled
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-blue-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Organization
                <ChevronDown
                  className={`-mr-1 h-5 w-5 transition-transform duration-300 ${
                    orgDropdown ? "rotate-180" : ""
                  } ${scrolled ? "text-gray-800" : "text-white"}`}
                />
              </button>
              {orgDropdown && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  {["Org Sub 1", "Org Sub 2", "Org Sub 3"].map((org) => (
                    <a
                      key={org}
                      href="#"
                      className="block px-5 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition transform hover:scale-105"
                    >
                      {org}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className={`inline-flex items-center gap-x-1.5 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition ${
                  scrolled
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-blue-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                About
                <ChevronDown
                  className={`-mr-1 h-5 w-5 transition-transform duration-300 ${
                    aboutOpen ? "rotate-180" : ""
                  } ${scrolled ? "text-gray-800" : "text-white"}`}
                />
              </button>
              {aboutOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <Link
                    to="/history"
                    className="block px-5 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition transform hover:scale-105"
                  >
                    History of Cebu Eastern College
                  </Link>
                  <Link
                    to="/mission"
                    className="block px-5 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition transform hover:scale-105 mt-1"
                  >
                    Mission and Vision
                  </Link>
                </div>
              )}
            </div>

            {/* Calendar Dropdown */}
            <div className="relative">
              <button
                ref={calendarButtonRef}
                onClick={() => setCalendarOpen((prev) => !prev)}
                className={`font-medium transition ${
                  scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"
                }`}
              >
                Calendar
              </button>
              {calendarOpen && (
                <div
                  ref={calendarRef}
                  className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[360px] max-w-[90vw] z-50"
                >
                  <EventCalendar newsEventsData={newsData} onClose={() => setCalendarOpen(false)} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition ${
                scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-gray-200"
              }`}
            >
              {isOpen ? <span className="text-3xl">&times;</span> : <span className="text-3xl">&#9776;</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-xl rounded-b-xl overflow-visible">
          {(location.pathname === "/history" || location.pathname === "/mission") && (
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              Home
            </Link>
          )}

          {/* Calendar Dropdown */}
          <button
            onClick={() => setCalendarOpen((prev) => !prev)}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            Calendar
          </button>
          {calendarOpen && (
            <div className="px-4 py-2">
              <EventCalendar newsEventsData={newsData} onClose={() => setCalendarOpen(false)} />
            </div>
          )}

          {/* About */}
          <div className="border-t border-gray-200">
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition flex justify-between items-center font-medium"
            >
              About{" "}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div className="pl-4 border-l border-gray-200 bg-white/90 rounded-b-xl shadow-md mt-1">
                <Link
                  to="/history"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition transform hover:scale-105"
                >
                  History of Cebu Eastern College
                </Link>
                <Link
                  to="/mission"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition transform hover:scale-105 mt-1"
                >
                  Mission and Vision
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
