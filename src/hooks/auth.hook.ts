import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
} from '@/lib/api/authApi';
import { ForgetPasswordProps, LoginUser, RegisterUser } from '@/type';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/lib/features/UserState/UserSlice';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [forgetPassword, { isLoading: isForgetPasswordLogin }] =
    useForgetPasswordMutation();
    const router = useRouter();

  const handleRegister = async (userData: RegisterUser) => {
    try {
      const res = await registerUser(userData).unwrap();
      if (res.success) {
        toast.success('Registration successful');
        dispatch(setUser(res.data.user));
      }
    } catch (error: any) {
      toast.error(`${error.data.message}`);
    }
  };

  const handleLogin = async (userData: LoginUser) => {
    try {
      const res = await loginUser(userData).unwrap();
      if (res.success) {
        toast.success('Login successful');
        router.push('/my-profile');
        dispatch(setUser(res.data.user));
        await router.push('/my-profile');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(`${error.data.message}`);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/login');
    toast.success('Logged out successfully');
  };

  const handleForgetPassword = async (formData: ForgetPasswordProps) => {
    try {
      const res = await forgetPassword(formData).unwrap();
      if (res.success) {
        toast.success('Password reset email sent');
      }
    } catch (error: any) {
      toast.error(`${error.data.message}`);
      // console.error('Error during password reset:', error);
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleLogout,
    isRegisterLoading,
    isLoginLoading,
    isForgetPasswordLogin,
    handleForgetPassword,
  };
};
