'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'https://my-app-hp3z.onrender.com/api/courses'
        );
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 py-32 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Learn Anytime, Anywhere.
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover courses that match your passion and career goals.
          </p>
          <Link
            href="#courses"
            className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition"
          >
            Explore Courses
          </Link>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-300/10 to-transparent z-0" />
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Expert Instructors',
              desc: 'Learn from industry professionals with real-world experience.',
            },
            {
              title: 'Flexible Learning',
              desc: 'Courses that fit your schedule and pace.',
            },
            {
              title: 'Practical Resources',
              desc: 'Videos, quizzes, and projects to deepen understanding.',
            },
            {
              title: 'Certifications',
              desc: 'Earn shareable certificates to boost your career.',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Courses</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
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
                  alt="Course"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Link
                    href={`courses/${course._id}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {course.title}
                  </Link>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                      #{course.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                      {course.tags}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                      {course.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
<section className="px-6 py-20 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">What Our Learners Say</h2>
    <div className="grid gap-10 md:grid-cols-3">
      {[
        {
          name: 'Sarah M.',
          quote: 'This platform changed my career. The projects were practical and fun!',
        },
        {
          name: 'Ahmed K.',
          quote: 'I could finally learn at my own pace and on my own schedule. Love it!',
        },
        {
          name: 'Lisa R.',
          quote: 'The instructors were amazing, and the community is super helpful.',
        },
      ].map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border dark:border-gray-700"
        >
          <p className="italic text-gray-700 dark:text-gray-300 mb-4">"{t.quote}"</p>
          <p className="font-semibold text-purple-600 dark:text-purple-400">{t.name}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Stats Section */}
<section className="py-20 px-6 bg-white dark:bg-gray-950">
  <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
    {[
      { label: 'Courses', value: '150+' },
      { label: 'Students', value: '12,000+' },
      { label: 'Certifications', value: '10,500+' },
      { label: 'Mentors', value: '70+' },
    ].map((stat, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* Newsletter */}


{/* FAQs */}
<section className="pt-20 pb-10 px-6 bg-gray-50 dark:bg-gray-800">

  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
    <div className="space-y-6">
      {[
        {
          q: 'Can I learn at my own pace?',
          a: 'Yes! All our courses are self-paced. You can learn anytime, anywhere.',
        },
        {
          q: 'Do I get a certificate after completing a course?',
          a: 'Absolutely. You’ll receive a shareable certificate upon completion.',
        },
        {
          q: 'Are there any free courses?',
          a: 'Yes, we offer free intro courses to help you get started.',
        },
      ].map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border dark:border-gray-700"
        >
          <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-400">{faq.q}</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
}
