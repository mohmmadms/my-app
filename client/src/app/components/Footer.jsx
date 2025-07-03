'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-6 transition-colors"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img src="/Logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold">Courses</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Learn new skills and advance your career with our curated collection of high-quality courses.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li><Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400">Contact</Link></li>
            <li><Link href="/courses" className="hover:text-purple-600 dark:hover:text-purple-400">All Courses</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Help Center</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Blog</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex gap-4 text-gray-700 dark:text-gray-300">
            <a href="https://github.com/mohmmadms" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://discord.com/invite/zzfDFvad" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400">
              <i className="fab fa-discord text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/mohmmad-al-smadi-bb0109249/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Moh. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
