'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from '../components/ProfilePage'; 
import EditProfileForm from '../components/EditProfile'; 
import Logout from '../components/Logout';
import DeleteAccountButton from '../components/DeleteAccountButton';
import { useRouter } from 'next/navigation';


const ProfilePageWithEdit = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/my-profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      setProfileData(response.data); 
    } catch (error) {
      console.error('Error fetching profile data:', error); 
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode); 
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/my-profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      const updatedProfileData = response.data; 
      setProfileData(updatedProfileData);
      setEditMode(false); 
    } catch (error) {
      console.error('Error fetching updated profile data:', error); 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login'); 
    }
  }, [router]);

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                {!editMode ? (
                  <>
                    {profileData && <ProfilePage profileData={profileData} />} 
                    <button onClick={toggleEditMode} className="btn btn-primary mt-3">Edit Profile</button>
                    <div className="d-flex justify-content-between mt-3">
                    <Logout/>
                    <DeleteAccountButton/>
                    </div>
                  </>
                ) : (
                  <>
                    <EditProfileForm profileData={profileData} onSuccess={handleProfileUpdate} /> 
                    <button onClick={toggleEditMode} className="btn btn-secondary mt-3">Cancel</button> 
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageWithEdit;