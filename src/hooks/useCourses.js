import useSWR from 'swr';
import { endpoints } from '../configs/Apis';
import { fetcherWithParams } from '../utils/swrUtils';
import { PAGE_SIZE } from '../constants/pagination';

const useCourses = (filters = {}) => {
  const {
    keyword = '', instructor = '', categoryId = null,
    minPrice = null, maxPrice = null, sortBy = 'subject',
    sortDir = 'asc', page = 0, size = PAGE_SIZE, limit = null
  } = filters;

  const params = {
    ...(keyword && { keyword }),
    ...(instructor && { instructor }),
    ...(categoryId && { categoryId }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    sortBy, sortDir, page, size: limit ?? size
  };

  const { data, error, isLoading, isValidating } = useSWR(
    [endpoints.courses.getAll, params],
    fetcherWithParams,
    { keepPreviousData: true }
  );

  return { 
    courses: data?.content || [], 
    totalPages: data?.totalPages || 0, 
    totalElements: data?.totalElements || 0, 
    isLoading,
    isValidating,
    error: error ? 'Không thể tải danh sách khóa học' : null 
  };
}

export default useCourses;