import axios from 'axios';
import cookies from 'react-cookies'
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
  },
  category: {
    getAll: '/categories',
  },
  enrollment: {
    myEnrollments: '/student/courses/enrolled',
    enroll: (courseId) => `/student/courses/${courseId}/enroll`,
    cancel: (courseId) => `/student/courses/${courseId}/enroll`,
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