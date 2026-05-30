import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, UploadCloud, Video } from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useInstructorCourses from '../../hooks/useInstructorCourses';
import useCategories from '../../hooks/useCategories'; 

const CourseEditor = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);
  
  const { myCourses, isLoading: isFetchingCourses, createCourse, updateCourse } = useInstructorCourses();
  const { categories } = useCategories(); 

  const existingCourse = isEditMode ? myCourses.find(c => c.id.toString() === courseId) : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      subject: '',
      description: '',
      categoryId: '',
      price: 0,
      duration: 1
    }
  });

  const imageFile = watch('imageFile');
  const videoFile = watch('videoFile');

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setImagePreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  useEffect(() => {
    if (videoFile && videoFile.length > 0) {
      setVideoPreview(URL.createObjectURL(videoFile[0]));
    }
  }, [videoFile]);

  useEffect(() => {
    if (isEditMode && existingCourse) {
      reset({
        subject: existingCourse.subject,
        description: existingCourse.description,
        categoryId: existingCourse.categoryId?.toString() || existingCourse.category?.id?.toString() || '',
        price: existingCourse.price,
        duration: existingCourse.duration || 1
      });
      if (existingCourse.image) setImagePreview(existingCourse.image);
      if (existingCourse.video) setVideoPreview(existingCourse.video);
    }
  }, [isEditMode, existingCourse, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('subject', data.subject);
      formData.append('description', data.description);
      formData.append('categoryId', data.categoryId);
      formData.append('price', data.price);
      formData.append('duration', data.duration);
      formData.append('active', true);     
      
      if (data.imageFile && data.imageFile.length > 0) {
        formData.append('image', data.imageFile[0]); 
      }
      if (data.videoFile && data.videoFile.length > 0) {
        formData.append('video', data.videoFile[0]); 
      }

      let result;
      if (isEditMode) {
        result = await updateCourse(courseId, formData, true);
      } else {
        result = await createCourse(formData, true);
      }
      
      if (result.success) {
        alert(isEditMode ? 'Cập nhật thành công!' : 'Tạo và xuất bản khóa học thành công!');
        navigate('/instructor/courses');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && isFetchingCourses) {
    return <div className="p-10 text-center text-gray-500">Đang tải thông tin khóa học...</div>;
  }

  if (isEditMode && !isFetchingCourses && !existingCourse) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học!</h2>
        <p className="text-gray-500 mb-4">Khóa học này không tồn tại hoặc bạn không có quyền chỉnh sửa.</p>
        <Button onClick={() => navigate('/instructor/courses')} variant="primary">Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/instructor/courses" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditMode ? 'Cập nhật thông tin chi tiết của khóa học.' : 'Điền thông tin cơ bản để xuất bản khóa học mới.'}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} variant="primary" isLoading={isSubmitting} className="flex items-center gap-2 shadow-lg shadow-brand/20">
          <Save size={18} /> {isEditMode ? 'Cập nhật' : 'Xuất bản khóa học'}
        </Button>
      </div>

      <form className="grid grid-cols-1 xl:grid-cols-3 gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            
            <div className="border-b border-gray-50 pb-4">
              <h2 className="text-lg font-bold text-gray-900">Thông tin cơ bản</h2>
            </div>
            
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
                rows={8}
                {...register('description', { required: 'Vui lòng nhập mô tả khóa học' })}
              />
              {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục *</label>
                <select 
                  className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand/50 outline-none ${
                    errors.categoryId ? 'border-red-500' : 'border-gray-200'
                  }`}
                  {...register('categoryId', { required: 'Vui lòng chọn danh mục' })}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories?.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoryId && <span className="text-xs text-red-500 mt-1">{errors.categoryId.message}</span>}
              </div>

              <Input 
                label="Học phí ($) *" type="number" min="0" step="0.01"
                error={errors.price?.message}
                {...register('price', { 
                  required: 'Vui lòng nhập giá', min: { value: 0, message: 'Giá không âm' }
                })}
              />

              <Input 
                label="Thời lượng (Phút) *" type="number" min="1"
                error={errors.duration?.message}
                {...register('duration', { 
                  required: 'Vui lòng nhập thời lượng', min: { value: 1, message: 'Tối thiểu 1 phút' }
                })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
            
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><ImageIcon size={16} className="text-brand"/> Ảnh bìa khóa học</h2>
              <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden relative group hover:border-brand transition-colors">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center pointer-events-none p-4 text-center">
                    <UploadCloud size={32} className="mb-2 text-gray-300 group-hover:text-brand transition-colors" />
                    <span className="text-xs font-medium text-gray-500">Tải ảnh lên (Max 5MB)</span>
                  </div>
                )}
                <input 
                  type="file" accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  {...register('imageFile')}
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Video size={16} className="text-blue-500"/> Video giới thiệu (Trailer)</h2>
              <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden relative group hover:border-blue-500 transition-colors">
                {videoPreview ? (
                  <video src={videoPreview} controls className="w-full h-full bg-black object-contain z-10" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center pointer-events-none p-4 text-center">
                    <UploadCloud size={32} className="mb-2 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <span className="text-xs font-medium text-gray-500">Tải video MP4/WebM</span>
                  </div>
                )}
                <input 
                  type="file" accept="video/mp4,video/webm"
                  className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${videoPreview ? 'z-0 hidden' : 'z-20'}`}
                  {...register('videoFile')}
                />
              </div>
              
              {videoPreview && (
                <div className="mt-2 text-center">
                   <span className="text-xs text-gray-500">Muốn đổi video khác? Hãy bấm vào form hoặc chọn lại file nhé.</span>
                   <input type="file" accept="video/*" className="mt-2 text-xs w-full" {...register('videoFile')} />
                </div>
              )}
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default CourseEditor;