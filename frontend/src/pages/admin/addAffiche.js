import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Tailwind CSS for styling
import Sidebar from './sidebar'; // Import your Sidebar component


const AddAffiche = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  // Handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      setLoading(true);
      setMessage('');
      
      const response = await axios.post('http://localhost:5000/api/affiche', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success
      setMessage('Poster added successfully!');
     
      setTitle('');
      setImage(null);
    } catch (error) {
      // Handle error
      setMessage('Error adding Poster.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64"> {/* Add ml-64 to add space for the sidebar */}
        <h2 className="text-2xl font-bold text-gray-800">Add New Poster</h2>
        {message && <p className="mt-2 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
              placeholder="Enter the affiche title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md ${loading && 'bg-gray-500 cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? 'Adding Affiche...' : 'Add Affiche'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAffiche;
