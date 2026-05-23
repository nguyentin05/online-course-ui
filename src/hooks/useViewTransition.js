import { useNavigate } from 'react-router-dom';

const useViewTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = (to) => {
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }

    document.startViewTransition(() => {
      navigate(to);
    });
  };

  return navigateWithTransition;
}

export default useViewTransition;