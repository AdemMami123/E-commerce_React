import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation
import 'tailwindcss/tailwind.css'; // Tailwind CSS

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure this header is set
        },
        credentials: 'include', // Ensure cookies are included if using cookies for sessions
      });

      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      // Clear JWT token from localStorage or sessionStorage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      // Redirect the user to the home page after successful logout
      navigate('/home');
    } catch (error) {
      console.error('Logout failed:', error.message);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
