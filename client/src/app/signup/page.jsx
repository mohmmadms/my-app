'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    nationality: '',
    dateOfBirth: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (profileImage) formData.append('profileImage', profileImage);

      const { data } = await axios.post(
        'https://my-app-hp3z.onrender.com/api/users/signup',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('isAdmin', data.isAdmin);
      localStorage.setItem('profilePic', data.profileImage);

      window.location.href = '/';
    } catch (err) {
      if (err.response?.data?.message === 'User already exists') {
        setError('User already exists');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Create Your Account
          </h2>

          {error && (
            <p className="text-center text-red-500 dark:text-red-400 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              ['name', 'Full Name'],
              ['email', 'Email', 'email'],
              ['password', 'Password', 'password'],
              ['confirmPassword', 'Confirm Password', 'password'],
              ['phoneNumber', 'Phone Number'],
              ['location', 'Location'],
              ['nationality', 'Nationality'],
              ['dateOfBirth', 'Date of Birth', 'date'],
            ].map(([id, label, type = 'text']) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={id}
                  id={id}
                  value={form[id]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={['name', 'email', 'password', 'confirmPassword'].includes(id)}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="mt-2 block w-full text-sm text-white file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300"
            >
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/Login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
