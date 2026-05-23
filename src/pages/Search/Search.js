import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

import Input from '../../components/common/Input';
import CourseGrid from '../../components/course/CourseGrid'; // Import vũ khí mới vào đây
import useCourses from '../../hooks/useCourses';
import useDebounce from '../../hooks/useDebounce';

const ITEMS_PER_PAGE = 20;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPrice, setSortByPrice] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { courses, isLoading } = useCourses('All');

  const processedCourses = useMemo(() => {
    let result = [...courses];

    if (debouncedSearchTerm) {
      const lowerCaseTerm = debouncedSearchTerm.toLowerCase();
      result = result.filter(course => 
        course.subject.toLowerCase().includes(lowerCaseTerm) ||
        course.instructorId.fullName.toLowerCase().includes(lowerCaseTerm)
      );
    }

    if (sortByPrice === 'asc') result.sort((a, b) => a.price - b.price);
    if (sortByPrice === 'desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [courses, debouncedSearchTerm, sortByPrice]);

  const totalPages = Math.ceil(processedCourses.length / ITEMS_PER_PAGE) || 1;
  const currentData = processedCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header: Thanh tìm kiếm & Bộ lọc */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex-1 w-full">
          <Input 
            variant="search"
            icon={<SearchIcon size={20} />}
            placeholder="Tìm kiếm theo tên khóa học hoặc giảng viên..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SlidersHorizontal size={20} className="text-gray-400" />
          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-brand/50 outline-none cursor-pointer"
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <option value="none">Sắp xếp: Mặc định</option>
            <option value="asc">Giá: Thấp đến Cao</option>
            <option value="desc">Giá: Cao xuống Thấp</option>
          </select>
        </div>
      </div>

      {/* Thông báo kết quả */}
      <div className="mb-6 text-gray-600 font-medium">
        Tìm thấy <span className="text-brand font-bold">{processedCourses.length}</span> khóa học
        {debouncedSearchTerm && <span> cho "{debouncedSearchTerm}"</span>}
      </div>

      {/* ĐÂY LÀ SỰ KHÁC BIỆT: CHỈ 1 DÒNG GỌI COMPONENT */}
      <CourseGrid 
        courses={currentData} 
        isLoading={isLoading} 
        skeletonCount={8} 
      />

      {/* Phân trang (Pagination) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 rounded-full border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-sm font-medium text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-full border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

    </div>
  );
}