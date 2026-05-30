import useSWR from 'swr';
import { endpoints } from '../configs/Apis';
import useUserStore from '../store/useUserStore';
import { ROLES } from '../constants/roles';

const useChatInbox = () => {
  const user = useUserStore((s) => s.user);
  
  let endpoint = null;
  if (user) {
    if (user.role === ROLES.INSTRUCTOR) {
      endpoint = endpoints.instructor.myCourses;
    }
    else if (user.role === ROLES.STUDENT) {
      endpoint = endpoints.enrollment.myEnrollments;
    }
  }

  const { data, error, isLoading } = useSWR(endpoint);
  
  const rooms = (data || []).map(i => i?.course || i);

  return { 
    rooms,
    isLoading, 
    error 
  };
}

export default useChatInbox;