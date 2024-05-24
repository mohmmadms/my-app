import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteAccountButton = ({ onSuccess }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`https://my-app-hp3z.onrender.com/api/users/delete-account/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      onSuccess();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300">Delete Account</button>

      {showModal && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg">Cancel</button>
              <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountButton;


