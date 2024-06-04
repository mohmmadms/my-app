'use client'
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className='bg-white dark:bg-gray-900'>
    <Navbar/>
    <Sidebar/>
    <div className="flex justify-center">
      <div className="flex flex-col max-w-7xl justify-center items-center">
        <div className="overflow-hidden w-3/4 bg-white dark:bg-gray-800 m-4 shadow-lg flex flex-col md:flex-row justify-center">
          <div className="h-26 w-full overflow-hidden">
            <img src="https://source.unsplash.com/random/500x400/?education" alt="Education" className="" />
          </div>
          <div className="grid p-2">
            <div className="font-bold text-lg text-black dark:text-white m-2 mt-10">Empower Your Future</div>
            <div className="text-gray-500 dark:text-white m-2 text-sm">
              <p>
                Our mission is to provide high-quality education to everyone, everywhere. Whether you're looking to
                enhance your skills, start a new career, or pursue a passion, our courses are designed to help you
                succeed.
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden w-3/4 bg-white dark:bg-gray-800 m-4 shadow-lg flex flex-col md:flex-row justify-center">
          <div className="grid p-2">
            <div className="font-bold text-lg text-black dark:text-white m-2 mt-10">Learn from Experts</div>
            <div className="text-gray-500 dark:text-white m-2 text-sm">
              <p>
                Our instructors are industry leaders and professionals who bring real-world experience into the
                classroom. Learn from the best and get the knowledge you need to achieve your goals.
              </p>
            </div>
          </div>
          <div className="h-26 w-full overflow-hidden">
            <img src="https://source.unsplash.com/random/500x400/?teacher" alt="Teacher" className="" />
          </div>
        </div>
        <div className="overflow-hidden w-3/4 bg-white dark:bg-gray-800 m-4 shadow-lg flex flex-col md:flex-row justify-center">
          <div className="h-26 w-full overflow-hidden">
            <img src="https://source.unsplash.com/random/500x400/?students" alt="Students" className="" />
          </div>
          <div className="grid p-2">
            <div className="font-bold text-lg text-black dark:text-white m-2 mt-10">Join Our Community</div>
            <div className="text-gray-500 dark:text-white m-2 text-sm">
              <p>
                Become a part of our vibrant community of learners. Connect with fellow students, join discussion
                groups, and take advantage of our extensive support resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AboutPage;


