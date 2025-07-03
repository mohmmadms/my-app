'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyModal from './MyModal';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';

const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm text-gray-300 font-medium mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm text-gray-300 font-medium mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
    />
  </div>
);

const EditCourse = ({ course }) => {
  const [eventData, setEventData] = useState({
    title: '',
    time: '',
    location: '',
    price: '',
    category: '',
    startDate: '',
    endDate: '',
    seats: '',
    description: '',
    tableOfContent: '',
    objectives: '',
    outcome: '',
  });
  const [courseImage, setCourseImage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCourseImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, val]) => formData.append(key, val));
    if (courseImage) formData.append('courseImage', courseImage);

    try {
      await axios.put(`https://my-app-hp3z.onrender.com/api/courses/${course._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError('An error occurred while updating the event.');
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses/${course._id}`);
        const data = response.data;
        const formattedData = {
          ...data,
          startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
          endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
        };
        setEventData(formattedData);
      } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        setError('An error occurred while fetching the event.');
      }
    };
    fetchEvent();
  }, [course._id]);

  return (
    <>
      <motion.button
        onClick={handleOpenModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow hover:to-pink-500"
      >
        <FaEdit /> Edit
      </motion.button>

      <MyModal show={showModal} onClose={handleClose}>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" name="title" value={eventData.title} onChange={handleChange} />
            <Input label="Time" name="time" value={eventData.time} onChange={handleChange} />
            <Input label="Location" name="location" value={eventData.location} onChange={handleChange} />
            <Input label="Price" name="price" type="number" value={eventData.price} onChange={handleChange} />
            <Input label="Seats" name="seats" type="number" value={eventData.seats} onChange={handleChange} />
            <Input label="Start Date" name="startDate" type="date" value={eventData.startDate} onChange={handleChange} />
            <Input label="End Date" name="endDate" type="date" value={eventData.endDate} onChange={handleChange} />
            <div className="w-full">
              <label className="block text-sm text-gray-300 font-medium mb-1">Category</label>
              <select
                name="category"
                value={eventData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white"
              >
                <option value="">Select Category</option>
                <option value="programming">Programming</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>
          </div>

          <Textarea label="Description" name="description" value={eventData.description} onChange={handleChange} />
          <Textarea label="Table of Content" name="tableOfContent" value={eventData.tableOfContent} onChange={handleChange} />
          <Textarea label="Objectives" name="objectives" value={eventData.objectives} onChange={handleChange} />
          <Textarea label="Outcome" name="outcome" value={eventData.outcome} onChange={handleChange} />

          <div className="space-y-2">
            <label htmlFor="courseImage" className="block text-sm font-medium text-gray-300">Course Image</label>
            <input
              type="file"
              name="courseImage"
              onChange={handleImageChange}
              className="w-full text-sm text-white file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-white shadow-md transition duration-300"
          >
            Save Changes
          </button>
        </motion.form>
      </MyModal>
    </>
  );
};

export default EditCourse;
