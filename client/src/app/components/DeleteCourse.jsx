import React, { useState } from 'react';
import axios from 'axios';

const DeleteCourse = ({ courseId }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:3001/api/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Response:', response.data);

            // Handle successful response here, e.g., show success message or update UI
        } catch (error) {
            console.error('Error:', error.response.data);
            setError('An error occurred while deleting the course.');
        }
    };

    return (
        <div>
  
            <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>
                Delete Course
            </button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default DeleteCourse;