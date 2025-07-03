'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const EnrollButton = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  const enrollInCourse = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      await axios.post(`https://my-app-hp3z.onrender.com/api/courses/${courseId}/enroll`, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-5 rounded-xl transition duration-300"
      >
        Enroll
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <h2 className="text-xl font-bold mb-3 dark:text-white">Confirm Enrollment</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                After enrolling, someone will contact you via email or phone. Ensure your profile info is up to date.
              </p>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={enrollInCourse}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? 'Enrolling...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnrollButton;
