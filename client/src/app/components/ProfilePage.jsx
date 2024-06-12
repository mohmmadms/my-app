import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://my-app-hp3z.onrender.com/api/users/my-profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US') : 'Not specified';
  };
  console.log(profileData)

  return (
    <>
      {loading && <div className="text-red-500 dark:text-red-300">Loading...</div>}
      {error && <div className="text-red-500 dark:text-red-300">{error}</div>}
      {profileData && (
        <>
          <div className="sm:flex xl:block sm:space-x-4 xl:space-x-0 dark:bg-gray-700 p-4 rounded-lg">
            <img
              className="mb-2 w-20 h-20 rounded-2xl shadow-lg shadow-gray-300 dark:shadow-blue-800"
              src={profileData.profileImage ? profileData.profileImage : "/profile.png"}
              alt="profile.png"
            />
            <div>
              <h2 className="text-xl font-bold dark:text-white">{profileData.Name}</h2>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center text-sm font-normal text-gray-500 dark:text-white">
                  <svg
                    className="mr-2 w-4 h-4 text-gray-900 dark:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {profileData.Location || 'Not specified'}
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4 sm:flex xl:block dark:bg-gray-700 p-4 rounded-lg">
            <div className="sm:flex-1">
              <address className="text-sm not-italic font-normal text-gray-500 dark:text-white">
                <div className="mt-4">Email address</div>
                <a className="text-sm font-medium text-gray-900 dark:text-white" href={`mailto:${profileData.Email}`}>
                  {profileData.Email}
                </a>
                <div className="mt-4">Phone number</div>
                <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {profileData.phoneNumber || 'Not specified'}
                </div>
              </address>
            </div>
          </div>
          <div className="dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">Personal Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm font-normal text-gray-500 dark:text-white">
                <span className="mr-2 font-semibold dark:text-white">Nationality:</span>
                {profileData.Nationality || 'Not specified'}
              </li>
              <li className="flex items-center text-sm font-normal text-gray-500 dark:text-white">
                <span className="mr-2 font-semibold dark:text-gray-300">Date of Birth:</span>
                {formatDate(profileData.DateOfBirth)}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
  
};

export default ProfilePage;
