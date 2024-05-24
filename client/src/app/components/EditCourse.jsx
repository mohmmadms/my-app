import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyModal from './MyModal';

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
    const [originalEventData, setOriginalEventData] = useState({});
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
        const token = localStorage.getItem('token');

        const formData = new FormData();
        for (const key in eventData) {
            formData.append(key, eventData[key]);
        }
        if (courseImage) {
            formData.append('courseImage', courseImage);
        }

        try {
            const response = await axios.put(`https://my-app-hp3z.onrender.com/api/courses/${course._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Event updated:', response.data);

            setShowModal(false);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError('An error occurred while updating the event.');
        }
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log(`Fetching event with ID: ${course._id}`);
                const response = await axios.get(`https://my-app-hp3z.onrender.com/api/courses/${course._id}`);
                const data = response.data;

                // Format dates to yyyy-MM-dd
                const formattedData = {
                    ...data,
                    startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
                    endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
                };

                setEventData(formattedData);
                setOriginalEventData(formattedData);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                setError('An error occurred while fetching the event.');
            }
        };

        fetchEvent();
    }, [course._id]);
   

    return (
        <>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOpenModal}>
                Edit
            </button>
            <MyModal show={showModal} onClose={handleClose}>
                <form className="create" onSubmit={handleSubmit}>
                    <div className="container mx-auto p-4">
                        {/* Title */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={handleChange}
                                value={eventData.title}
                                className="form-input mt-1 block w-full"
                                placeholder="Title"
                            />
                        </div>
                        {/* Time */}
                        <div className="mb-4">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                onChange={handleChange}
                                value={eventData.time}
                                className="form-input mt-1 block w-full"
                                placeholder="Time"
                            />
                        </div>
                        {/* Location */}
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                onChange={handleChange}
                                value={eventData.location}
                                className="form-input mt-1 block w-full"
                                placeholder="Location"
                            />
                        </div>
                        {/* Price */}
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                onChange={handleChange}
                                value={eventData.price}
                                className="form-input mt-1 block w-full"
                                placeholder="Price"
                            />
                        </div>
                        {/* Category */}
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="category"
                                name="category"
                                onChange={handleChange}
                                value={eventData.category}
                                className="form-select mt-1 block w-full"
                            >
                                <option value="">Select Category</option>
                                <option value="programming">Programming</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="consulting">Consulting</option>
                            </select>
                        </div>
                        {/* Start Date */}
                        <div className="mb-4">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                onChange={handleChange}
                                value={eventData.startDate}
                                className="form-input mt-1 block w-full"
                            />
                        </div>
                        {/* End Date */}
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                onChange={handleChange}
                                value={eventData.endDate}
                                className="form-input mt-1 block w-full"
                            />
                        </div>
                        {/* Seats */}
                        <div className="mb-4">
                            <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Seats</label>
                            <input
                                type="number"
                                id="seats"
                                name="seats"
                                onChange={handleChange}
                                value={eventData.seats}
                                className="form-input mt-1 block w-full"
                                placeholder="Seats"
                            />
                        </div>
                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={handleChange}
                                value={eventData.description}
                                className="form-input mt-1 block w-full"
                                rows="4"
                            ></textarea>

                        </div>
                        {/* Table of Content */}
                        <div className="mb-4">
                            <label htmlFor="tableOfContent" className="block text-sm font-medium text-gray-700">Table of Content</label>
                            <textarea
                                id="tableOfContent"
                                name="tableOfContent"
                                onChange={handleChange}
                                value={eventData.tableOfContent}
                                className="form-input mt-1 block w-full"
                                rows="4"
                            ></textarea>
                        </div>
                        {/* Objectives */}
                        <div className="mb-4">
                            <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Objectives</label>
                            <textarea
                                id="objectives"
                                name="objectives"
                                onChange={handleChange}
                                value={eventData.objectives}
                                className="form-input mt-1 block w-full"
                                rows="4"
                            ></textarea>
                        </div>
                        {/* Outcome */}
                        <div className="mb-4">
                            <label htmlFor="outcome" className="block text-sm font-medium text-gray-700">Outcome</label>
                            <textarea
                                id="outcome"
                                name="outcome"
                                onChange={handleChange}
                                value={eventData.outcome}
                                className="form-input mt-1 block w-full"
                                rows="4"
                            ></textarea>
                        </div>
                        {/* Course Image */}
                        <div className="mb-4">
                            <label htmlFor="courseImage" className="block text-sm font-medium text-gray-700">Course Image</label>
                            <input
                                type="file"
                                id="courseImage"
                                name="courseImage"
                                onChange={handleImageChange}
                                className="form-input mt-1 block w-full"
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <button className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Course</button>
                    </div>
                </form>
            </MyModal>
        </>
    );
};

export default EditCourse;
