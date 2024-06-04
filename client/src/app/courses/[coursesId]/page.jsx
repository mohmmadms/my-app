'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Spinner } from 'flowbite-react';
import EnrollButton from '@/app/components/EnrollButton';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Sidebar from '@/app/components/SideBar';
import { format } from 'date-fns';

const CoursePage = ({ params }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses/${params.coursesId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [params]);

  const renderList = (text) => {
    return text.split('\n').map((item, index) => <ListGroupItem key={index}>{item}</ListGroupItem>);
  };

  return (
    <div className='bg-white dark:bg-gray-900'>
    <Navbar/>
    <Sidebar/>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center dark:bg-gray-900">
      <div className="w-full max-w-4xl p-4">
        {course ? (
          <Card className="shadow-lg">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{course.title}</h1>
            <ListGroup className="mb-4">
              <ListGroupItem><strong>Time:</strong> {course.time}</ListGroupItem>
              <ListGroupItem><strong>Location:</strong> {course.location}</ListGroupItem>
              <ListGroupItem><strong>Price:</strong> ${course.price}</ListGroupItem>
              <ListGroupItem><strong>Category:</strong> {course.category}</ListGroupItem>
              <ListGroupItem><strong>Start Date:</strong> {format(new Date(course.startDate), 'MM/dd/yyyy')}</ListGroupItem>
              <ListGroupItem><strong>End Date:</strong> {format(new Date(course.endDate), 'MM/dd/yyyy')}</ListGroupItem>
              <ListGroupItem><strong>Seats:</strong> {course.seats}</ListGroupItem>
            </ListGroup>
            <div>
            <strong className='dark:text-white'>Description:</strong>
              <ListGroup>
                {renderList(course.description)}
              </ListGroup>
            </div>
            <div>
              <strong className='dark:text-white'>Objectives:</strong>
              <ListGroup>
                {renderList(course.objectives)}
              </ListGroup>
            </div>
            <div>
            <strong className='dark:text-white'>Outcomes:</strong>
              <ListGroup>
                {renderList(course.outcome)}
              </ListGroup>
            </div>
            <div>
            <strong className='dark:text-white'>Table Of Content:</strong>
              <ListGroup>
                {renderList(course.tableOfContent)}
              </ListGroup>
            </div>
            <div className="mt-4">
              <EnrollButton courseId={params.coursesId} />
            </div>
          </Card>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner aria-label="Loading..." />
            <p className="ml-2">Loading...</p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CoursePage;
