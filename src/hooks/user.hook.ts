import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user);
 

  return { user };
};