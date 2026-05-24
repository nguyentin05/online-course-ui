import { useContext } from 'react';
import { UserContext } from '../configs/MyContexts';
import cookies from 'react-cookies';

const useUser = () => {
  const [user, dispatch] = useContext(UserContext);

  const login = (userData, token) => {
    cookies.save('token', token, { path: '/' });
    cookies.save('user', userData, { path: '/' });
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return { user, login, logout };
}

export default useUser;