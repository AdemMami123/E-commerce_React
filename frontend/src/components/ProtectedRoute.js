import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Redirect to login if no token or user information is found
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if the user's role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
