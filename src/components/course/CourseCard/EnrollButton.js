import React from 'react';
import Button from '../../common/Button';
import useEnrolledCourses from '../../../hooks/useEnrolledCourses';
import { useCourseContext } from '.';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import useOptimistic from '../../../hooks/useOptimistic';
import useUserStore from '../../../store/useUserStore';

const EnrollButton = () => {
  const course = useCourseContext();
  const user = useUserStore((s) => s.user);
  const { enrolledCourses, enrollCourse } = useEnrolledCourses();
  const nav = useNavigate();
  const isEnrolled = enrolledCourses.some(c => c.course?.id?.toString() === course.id?.toString());
  const [optimisticEnrolled, updateOptimistically] = useOptimistic(isEnrolled);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      nav('/login');
      return;
    }

    if (optimisticEnrolled) {
      nav(`/course/${course.id}/lesson`);
      return;
    }
    await updateOptimistically(
      true,
      () => enrollCourse(course.id)
    );
  };

  return isEnrolled ? (
    <Button variant="outline" size="sm" className="rounded-full" onClick={handleClick}>
      <CheckCircle size={14} className="mr-1" /> Vào học
    </Button>
  ) : (
    <Button variant="primary" size="sm" className="rounded-full shadow-lg shadow-brand/20" onClick={handleClick}>
      Đăng ký
    </Button>
  );
}

export default EnrollButton;