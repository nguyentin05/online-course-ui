import Apis, { endpoints } from '../configs/Apis';

export const courseService = {
  getAll: (params) => Apis.get(endpoints.courses.getAll, { params }),
  getById: (id) => Apis.get(endpoints.getCourseDetails(id)),
  create: (data) => Apis.post(endpoints.createCourse, data),
  update: (id, data) => Apis.put(endpoints.updateCourse(id), data),
};