import { useState } from "react";
import Logo from "../Logo";

const NavBar = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-700">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Logo />
        <button
          className="text-gray-200 md:hidden hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <ul className="hidden md:flex space-x-8">{children}</ul>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <ul className="flex flex-col space-y-2 p-4">{children}</ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
