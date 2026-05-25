import Apis, { endpoints } from '../configs/Apis';
import { useSWRConfig } from 'swr'; 

const useLessonProgress = (courseId) => {
  const { mutate } = useSWRConfig();

  const updateProgress = async (lessonId, status) => {
    const validStatus = status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS';

    try {
      const res = await Apis.put(endpoints.lessons.updateProgress(lessonId), {
        status: validStatus
      });

      if (courseId) {
        mutate(endpoints.courses.getProgress(courseId)); 
      }

      return { success: true, data: res.data.data };
    } catch (err) {
      console.error("Lỗi cập nhật tiến độ:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Không thể cập nhật tiến độ" 
      };
    }
  };

  return { updateProgress };
};

export default useLessonProgress;