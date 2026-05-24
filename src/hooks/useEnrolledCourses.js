import { useContext, useEffect, useState } from 'react';
import { EnrollContext, EnrollDispatchContext, UserContext } from '../configs/MyContexts';

const useEnrolledCourses = () => {
  const [enroll, enrollDispatch] = useContext(EnrollContext);
  const [user] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user || enroll.enrolledCourses.length > 0) return;

    const fetchMyCourses = async () => {
      setIsLoading(true);
      try {
        // Giả lập gọi API lấy danh sách khóa học của User:
        // const res = await Api.get(endpoints.getEnrolledCourses);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData = [
          { id: 1, subject: 'Lập trình ReactJS Cơ bản', image: '...' }
        ];
        
        enrollDispatch({ type: 'SET_ENROLLED_COURSES', payload: mockData });
      } catch (error) {
        console.error("Lỗi khi tải khóa học của tôi", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCourses();
  }, [user, enroll.enrolledCourses.length]);

  const enrollCourse = async (course) => {
    try {
      enrollDispatch({ type: 'ENROLL_COURSE', payload: course });
      return true;
    } catch (error) {
      console.error("Lỗi đăng ký khóa học:", error);
      return false;
    }
  };

  const unenrollCourse = async (courseId) => {
    enrollDispatch({ type: 'UNENROLL_COURSE', payload: { id: courseId } });
  };

  return { enrolledCourses: enroll.enrolledCourses, isLoading, enrollCourse, unenrollCourse };
}

export default useEnrolledCourses;