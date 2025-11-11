import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is in the same components directory

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;