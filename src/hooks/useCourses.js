import useSWR from 'swr';
import { PAGE_SIZE } from '../constants/pagination';
import Apis, { endpoints } from '../configs/Apis';

const fetcherWithParams = async ([url, params]) => {
  const res = await Apis.get(url, { params });
  return res; 
};

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

  const { data, error, isLoading } = useSWR(
    [endpoints.courses.getAll, params],
    fetcherWithParams,
    { keepPreviousData: true }
  );

  return { 
    courses: data?.data?.content || [], 
    totalPages: data?.data?.totalPages || 0, 
    totalElements: data?.data?.totalElements || 0, 
    isLoading, 
    error: error ? 'Không thể tải danh sách khóa học' : null 
  };
}

export default useCourses;