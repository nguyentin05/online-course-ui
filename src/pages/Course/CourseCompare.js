import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import useCourses from '../../hooks/useCourses';
// Đổi tên biến khi import để tránh trùng lặp với tên function của file hiện tại
import CourseCompareWidget from '../../components/course/CourseCompare'; 

export default function CourseComparePage() {
  const { courses, isLoading } = useCourses();
  
  // Tạm giả lập: Lấy luôn 3 khóa học đầu tiên trong DB ra để demo tính năng so sánh
  const coursesToCompare = courses.slice(0, 3);

  if (isLoading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gray-50">
      
      {/* Nút quay lại và Tiêu đề */}
      <div className="mb-8 relative">
        <Link to="/search" className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-100 transition-colors hidden md:block">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">So sánh khóa học</h1>
          <p className="text-gray-500 mt-2">Đánh giá các lựa chọn để tìm ra khóa học phù hợp nhất với bạn.</p>
        </div>
      </div>

      {/* Gọi Component vẽ bảng so sánh ở đây */}
      <CourseCompareWidget courses={coursesToCompare} />

      <div className="mt-8 text-center text-sm text-gray-500">
        Tính năng: Chọn tối đa 4 khóa học từ trang Tìm kiếm để so sánh.
      </div>
    </div>
  );
}