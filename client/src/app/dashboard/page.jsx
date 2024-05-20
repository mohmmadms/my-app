'use client'
import React, { useState, useEffect } from 'react';
import AddCourse from '../components/AddCourse';
import DeleteCourse from '../components/DeleteCourse';
import EditCourse from '../components/EditCourse';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';

const Dashboard = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    const imageUrl = `https://picsum.photos/${randomNumber === 0 ? 1000 : randomNumber === 1 ? 501 : 500}/500`;
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <>
            <title>Dashboard</title>
            <h1 className="text-3xl text-purple-500 font-bold text-center my-6">Dashboard</h1>
            <div className="dashboard-style">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-500">Total Courses</p>
                            <h4 className="text-2xl font-semibold text-blue-500">4805</h4>
                            <p className="text-sm text-gray-400">+2.5% from last week</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-500">Total Revenue</p>
                            <h4 className="text-2xl font-semibold text-red-500">$84,245</h4>
                            <p className="text-sm text-gray-400">+5.4% from last week</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-500">Tickets Sold</p>
                            <h4 className="text-2xl font-semibold text-red-500">84245</h4>
                            <p className="text-sm text-gray-400">+6.7% from last week</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-500">Total Customers</p>
                            <h4 className="text-2xl font-semibold text-green-500">20.3K</h4>
                            <p className="text-sm text-gray-400">+4.5% from last week</p>
                        </div>
                    </div>
                    <AddCourse />
                </div>
            </div>
            <br />
            <h3 className="text-xl font-semibold mb-4 ml-20">Recently Added Courses:</h3>
            {courses &&
                courses.map((course) => (
                    <div key={course._id} className="container mx-auto mb-4">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="lg:flex">
                                <img src={imageUrl} alt="Course" className="w-full lg:w-1/4 rounded-lg mb-4 lg:mb-0 lg:mr-4" />
                                <div className="lg:flex-1">
                                    <h5 className="text-2xl font-bold">{course.title}</h5>
                                    <span className="text-gray-500">
                                        {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                                    </span>
                                    <div className="mt-2">
                                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">{course.category}</span>
                                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm mx-2">{course.tags}</span>
                                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">{course.time}</span>
                                    </div>
                                    <div className="mt-4 flex space-x-4">
                                        <DeleteCourse courseId={course._id} />
                                        <EditCourse course={course} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default Dashboard;
