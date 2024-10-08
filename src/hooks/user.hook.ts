import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useGetCurrentUserQuery } from '@/lib/api/authApi';

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { refetch } = useGetCurrentUserQuery(user?._id as string);

  return { user, refetchUser: refetch, isAuthenticated: !!user };
};