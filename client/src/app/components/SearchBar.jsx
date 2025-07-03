'use client';

import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses?title=${searchQuery}`);
      setSearchResults(response.data);
      setSearchQuery('');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex w-full max-w-sm bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-md border border-gray-300 dark:border-gray-700"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white dark:bg-gray-800 outline-none"
        placeholder="Search courses..."
      />
      <button
        type="submit"
        className="px-4 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
