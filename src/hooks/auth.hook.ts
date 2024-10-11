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
        // Save tokens in cookies
      document.cookie = `accessToken=${res.data.accessToken}; path=/;`;
      document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`;
      document.cookie = `user=${JSON.stringify(res.data.user)}; path=/;`;


        router.push(`/my-profile/${res.data.user._id}`);
        dispatch(setUser(res.data.user));
        // await router.push('/my-profile');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(`${error.data.message}`);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    // Remove cookies on the client side
  document.cookie = 'accessToken=; Max-Age=0; path=/';
  document.cookie = 'refreshToken=; Max-Age=0; path=/';
  document.cookie = 'user=; Max-Age=0; path=/';
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
