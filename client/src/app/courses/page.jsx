'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar";
import Link from "next/link";
import HeroSection from "../components/HeroSection";




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
      <SideBar>
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


      <div className="flex flex-col dark:bg-gray-900">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ml-4">
          {courses.map(course => (
            <div key={course._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <img className="object-cover rounded-t-lg h-48 w-full" src={`https://my-app-hp3z.onrender.com/${course.courseImage.replace('/opt/render/project/files', '/uploads')}`} alt=""  />
                

              <div className="p-5">
                  <h5 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.title}</h5>
                <Link href={`courses/${course._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </SideBar>
      <Footer />
      
    </div>
  );
}

export default HomePage;
