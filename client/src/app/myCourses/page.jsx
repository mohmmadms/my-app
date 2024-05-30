// components/UserEnrolledCourses.js
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2>My Enrolled Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserEnrolledCourses;
