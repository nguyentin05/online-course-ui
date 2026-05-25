import useSWR from 'swr';
import { endpoints } from '../configs/Apis';

const useCourseLessons = (courseId) => {
  const { data, error, isLoading } = useSWR(
    courseId ? endpoints.courses.getLessons(courseId) : null
  );
  
  const lessons = Array.isArray(data) ? data : [];

  return { 
    lessons, 
    isLoading, 
    error: error ? 'Không thể tải danh sách bài học' : null
  };
}

export default useCourseLessons;