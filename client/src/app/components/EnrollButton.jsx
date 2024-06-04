'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnrollButton = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Get user ID from local storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const enrollInCourse = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await axios.post(`https://my-app-hp3z.onrender.com/api/courses/${courseId}/enroll`, { userId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setShowModal(false);
      setError('');
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Enroll</button>

      {showModal && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Enrolling</h2>
            <p className="text-gray-700 mb-4">After enrolling soon someone will contact you on your Email or Phone number please make sure to have those correct on your account.</p>
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg">Cancel</button>
              <button onClick={enrollInCourse} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Enroll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollButton;
