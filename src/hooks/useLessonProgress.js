import Apis, { endpoints } from '../configs/Apis';
import { useSWRConfig } from 'swr'; 
import { extractErrorMessage } from '../utils/errorUtils';
import { useCallback } from 'react';

const useLessonProgress = (courseId) => {
  const { mutate } = useSWRConfig();

  const updateProgress = useCallback(async (lessonId, status) => {
    const validStatus = status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS';

    try {
      const res = await Apis.put(endpoints.lessons.updateProgress(lessonId), {
        status: validStatus
      });

      if (courseId) {
        mutate(endpoints.courses.getProgress(courseId)); 
      }

      return { success: true, data: res.data };
    } catch (err) {
      return { 
        success: false, 
        message: extractErrorMessage(err, "Không thể cập nhật tiến độ") 
      };
    }
  }, [courseId, mutate]);

  return { updateProgress };
};

export default useLessonProgress;