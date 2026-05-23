import React from 'react';
import useEnrolledCourses from '../../hooks/useEnrolledCourses';
import CourseGrid from '../../components/course/CourseGrid'; 

export default function MyLearning() {
  // Lấy danh sách ra từ Hook (siêu gọn)
  const { enrolledCourses, isLoading } = useEnrolledCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>
      
      {/* Tái sử dụng CourseGrid thần thánh! */}
      <CourseGrid 
        courses={enrolledCourses} 
        isLoading={isLoading} 
        skeletonCount={3} 
      />
    </div>
  );
}