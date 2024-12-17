import React, { useEffect, useState } from "react";
import Sidebar from "../admin/sidebar";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditRole = async (userId) => {
    try {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          const newRole = user.role === "admin" ? "user" : "admin";
          return { ...user, role: newRole };
        }
        return user;
      });

      const userToUpdate = updatedUsers.find((user) => user._id === userId);
      const response = await fetch(
        `http://localhost:5000/api/auth/users/${userId}/role`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: userToUpdate.role }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role.");
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-5">
        {/* ml-64 offsets the sidebar width */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 bg-white">
            <thead className="text-sm text-white uppercase bg-indigo-600">
              <tr>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b hover:bg-indigo-100 transition duration-200`}
                >
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 font-medium">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditRole(user._id)}
                      className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-xs px-4 py-2"
                    >
                      Toggle Role
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

export default ViewUsers;
