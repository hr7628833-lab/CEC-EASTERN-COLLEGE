import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";

const DropdownContext = createContext();

export function DropdownProvider({ children }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function Dropdown({ id, children }) {
  const ref = useRef(null);
  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext);

  const open = activeDropdown === id;

  // ✅ Outside click close (mobile + desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target)) return; // clicked inside
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveDropdown]);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const typeName = child.type && (child.type.displayName || child.type.name);

    if (typeName === "DropdownMenu") {
      return React.cloneElement(child, { open });
    }

    if (typeName === "DropdownButton") {
      return React.cloneElement(child, {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          setActiveDropdown(open ? null : id);
        },
        open,
      });
    }

    return child;
  });

  return (
    <div ref={ref} className="relative inline-block text-left select-none">
      {enhancedChildren}
    </div>
  );
}

export function DropdownButton({ children, outline, onClick, open }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
        outline
          ? "bg-transparent text-white ring-1 ring-inset ring-white/20 hover:bg-white/20"
          : open
          ? "bg-gray-700 text-white"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
    >
      <span className="flex items-center gap-2">{children}</span>
      <ChevronDown
        className={`h-5 w-5 transition-transform ${
          open ? "rotate-180 text-white" : "rotate-0 text-gray-400"
        }`}
      />
    </button>
  );
}
DropdownButton.displayName = "DropdownButton";

export function DropdownMenu({ children, open }) {
  return (
    <div
      className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-white/10 focus:outline-none transform transition-all duration-150 ease-out z-50 ${
        open
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
      }`}
    >
      <div className="py-1">{children}</div>
    </div>
  );
}
DropdownMenu.displayName = "DropdownMenu";

export function DropdownItem({ href, onClick, children }) {
  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button", onClick };

  return (
    <Comp
      {...props}
      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
      role="menuitem"
    >
      {children}
    </Comp>
  );
}
DropdownItem.displayName = "DropdownItem";
