'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const EditProfileForm = ({ profileData, onSuccess }) => {
  const [form, setForm] = useState({
    name: profileData.name || '',
    location: profileData.location || '',
    nationality: profileData.nationality || '',
    dateOfBirth: profileData.dateOfBirth || '',
    phoneNumber: profileData.phoneNumber || '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(profileData.profileImage || '/profile.png');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setPreviewURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (profileImage) formData.append('profileImage', profileImage);

      await axios.put(
        `https://my-app-hp3z.onrender.com/api/users/edit-profile/${profileData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess(true);
      onSuccess();
    } catch (err) {
      setError('Something went wrong while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Image Preview & Upload */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow">
          <img src={previewURL} alt="Preview" className="w-full h-full object-cover" />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-sm"
        />
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          ['Full Name', 'name', form.name],
          ['Phone Number', 'phoneNumber', form.phoneNumber],
          ['Location', 'location', form.location],
          ['Nationality', 'nationality', form.nationality],
          ['Date of Birth', 'dateOfBirth', form.dateOfBirth, 'date'],
        ].map(([label, name, value, type = 'text']) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={value}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/40 dark:bg-gray-800 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
        ))}
      </div>

      {/* Feedback */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">Profile updated successfully!</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-all duration-300 disabled:opacity-60"
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </motion.form>
  );
};

export default EditProfileForm;
