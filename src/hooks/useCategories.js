import { useState, useEffect } from 'react';
import mockCategories from '../mock/data.mock.categories.json';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        let data = mockCategories;

        setCategories(data);
      } catch (error) {
        console.error("Lỗi tải danh mục", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
}

export default useCategories;