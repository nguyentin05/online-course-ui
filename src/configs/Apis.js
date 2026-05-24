import axios from 'axios';
import cookies from 'react-cookies'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/course-app/api/v1';

export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  courses: {
    getAll: '/courses',
    getById: (id) => `/courses/${id}`,
    create: '/courses',
    update: (id) => `/courses/${id}`,
    delete: (id) => `/courses/${id}`,
    suggest: '/courses/suggest',
  },
  category: {
    getAll: '/categories',
  },


  getCourseDetails: (id) => `/courses/${id}`,
  createCourse: '/courses',
  updateCourse: (id) => `/courses/${id}`,
  getLessonsByCourse: (courseId) => `/courses/${courseId}/lessons`,
  addLesson: (courseId) => `/courses/${courseId}/lessons`,
  createPaymentIntent: '/payments/create',
  getMyProfile: '/users/me',
  getEnrolledCourses: '/users/me/enrollments',
};

export const authApis = () => {
    console.info(cookies.load('token'))
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})

// // Tạo một instance (bản thể) của Axios với cấu hình mặc định
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000, // Quá 10s không phản hồi thì báo lỗi mạng
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // THÊM INTERCEPTOR: Tự động đính kèm Token vào mọi Request gửi đi
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Lấy token từ LocalStorage (hoặc Cookie tùy cách bạn code phần Login)
//     const token = localStorage.getItem('access_token');
    
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // XỬ LÝ RESPONSE: Bắt lỗi tập trung (VD: Hết hạn token thì tự văng ra màn hình Login)
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Trả về đúng cái data bên trong thay vì cả cục object cồng kềnh của Axios
//     return response.data;
//   },
//   (error) => {
//     if (error.response) {
//       // Server Spring Boot có trả về lỗi (400, 401, 403, 500...)
//       const status = error.response.status;
//       if (status === 401) {
//         console.error('Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
//         // TODO: Viết logic xóa token và chuyển hướng về trang /login
//         // localStorage.removeItem('access_token');
//         // window.location.href = '/login';
//       }
//     } else {
//       // Lỗi không kết nối được tới server (Server sập hoặc đứt cáp)
//       console.error('Không thể kết nối đến máy chủ.');
//     }
//     return Promise.reject(error);
//   }
// );



// export default axiosInstance;