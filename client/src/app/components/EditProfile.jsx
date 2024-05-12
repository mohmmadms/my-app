"use client"
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
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
  
      await axios.put(
        `http://localhost:3001/api/users/edit-profile/${profileData._id}`,
        {
          name,
          location,
          nationality,
          dateOfBirth,
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
    }
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="nationality" className="form-label">Nationality:</label>
          <input type="text" className="form-control" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
          <input type="date" className="form-control" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
      <div className="mt-3">
        <Link href="/password"
          className="btn btn-secondary">Change Password
        </Link>
      </div>
    </div>
  );
};

export default EditProfileForm;
