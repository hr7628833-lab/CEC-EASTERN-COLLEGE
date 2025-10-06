import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, CalendarDays, Building2, Info, Home, Menu, X } from "lucide-react";
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
  const navigate = useNavigate();

  // Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (newsDetailOpen) {
        setShowNavbar(true);
        return;
      }

      if (window.scrollY > lastScrollY && window.scrollY > 50) setShowNavbar(false);
      else setShowNavbar(true);

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
    setOrgDropdown(false);
    setAboutOpen(false);
    setCalendarOpen(false);
    setIsOpen(false);
  }, [location.pathname, setCalendarOpen]);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        calendarButtonRef.current &&
        !calendarRef.current.contains(event.target) &&
        !calendarButtonRef.current.contains(event.target)
      ) setCalendarOpen(false);

      if (aboutRef.current && !aboutRef.current.contains(event.target)) setAboutOpen(false);
      if (orgRef.current && !orgRef.current.contains(event.target)) setOrgDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setCalendarOpen]);

  const go = (path) => {
    setIsOpen(false);
    setAboutOpen(false);
    setOrgDropdown(false);
    navigate(path);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-lg border-b ${showNavbar ? "translate-y-0" : "-translate-y-full"} ${scrolled ? "bg-white/90 border-gray-200 shadow-md" : "bg-gradient-to-r from-blue-800/70 to-blue-600/60 border-white/20"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="CEC Logo" className="h-12 w-12 rounded-full shadow-md border-2 border-white" />
            <span className={`text-lg sm:text-2xl font-extrabold tracking-wide ${scrolled ? "text-gray-800" : "text-white"}`}>
              Cebu Eastern College
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">

            {(location.pathname === "/history" || location.pathname === "/mission") && (
              <Link to="/" className={`flex items-center gap-2 font-medium transition ${scrolled ? "text-gray-700 hover:text-blue-700" : "text-white hover:text-blue-200"}`}>
                <Home className="h-5 w-5" />
                Home
              </Link>
            )}

            {/* Organization - Desktop */}
            <div ref={orgRef} className="relative">
              <button
                type="button"
                onClick={() => setOrgDropdown((s) => !s)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${scrolled ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "bg-white/20 text-white hover:bg-white/30"}`}
              >
                <Building2 className="h-5 w-5" />
                Organization
                <ChevronDown className={`h-5 w-5 transition-transform ${orgDropdown ? "rotate-180" : ""}`} />
              </button>
              {orgDropdown && (
                <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 animate-fadeIn z-50">
                  {["Org Sub 1", "Org Sub 2", "Org Sub 3"].map((org) => (
                    <a key={org} href="#" className="block px-5 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">{org}</a>
                  ))}
                </div>
              )}
            </div>

            {/* About - Desktop */}
            <div ref={aboutRef} className="relative">
              <button
                type="button"
                onClick={() => setAboutOpen((s) => !s)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${scrolled ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "bg-white/20 text-white hover:bg-white/30"}`}
              >
                <Info className="h-5 w-5" />
                About
                <ChevronDown className={`h-5 w-5 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              {aboutOpen && (
                <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-200 animate-fadeIn z-50">
                  <button onClick={() => go("/history")} className="block px-5 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">History of Cebu Eastern College</button>
                  <button onClick={() => go("/mission")} className="block px-5 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">Mission and Vision</button>
                </div>
              )}
            </div>

            {/* Calendar - Desktop */}
            <div className="relative">
              <button
                ref={calendarButtonRef}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCalendarOpen((p) => !p); }}
                className={`flex items-center gap-2 font-medium transition ${scrolled ? "text-gray-700 hover:text-blue-700" : "text-white hover:text-blue-200"}`}
              >
                <CalendarDays className="h-5 w-5" />
                Calendar
              </button>
              {calendarOpen && (
                <div ref={calendarRef} className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[360px] max-w-[90vw] z-50">
                  <EventCalendar newsEventsData={newsData} ref={calendarRef} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button type="button" onClick={() => setIsOpen((s) => !s)} className={`transition text-3xl ${scrolled ? "text-gray-800 hover:text-blue-700" : "text-white hover:text-gray-200"}`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-visible backdrop-blur-2xl bg-gradient-to-b from-white/95 via-blue-50/90 to-white/95 shadow-lg ${isOpen ? "max-h-[800px] opacity-100 py-4" : "max-h-0 opacity-0"}`}>
        <div className="space-y-3 px-4">
          {(location.pathname === "/history" || location.pathname === "/mission") && (
            <button type="button" onClick={() => go("/")} className="flex items-center gap-2 px-4 py-3 text-gray-700 text-lg font-semibold hover:bg-blue-50 hover:text-blue-700 rounded-lg transition">
              <Home className="h-5 w-5" /> Home
            </button>
          )}

          {/* Organization - Mobile */}
          <div className="border-t border-gray-200 pt-2">
            <button type="button" onClick={() => setOrgDropdown((s) => !s)} className="w-full flex justify-between items-center px-4 py-3 text-gray-800 font-semibold hover:text-blue-700 transition">
              <span className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Organization</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${orgDropdown ? "rotate-180" : ""}`} />
            </button>
            <div className={`pl-8 mt-1 overflow-hidden transition-all duration-300 ${orgDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              {["Org Sub 1", "Org Sub 2", "Org Sub 3"].map((org) => (
                <a key={org} href="#" className="block text-gray-700 font-medium hover:text-blue-600 py-2 transition">{org}</a>
              ))}
            </div>
          </div>

          {/* Calendar - Mobile */}
          <div className="border-t border-gray-200 pt-2">
            <button type="button" onClick={(e) => { e.stopPropagation(); setCalendarOpen((p) => !p); }} className="w-full flex items-center gap-2 text-left px-4 py-3 text-gray-800 font-semibold hover:text-blue-700 transition">
              <CalendarDays className="h-5 w-5" /> Calendar
            </button>
            {calendarOpen && (
              <div className="px-4 mt-2">
                <EventCalendar newsEventsData={newsData} ref={calendarRef} />
              </div>
            )}
          </div>

          {/* About - Mobile */}
          <div className="border-t border-gray-200 pt-2 relative z-50">
            <button type="button" onClick={() => setAboutOpen((s) => !s)} className="w-full flex justify-between items-center px-4 py-3 text-gray-800 font-semibold hover:text-blue-700 transition">
              <span className="flex items-center gap-2"><Info className="h-5 w-5" /> About</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`pl-8 mt-1 overflow-hidden transition-all duration-300 ${aboutOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              <button onClick={() => go("/history")} className="w-full text-left block text-gray-700 font-medium hover:text-blue-700 py-2 transition">History of Cebu Eastern College</button>
              <button onClick={() => go("/mission")} className="w-full text-left block text-gray-700 font-medium hover:text-blue-700 py-2 transition">Mission and Vision</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
