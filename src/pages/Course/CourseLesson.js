import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import useCourseDetail from '../../hooks/useCourseDetail';
import useCourseLessons from '../../hooks/useCourseLessons';
import useLessonProgress from '../../hooks/useLessonProgress';
import useCourseProgress from '../../hooks/useCourseProgress';
import LessonSidebar from '../../components/course/LessonSidebar';
import VideoPlayerArea from '../../components/course/VideoPlayerArea';

const CourseLesson = () => {
  const { courseId } = useParams();
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const { course, isLoading: isLoadingCourse } = useCourseDetail(courseId);
  const { progressData, isLoading: isLoadingProgress } = useCourseProgress(courseId);
  const { updateProgress } = useLessonProgress(courseId);
  const {
    lessons: rawLessons, totalElements,
    isLoading, isLoadingMore, isReachingEnd, loadMore
  } = useCourseLessons(courseId, 20);

  const lessons = useMemo(() => {
    if (!rawLessons?.length) return [];
    return [...rawLessons].sort((a, b) => a.lessonOrder - b.lessonOrder);
  }, [rawLessons]);

  const currentLesson = lessons[currentLessonIdx];

  const completedMap = useMemo(() => {
    if (!progressData?.lessons) return {};
    return progressData.lessons.reduce((acc, curr) => {
      if (curr.status === 'COMPLETED') acc[curr.lessonId] = true;
      return acc;
    }, {});
  }, [progressData]);

  const handleMarkAsCompleted = async () => {
    if (!currentLesson) return;
    const result = await updateProgress(currentLesson.id, 'COMPLETED');
    if (result.success && currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx(prev => prev + 1);
    }
  };

  if (isLoadingCourse || isLoading || isLoadingProgress) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        Đang tải...
      </div>
    );
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
            <div className="h-full bg-brand transition-all duration-500 ease-out" style={{ width: `${progressData?.progressPercent || 0}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        <VideoPlayerArea 
          currentLesson={currentLesson}
          currentLessonIdx={currentLessonIdx}
          totalLessons={lessons.length}
          isCompleted={completedMap[currentLesson?.id]}
          onPrevious={() => setCurrentLessonIdx(p => p - 1)}
          onNext={() => setCurrentLessonIdx(p => p + 1)}
          onMarkCompleted={handleMarkAsCompleted}
        />

        <LessonSidebar 
          lessons={lessons}
          totalElements={totalElements}
          progressData={progressData}
          currentLessonIdx={currentLessonIdx}
          completedMap={completedMap}
          onLessonSelect={setCurrentLessonIdx}
          isLoadingMore={isLoadingMore}
          isReachingEnd={isReachingEnd}
          onLoadMore={loadMore}
        />

      </div>
    </div>
  );
};

export default CourseLesson;