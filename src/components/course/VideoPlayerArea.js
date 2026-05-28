import React from 'react';
import { CheckCircle } from 'lucide-react';

const VideoPlayerArea = ({ 
  currentLesson,
  currentLessonIdx, 
  totalLessons, 
  isCompleted,
  onPrevious, 
  onNext, 
  onMarkCompleted 
}) => {
  return (
    <div className="flex-1 bg-black flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      <div className="aspect-video w-full bg-black shrink-0">
        {currentLesson?.video ? (
          <iframe
            className="w-full h-full"
            src={currentLesson.video}
            title={currentLesson?.subject}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Video đang được cập nhật
          </div>
        )}
      </div>

      <div className="p-6 md:p-10 max-w-4xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">
          Bài {currentLesson?.lessonOrder || currentLessonIdx + 1}: {currentLesson?.subject}
        </h2>

        {currentLesson?.content && (
          <p className="text-gray-400 leading-relaxed">{currentLesson.content}</p>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
          <div className="flex gap-3">
            <button
              disabled={currentLessonIdx === 0}
              onClick={onPrevious}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Bài trước
            </button>
            <button
              disabled={currentLessonIdx === totalLessons - 1}
              onClick={onNext}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Bài sau →
            </button>
          </div>

          <button
            onClick={onMarkCompleted}
            disabled={isCompleted}
            className="flex items-center gap-2 px-6 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCircle size={20} />
            {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerArea;