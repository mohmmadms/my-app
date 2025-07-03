'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen text-gray-800 dark:text-white">
      <Navbar />

      <main className="px-6 md:px-20 py-20 max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We’re a passionate team building seamless experiences for learners and explorers across Jordan and beyond.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg mb-16"
        >
          <img src="/about-1.svg" alt="Mission" className="w-full h-auto" />
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-500">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We aim to empower individuals by offering immersive courses, real-world adventures, and personalized programs. We believe that learning and traveling should be simple, beautiful, and deeply connected.
            </p>
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg mb-16"
        >
          <div className="md:order-2">
            <img src="/about-2.svg" alt="Vision" className="w-full h-auto" />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold mb-4 text-teal-500">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A future where technology bridges people with transformative knowledge and unforgettable journeys. Whether online or on the road — our vision is to make every step count.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-semibold mb-4">Ready to explore with us?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Whether you're a curious learner or an adventure seeker, we’ve built the tools and trips that meet you where you are.
          </p>
          <a
            href="/courses"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Browse Courses
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
