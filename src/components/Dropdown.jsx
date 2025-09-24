import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Usage:
 * <Dropdown>
 *   <DropdownButton outline>Options</DropdownButton>
 *   <DropdownMenu>
 *     <DropdownItem href="/x">View</DropdownItem>
 *     <DropdownItem onClick={() => ...}>Delete</DropdownItem>
 *   </DropdownMenu>
 * </Dropdown>
 */

export function Dropdown({ children }) {
  const [open, setOpen] = useState(false);

  // Enhance children by injecting props into Menu and Button
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const typeName = child.type && (child.type.displayName || child.type.name);

    if (typeName === "DropdownMenu") {
      return React.cloneElement(child, { open });
    }

    if (typeName === "DropdownButton") {
      // pass toggle for click
      return React.cloneElement(child, { onClick: () => setOpen((v) => !v) });
    }

    return child;
  });

  return (
    <div
      className="relative inline-block text-left font-[Helvetica,Arial,sans-serif]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {enhancedChildren}
    </div>
  );
}

export function DropdownButton({ children, outline, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-sm font-semibold shadow-sm transition " +
        (outline
          ? "bg-transparent text-white ring-1 ring-inset ring-white/20 hover:bg-white/20"
          : "bg-gray-800 text-white hover:bg-gray-700")
      }
    >
      <span className="flex items-center gap-2">{children}</span>
      <ChevronDown className="h-5 w-5 text-gray-400" />
    </button>
  );
}
DropdownButton.displayName = "DropdownButton";

export function DropdownMenu({ children, open }) {
  return (
    <div
      className={
        "absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-white/10 focus:outline-none transition-all duration-150 " +
        (open ? "opacity-100 translate-y-0 pointer-events-auto z-50" : "opacity-0 -translate-y-1 pointer-events-none")
      }
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
