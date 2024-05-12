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
    <div className="profile-container">
      <div className="profile-content">
        <h2 className="profile-heading">Profile</h2>
        {loading && <div>Loading...</div>}
        {error && <div className="error-text">{error}</div>}
        {profileData && (
          <div className="profile-details">
            <div className="profile-item">
              <span>Name:</span>
              <span>{profileData.Name}</span>
            </div>
            <div className="profile-item">
              <span>Email:</span>
              <span>{profileData.Email}</span>
            </div>
            <div className="profile-item">
              <span>Location:</span>
              <span>{profileData.Location || 'Not specified'}</span>
            </div>
            <div className="profile-item">
              <span>Nationality:</span>
              <span>{profileData.Nationality || 'Not specified'}</span>
            </div>
            <div className="profile-item">
              <span>Date of Birth:</span>
              <span>{formatDate(profileData.DateOfBirth)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
