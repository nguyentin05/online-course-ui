import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';
import MySpinner from '../components/layout/MySpinner';

const Home = React.lazy(() => import('../pages/Home/Home'));
const Login = React.lazy(() => import('../pages/User/Login'));
const Register = React.lazy(() => import('../pages/User/Register/Register'));
const Search = React.lazy(() => import('../pages/Search/Search'));
const CourseDetail = React.lazy(() => import('../pages/Course/CourseDetail'));
const CourseCompare = React.lazy(() => import('../pages/Course/CourseCompare'));
const Profile = React.lazy(() => import('../pages/User/Profile'));
const MyLearning = React.lazy(() => import('../pages/User/MyLearning'));
const CourseLesson = React.lazy(() => import('../pages/Course/CourseLesson'));
const InsDashboard = React.lazy(() => import('../pages/Instructor/Dashboard'));
const MyCourses = React.lazy(() => import('../pages/Instructor/MyCourses'));
const CourseEditor = React.lazy(() => import('../pages/Instructor/CourseEditor'));
const LessonEditor = React.lazy(() => import('../pages/Instructor/LessonEditor'));
const TrackStudents = React.lazy(() => import('../pages/Instructor/TrackStudents'));
const PaymentReturn = React.lazy(() => import('../pages/Payment/PaymentReturn'));

const SuspenseWrapper = () => (
  <Suspense fallback={<MySpinner />}>
    <Outlet />
  </Suspense>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route element={<SuspenseWrapper />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/:courseId/lesson" element={<CourseLesson />} />
          <Route path="/payment/result" element={<PaymentReturn />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/compare" element={<CourseCompare />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-learning" element={<MyLearning />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['INSTRUCTOR']} />}>
              <Route path="/instructor/dashboard" element={<InsDashboard />} />
              <Route path="/instructor/courses" element={<MyCourses />} />
              <Route path="/instructor/course/create" element={<CourseEditor />} />
              <Route path="/instructor/course/edit/:courseId" element={<CourseEditor />} />
              <Route path="/instructor/course/:courseId/lessons" element={<LessonEditor />} />
              <Route path="/instructor/course/:courseId/students" element={<TrackStudents />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;