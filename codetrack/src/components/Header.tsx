'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on initial load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 flex justify-between items-center w-screen px-6 py-4 border-b border-border-light dark:border-border-dark transition-colors duration-200 z-50 backdrop-blur-lg">
      <div className="flex-1">
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full">
          {/* Logo placeholder */}
        </div>
        <h1 className="text-3xl font-bold text-content-light dark:text-content-dark">
          Code Track
        </h1>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <Link
          href="https://github.com/param302/codetrack"
          target="_blank"
          className="text-2xl text-content-light dark:text-content-dark hover:text-primary transition-colors"
        >
          <FaGithub />
        </Link>
        <Link
          href="mailto:connectwithparam.30@gmail.com"
          className="text-2xl text-content-light dark:text-content-dark hover:text-primary transition-colors"
        >
          <MdEmail />
        </Link>
        <button 
          className="ml-4 p-2 rounded-lg text-content-light dark:text-content-dark hover:bg-secondary-light dark:hover:bg-secondary-dark/20 transition-colors"
          onClick={toggleTheme}
        >
          {isDarkMode ? 
            <FiSun className="text-xl" /> : 
            <FiMoon className="text-xl" />
          }
        </button>
      </div>
    </header>
  );
}