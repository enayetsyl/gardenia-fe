import { RegisterUser } from '@/app/register/page';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '@/lib/api/authApi';

export const useAuth = () => {
  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();

  const handleRegister = async (userData: RegisterUser) => {
    try {
      const res = await registerUser(userData).unwrap();
      if (res.success) {
        console.log('Registration successful', res);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = async (userData: RegisterUser) => {
    try {
      const res = await loginUser(userData).unwrap();
      if (res.success) {
        console.log('Login successful', res);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return {
    handleRegister,
    handleLogin,
    isRegisterLoading,
    isLoginLoading,
  };
};
