'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSidebar } from './SideBar';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const { toggleSidebar } = useSidebar(); // ⬅️ Use the hook

  const handleInputChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses?title=${searchQuery}`);
        setSearchResults(response.data);
        setSearchQuery('');
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 dark:text-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">

        {/* ☰ Toggle Sidebar Button (always visible on left) */}
        <button onClick={toggleSidebar} className="text-xl text-gray-600 dark:text-white mr-4 md:mr-6">
          ☰
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/Log2o.jpeg" className="h-9 w-9 rounded-full" alt="Logo" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Courses</span>
        </Link>

        {/* Nav links (center) */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <Link href="/" className="hover:text-purple-600 transition">Home</Link>
          <Link href="/about" className="hover:text-purple-600 transition">About</Link>
          <Link href="/contact" className="hover:text-purple-600 transition">Contact</Link>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-2 relative ml-6">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-80">
            <div className="absolute pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full text-sm rounded-l-md bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-purple-500 border border-gray-300 dark:border-gray-700"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition">Search</button>
          </form>

          {/* Results dropdown */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-14 left-0 w-full bg-white dark:bg-gray-800 rounded shadow-lg border dark:border-gray-700 z-50">
                {searchResults.map((course) => (
                  <li key={course._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href={`/courses/${course._id}`} className="block px-4 py-2 text-sm text-gray-800 dark:text-white">
                      {course.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Nav Toggle (hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleNavbar} className="text-gray-600 dark:text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile nav links dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="w-full md:hidden overflow-hidden">
              <div className="flex flex-col gap-2 mt-4">
                <Link href="/" className="py-2 text-gray-700 dark:text-white">Home</Link>
                <Link href="/about" className="py-2 text-gray-700 dark:text-white">About</Link>
                <Link href="/contact" className="py-2 text-gray-700 dark:text-white">Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;