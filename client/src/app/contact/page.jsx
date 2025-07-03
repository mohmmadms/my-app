'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const handleButtonClick = () => {
  window.location.reload();
};

const ContactUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl p-10"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Contact Us
          </h1>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-900/40 backdrop-blur text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-900/40 backdrop-blur text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2">
              <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                rows="5"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-900/40 backdrop-blur text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              ></textarea>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center">
              <button
                type="button"
                onClick={handleButtonClick}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="text-center mt-12 border-t pt-6 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Email us at:{' '}
              <a
                href="mailto:mohmmadmms20@gmail.com"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                mohmmadmms20@gmail.com
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Jordan, Amman</p>

            <div className="flex justify-center gap-5 text-gray-600 dark:text-white">
              <a
                href="https://discord.com/invite/zzfDFvad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <i className="fab fa-discord text-xl"></i>
              </a>
              <a
                href="https://github.com/mohmmadms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 dark:hover:text-white transition"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mohmmad-al-smadi-bb0109249/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
