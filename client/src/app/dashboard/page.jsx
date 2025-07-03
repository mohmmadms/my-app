'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddCourse from '../components/AddCourse';
import MyModal from '../components/MyModal';
import EnrolledUsers from '../components/EnrolledUsers';
import DeleteCourse from '../components/DeleteCourse';
import EditCourse from '../components/EditCourse';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://my-app-hp3z.onrender.com/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleOpenModal = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <title>Dashboard</title>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 text-white">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🚀 Welcome to Your Instructor Dashboard
        </motion.h1>
        <p className="text-lg max-w-xl mx-auto text-white/80">
          Manage your courses, engage with learners, and make an impact.
        </p>
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-white/10 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            📚 Manage Your Courses
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Easily create, update, or remove your courses below.
          </p>

          <AddCourse />
        </div>

        <div className="grid gap-8">
          {courses.map((course) => (
            <motion.div
              key={course._id}
              className="rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={course.courseImage}
                  alt={course.title}
                  className="w-full md:w-1/3 h-56 object-cover"
                />
                <div className="p-6 flex-1">
                  <Link href={`/courses/${course._id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:underline">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Created {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">{course.category}</span>
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">{course.tags}</span>
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full">{course.time}</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <DeleteCourse courseId={course._id} />
                    <EditCourse course={course} />
                    <button
                      onClick={() => handleOpenModal(course._id)}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      View Enrolled Users
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <MyModal show={showModal} onClose={() => setShowModal(false)}>
          <EnrolledUsers courseId={selectedCourseId} />
        </MyModal>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
