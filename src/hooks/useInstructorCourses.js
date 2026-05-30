import useSWR from 'swr';
import Apis, { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';
import { extractErrorMessage } from '../utils/errorUtils';
import { useCallback } from 'react';

const useInstructorCourses = () => {
  const isAuth = useUserStore((s) => s.token !== null);

  const { data, error, isLoading, mutate } = useSWR(
    isAuth ? endpoints.instructor.myCourses : null
  );

  const createCourse = useCallback(async (payload, isMultipart = false) => {
    try {
      const config = isMultipart 
        ? { headers: { 'Content-Type': 'multipart/form-data' } } 
        : {};
      
      const res = await Apis.post(endpoints.instructor.create, payload, config);
      mutate();
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: extractErrorMessage(err, "Lỗi hệ thống") };
    }
  }, [mutate]);

  const updateCourse = useCallback(async (id, payload, isMultipart = false) => {
    try {
      const config = isMultipart 
        ? { headers: { 'Content-Type': 'multipart/form-data' } } 
        : {};
        
      const res = await Apis.put(endpoints.instructor.update(id), payload, config);
      mutate();
      return { success: true, data: res.data };
    } catch (err) {
      return { success: false, message: extractErrorMessage(err, "Lỗi cập nhật") };
    }
  }, [mutate]);

  const deleteCourse = useCallback(async (id) => {
    try {
      await Apis.delete(endpoints.instructor.delete(id));
      mutate();
      return { success: true };
    } catch (err) {
      return { success: false, message: extractErrorMessage(err, "Không thể xóa khóa học này") };
    }
  }, [mutate]);

  return {
    myCourses: data || [],
    isLoading,
    error,
    createCourse,
    updateCourse,
    deleteCourse
  };
};

export default useInstructorCourses;