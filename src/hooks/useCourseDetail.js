import useSWR from 'swr';
import { endpoints } from '../configs/Apis';

const useCourseDetail = (courseId) => {
  const { data, error, isLoading } = useSWR(
    courseId ? endpoints.courses.getById(courseId) : null
  );

  return { 
    course: data || null, 
    isLoading, 
    error: error ? 'Không thể tải chi tiết khóa học' : null
  };
}

export default useCourseDetail;