import React from 'react';
import { Clock } from 'lucide-react';
import { useCourseContext } from './index';

export default function Meta() {
  const { duration } = useCourseContext();
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
      <Clock size={12} /> {hours}h {minutes}m
    </div>
  );
}