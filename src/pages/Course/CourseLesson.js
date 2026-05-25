import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle } from 'lucide-react';
import useCourseDetail from '../../hooks/useCourseDetail';
import useCourseLessons from '../../hooks/useCourseLessons';
import useLessonProgress from '../../hooks/useLessonProgress';
import VirtualList from '../../components/common/VirtualList';
import useCourseProgress from '../../hooks/useCourseProgress';

const CourseLesson = () => {
  const { courseId } = useParams();

  const { course, isLoading: isLoadingCourse } = useCourseDetail(courseId);
  const { lessons: rawLessons, isLoading: isLoadingLessons } = useCourseLessons(courseId);
  const { updateProgress } = useLessonProgress(courseId);

  const { progressData, isLoading: isLoadingProgress } = useCourseProgress(courseId);
  
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  const completedMap = useMemo(() => {
    if (!progressData?.lessons) return {};
    return progressData.lessons.reduce((acc, curr) => {
      if (curr.status === 'COMPLETED') {
        acc[curr.lessonId] = true;
      }
      return acc;
    }, {});
  }, [progressData]);

  const lessons = useMemo(() => {
    if (!rawLessons) return [];
    return [...rawLessons].sort((a, b) => a.lessonOrder - b.lessonOrder);
  }, [rawLessons]); 

  const currentLesson = lessons[currentLessonIdx];

  const handleMarkAsCompleted = async () => {
    if (!currentLesson) return;
    const result = await updateProgress(currentLesson.id, 'COMPLETED');
    if (result.success && currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx(prev => prev + 1);
    }
  };

  if (isLoadingCourse || isLoadingLessons || isLoadingProgress) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Đang tải tiến độ...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between shrink-0">
        <Link to={`/course/${courseId}`} className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-medium">
          <ChevronLeft size={20} /> Quay lại
        </Link>
        <h1 className="text-white font-bold truncate max-w-md">{course?.subject}</h1>
        
        <div className="w-48 hidden sm:flex items-center gap-3 text-xs text-gray-400 font-medium">
          <span>{progressData?.progressPercent || 0}%</span>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
             <div 
               className="h-full bg-brand transition-all duration-500 ease-out" 
               style={{ width: `${progressData?.progressPercent || 0}%` }}
             ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-56px)]">
        <div className="flex-1 bg-black flex flex-col relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="aspect-video w-full bg-black">
            {currentLesson?.video ? (
               <iframe
                 className="w-full h-full"
                 src={currentLesson.video}
                 title={currentLesson.subject}
                 allowFullScreen
               ></iframe>
            ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-500">
                 Video đang được cập nhật
               </div>
            )}
          </div>
          
          <div className="p-6 md:p-10 max-w-4xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Bài {currentLesson?.lessonOrder || currentLessonIdx + 1}: {currentLesson?.subject}
            </h2>
            
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
              <p className="text-gray-400">Hoàn thành bài học để lưu tiến độ</p>
              
              <button 
                onClick={handleMarkAsCompleted}
                className="flex items-center gap-2 px-6 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-dark transition-colors"
              >
                <CheckCircle size={20} /> Đánh dấu hoàn thành
              </button>
            </div>
          </div>
        </div>

        <div className="w-80 sm:w-96 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-bold">Nội dung khóa học</h3>
            <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
               {progressData?.completedLessons || 0} / {progressData?.totalLessons || 0}
            </span>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <VirtualList 
              items={lessons}
              itemHeight={72}
              containerHeight={typeof window !== 'undefined' ? window.innerHeight - 56 - 57 : 600} 
              renderItem={(lesson, idx) => {
                const isActive = currentLessonIdx === idx;
                const isCompleted = completedMap[lesson.id]; 

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIdx(idx)}
                    className={`w-full flex items-start gap-3 p-4 hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 h-[72px] ${
                      isActive ? 'bg-gray-700 border-l-4 border-l-brand' : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className={`mt-1 ${isCompleted ? 'text-green-500' : isActive ? 'text-brand' : 'text-gray-500'}`}>
                      {isCompleted ? <CheckCircle size={18} /> : <Play size={18} />}
                    </div>
                    <div className="flex flex-col items-start text-left w-full overflow-hidden">
                      <span className={`text-sm font-medium truncate w-full ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {lesson.lessonOrder || idx + 1}. {lesson.subject}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{lesson.duration || "10:00"}</span>
                    </div>
                  </button>
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLesson;