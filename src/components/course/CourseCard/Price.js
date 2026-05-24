import React from 'react';
import { useCourseContext } from './index';

 const Price = () => {
  const { price } = useCourseContext();
  return (
    <span className="text-xl font-bold text-gray-900">
      {price > 0 ? `$${price}` : 'Miễn phí'}
    </span>
  );
}

export default Price;