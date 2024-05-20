'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from '../components/ProfilePage'; 
import EditProfileForm from '../components/EditProfile'; 
import Logout from '../components/Logout';
import DeleteAccountButton from '../components/DeleteAccountButton';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';


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
    <>
    <Navbar />
    <div className="container mx-auto py-5">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {!editMode ? (
            <>
              {profileData && <ProfilePage profileData={profileData} />} 
              <button 
                onClick={toggleEditMode} 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-3 transition-colors duration-300 w-full"
              >
                Edit Profile
              </button>
              <div className="flex justify-between mt-3">
                <Logout />
                <DeleteAccountButton />
              </div>
            </>
          ) : (
            <>
              <EditProfileForm profileData={profileData} onSuccess={handleProfileUpdate} /> 
              <button 
                onClick={toggleEditMode} 
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md mt-3 transition-colors duration-300 w-full"
              >
                Cancel
              </button> 
            </>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProfilePageWithEdit;