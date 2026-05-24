import React from 'react';

const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      <div className="w-full aspect-video bg-gray-200"></div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>

        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5 mb-4"></div>

        <div className="mt-auto">
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSkeleton;