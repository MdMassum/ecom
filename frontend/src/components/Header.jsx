import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi";
// import { IoCartSharp } from "react-icons/io5";
import { IoPersonCircle  } from "react-icons/io5";
import {useSelector} from 'react-redux'


export const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#aboutUs" },
  { label: "Proudcts", href: "#product" },
  { label: "CONTACT US", href: "#contactUs" },
];


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(()=>{

  },[currentUser])

  return (
    <header className="absolute top-0 left-0 w-full bg-white/20 shadow-sm z-50 backdrop-blur-md">
      <div className="max-w-[84%] mx-auto flex items-center justify-between py-5">
        <div className="flex gap-2 pr-2 -ml-4 md:ml-0 text-xl md:text-2xl lg:text-3xl">
          <span className=" text-black">THE</span>
          <span className="font-bold text-orange-400">VOCAL</span>
          <span className="font-bold text-blue-800">FOR</span>
          <span className="font-bold text-green-600">LOCAL</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:space-x-4 lg:space-x-10">
          {navItems.map((navItem) =>(
              <HashLink
                key={navItem.label}
                smooth
                to={`/${navItem.href}`}
                className="uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition"
              >
                {navItem.label}
              </HashLink>
            ))}
            {(currentUser && currentUser.role === 'user') ? 
            <a href='/me' className=" flex gap-1 items-center justify-center uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition">
                <IoPersonCircle  size={28}/> 
            </a> : <a href='/login' className="uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition">
                Login</a>
              }
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-gradient-to-r from-blue-100 to-blue-200 bg-opacity-50 p-4 flex flex-col items-center space-y-4 shadow-md">
          {navItems.map((navItem) =>
            navItem.href.startsWith("#") ? (
              <HashLink
                key={navItem.label}
                smooth
                to={`/${navItem.href}`}
                className="text-blue-900 uppercase font-semibold tracking-wide hover:text-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                {navItem.label}
              </HashLink>
            ) : (
              <a
                key={navItem.label}
                href={navItem.href}
                className="text-blue-900 uppercase font-semibold tracking-wide hover:text-blue-700 transition"
                onClick={() => setIsOpen(false)}
              >
                {navItem.label}
              </a>
            )
          )}
          {(currentUser && currentUser.role === 'user') ? 
            <a href='/me' className=" flex gap-1 items-center justify-center uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition">
                <IoPersonCircle  size={28}/> My Profile 
            </a> : <a href='/login' className="uppercase tracking-wide font-semibold text-blue-900 hover:text-black transition">
                Login</a>
              }
        </nav>
      )}
    </header>
  );
};

export default Header;
