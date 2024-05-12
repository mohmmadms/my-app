'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        router.push('/');
      } else {
        setError('Invalid email or password. Please try again.');
      }

      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('Login error:', error.response.data.message.replace(/'/g, '&apos;'));
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <div className="container py-5" >
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card p-5">
              <h2 className="text-center mb-4">Login</h2>
              {error && <p className="text-danger text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </div>
                <hr />
                <div className="text-center">
                  <p className="mb-0">Don't have an account? <Link href="/signup" className="text-decoration-none">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
