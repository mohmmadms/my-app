// components/UserEnrolledCourses.js
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';

const UserEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/users/${userId}/enrolled-courses`,{
          headers: {
          Authorization: `Bearer ${token}` } });
        setCourses(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || 'An error occurred');
      }
    };

    fetchEnrolledCourses();
  }, []);
  console.log(courses)

  return (
    <div className='bg-white dark:bg-gray-900'>
      <Navbar/>
      <h1 className="text-3xl text-gray-500 dark:text-white font-bold text-center my-6">My Courses</h1>
    {courses &&
      courses.map(course => (
        <div key={course._id} className="container mx-auto mb-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="lg:flex">
              <img src={course.courseImage} alt="Course" className="w-full lg:w-1/4 rounded-lg mb-4 lg:mb-0 lg:mr-4" style={{ maxWidth: '300px', maxHeight: '300px' }} />
              <div className="lg:flex-1">
                <Link href={`courses/${course._id}`}> <h5 className="text-2xl font-bold dark:text-white hover:text-gray-400 dark:hover:text-gray-400">{course.title}</h5></Link>
                <span className="text-gray-500">{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</span>
                <div className="mt-2">
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm">{course.category}</span>
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm mx-2">{course.tags}</span>
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm">{course.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    <Footer />
  </div>
);

};
export default UserEnrolledCourses;
