import React, { memo } from 'react';
import { Play, CheckCircle } from 'lucide-react';

const LessonItem = ({lesson, index, isActive, isCompleted, onClick}) => {
  return (
    <button
      onClick={() => onClick(index)}
      className={`w-full flex items-start gap-3 p-4 hover:bg-gray-700/80 transition-all duration-200 border-b border-gray-700/50 ${
        isActive ? 'bg-gray-700 border-l-4 border-l-brand shadow-inner' : 'border-l-4 border-l-transparent'
      }`}
    >
      <div className={`mt-0.5 shrink-0 ${isCompleted ? 'text-green-500' : isActive ? 'text-brand' : 'text-gray-500'}`}>
        {isCompleted ? <CheckCircle size={18} /> : <Play size={18} />}
      </div>
      
      <div className="flex flex-col items-start text-left w-full overflow-hidden">
        <span className={`text-sm font-medium leading-snug w-full ${isActive ? 'text-white' : 'text-gray-300'}`}>
          {lesson.lessonOrder || index + 1}. {lesson.subject}
        </span>
        <span className="text-xs text-gray-500 mt-1.5 font-medium">
          {lesson.duration || '—'}
        </span>
      </div>
    </button>
  );
};

export default memo(LessonItem);