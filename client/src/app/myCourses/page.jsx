'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { motion } from 'framer-motion';

const UserEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://my-app-hp3z.onrender.com/api/users/${userId}/enrolled-courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          My Enrolled Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven’t enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={course.courseImage || '/course-default.jpg'}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Link href={`/courses/${course._id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Enrolled {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                      {course.category}
                    </span>
                    {course.tags && (
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                        {course.tags}
                      </span>
                    )}
                    {course.time && (
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                        {course.time}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserEnrolledCourses;
