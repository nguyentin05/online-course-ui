import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Film, Users, Star, TrendingUp } from 'lucide-react';

import useCourses from '../../hooks/useCourses';
import Button from '../../components/common/Button';
import useUserStore from '../../store/useUserStore';

export default function MyCourses() {
  const user = useUserStore((s) => s.user);
  const { courses, isLoading } = useCourses();

  const myCreatedCourses = useMemo(() => {
    if (!courses.length) return [];
    const filtered = courses.filter(c => c.instructorId?.id === user?.id);
    return filtered.length > 0 ? filtered : courses.slice(0, 3);
  }, [courses, user]);

  if (isLoading) return <div className="p-10 text-center text-gray-500">Đang tải danh sách...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khóa học của tôi</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý, chỉnh sửa và cập nhật nội dung các khóa học bạn đang giảng dạy.</p>
        </div>
        <Link to="/instructor/course/create">
          <Button variant="primary" className="flex items-center gap-2 w-full sm:w-auto">
            <Plus size={18} /> Tạo khóa học mới
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCreatedCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
            
            <div className="relative aspect-video bg-gray-100">
              <img src={course.image} alt={course.subject} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-success text-white text-xs font-bold rounded-full shadow-sm">
                Đang xuất bản
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="text-xs font-bold text-brand mb-2">{course.categoryId?.name || 'Danh mục chung'}</div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4 line-clamp-2" title={course.subject}>
                {course.subject}
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                <div className="bg-gray-50 p-2 rounded-lg flex items-center gap-2">
                  <Users size={16} className="text-blue-500" />
                  <div className="text-sm">
                    <span className="font-bold text-gray-900">128</span> <span className="text-gray-500 text-xs">Học viên</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg flex items-center gap-2">
                  <TrendingUp size={16} className="text-success" />
                  <div className="text-sm">
                    <span className="font-bold text-gray-900">${course.price * 128 || 0}</span> <span className="text-gray-500 text-xs">Doanh thu</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <Link to={`/instructor/course/edit/${course.id}`} className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 hover:text-brand transition-colors">
                  <Edit size={16} /> Sửa thông tin
                </Link>
                <Link to={`/instructor/course/${course.id}/lessons`} className="flex items-center justify-center gap-2 py-2 px-3 bg-brand/10 text-brand rounded-xl text-sm font-bold hover:bg-brand hover:text-white transition-colors">
                  <Film size={16} /> Quản lý bài giảng
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}