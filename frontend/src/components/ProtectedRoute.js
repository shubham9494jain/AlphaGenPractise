import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { tokens } = useAuth();
  console.log('ProtectedRoute tokens:', tokens);

  return tokens ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
