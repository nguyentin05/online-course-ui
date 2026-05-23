export const initialEnroll = {
  enrolledCourses: []
};

export default (current, action) => {
  switch (action.type) {
    case 'SET_ENROLLED_COURSES':
      return {...current, enrolledCourses: action.payload};

    case 'ENROLL_COURSE': {
      const alreadyEnrolled = current.enrolledCourses.find(c => c.id === action.payload.id);
      if (alreadyEnrolled) 
        return current;

      return {...current, enrolledCourses: [...current.enrolledCourses, action.payload]};
    }

    case 'UNENROLL_COURSE':
      return {...current, enrolledCourses: current.enrolledCourses.filter(c => c.id !== action.payload.id)};

    case 'CLEAR_ENROLLMENTS':
      return initialEnroll;

    default:
      return current;
  }
}