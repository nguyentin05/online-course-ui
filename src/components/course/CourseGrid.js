import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // THÊM IMPORT NÀY
import CourseCard from './CourseCard';
import CourseSkeleton from './CourseSkeleton';

export default function CourseGrid({ courses = [], isLoading = false, skeletonCount = 8 }) {
  // 1. Trạng thái đang tải dữ liệu (Cũng cho nó hiệu ứng mờ dần vào)
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

  // 2. Trạng thái không có dữ liệu
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

  // 3. Trạng thái có dữ liệu: Đưa AnimatePresence vào đây!
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            layout // Giúp thẻ tự động trượt mượt mà khi đổi vị trí lúc sort/filter
            initial={{ opacity: 0, y: 20 }} // Bắt đầu: mờ và tụt xuống 20px
            animate={{ opacity: 1, y: 0 }}  // Điểm đến: rõ nét và đúng vị trí
            exit={{ opacity: 0, scale: 0.9 }} // Khi biến mất: mờ và thu nhỏ
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05 // Delay tăng dần tạo hiệu ứng lượn sóng (stagger)
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