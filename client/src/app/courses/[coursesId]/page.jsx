'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import EnrollButton from '@/app/components/EnrollButton';


const CoursePage = ({ params }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${params.coursesId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [params]);
  const renderList = (text) => {
    return text.split('\n').map((item, index) => <li key={index}>{item}</li>);
};

  return (
    <div className="course-page-container" style={{ background: '#f7fafc', minHeight: '100vh' }}>
      <div>
        {course ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p><strong>Time:</strong> {course.time}</p>
            <p><strong>Location:</strong> {course.location}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Start Date:</strong> {course.startDate}</p>
            <p><strong>End Date:</strong> {course.endDate}</p>
            <p><strong>Seats:</strong> {course.seats}</p>
            <p><strong>Description:</strong> </p><ul>{renderList(course.description)}</ul>
            <EnrollButton courseId={params.coursesId}/>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
export default CoursePage