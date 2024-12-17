import React, { useState, useEffect } from "react";
import Sidebar from "../admin/sidebar"; // Sidebar component

import "tailwindcss/tailwind.css"; // Tailwind CSS

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState(null);

  // Fetch dashboard data from API
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTotalProducts(data.totalProducts);
        setTotalCategories(data.totalCategories);
        setTotalUsers(data.totalUsers);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchDashboardData();
  }, []);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 p-6 ml-64"> {/* ml-64 to add space to the left */}
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
          
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Products */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
            </div>

            {/* Total Categories */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700">Total Categories</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalCategories}</p>
            </div>

            {/* Total Users */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
