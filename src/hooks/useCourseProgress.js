import useSWR from 'swr';
import { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';

const useCourseProgress = (courseId) => {
  const isAuth = useUserStore((state) => state.token !== null); 
  
  const { data, error, isLoading, mutate } = useSWR(
    isAuth && courseId ? endpoints.courses.getProgress(courseId) : null
  );

  return {
    progressData: data || null, 
    isLoading,
    error,
    mutateProgress: mutate
  };
};

export default useCourseProgress;