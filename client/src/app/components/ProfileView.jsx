'use client';

import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaBirthdayCake } from 'react-icons/fa';

const ProfileView = ({ profileData }) => {
  const {
    profileImage,
    Name,
    Email,
    phoneNumber,
    Location,
    Nationality,
    DateOfBirth,
  } = profileData;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified';

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Profile Sidebar */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
          <img
            src={profileImage || '/profile.png'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{Name || 'Unnamed User'}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 flex items-center justify-center gap-1">
          <FaMapMarkerAlt className="text-blue-400" />
          {Location || 'Unknown Location'}
        </p>
      </div>

      {/* About Info */}
      <div className="md:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 pb-2">
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaGlobe className="text-purple-400" />
            <span className="font-medium">Nationality:</span>
            <span>{Nationality || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBirthdayCake className="text-pink-400" />
            <span className="font-medium">Date of Birth:</span>
            <span>{formatDate(DateOfBirth)}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 pt-6 pb-2">
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-green-400" />
            <span className="font-medium">Email:</span>
            <span>{Email || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-green-400" />
            <span className="font-medium">Phone:</span>
            <span>{phoneNumber || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
