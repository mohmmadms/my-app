'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', { email, password });
    
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data._id);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        router.push('/');
      } else {
        setError('Invalid email or password. Please try again.');
      }

      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="container">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input type="email" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input type="password" className="pt-3 pb-2 block w-full px-4 mt-1 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-4">
              <button type="submit" className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-[#63D4D5] hover:bg-[#408D8E] hover:shadow-lg focus:outline-none">Login</button>
            </div>
            <div className="text-center mb-4">
              <p>Or Login using</p>
            </div>
            <hr className="mb-4" />
            <div className="text-center">
              <p className="mb-0">Don't have an account? <Link href="/signup" className="text-[#63D4D5] hover:text-[#408D8E]">Sign Up</Link></p>
            </div>
          </form>
        </div>
        
      </div>
    </div>
    <Footer/>
    </>
  );
};


export default Login;



