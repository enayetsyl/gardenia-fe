import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from '@/lib/api/authApi';
import { User } from '@/type';
import { useEffect } from 'react';
import { setUser } from '@/lib/features/UserState/UserSlice';

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const { refetch } = useGetCurrentUserQuery(user?._id as string, {
    skip: !user?._id, 
  });
  
  useEffect(() => {
    if (!user) {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie) as User;
        dispatch(setUser(parsedUser)); 
      }
    }
  }, [user, dispatch]);

  return { user, refetchUser: refetch, isAuthenticated: !!user };
};