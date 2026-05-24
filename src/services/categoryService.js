import Apis, { endpoints } from '../configs/Apis';

export const categoryService = {
  getAll: () => Apis.get(endpoints.category.getAll)
};