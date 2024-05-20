'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone) => {
    
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid phone number format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/signup', {
        name,
        email,
        password,
        location,
        nationality,
        dateOfBirth,
        phoneNumber,
      });
     
      const token = response.data.token;
      const userId = response.data._id;
     
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      
      router.push('/');
    } catch (error) {
      if (error.response.status === 400 && error.response.data.message === 'User already exists') {
        setError('User already exists');
      } else {
        setError('User already exists');
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center items-center">
      <div className="w-full md:max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input type="email" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input type="password" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
            <input type="password" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="mb-5">
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number:</label>
            <input type="tel" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="mb-5">
            <label htmlFor="location" className="block text-gray-700">Location:</label>
            <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="mb-5">
            <label htmlFor="nationality" className="block text-gray-700">Nationality:</label>
            <input type="text" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
          </div>
          <div className="mb-5">
            <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth:</label>
            <input type="date" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <div className="mb-5">
            <label htmlFor="profileImage" className="block text-gray-700">Profile Image:</label>
            <input type="file" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="profileImage" accept="image/*" />
          </div>
          <div className="mb-5">
            <button type="submit" className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#63D4D5] hover:bg-[#408D8E] hover:shadow-lg focus:outline-none">Sign Up</button>
          </div>
          <div className="text-center mb-5">
            <p>Or sign up using</p>
          </div>
          <hr className="mb-5" />
          <div className="text-center">
            <p className="mb-0">Already have an account? <Link href="/Login" className="text-[#63D4D5] hover:text-[#408D8E]">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};


export default Signup;
