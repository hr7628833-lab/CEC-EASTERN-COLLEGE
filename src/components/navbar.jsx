import { useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../assets/cec.jpg";
import EventCalendar from "./EventCalendar";

function Navbar({ newsData }) {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [calendarOpen, setCalendarOpen] = useState(false); // modal calendar
  const [orgDropdown, setOrgDropdown] = useState(false); // organization dropdown

  return (
    <nav className="bg-[#093FB4] shadow-md fixed top-0 left-0 w-full z-50 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + School Name */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="CEC Logo"
              className="h-10 w-10 object-cover rounded-full border-2 border-white shadow-md"
            />
            <span className="text-2xl font-bold text-white hover:text-gray-200 transition">
              CEBU EASTERN COLLEGE
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center relative">
            {/* Organization Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOrgDropdown(!orgDropdown)}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 
                           text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 
                           hover:bg-white/20 transition"
              >
                Organization
                <ChevronDown
                  className={`-mr-1 h-5 w-5 text-gray-300 transition-transform duration-300 ${
                    orgDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {orgDropdown && (
                <div className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 z-50 animate-fadeIn">
                  <div className="py-1">
                    {["Org Sub 1", "Org Sub 2", "Org Sub 3"].map((org) => (
                      <a
                        key={org}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {org}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Button */}
            <button
              onClick={() => setCalendarOpen(true)}
              className="text-white hover:text-blue-200 transition font-medium"
            >
              Calendar
            </button>

            <a
              href="#"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              About
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none transition"
            >
              {isOpen ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <button
            onClick={() => setCalendarOpen(true)}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Calendar
          </button>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About
          </a>
        </div>
      )}

      {/* Calendar Modal */}
      {calendarOpen && (
        <EventCalendar
          newsEventsData={newsData}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;
