import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const user = useUserStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
}

export default ProtectedRoute;