'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import MyModal from './MyModal';

const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 dark:bg-white/10 dark:text-white dark:placeholder-gray-400 backdrop-blur border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 dark:bg-white/10 dark:text-white dark:placeholder-gray-400 backdrop-blur border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const AddCourse = () => {
  const [form, setForm] = useState({
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
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCourseImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (courseImage) formData.append('courseImage', courseImage);

    try {
      await axios.post('https://my-app-hp3z.onrender.com/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      setForm({
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
      setCourseImage(null);
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:to-pink-500 focus:outline-none"
      >
        <FaPlus /> Add Course
      </motion.button>

      <MyModal show={showModal} onClose={() => setShowModal(false)}>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} />
            <Input label="Time" name="time" value={form.time} onChange={handleChange} />
            <Input label="Location" name="location" value={form.location} onChange={handleChange} />
            <Input label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
            <Input label="Seats" name="seats" type="number" value={form.seats} onChange={handleChange} />
            <Input label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
            <Input label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} />
            <div className="w-full">
              <label htmlFor="category" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">Category</label>
<select
  id="category"
  name="category"
  value={form.category}
  onChange={handleChange}
  className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 dark:bg-white/10 dark:text-white backdrop-blur border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Category</option>
  <option value="programming">Programming</option>
  <option value="Electrical Engineering">Electrical Engineering</option>
  <option value="Software Engineering">Software Engineering</option>
  <option value="consulting">Consulting</option>
</select>

            </div>
          </div>

          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />
          <Textarea label="Table of Content" name="tableOfContent" value={form.tableOfContent} onChange={handleChange} />
          <Textarea label="Objectives" name="objectives" value={form.objectives} onChange={handleChange} />
          <Textarea label="Outcome" name="outcome" value={form.outcome} onChange={handleChange} />

          <div className="space-y-2">
            <label htmlFor="courseImage" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">Course Image</label>
           <input
  type="file"
  name="courseImage"
  onChange={handleImageChange}
  className="w-full text-sm text-gray-900 dark:text-white file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
/>

          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-white shadow-md transition duration-300"
          >
            Submit Course
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </motion.form>
      </MyModal>
    </>
  );
};

export default AddCourse;
