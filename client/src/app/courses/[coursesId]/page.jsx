'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import EnrollButton from '@/app/components/EnrollButton';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const CoursePage = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses/${params.coursesId}`);
        setCourse(response.data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course.');
      }
    };
    fetchCourse();
  }, [params.coursesId]);

  const renderList = (text) =>
    text?.split('\n')?.map((item, index) => (
      <li
        key={index}
        className="text-sm text-gray-700 dark:text-gray-300 list-disc ml-6 leading-relaxed"
      >
        {item}
      </li>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {error && (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        )}

        {!course ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading course...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-10"
          >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <img
                src={course.courseImage}
                alt={course.title}
                className="w-full lg:w-80 h-auto rounded-2xl object-cover shadow-xl border dark:border-gray-700"
              />
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {course.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800 dark:text-gray-300">
                  <p><strong>🕒 Time:</strong> {course.time || 'N/A'}</p>
                  <p><strong>📍 Location:</strong> {course.location}</p>
                  <p><strong>💵 Price:</strong> ${course.price}</p>
                  <p><strong>📚 Category:</strong> {course.category}</p>
                  <p><strong>📅 Start:</strong> {format(new Date(course.startDate), 'MM/dd/yyyy')}</p>
                  <p><strong>📅 End:</strong> {format(new Date(course.endDate), 'MM/dd/yyyy')}</p>
                  <p><strong>🎟️ Seats:</strong> {course.seats}</p>
                </div>
              </div>
            </div>

            {/* Info Sections */}
            {[
              ['Description', course.description],
              ['Objectives', course.objectives],
              ['Outcomes', course.outcome],
              ['Table of Content', course.tableOfContent]
            ].map(([label, value]) => (
              <section
                key={label}
                className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700 transition-all"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white border-b pb-1 border-gray-300 dark:border-gray-600">
                  {label}
                </h2>
                <ul className="space-y-2">{renderList(value)}</ul>
              </section>
            ))}

            {/* Quizzes Section (if present) */}
            {course.quizzes && course.quizzes.length > 0 && (
              <section className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 shadow border border-purple-200 dark:border-purple-700">
                <h2 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-300">Quiz Preview</h2>
                {course.quizzes.map((quiz, index) => (
                  <div key={index} className="mb-6">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">
                      Q{index + 1}: {quiz.question}
                    </p>
                    <ul className="space-y-1 text-sm text-gray-800 dark:text-gray-300 ml-4 list-disc">
                      {quiz.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* CTA Button */}
            <div className="text-center pt-4">
              <EnrollButton courseId={params.coursesId} />
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;
