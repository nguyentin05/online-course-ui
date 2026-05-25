import { create } from 'zustand';
import cookies from 'react-cookies';

const useUserStore = create((set) => ({
  user: cookies.load('user') || null,
  token: cookies.load('token') || null,

  login: (userData, token) => {
    cookies.save('token', token, { path: '/' });
    cookies.save('user', userData, { path: '/' });
    set({ user: userData, token: token });
  },

  logout: () => {
    cookies.remove('token', { path: '/' });
    cookies.remove('user', { path: '/' });
    set({ user: null, token: null });
  }
}));

export default useUserStore;