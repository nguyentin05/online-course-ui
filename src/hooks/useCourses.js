import { useState, useEffect } from 'react';
import mockCourses from '../mock/data.mock.courses.json';

//Lưu ý thêm: JSON.stringify(filters) hoạt động tốt với mock data. 
// Khi chuyển sang API thực, nên đổi thành destructure từng field ra dependency array cho chuẩn hơn:
// dong 44:
// }, [category, keyword, page]);

const useCourses = (filters = {}) => {
  const { category = null, keyword = '', page = 1, limit = null } = filters;

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        let data = mockCourses;

        if (category) {
          data = data.filter(c => c.categoryId.name === category);
        }
        if (keyword) {
          data = data.filter(c => c.subject.toLowerCase().includes(keyword.toLowerCase()));
        }
        if (limit) {
          data = data.slice(0, limit);
        }

        setCourses(data);
      } catch (err) {
        setError('Không thể tải danh sách khóa học lúc này.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [JSON.stringify(filters)]);

  return { courses, isLoading, error };
}

export default useCourses;