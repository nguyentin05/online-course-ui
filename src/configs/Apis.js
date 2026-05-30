import axios from 'axios';
import useUserStore from '../store/useUserStore';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/course-app/api/v1';

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  courses: {
    getAll: '/courses',
    getById: (id) => `/courses/${id}`,
    getLessons:  (id) => `/courses/${id}/lessons`,
    getProgress: (id) => `/student/courses/${id}/progress`,
    compare: '/courses/compare',
  },
  category: {
    getAll: '/categories',
  },
  enrollment: {
    myEnrollments: '/student/courses/enrolled',
    enroll: (courseId) => `/student/courses/${courseId}/enroll`,
    cancel: (courseId) => `/student/courses/${courseId}/enroll`,
  },
  lessons: {
    updateProgress: (id) => `/student/lessons/${id}/progress`,
  },
  instructor: {
    myCourses: '/instructor/courses',
    create: '/instructor/courses',
    update: (id) => `/instructor/courses/${id}`,
    delete: (id) => `/instructor/courses/${id}`,
    students: (id) => `/instructor/courses/${id}/students`,
    progress: (id) => `/instructor/courses/${id}/progress`,
  },
  payments: {
    checkout: (courseId) => `/student/courses/${courseId}/checkout`,
    status: (orderId) => `/student/payments/${orderId}`,
  },
  chat: {
    createToken: '/chat/firebase-token',
    join: (courseId) => `/chat/courses/${courseId}/join`
  }
};

const Apis = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

Apis.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Apis.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default Apis;