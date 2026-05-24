import React from 'react';
import { useCourseContext } from './index';

const Instructor = () => {
  const { instructorId } = useCourseContext();
  return (
    <div className="flex items-center gap-2 mb-4 mt-auto pt-4">
      <img 
        src={instructorId?.avatar} 
        alt={instructorId?.fullName} 
        className="w-8 h-8 rounded-full bg-gray-100"
        onError={(e) => e.target.src = '/images/default-avatar.png'}
      />
      <span className="text-sm text-gray-600 font-medium">{instructorId?.fullName}</span>
    </div>
  );
}

export default Instructor;