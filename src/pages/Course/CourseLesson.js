import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle } from 'lucide-react';
import useCourses from '../../hooks/useCourses';
import VirtualList from '../../components/common/VirtualList'; // IMPORT VÀO ĐÂY

export default function CourseLesson() {
  const { courseId } = useParams();
  const { courses, isLoading } = useCourses();
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  const course = useMemo(() => 
    courses.find(c => c.id.toString() === courseId), 
  [courses, courseId]);

  // GIẢ LẬP KHÓA HỌC CÓ 1000 BÀI HỌC ĐỂ TEST HIỆU NĂNG
  const lessons = useMemo(() => {
    return Array.from({ length: 1000 }).map((_, i) => ({
      id: i + 1,
      title: `Bài học số ${i + 1}: ${i === 0 ? 'Giới thiệu' : 'Nội dung chuyên sâu'}`,
      duration: "10:30",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }));
  }, []);

  if (isLoading || !course) return <div className="p-10 text-white">Đang tải bài học...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between shrink-0">
        <Link to={`/course/${courseId}`} className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-medium">
          <ChevronLeft size={20} /> Quay lại
        </Link>
        <h1 className="text-white font-bold truncate max-w-md">{course.subject}</h1>
        <div className="w-24"></div>
      </div>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-56px)]">
        {/* TRÁI: Video Player */}
        <div className="flex-1 bg-black flex flex-col relative">
          <iframe
            className="w-full h-full"
            src={lessons[currentLessonIdx].videoUrl}
            title="Course Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* PHẢI: Sidebar sử dụng Virtual List */}
        <div className="w-80 sm:w-96 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-bold">Nội dung khóa học (1000 bài)</h3>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            {/* ÁP DỤNG VIRTUAL LIST VÀO ĐÂY */}
            <VirtualList 
              items={lessons}
              itemHeight={72} // Mỗi button bài học cao khoảng 72px
              containerHeight={typeof window !== 'undefined' ? window.innerHeight - 120 : 600} // Trừ đi header
              renderItem={(lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonIdx(idx)}
                  className={`w-full flex items-start gap-3 p-4 hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 h-[72px] ${
                    currentLessonIdx === idx ? 'bg-gray-700 border-l-4 border-l-brand' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className={`mt-1 ${currentLessonIdx === idx ? 'text-brand' : 'text-gray-500'}`}>
                    {currentLessonIdx > idx ? <CheckCircle size={18} /> : <Play size={18} />}
                  </div>
                  <div className="flex flex-col items-start text-left w-full overflow-hidden">
                    <span className={`text-sm font-medium truncate w-full ${currentLessonIdx === idx ? 'text-white' : 'text-gray-300'}`}>
                      {idx + 1}. {lesson.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">{lesson.duration}</span>
                  </div>
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}