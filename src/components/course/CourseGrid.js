import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import CourseSkeleton from './CourseSkeleton';

const CourseGrid = ({ courses = [], isLoading = false, skeletonCount = 8 }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <motion.div 
            key={`skeleton-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CourseSkeleton />
          </motion.div>
        ))}
      </div>
    );
  }

  if (!isLoading && courses.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500"
      >
        <p className="font-medium text-lg mb-2">Không tìm thấy khóa học nào</p>
        <p className="text-sm">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05
            }}
          >
            <CourseCard course={course}>
              <CourseCard.Thumbnail />
              <div className="p-5 flex-1 flex flex-col">
                <CourseCard.Instructor />
                <CourseCard.Title />
                <CourseCard.Meta />
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <CourseCard.Price />
                  <CourseCard.EnrollButton />
                </div>
              </div>
            </CourseCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default CourseGrid;