'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.clear();
   window.location.href = '/';
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 py-2 px-4 rounded-xl transition duration-300"
    >
      Logout
    </button>
  );
};

export default Logout;
