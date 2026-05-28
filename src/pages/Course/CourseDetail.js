import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, PlayCircle, ShieldCheck, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import useCourseDetail from '../../hooks/useCourseDetail';
import Button from '../../components/common/Button';
import PaymentModal from '../../components/payment/PaymentModal';
import useEnrolledCourses from '../../hooks/useEnrolledCourses';
import AnimatedPage from '../../components/AnimatedPage';
import useCourseLessons from '../../hooks/useCourseLessons';
import Apis, { endpoints } from '../../configs/Apis';

const CourseDetail = () => {
  const { courseId } = useParams();
  const nav = useNavigate();
  const { course, isLoading, error } = useCourseDetail(courseId);
  const { enrolledCourses, enrollCourse, cancelEnrollment } = useEnrolledCourses();
  const isEnrolled = enrolledCourses.some(c => c.course?.id?.toString() === courseId);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lessons, isLoading: isLoadingLessons, isLoadingMore, isReachingEnd, loadMore } = useCourseLessons(courseId, 10);

  if (isLoading) return (
    <AnimatedPage>
      <div className="text-center py-32 font-medium text-gray-500">Đang tải thông tin khóa học...</div>
    </AnimatedPage>
  );

  if (!course) return (
    <AnimatedPage>
      <div className="text-center py-32 font-medium text-red-500">Không tìm thấy khóa học này!</div>
    </AnimatedPage>
  );

  const hours = Math.floor(course.duration / 60);
  const minutes = course.duration % 60;

  const handleEnrollClick = async () => {
  if (course.price > 0) {
    try {
      const res = await Apis.post(endpoints.payments.checkout(courseId));
      const { payUrl } = res.data;
      window.location.href = payUrl;
    } catch (err) {
      alert('Không thể tạo thanh toán, vui lòng thử lại.');
    }
  } else {
    processEnrollment();
  }
};

  const handleCancelEnrollment = async () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đăng ký khóa học này?")) {
      setIsCancelling(true);
      
      const result = await cancelEnrollment(courseId);
      
      setIsCancelling(false);
      
      if (result.success) {
        alert("Hủy đăng ký thành công!");
      } else {
        alert("Có lỗi xảy ra khi hủy đăng ký.");
      }
    }
  };

  const processEnrollment = async () => {
    setIsModalOpen(false);

    const result = await enrollCourse(courseId);
    
    if (result.success) {
      alert("Đăng ký thành công!");
    } else {
      alert(result.message || "Có lỗi xảy ra");
    }
  };

  return (
    <AnimatedPage>
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="bg-gray-900 text-white pt-12 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="px-3 py-1 bg-brand-light/20 text-brand-light rounded-full text-sm font-bold border border-brand-light/20">
                {course.categoryName}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
                {course.subject}
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {course.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <img src="/images/default-avatar.jpg" alt="Giảng viên" className="w-10 h-10 rounded-full bg-gray-800 object-cover" />
                  <span className="text-white font-medium">{course.instructorName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-brand-light" /> {hours} giờ {minutes} phút
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 -mt-16">
            
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Nội dung giảng dạy</h2>
              <div className="space-y-4">
                {isLoadingLessons ? (
                  <div className="text-center py-8 text-gray-500 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-brand" size={24} />
                    <span>Đang tải danh sách bài học...</span>
                  </div>
                ) : lessons.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    Khóa học này hiện chưa có bài học nào.
                  </div>
                ) : (
                  <>
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <PlayCircle size={20} className="text-brand/70 group-hover:text-brand transition-colors" />
                          <span className="font-medium text-gray-700">
                            Bài {lesson.lessonOrder}: {lesson.subject || "Chưa có tên bài"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                        </div>
                      </div>
                    ))}

                    {!isReachingEnd && (
                      <div className="pt-4 flex justify-center border-t border-gray-50">
                        <button 
                          onClick={() => loadMore()}
                          disabled={isLoadingMore}
                          className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoadingMore ? (
                            <>
                              <Loader2 size={16} className="animate-spin" /> Đang tải thêm...
                            </>
                          ) : (
                            <>
                              Xem thêm bài học <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-24">
                
                <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                  <img src={course.image} alt="Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-3xl font-extrabold text-gray-900 mb-6">
                    {course.price > 0 ? `$${course.price}` : 'Miễn phí'}
                  </div>
                  
                  {isEnrolled ? (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full py-2.5 text-md" onClick={() => nav(`/course/${courseId}/lesson`)}>
                        <CheckCircle size={18} className="mr-2" /> Vào học ngay
                      </Button>
                      
                      <button 
                        onClick={handleCancelEnrollment}
                        disabled={isCancelling}
                        className="w-full flex items-center justify-center px-2 py-2.5 border-2 border-red-500 text-red-500 bg-white rounded-3xl text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCancelling ? "Đang xử lý..." : "Hủy đăng ký"}
                      </button>
                    </div>
                  ) : (
                    <Button variant="primary" className="w-full shadow-lg shadow-brand/20" onClick={handleEnrollClick}>
                      Đăng ký khóa học
                    </Button>
                  )}

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <ShieldCheck size={18} className="text-success" /> Truy cập vĩnh viễn
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle size={18} className="text-success" /> Chứng chỉ hoàn thành
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => processEnrollment('payment_gateway')}
          course={course}
        />
      </div>
    </AnimatedPage>
  );
}

export default CourseDetail;