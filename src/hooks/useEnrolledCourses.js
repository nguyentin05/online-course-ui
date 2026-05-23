import { useContext, useEffect, useState } from 'react';
import { EnrollContext, EnrollDispatchContext, UserContext } from '../configs/MyContexts';
// Nếu dùng API thật sau này: import Api, { endpoints } from '../configs/Apis';

const useEnrolledCourses = () => {
  const enrolledCourses = useContext(EnrollContext);
  const dispatch = useContext(EnrollDispatchContext);
  const user = useContext(UserContext);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user || enrolledCourses.length > 0) return;

    const fetchMyCourses = async () => {
      setIsLoading(true);
      try {
        // Giả lập gọi API lấy danh sách khóa học của User:
        // const res = await Api.get(endpoints.getEnrolledCourses);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = [
          { id: 1, subject: 'Lập trình ReactJS Cơ bản', image: '...' }
        ];
        
        dispatch({ type: 'SET_ENROLLED_COURSES', payload: mockData });
      } catch (error) {
        console.error("Lỗi khi tải khóa học của tôi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCourses();
  }, [user, enrolledCourses.length, dispatch]);

  const enrollCourse = async (course) => {
    try {
      // TODO: Gọi API lưu xuống database
      // await Api.post(endpoints.enrollCourse(course.id));
      
      dispatch({ type: 'ENROLL_COURSE', payload: course });
      return true;
    } catch (error) {
      console.error("Lỗi đăng ký khóa học:", error);
      return false;
    }
  };

  const unenrollCourse = async (courseId) => {
    dispatch({ type: 'UNENROLL_COURSE', payload: { id: courseId } });
  };

  return { enrolledCourses, isLoading, enrollCourse, unenrollCourse };
}

export default useEnrolledCourses;