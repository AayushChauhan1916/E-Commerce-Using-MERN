import React from 'react';

import { Navigate } from 'react-router-dom';


const Protected = ({ children }) => {

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('user');

  if (!isAuthenticated) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;
