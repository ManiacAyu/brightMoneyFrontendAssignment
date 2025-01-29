import React from "react";
import Logo from "../assets/13.jpg";

const Header = () => {
  return (
    <header className="font-sans md:font-serif fixed top-0 left-0 w-full backdrop-blur-md bg-gradient-to-r from-gray-200 to-amber-200 shadow-md z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-gray-900">
          <img
            src={Logo}
            alt="Logo"
            className="h-20 w-auto mix-blend-multiply"
          />
        </a>

        <nav className="text-xl text-blue-500 hidden md:flex space-x-6">
          <a className=" hover:text-blue-700 transition" href="#">
            Home
          </a>
          <a className=" hover:text-blue-700 transition" href="#">
            About
          </a>
          <a className=" hover:text-blue-700 transition" href="#">
            Services
          </a>
          <a className=" hover:text-blue-700 transition" href="#">
            Contact
          </a>
        </nav>

        <button className="md:hidden text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
