import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Sidebar from '../admin/sidebar'; // Sidebar component
import 'tailwindcss/tailwind.css'; // Tailwind CSS


const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch categories from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data)) // Set the fetched categories to state
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Handle Edit button click
  const handleEditClick = (categoryId) => {
    // Navigate to the Edit Category page with the category ID
    navigate(`/editCategory/${categoryId}`);
  };

  // Handle Delete button click (this could be implemented as needed)
  const handleDeleteClick = (categoryId) => {
    fetch(`http://localhost:5000/api/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted category from the state
        setCategories(categories.filter((category) => category._id !== categoryId));
        alert('Category deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      });
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar Component */}

      <div className="flex-1 p-10 ml-64">
        <h1 className="text-3xl font-semibold text-black mb-6">Categories</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-white uppercase bg-blue-600">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map through categories and display each one in the table */}
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="bg-gray-50 border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    {/* Edit button */}
                    <button
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => handleEditClick(category._id)} // Navigate to the Edit page with category ID
                    >
                      Edit
                    </button>
                    {/* Delete button */}
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold ml-4"
                      onClick={() => handleDeleteClick(category._id)} // Handle delete
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
      
    </div>
    
  );
  
};


export default ViewCategories;
