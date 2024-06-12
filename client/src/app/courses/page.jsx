'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';




function HomePage (){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get('https://my-app-hp3z.onrender.com/api/courses');
          setCourses(response.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchCourses();
  
      return () => {
        // Cleanup function
      };
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  console.log(courses)
    return (
      <div className='bg-white dark:bg-gray-900'>
      <Navbar/>
        <HeroSection/>
        <section className="text-gray-600 dark:bg-gray-900 dark:text-white body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">Explore Our Courses</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Discover a wide range of courses designed to help you gain new skills, advance your career, and achieve your personal goals.</p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 dark:border-gray-700 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium title-font mb-2">Expert Instructors</h2>
        <p className="leading-relaxed text-base mb-4">Learn from experienced instructors who are experts in their fields, providing valuable insights and practical knowledge.</p>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 dark:border-gray-700 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium title-font mb-2">Flexible Learning</h2>
        <p className="leading-relaxed text-base mb-4">Enjoy the flexibility of online learning with courses that fit your schedule, allowing you to learn at your own pace.</p>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 dark:border-gray-700 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium title-font mb-2">Comprehensive Resources</h2>
        <p className="leading-relaxed text-base mb-4">Access a variety of resources, including video lectures, reading materials, and interactive assignments to enhance your learning experience.</p>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 dark:border-gray-700 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium title-font mb-2">Achieve Your Goals</h2>
        <p className="leading-relaxed text-base mb-4">Set and achieve your educational and professional goals with our comprehensive and accessible course offerings.</p>
      </div>
    </div>
  </div>
</section>



          {courses.map(course => (
           <div key={course._id} className="container mx-auto mb-4">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
             <div className="lg:flex">
               <img src={course.courseImage} alt="Course" className="w-full lg:w-1/4 rounded-lg mb-4 lg:mb-0 lg:mr-4" style={{ maxWidth: '300px', maxHeight: '300px' }} />
               <div className="lg:flex-1">
               <Link href={`courses/${course._id}`}> <h5 className="text-2xl font-bold dark:text-white">{course.title}</h5></Link>
                 <span className="text-gray-500">{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</span>
                 <div className="mt-2">
                   <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm">#{course.category}</span>
                   <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm mx-2">{course.tags}</span>
                   <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white rounded-full px-3 py-1 text-sm">{course.time}</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       ))}

    

      <Footer />
      
    </div>
  );
}

export default HomePage;
