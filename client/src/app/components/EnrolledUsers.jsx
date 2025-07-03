'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const EnrolledUsers = ({ courseId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://my-app-hp3z.onrender.com/api/courses/${courseId}/enrolled-users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.enrolledUsers);
      } catch (error) {
        console.error(error.response?.data?.message || 'An error occurred');
      }
    };

    if (courseId) {
      fetchEnrolledUsers();
    }
  }, [courseId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-gray-900 px-4 py-8 rounded-xl shadow-lg overflow-x-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Enrolled Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No users enrolled yet.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {user.name || 'Unnamed'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email || 'N/A'}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {user.phoneNumber || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default EnrolledUsers;
