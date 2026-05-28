import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Film, Users, TrendingUp, Inbox } from 'lucide-react';
import Button from '../../components/common/Button';
import useInstructorCourses from '../../hooks/useInstructorCourses'; // IMPORT HOOK MỚI

const MyCourses = () => {
  const { myCourses, isLoading } = useInstructorCourses();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="text-gray-500 font-medium">Đang tải danh sách khóa học...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý, chỉnh sửa và cập nhật nội dung các khóa học bạn đang giảng dạy.</p>
        </div>
        <Link to="/instructor/course/create">
          <Button variant="primary" className="flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg shadow-brand/20">
            <Plus size={18} /> Tạo khóa học mới
          </Button>
        </Link>
      </div>

      {myCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-4">
            <Inbox size={32} className="text-brand" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có khóa học nào</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">Bạn chưa tạo khóa học nào trên hệ thống. Hãy bắt đầu chia sẻ kiến thức của bạn ngay hôm nay!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 group">
              
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img 
                  src={course.image || '/images/default-course.png'} 
                  alt={course.subject} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-sm backdrop-blur-md ${
                  course.active 
                    ? 'bg-success/90 text-white' 
                    : 'bg-gray-900/80 text-white'
                }`}>
                  {course.active ? 'Đang xuất bản' : 'Bản nháp'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs font-bold text-brand mb-2 uppercase tracking-wider">
                  {course.categoryName || 'Chưa phân loại'}
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4 line-clamp-2" title={course.subject}>
                  {course.subject}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                  <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-3 border border-gray-100">
                    <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600"><Users size={16} /></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm leading-none">128</span> 
                      <span className="text-gray-500 text-[10px] uppercase font-medium mt-1">Học viên</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-3 border border-gray-100">
                    <div className="bg-green-100 p-1.5 rounded-lg text-success"><TrendingUp size={16} /></div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm leading-none">${(course.price * 128) || 0}</span> 
                      <span className="text-gray-500 text-[10px] uppercase font-medium mt-1">Doanh thu</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <Link to={`/instructor/course/edit/${course.id}`} className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors">
                    <Edit size={16} /> Sửa thông tin
                  </Link>
                  <Link to={`/instructor/course/${course.id}/lessons`} className="flex items-center justify-center gap-2 py-2 px-3 bg-brand/10 text-brand rounded-xl text-sm font-bold hover:bg-brand hover:text-white transition-all">
                    <Film size={16} /> Bài giảng
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;