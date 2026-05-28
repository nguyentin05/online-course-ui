import useSWR from 'swr';
import Apis, { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';

const useInstructorCourses = () => {
  const isAuth = useUserStore((s) => s.token !== null);

  const { data, error, isLoading, mutate } = useSWR(
    isAuth ? endpoints.instructor.myCourses : null
  );

  const myCourses = data || [];

  const createCourse = async (payload, isMultipart = false) => {
    try {
      const config = isMultipart 
        ? { headers: { 'Content-Type': 'multipart/form-data' } } 
        : {};
      
      const res = await Apis.post(endpoints.instructor.create, payload, config);
      mutate();
      return { success: true, data: res.data.data };
    } catch (err) {
      console.error("Lỗi tạo khóa học:", err);
      return { success: false, message: err.response?.message || "Lỗi hệ thống" };
    }
  };

  const updateCourse = async (id, payload, isMultipart = false) => {
    try {
      const config = isMultipart 
        ? { headers: { 'Content-Type': 'multipart/form-data' } } 
        : {};
        
      const res = await Apis.put(endpoints.instructor.update(id), payload, config);
      mutate();
      return { success: true, data: res.data.data };
    } catch (err) {
      console.error("Lỗi cập nhật khóa học:", err);
      return { success: false, message: err.response?.data?.message || "Lỗi cập nhật" };
    }
  };

  const deleteCourse = async (id) => {
    try {
      await Apis.delete(endpoints.instructor.delete(id));
      mutate();
      return { success: true };
    } catch (err) {
      console.error("Lỗi xóa khóa học:", err);
      return { success: false, message: "Không thể xóa khóa học này" };
    }
  };

  return {
    myCourses,
    isLoading,
    error,
    createCourse,
    updateCourse,
    deleteCourse
  };
};

export default useInstructorCourses;