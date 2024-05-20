import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/my-profile', {
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
  

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {loading && <div className="text-red-500">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {profileData && (
          <div className="mt-4">
            <div className="mb-4">
              <p className="font-semibold">Name:</p>
              <p>{profileData.Name}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Email:</p>
              <p>{profileData.Email}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Phone:</p>
              <p>{profileData.phoneNumber || 'Not specified'}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Location:</p>
              <p>{profileData.Location || 'Not specified'}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Nationality:</p>
              <p>{profileData.Nationality || 'Not specified'}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Date of Birth:</p>
              <p>{formatDate(profileData.DateOfBirth)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;