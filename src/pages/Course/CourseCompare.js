import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Info, CheckCircle, Clock, BookOpen, DollarSign } from 'lucide-react';
import useCourseCompare from '../../hooks/useCourseCompare';
import Button from '../../components/common/Button';
import ComparisonBar from '../../components/course/ComparisonBar'
import Select from '../../components/common/select';
import useCategories from '../../hooks/useCategories';

const CourseCompare = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { categories } = useCategories();
  const searchParams = new URLSearchParams(location.search);
  const categoryIdParam = searchParams.get('categoryId');
  const [categoryId, setCategoryId] = useState(categoryIdParam || '1');
  const { compareData, isLoading, error } = useCourseCompare({
    categoryId: categoryId,
    limit: 5
  });
  const handleGoBack = () => {
      nav(-1); 
  }
  const categoryOptions = [
    { value: null, label: 'Tất cả danh mục' },
    ...categories.map(c => ({ value: c.id, label: c.name }))
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={handleGoBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium text-sm hidden sm:inline">Quay lại</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900">
            So sánh khóa học: <span className="text-brand">{compareData?.categoryName || '...'}</span>
          </h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full sm:w-auto">
           <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
             Chọn danh mục:
           </span>
           
           <div className="w-64">
             <Select 
               options={categoryOptions}
               value={categoryId}
               placeholder="Chọn danh mục so sánh..."
               onChange={(val) => {
                 setCategoryId(val);
                 nav(`/compare?categoryId=${val}`, { replace: true });
               }}
             />
           </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
             <div className="animate-spin w-8 h-8 border-4 border-brand border-t-transparent rounded-full"></div>
             <p>Đang phân tích dữ liệu so sánh...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm">
            <Info size={48} className="mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Không thể so sánh</h3>
            <p className="max-w-md">{error}</p>
            <Button onClick={handleGoBack} variant="primary" className="mt-6">
              Quay lại trang trước
            </Button>
          </div>
        )}

        {!isLoading && compareData && compareData.courses?.length >= 2 && (
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 min-w-max">
              {compareData.courses.map((course) => (
                <div key={course.id} className="w-80 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                  
                  <div className="p-5 flex-1 border-b border-gray-50">
                     <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
                       <img src={course.image || "/images/default-course.png"} alt="Cover" className="w-full h-full object-cover" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2" title={course.subject}>
                        {course.subject}
                     </h3>
                     <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                        {course.description}
                     </p>
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                        <CheckCircle size={14} className="text-brand" /> GV: {course.instructorName}
                     </div>
                  </div>

                  <div className="p-5 bg-gray-50/50">
                    <ComparisonBar 
                      label="Thời lượng học (Phút)" 
                      rawValue={course.duration} 
                      max={compareData.maxDuration} 
                      icon={Clock}
                      colorClass="bg-blue-500" 
                    />
                    <ComparisonBar 
                      label="Số lượng bài giảng" 
                      rawValue={course.lessonCount} 
                      max={compareData.maxLessonCount} 
                      icon={BookOpen}
                      colorClass="bg-purple-500" 
                    />
                    <ComparisonBar 
                      label="Học phí" 
                      rawValue={course.price}
                      displayValue={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)} // Truyền chuỗi đẹp để hiển thị
                      max={compareData.maxPrice} 
                      icon={DollarSign}
                      colorClass="bg-success" 
                    />
                  </div>

                  <div className="p-5 mt-auto">
                    <Link to={`/course/${course.id}`}>
                      <Button variant="primary" className="w-full text-sm">Xem chi tiết</Button>
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCompare;