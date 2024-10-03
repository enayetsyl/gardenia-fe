import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
} from '@/lib/api/authApi';
import { ForgetPasswordProps, LoginUser, RegisterUser } from '@/type';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [forgetPassword, { isLoading: isForgetPasswordLogin }] =
    useForgetPasswordMutation();

  const handleRegister = async (userData: RegisterUser) => {
    try {
      const res = await registerUser(userData).unwrap();
      if (res.success) {
        toast.success('Registration successful');
        // console.log('Registration successful', res);
      }
    } catch (error: any) {
      toast.error(`${error.data.message}`);
      // console.error('Error during registration:', error);
    }
  };

  const handleLogin = async (userData: LoginUser) => {
    try {
      const res = await loginUser(userData).unwrap();
      if (res.success) {
        toast.success('Login successful');
        // console.log('Login successful', res);
      }
    } catch (error: any) {
      toast.error(`${error.data.message}`);
      // console.error('Error during login:', error);
    }
  };

  const handleForgetPassword = async (formData: ForgetPasswordProps) => {
    try {
      const res = await forgetPassword(formData).unwrap();
      if (res.success) {
        toast.success('Password reset email sent');
        // console.log('Password reset email sent', res);
      }
    } catch (error: any) {
      toast.error(`${error.data.message}`);
      // console.error('Error during password reset:', error);
    }
  };

  return {
    handleRegister,
    handleLogin,
    isRegisterLoading,
    isLoginLoading,
    isForgetPasswordLogin,
    handleForgetPassword,
  };
};
