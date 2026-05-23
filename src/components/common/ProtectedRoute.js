import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../configs/MyContexts';

export default function ProtectedRoute({ allowedRoles = [] }) {
  // Lấy thông tin user hiện tại từ Global State
  const user = useContext(UserContext);

  // 1. Nếu chưa đăng nhập -> Đẩy về trang Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Nếu route có yêu cầu Role cụ thể, mà user không có role đó -> Đẩy về trang chủ (hoặc báo lỗi 403)
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Có thể thay bằng một trang Component <AccessDenied />
    return <Navigate to="/" replace />; 
  }

  // 3. Hợp lệ -> Cho phép đi tiếp vào trang bên trong
  return <Outlet />;
}