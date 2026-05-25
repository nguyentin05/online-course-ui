import useSWR from 'swr';
import Apis, { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';

const fetcher = async (url) => {
  const res = await Apis.get(url);
  return res.data; 
};

const useCourseProgress = (courseId) => {
  const isAuth = useUserStore((state) => state.token !== null); 
  
  const { data, error, isLoading, mutate } = useSWR(
    isAuth && courseId ? endpoints.courses.getProgress(courseId) : null,
    fetcher
  );

  return {
    progressData: data || null, 
    isLoading,
    error,
    mutateProgress: mutate
  };
};

export default useCourseProgress;