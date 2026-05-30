import useSWR from 'swr';
import Apis, { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';
import { extractErrorMessage } from '../utils/errorUtils';
import { useCallback } from 'react';

const useEnrolledCourses = () => {
  const isAuth = useUserStore((s) => s.token !== null); 
  const { data, error, isLoading, mutate } = useSWR(
    isAuth ? endpoints.enrollment.myEnrollments : null
  );
  
  const enrollCourse = useCallback(async (courseId) => {
    try {
      const res = await Apis.post(endpoints.enrollment.enroll(courseId));
      mutate(); 

      return { success: true, data: res.data };
    } catch (err) {
      return { 
        success: false, 
        message: extractErrorMessage(err, "Lỗi hệ thống") 
      };
    }
  }, [mutate]);

  const cancelEnrollment = useCallback(async (courseId) => {
    try {
      await Apis.delete(endpoints.enrollment.cancel(courseId));
      mutate();
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: extractErrorMessage(err, "Không thể hủy đăng ký") 
      };
    }
  }, [mutate]);

  return {
    enrolledCourses: data || [],
    isLoading,
    error,
    enrollCourse,
    cancelEnrollment
  };
};

export default useEnrolledCourses;