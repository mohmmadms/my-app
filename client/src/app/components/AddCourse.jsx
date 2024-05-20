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
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setEventData({ ...eventData, [key]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/api/courses', eventData, {
                headers: {
                    'Content-Type': 'application/json',
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
            });
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
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        onChange={handleChange}
                        value={eventData.startTime}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        onChange={handleChange}
                        value={eventData.endTime}
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
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Sport">Sport</option>
                            <option value="Technology">Technology</option>
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
