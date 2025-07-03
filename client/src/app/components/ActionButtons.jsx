'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ActionButtons = () => {
  const router = useRouter();

  const handleLogout = () => {
localStorage.clear();
    window.location.href = '/';
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to permanently delete your account?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://my-app-hp3z.onrender.com/api/users/delete-account', {
        headers: { Authorization: `Bearer ${token}` },
      });
localStorage.clear();
      window.location.href = '/';
    } catch (err) {
      console.error('Account deletion failed', err);
      alert('Failed to delete account.');
    }
  };

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-300 dark:border-gray-600">
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm font-medium"
      >
        Logout
      </button>

      <button
        onClick={handleDeleteAccount}
        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm font-medium"
      >
        Delete Account
      </button>
    </div>
  );
};

export default ActionButtons;
