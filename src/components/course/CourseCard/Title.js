import React from 'react';
import { useCourseContext } from './index';

const Title = () => {
  const { subject } = useCourseContext();
  return (
    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-brand transition-colors">
      {subject}
    </h3>
  );
}

export default Title;