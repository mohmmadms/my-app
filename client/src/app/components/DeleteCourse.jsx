import React, { useState } from 'react';
import axios from 'axios';

const DeleteCourse = ({ courseId }) => {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState();

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:3001/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowModal(false);

            console.log('Response:', response.data);

            // Handle successful response here, e.g., show success message or update UI
        } catch (error) {
            console.error('Error:', error.response.data);
            setError('An error occurred while deleting the course.');
        }
    };

    return (
        <div>
        <button onClick={() => setShowModal(true)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300">Delete Course</button>
  
        {showModal && (
          <div id="popup-modal" tabIndex="-1" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Course Deletion</h2>
              <p className="text-gray-700 mb-4">Are you sure!.</p>
              <div className="flex justify-end">
                <button onClick={() => setShowModal(false)} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg">Cancel</button>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default DeleteCourse;