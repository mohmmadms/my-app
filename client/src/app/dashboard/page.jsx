'use client'
import React, { useState, useEffect } from 'react';
import AddCourse from '../components/AddCourse';
import DeleteCourse from '../components/DeleteCourse';
import EditCourse from '../components/EditCourse';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';
import EnrolledUsers from '../components/EnrolledUsers';
import MyModal from '../components/MyModal';
import Link from 'next/link';

const Dashboard = () => {

    const [courses, setCourses] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://my-app-hp3z.onrender.com/api/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCourses();
    }, []);
    const handleOpenModal = (courseId) => {
      setSelectedCourseId(courseId);
      setShowModal(true);
    };

    return (
        <div className='bg-white dark:bg-gray-900'>
          <Navbar />
          <Sidebar />
          <title>Dashboard</title>
          <h1 className="text-3xl text-purple-500 font-bold text-center my-6">Dashboard</h1>
          <div className="dashboard-style dark:bg-gray-900">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <p className="text-gray-500">Total Courses</p>
                  <h4 className="text-2xl font-semibold text-blue-500">4805</h4>
                  <p className="text-sm text-gray-400">+2.5% from last week</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <p className="text-gray-500">Total Revenue</p>
                  <h4 className="text-2xl font-semibold text-red-500">$84,245</h4>
                  <p className="text-sm text-gray-400">+5.4% from last week</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <p className="text-gray-500">Tickets Sold</p>
                  <h4 className="text-2xl font-semibold text-red-500">84245</h4>
                  <p className="text-sm text-gray-400">+6.7% from last week</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <p className="text-gray-500">Total Customers</p>
                  <h4 className="text-2xl font-semibold text-green-500">20.3K</h4>
                  <p className="text-sm text-gray-400">+4.5% from last week</p>
                </div>
              </div>
              <AddCourse />
            </div>
          </div>
          <br />
          <h3 className="text-xl font-semibold mb-4 ml-20 dark:text-white">Recently Added Courses:</h3>
          {courses &&
            courses.map(course => (
              <div key={course._id} className="container mx-auto mb-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="lg:flex">
                    <img src={`https://my-app-hp3z.onrender.com/${course.courseImage}`} alt="Course" className="w-full lg:w-1/4 rounded-lg mb-4 lg:mb-0 lg:mr-4" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    <div className="lg:flex-1">
                    <Link href={`courses/${course._id}`}> <h5 className="text-2xl font-bold dark:text-white">{course.title}</h5></Link>
                      <span className="text-gray-500">{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</span>
                      <div className="mt-2">
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm">{course.category}</span>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm mx-2">{course.tags}</span>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm">{course.time}</span>
                        <MyModal show={showModal} onClose={() => setShowModal(false)}>
                        </MyModal>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <DeleteCourse courseId={course._id} />
                        <EditCourse course={course} />
                        <button
                      onClick={() => handleOpenModal(course._id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      View Enrolled Users
                    </button>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <MyModal show={showModal} onClose={() => setShowModal(false)}>
            <EnrolledUsers courseId={selectedCourseId} />
            </MyModal>
          <Footer />
        </div>
      );
      
};

export default Dashboard;
