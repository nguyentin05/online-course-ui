import React from 'react';
import useEnrolledCourses from '../../hooks/useEnrolledCourses';
import CourseGrid from '../../components/course/CourseGrid'; 

const MyLearning = () => {
  const { enrolledCourses, isLoading } = useEnrolledCourses();
  const myCourses = enrolledCourses.map(e => e?.course);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>
      <CourseGrid 
        courses={myCourses} 
        isLoading={isLoading} 
        skeletonCount={3} 
      />
    </div>
  );
}

export default MyLearning;