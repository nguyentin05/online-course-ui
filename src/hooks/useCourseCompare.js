import useSWR from 'swr';
import Apis, { endpoints } from '../configs/Apis';

const useCourseCompare = ({ categoryId, keyword, limit = 5 }) => {
  const fetcher = async () => {
    if (!categoryId) return null;

    const qs = new URLSearchParams();
    qs.append('categoryId', categoryId);
    if (keyword) qs.append('keyword', keyword);
    if (limit) qs.append('limit', limit);
    
    const res = await Apis.get(`${endpoints.courses.compare}?${qs.toString()}`);
    return res.data?.data || res.data;
  };

  const cacheKey = categoryId ? ['compare-get', categoryId, keyword, limit] : null;

  const { data, error, isLoading } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false
  });

  return {
    compareData: data, 
    isLoading,
    error: error?.response?.data?.message || error?.message, 
  };
};

export default useCourseCompare;