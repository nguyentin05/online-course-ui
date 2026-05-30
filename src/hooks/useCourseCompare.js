import useSWR from 'swr';
import { endpoints } from '../configs/Apis';
import { fetcherWithParams } from '../utils/swrUtils';

const useCourseCompare = ({ categoryId, keyword, limit = 5 }) => {
  const params = categoryId 
    ? { categoryId, ...(keyword && { keyword }), ...(limit && { limit }) } 
    : null;

  const cacheKey = params ? [endpoints.courses.compare, params] : null;

  const { data, error, isLoading } = useSWR(cacheKey, fetcherWithParams, {
    revalidateOnFocus: false
  });

  return {
    compareData: data, 
    isLoading,
    error: error?.response?.data?.message || error?.message || null, 
  };
};

export default useCourseCompare;