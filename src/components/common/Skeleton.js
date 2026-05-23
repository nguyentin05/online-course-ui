import React from 'react';

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular' // 'rectangular' (hình chữ nhật) | 'circular' (hình tròn - avatar)
}) {
  const baseClass = "animate-pulse bg-gray-200"; // Hiệu ứng nhấp nháy + màu nền xám
  
  const variants = {
    rectangular: "rounded-lg",
    circular: "rounded-full"
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`} />
  );
}