import React from 'react';

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular'
}) {
  const baseClass = "animate-pulse bg-gray-200";
  
  const variants = {
    rectangular: "rounded-lg",
    circular: "rounded-full"
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`} />
  );
}