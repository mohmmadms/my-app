'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
      });
     
      const token = response.data.token;
      const userId = response.data._id;
     
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
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
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card p-5">
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <p className="text-danger text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:*</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:*</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:*</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password:*</label>
                  <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
                <div className="mb-3">
                  <label htmlFor="profileImage" className="form-label">Profile Image:</label>
                  <input type="file" className="form-control" id="profileImage" accept="image/*" />
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
                <div className="text-center mb-3">
                  <p>Or sign up using</p>
                 
                </div>
                <hr />
                <div className="text-center">
                  <p className="mb-0">Already have an account? <Link href="/Login" className="text-decoration-none">Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
