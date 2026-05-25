import useSWR from 'swr';
import Apis, { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';

const useEnrolledCourses = () => {
  const isAuth = useUserStore((s) => s.token !== null); 
  const { data, error, isLoading, mutate } = useSWR(
    isAuth ? endpoints.enrollment.myEnrollments : null
  );

  const enrolledCourses = data || [];

  const enrollCourse = async (courseId) => {
    try {
      const res = await Apis.post(endpoints.enrollment.enroll(courseId));
      mutate(); 
      
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Lỗi hệ thống" 
      };
    }
  };

  const cancelEnrollment = async (courseId) => {
    try {
      await Apis.delete(endpoints.enrollment.cancel(courseId));
      mutate();
      return { success: true };
    } catch (err) {
      console.error("Lỗi hủy đăng ký:", err);
      return { success: false };
    }
  };

  return {
    enrolledCourses,
    isLoading,
    error,
    enrollCourse,
    cancelEnrollment
  };
};

export default useEnrolledCourses;