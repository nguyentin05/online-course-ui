import React from 'react';
import { useCourseContext } from './index';

const Thumbnail = () => {
  const { image, subject, categoryId } = useCourseContext();
  
  return (
    <div className="relative aspect-video overflow-hidden bg-gray-100">
      <img 
        src={image}
        alt={subject}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => e.target.src = '/images/default-course.png'}
      />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand shadow-sm">
        {categoryId?.name || "General"}
      </div>
    </div>
  );
}

export default Thumbnail;