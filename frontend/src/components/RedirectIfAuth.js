import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RedirectIfAuth = () => {
  const { user } = useAuth();
  console.log('RedirectIfAuth user:', user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuth;