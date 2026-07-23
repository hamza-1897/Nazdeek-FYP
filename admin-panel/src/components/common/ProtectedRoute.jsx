import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useAdmin();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;