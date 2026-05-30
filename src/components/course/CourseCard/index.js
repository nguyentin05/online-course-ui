import React, { createContext, useContext } from 'react';
import Thumbnail from './Thumbnail';
import Title from './Title';
import Instructor from './Instructor';
import Meta from './Meta';
import Price from './Price';
import EnrollButton from './EnrollButton';
import useViewTransition from '../../../hooks/useViewTransition';

const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

const CourseCard = ({ course, children, className = '' }) => {
  const normalizedCourse = {
    id: course?.id ?? null,
    subject: course?.subject ?? 'Course',
    image: course?.image ?? '/images/default-course.png',
    price: course?.price ?? 0,
    duration: course?.duration ?? 0,
    instructorId: course?.instructorId ?? null,
    categoryId: course?.categoryId ?? null,
    categoryName: course?.categoryName ?? 'Chưa phân loại',
    instructorName: course?.instructorName ?? 'Giảng viên ẩn danh',
  };

  const navigateWithTransition = useViewTransition();
  return (
    <CourseContext.Provider value={normalizedCourse}>
      <div 
        onClick={() => navigateWithTransition(`/course/${normalizedCourse.id}`)}
        className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 group flex flex-col h-full course-card-container cursor-pointer ${className}`}
        >
        {children}
      </div>
    </CourseContext.Provider>
  );
}

export default CourseCard;

CourseCard.Thumbnail = Thumbnail;
CourseCard.Title = Title;
CourseCard.Instructor = Instructor;
CourseCard.Meta = Meta;
CourseCard.Price = Price;
CourseCard.EnrollButton = EnrollButton;