import React, { useRef, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import LessonItem from './LessonItem';

const LessonSidebar = ({ 
  lessons, 
  totalElements, 
  progressData, 
  currentLessonIdx, 
  completedMap, 
  onLessonSelect,
  isLoadingMore,
  isReachingEnd,
  onLoadMore
}) => {
  const virtuosoRef = useRef(null);

  useEffect(() => {
    if (lessons.length > 0 && currentLessonIdx > 0) {
      const timer = setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index: currentLessonIdx,
          align: 'center',
          behavior: 'smooth'
        });
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [lessons.length, currentLessonIdx]); 

  return (
    <div className="w-80 sm:w-96 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center shrink-0">
        <h3 className="text-white font-bold">Nội dung khóa học</h3>
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full border border-gray-600">
          {progressData?.completedLessons || 0} / {totalElements || 0}
        </span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <Virtuoso
          ref={virtuosoRef} 
          data={lessons}
          className="h-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 [scrollbar-width:thin] [scrollbar-color:#4b5563_#1f2937]"
          
          endReached={() => {
            if (!isReachingEnd && !isLoadingMore) {
              onLoadMore();
            }
          }}
          
          components={{
            Footer: () => isLoadingMore ? (
              <div className="text-center py-4 text-xs text-gray-400 bg-gray-800/90 border-t border-gray-700 flex items-center justify-center gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                <div className="animate-spin w-4 h-4 border-2 border-brand border-t-transparent rounded-full"></div>
                Đang nạp thêm bài học...
              </div>
            ) : null
          }}
          
          itemContent={(index, lesson) => (
            <LessonItem
              lesson={lesson}
              index={index}
              isActive={currentLessonIdx === index}
              isCompleted={completedMap[lesson.id]}
              onClick={onLessonSelect}
            />
          )}
        />
      </div>
    </div>
  );
};

export default LessonSidebar;