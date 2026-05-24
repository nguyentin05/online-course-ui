import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../configs/MyContexts';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const [user] = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Có thể thay bằng một trang Component <AccessDenied />
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
}