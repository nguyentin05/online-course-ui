import React, { createContext, useContext } from 'react';
import Thumbnail from './Thumbnail';
import Title from './Title';
import Instructor from './Instructor';
import Meta from './Meta';
import Price from './Price';
import EnrollButton from './EnrollButton';
import './CourseCard.css';
import { Link } from 'react-router-dom';
import useViewTransition from '../../../hooks/useViewTransition';

// 1. Tạo Context để chia sẻ dữ liệu
const CourseContext = createContext();

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('Các component con phải được đặt bên trong <CourseCard>');
  }
  return context;
}

const CourseCard = ({ course, children, className = '' }) => {
  const navigateWithTransition = useViewTransition();

  const handleCardClick = () => {
    navigateWithTransition(`/course/${course.id}`);
  };

  return (
    <CourseContext.Provider value={course}>
      <Link to={`/course/${course.id}`}>
        <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 group flex flex-col h-full course-card-container ${className}`}>
          {children}
        </div>
      </Link>
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