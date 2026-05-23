import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useCourses from '../../hooks/useCourses';

export default function CourseEditor() {
  const navigate = useNavigate();
  const { courseId } = useParams(); // Lấy ID từ URL (nếu có)
  const isEditMode = Boolean(courseId); // Cờ đánh dấu: Có ID tức là đang Edit
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { courses } = useCourses(); // Ở dự án thực tế: Gọi API GET /courses/{courseId}

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      price: 0,
      categoryId: '1',
      subject: '',
      description: '',
      image: ''
    }
  });

  // Tự động điền dữ liệu nếu đang ở chế độ Chỉnh sửa
  useEffect(() => {
    if (isEditMode && courses.length > 0) {
      const existingCourse = courses.find(c => c.id.toString() === courseId);
      if (existingCourse) {
        // Hàm reset() sẽ tự động map các key này vào đúng các ô Input bên dưới
        reset({
          subject: existingCourse.subject,
          description: existingCourse.description,
          categoryId: existingCourse.categoryId?.id?.toString() || '1',
          price: existingCourse.price,
          image: existingCourse.image || ''
        });
      }
    }
  }, [isEditMode, courseId, courses, reset]);

  const imageUrl = watch('image');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Giả lập call API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isEditMode) {
        console.log(`Đã cập nhật khóa học ${courseId}:`, data);
        // TODO: axios.put(`/courses/${courseId}`, data)
      } else {
        console.log('Đã tạo khóa học mới:', data);
        // TODO: axios.post('/courses', data)
      }
      
      navigate('/instructor/courses'); // Trở về trang danh sách khóa học
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/instructor/courses" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            {/* Đổi tiêu đề linh hoạt theo Mode */}
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditMode ? 'Cập nhật thông tin chi tiết của khóa học.' : 'Điền thông tin cơ bản để bắt đầu xây dựng khóa học.'}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} variant="primary" isLoading={isSubmitting} className="flex items-center gap-2">
          <Save size={18} /> {isEditMode ? 'Cập nhật' : 'Lưu khóa học'}
        </Button>
      </div>

      <form className="grid grid-cols-1 xl:grid-cols-3 gap-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Cột trái */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">Thông tin cơ bản</h2>
            
            <Input 
              label="Tên khóa học *"
              error={errors.subject?.message}
              {...register('subject', { required: 'Vui lòng nhập tên khóa học' })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả chi tiết *</label>
              <textarea 
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand/50 outline-none transition-all ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand'
                }`}
                rows={6}
                {...register('description', { required: 'Vui lòng nhập mô tả khóa học' })}
              />
              {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục *</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand/50 outline-none"
                  {...register('categoryId')}
                >
                  <option value="1">Lập trình Web</option>
                  <option value="2">Khoa học dữ liệu</option>
                  <option value="3">Thiết kế UI/UX</option>
                </select>
              </div>

              <Input 
                label="Học phí ($) *" type="number" min="0"
                error={errors.price?.message}
                {...register('price', { 
                  required: 'Vui lòng nhập giá tiền', min: { value: 0, message: 'Giá không được âm' }
                })}
              />
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">Ảnh đại diện</h2>
            <div className="mb-4">
              <div className="w-full aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden mb-4">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-sm font-medium">Chưa có hình ảnh</span>
                  </div>
                )}
              </div>
              <Input label="Đường dẫn ảnh (URL)" {...register('image')} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}