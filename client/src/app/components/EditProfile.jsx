"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditProfileForm = ({ profileData, onSuccess }) => {
  const router = useRouter();
  const [name, setName] = useState(profileData.name || '');
  const [location, setLocation] = useState(profileData.location || '');
  const [nationality, setNationality] = useState(profileData.nationality || '');
  const [dateOfBirth, setDateOfBirth] = useState(profileData.dateOfBirth || '');
  const [phoneNumber, setPhoneNumber] = useState(profileData.dateOfBirth || '');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('name', name);
      formData.append('location', location);
      formData.append('nationality', nationality);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('phoneNumber', phoneNumber);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      await axios.put(
        `https://my-app-hp3z.onrender.com/api/users/edit-profile/${profileData._id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
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
console.log(profileData)
return (
  <>
    <h2 className="text-center text-2xl font-semibold mb-4 dark:text-gray-100">Edit Profile</h2>
    {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="profileImage" className="block font-semibold dark:text-gray-100">Profile Image:</label>
        <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="name" className="block font-semibold dark:text-gray-100">Name:</label>
        <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 dark:text-gray-100 border-gray-200 dark:border-gray-700" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block font-semibold dark:text-gray-100">Phone Number:</label>
        <input type="tel" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 dark:text-gray-100 border-gray-200 dark:border-gray-700" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div>
        <label htmlFor="location" className="block font-semibold dark:text-gray-100">Location:</label>
        <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 dark:text-gray-100 border-gray-200 dark:border-gray-700" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <label htmlFor="nationality" className="block font-semibold dark:text-gray-100">Nationality:</label>
        <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 dark:text-gray-100 border-gray-200 dark:border-gray-700" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block font-semibold dark:text-gray-100">Date of Birth:</label>
        <input type="date" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-gray-300 dark:text-gray-100 border-gray-200 dark:border-gray-700" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
    <div className="mt-3">
      <Link href="/password" className="text-blue-500 dark:text-blue-400">Change Password</Link>
    </div>
  </>
);

};

export default EditProfileForm;
