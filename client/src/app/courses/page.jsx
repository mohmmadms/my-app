'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://my-app-hp3z.onrender.com/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <div className="px-6 py-20 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">All Courses</h1>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={course.courseImage}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <Link
                  href={`/courses/${course._id}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {course.title}
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    #{course.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    {course.tags}
                  </span>
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    {course.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
