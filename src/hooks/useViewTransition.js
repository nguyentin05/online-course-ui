import { useNavigate } from 'react-router-dom';

const useViewTransition = () => {
  const nav = useNavigate();

  const navigateWithTransition = (to) => {
    if (!document.startViewTransition) {
      nav(to);
      return;
    }

    document.startViewTransition(() => {
      nav(to);
    });
  };

  return navigateWithTransition;
}

export default useViewTransition;