import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getId } from '@/redux/userSlice';

const ProtectedRoute = () => {
  const userId = useSelector(getId);

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return <Outlet />
};

export default ProtectedRoute;