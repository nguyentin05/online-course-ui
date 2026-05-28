import useSWRInfinite from 'swr/infinite';
import { endpoints } from '../configs/Apis';

const useCourseLessons = (courseId, pageSize = 20) => {
  const getKey = (pageIndex, prev) => {
    if (!courseId) return null;
    if (prev && prev.page + 1 >= prev.totalPages) return null;
    return `${endpoints.courses.getLessons(courseId)}?page=${pageIndex}&size=${pageSize}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, null,
    { revalidateFirstPage: false }
  );

  const lessons = data?.flatMap(d => d?.content || []) || [];
  const totalElements = data?.[0]?.totalElements || 0;
  const isLoading = !data && !error;
  const isLoadingMore = isValidating && !!data;
  const isReachingEnd = data?.[data.length - 1]?.page + 1 >= data?.[data.length - 1]?.totalPages;

  return {
    lessons,
    totalElements,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore: () => { if (!isLoadingMore && !isReachingEnd) setSize(s => s + 1); },
    error: error ? 'Không thể tải danh sách bài học' : null,
  };
};

export default useCourseLessons;