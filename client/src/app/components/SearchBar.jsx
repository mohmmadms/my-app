import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      try {
        // Send a GET request to your backend API with the search query
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses?title=${searchQuery}`);
        // Update search results with the data returned from the backend
        setSearchResults(response.data);
        // Reset the search query
        setSearchQuery('');
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
