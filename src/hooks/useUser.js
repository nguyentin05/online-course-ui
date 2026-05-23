import { useContext } from 'react';
import { UserContext } from '../configs/MyContexts';

const useUser = () => {
  const [user, dispatch] = useContext(UserContext);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return { user, login, logout };
}

export default useUser;