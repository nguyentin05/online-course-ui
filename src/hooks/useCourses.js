import { useState, useEffect } from 'react';
import Apis, { endpoints } from '../configs/Apis'
import { PAGE_SIZE } from '../constants/pagination';
import { courseService } from '../services/courseService';


const useCourses = (filters = {}) => {
  const {
    keyword = '',
    instructor = '',
    categoryId = null,
    minPrice = null,
    maxPrice = null,
    sortBy = 'subject',
    sortDir = 'asc',
    page = 0,
    size = PAGE_SIZE,
    limit = null
  } = filters;

  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = {};
        if (keyword) params.keyword = keyword;
        if (instructor) params.instructor = instructor;
        if (categoryId) params.categoryId = categoryId;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        params.sortBy = sortBy;
        params.sortDir = sortDir;
        params.page = page;
        params.size = limit ?? size;

        const res = await courseService.getAll(params);
        const data = res.data.data;

        setCourses(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (err) {
        setError('Không thể tải danh sách khóa học');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [keyword, instructor, categoryId, minPrice, maxPrice, sortBy, sortDir, page, size, limit]);

  return { courses, totalPages, totalElements, isLoading, error };
}

export default useCourses;