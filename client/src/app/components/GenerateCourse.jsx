'use client';

import { useState } from 'react';
import axios from 'axios';

const availableTopics = [
  'Full Stack Web Development',
  'Introduction to AI',
  'UI/UX Design Basics',
  'Business Strategy 101',
  'Power Electronics',
  'Embedded Systems',
  'React for Beginners',
  'Node.js Fundamentals',
];

export default function GenerateCourse({ onCourseCreated }) {
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const finalTopic = customTopic.trim() || topic;

  const handleGenerate = async () => {
    if (!finalTopic) return;
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await axios.post('https://my-app-hp3z.onrender.com/api/generate', {
        topic: finalTopic,
      });
      setSuccessMsg('✅ Course generated successfully!');
      onCourseCreated?.(response.data);
      setCustomTopic('');
      setTopic('');
    } catch (error) {
      setErrorMsg('❌ Failed to generate course.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">🪄 Generate New Course</h3>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose a topic:</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          >
            <option value="">Select a topic...</option>
            {availableTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Or type a custom topic:</label>
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="e.g. Data Structures in Java"
            className="p-2 border rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !finalTopic}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mt-3">{errorMsg}</p>}
    </div>
  );
}
