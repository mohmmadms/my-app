'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import Logout from './Logout';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

// Sidebar context
const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Open sidebar by default only on medium screens and up (>=768px)
    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 768;
      setIsSidebarOpen(isDesktop);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <Sidebar />
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin');
    const profileImg = localStorage.getItem('profilePic');
    setIsAuthenticated(!!token);
    setIsAdmin(adminStatus === 'true');
    setProfileImage(profileImg);
  }, []);

  const navLinks = [
    { href: '/myCourses', label: 'My Courses', icon: '📚', authOnly: true },
    { href: '/profile', label: 'Profile', icon: '👤', authOnly: true },
    { href: '/dashboard', label: 'Dashboard', icon: '🛠️', adminOnly: true },
    { href: '/Login', label: 'Sign In', icon: '🔑', guestOnly: true },
    { href: '/signup', label: 'Sign Up', icon: '✍️', guestOnly: true },
  ];

  return (
    <motion.aside
      initial={{ x: '-100%' }}
      animate={{ x: isSidebarOpen ? 0 : '-100%' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg p-5 flex flex-col transition-colors"
    >
      {/* Close Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-gray-300 hover:text-red-500 text-2xl"
          aria-label="Close Sidebar"
        >
          ✖
        </button>
      </div>

      {/* Profile Info */}
      {isAuthenticated && (
        <div className="flex items-center gap-3 mb-6">
          <img
            src={profileImage || '/profile.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">Welcome!</span>
        </div>
      )}

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Navigation */}
      <nav className="flex flex-col gap-3 mt-6 overflow-y-auto">
        {navLinks.map((link, idx) => {
          if (link.authOnly && !isAuthenticated) return null;
          if (link.guestOnly && isAuthenticated) return null;
          if (link.adminOnly && !isAdmin) return null;
          return (
            <Link
              key={idx}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-base">{link.label}</span>
            </Link>
          );
        })}
        {isAuthenticated && <Logout />}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
