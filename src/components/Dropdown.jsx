import { useState } from "react";
import { ChevronDown } from "lucide-react";

function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/20"
      >
        Options
        <ChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-white/10 focus:outline-none transition transform scale-100 opacity-100"
        >
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Account settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Support
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              License
            </a>
            <form method="POST" action="#">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
