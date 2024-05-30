// components/EnrolledUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const EnrolledUsers = ({ courseId }) => {
  const [users, setUsers] = useState([]);
console.log(courseId)
  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses/${courseId}/enrolled-users`, {
        headers: {
        Authorization: `Bearer ${token}` } });
                                
        setUsers(response.data.enrolledUsers);
      } catch (error) {
        console.error(error.response?.data?.message || 'An error occurred');
        console.log()
      }
    };

    fetchEnrolledUsers();
  }, [courseId]);
console.log(users)
  return (
    <div>
      <h2>Enrolled Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledUsers;
