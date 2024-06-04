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
      <div className="relative overflow-x-auto">
          <h2 className='dark:text-white'>Enrolled Users</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                      <a href={`${users.email}`}>
                          Email
                          </a>
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Phone Number
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user) => (
                      <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.name}
                          </th>
                          <td className="px-6 py-4">
                              {user.email}
                          </td>
                          <td className="px-6 py-4">
                              {user.phoneNumber}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};


export default EnrolledUsers;
