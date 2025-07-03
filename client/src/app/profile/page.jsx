'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileView from '../components/ProfileView';
import EditProfileForm from '../components/EditProfile';
import ActionButtons from '../components/ActionButtons';

const ProfilePageWithEdit = () => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const res = await axios.get('https://my-app-hp3z.onrender.com/api/users/my-profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfileData(res.data);
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/Login');
    else fetchProfileData();
  }, [router]);

  const handleProfileUpdate = () => {
    fetchProfileData();
    setEditMode(false);
  };
  console.log(profileData)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {loading ? (
            <p className="text-center py-10 text-gray-400">Loading profile...</p>
          ) : editMode ? (
            <EditProfileForm profileData={profileData} onSuccess={handleProfileUpdate} />
          ) : (
            <>
              <ProfileView profileData={profileData} />
              <ActionButtons />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePageWithEdit;
