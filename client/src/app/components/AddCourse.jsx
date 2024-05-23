import React, { useState } from 'react';
import MyModal from './MyModal';
import axios from 'axios';

const AddCourse = () => {
    const [eventData, setEventData] = useState({
        title: '',
        time: '',
        location: '',
        price: '',
        category: '',
        startDate: '',
        endDate: '',
        seats: '',
        description:'',
        tableOfContent:'',
        objectives:'',
        outcome:'',
    });
    const [courseImage, setCourseImage] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setEventData({ ...eventData, [key]: value });
    };

    const handleImageChange = (e) => {
        setCourseImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            for (const key in eventData) {
                formData.append(key, eventData[key]);
            }
            if (courseImage) {
                formData.append('courseImage', courseImage);
            }

            const response = await axios.post('http://localhost:3001/api/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Response:', response.data);
            setError(null);
            setShowModal(false);
            setEventData({
                title: '',
                time: '',
                location: '',
                price: '',
                category: '',
                startDate: '',
                endDate: '',
                seats: '',
                description:'',
                tableOfContent:'',
                objectives:'',
                outcome:'',
            });
            setCourseImage(null);
        } catch (error) {
            console.error('Error:', error.response.data);
            setError('An error occurred while adding the event.');
        }
    };

    return (
        <>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOpenModal}>
                Add New Course
            </button>
            <MyModal show={showModal} onClose={handleClose}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            value={eventData.title}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="text" 
                            id="time"
                            name="time"
                            onChange={handleChange}
                            value={eventData.time}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            onChange={handleChange}
                            value={eventData.location}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleChange}
                            value={eventData.price}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            name="category"
                            onChange={handleChange}
                            value={eventData.category}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="programming">programming</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="consulting">consulting</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            onChange={handleChange}
                            value={eventData.startDate}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            onChange={handleChange}
                            value={eventData.endDate}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Seats</label>
                        <input
                            type="number"
                            id="seats"
                            name="seats"
                            onChange={handleChange}
                            value={eventData.seats}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={eventData.description}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="tableOfContent" className="block text-sm font-medium text-gray-700">Table of Content</label>
                        <textarea
                            id="tableOfContent"
                            name="tableOfContent"
                            onChange={handleChange}
                            value={eventData.tableOfContent}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Objectives</label>
                        <textarea
                            id="objectives"
                            name="objectives"
                            onChange={handleChange}
                            value={eventData.objectives}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="outcome" className="block text-sm font-medium text-gray-700">Outcome</label>
                        <textarea
                            id="outcome"
                            name="outcome"
                            onChange={handleChange}
                            value={eventData.outcome}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="courseImage" className="block text-sm font-medium text-gray-700">Course Image</label>
                        <input
                            type="file"
                            id="courseImage"
                            name="courseImage"
                            onChange={handleImageChange}
                            className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <button type="submit" className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Submit
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </MyModal>
        </>
    );
};

export default AddCourse;
