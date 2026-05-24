import React from 'react';
import { Clock } from 'lucide-react';
import { useCourseContext } from './index';

const Meta = () => {
  const { duration } = useCourseContext();
  const hours = duration ? Math.floor(duration / 60) : 0;
  const minutes = duration ? duration % 60 : 0;

  return (
    <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
      <Clock size={12} /> {hours}h {minutes}m
    </div>
  );
}

export default Meta;