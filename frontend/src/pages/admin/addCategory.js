import React, { useState } from 'react';
import Sidebar from '../admin/sidebar'; // Assuming Sidebar is in the same folder
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AddCategory = () => {
  // State for category name
  const [categoryName, setCategoryName] = useState('');
   const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName) {
      alert("Category name is required!");
      return;
    }

    // Create category data object
    const categoryData = {
      name: categoryName,
    };

    // Send category data to the backend (example POST request)
    fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category Added:', data);
        setCategoryName(''); // Clear the input field after submission
        alert('Category added successfully!');
        navigate('/viewCategories');
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        alert('Failed to add category');
      });
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar Component */}

      {/* Main content area */}
      <div className="flex-1 p-10 ml-64"> {/* Add margin-left to ensure it's not hidden under the sidebar */}
        <h1 className="text-2xl font-semibold mb-4">Add New Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
