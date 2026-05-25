import useSWR from 'swr';
import { endpoints } from '../configs/Apis';

const useCategories = () => {
  const { data, error, isLoading } = useSWR(endpoints.category.getAll);

  return { 
    categories: data || [], 
    isLoading, 
    error: error ? 'Không thể tải danh mục' : null
  };
}

export default useCategories;