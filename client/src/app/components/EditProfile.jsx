"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditProfileForm = ({ profileData, onSuccess }) => {
  const router = useRouter();
  const [name, setName] = useState(profileData.name);
  const [location, setLocation] = useState(profileData.location || '');
  const [nationality, setNationality] = useState(profileData.nationality || '');
  const [dateOfBirth, setDateOfBirth] = useState(profileData.dateOfBirth || '');
  const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic phone number validation (simple regex for demonstration)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Invalid phone number format. Please enter a 10-digit phone number.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
  
      await axios.put(
        `http://localhost:3001/api/users/edit-profile/${profileData._id}`,
        {
          name,
          location,
          nationality,
          dateOfBirth,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess();
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="container">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold mb-4">Edit Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold">Name:</label>
              <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block font-semibold">Phone Number:</label>
              <input type="tel" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div>
              <label htmlFor="location" className="block font-semibold">Location:</label>
              <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <label htmlFor="nationality" className="block font-semibold">Nationality:</label>
              <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block font-semibold">Date of Birth:</label>
              <input type="date" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
          <div className="mt-3">
            <Link href="/password" className="text-blue-500">Change Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
