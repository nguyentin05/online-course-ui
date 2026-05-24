import { useState, useEffect } from 'react';
import mockCategories from '../mock/data.mock.categories.json';
import { categoryService } from '../services/categoryService';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await categoryService.getAll();
        const data = res.data.data;

        setCategories(data);
      } catch (error) {
        setError('Không thể tải danh mục');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
}

export default useCategories;