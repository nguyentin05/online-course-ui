import Apis, { endpoints } from '../configs/Apis';

export const authService = {
  login: (data) => Apis.post(endpoints.auth.login, data),
  register: (form) => Apis.post(endpoints.auth.register, form)
};