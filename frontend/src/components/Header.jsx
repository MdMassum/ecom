import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";


export const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#aboutUs" },
  { label: "Proudcts", href: "#product" },
  { label: "CONTACT US", href: "#contactUs" },
  // { label: "Enquiry", href: "#" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full bg-white/20 z-50">
      <div className="max-w-[84%] mx-auto flex items-center justify-between py-5">
        <div className="flex gap-2 pr-2 -ml-4 md:ml-0">
          <span className=" text-black text-3xl">THE</span>
          <span className="font-bold text-orange-400 text-3xl">VOCAL</span>
          <span className="font-bold text-blue-800 text-3xl">FOR</span>
          <span className="font-bold text-green-600 text-3xl">LOCAL</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-16">
          {navItems.map((navItem) =>
            navItem.href.startsWith("#") ? (
              <HashLink
                key={navItem.label}
                smooth
                to={`/${navItem.href}`}
                className="uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition"
              >
                {navItem.label}
              </HashLink>
            ) : (
              <a
                key={navItem.label}
                href={navItem.href}
                className="uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition"
              >
                {navItem.label}
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white bg-opacity-50 p-4 flex flex-col items-center space-y-4 shadow-md">
          {navItems.map((navItem) =>
            navItem.href.startsWith("#") ? (
              <HashLink
                key={navItem.label}
                smooth
                to={`/${navItem.href}`}
                className="text-green-900 uppercase tracking-wide hover:text-green-700 transition"
                onClick={() => setIsOpen(false)}
              >
                {navItem.label}
              </HashLink>
            ) : (
              <a
                key={navItem.label}
                href={navItem.href}
                className="text-green-900 uppercase tracking-wide hover:text-green-700 transition"
                onClick={() => setIsOpen(false)}
              >
                {navItem.label}
              </a>
            )
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
