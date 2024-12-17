import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import Sidebar from '../admin/sidebar'; // Sidebar component
import 'tailwindcss/tailwind.css'; // Tailwind CSS

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [categoryName, setCategoryName] = useState(''); // State for category name

  // Fetch all categories and find the category by ID to pre-fill the form
  useEffect(() => {
    fetch('http://localhost:5000/api/categories') // Fetch all categories
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json(); // Parse JSON if the response is okay
      })
      .then((data) => {
        console.log('Fetched Categories:', data); // Log the fetched categories data
        const category = data.find((cat) => cat._id === id); // Find the category by ID
        if (category) {
          setCategoryName(category.name); // Pre-fill the input field with the category name
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [id]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName }), // Send updated category name
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Category updated successfully!');
        navigate('/viewCategories'); // Redirect back to the categories page
      })
      .catch((error) => {
        console.error('Error updating category:', error);
        alert('Failed to update category');
      });
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar Component */}

      <div className="flex-1 p-10 ml-64">
        <h1 className="text-3xl font-semibold text-black mb-6">Edit Category</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-lg font-semibold text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
