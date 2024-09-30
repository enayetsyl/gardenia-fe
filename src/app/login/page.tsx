'use client';

import CustomButton from '@/Components/Shared/CustomButton';
import CustomContainer from '@/Components/Shared/CustomContainer';
import CustomInput from '@/Components/Shared/CustomInput';
import { useAuth } from '@/hooks/auth.hook';
import { LoginUser } from '@/type';
import Link from 'next/link';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState<LoginUser>({
    email: '',
    password: '',
  });

  const { handleLogin, isLoginLoading } = useAuth();

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form data', formData);
    handleLogin(formData);
  };

  return (
    <div className="bg-background-dark">
      <CustomContainer>
        <div className="flex justify-center items-center min-h-screen">
          <form
            onSubmit={handleLoginUser}
            className="flex flex-col gap-5 w-[400px] border-2 border-white p-10 shadow-2xl border-dotted rounded-lg"
          >
            <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
              Login
            </h1>

            <CustomInput
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
            <div className="flex justify-end">
              <Link
                href={'/forget-password'}
                className="underline text-sm text-secondary-dark hover:text-link-hover "
              >
                Forget Password
              </Link>
            </div>
            <CustomButton
              type="submit"
              text={isLoginLoading ? 'Loginnnnnnn...' : 'Login'}
              disabled={isLoginLoading}
              className="bg-button-bg hover:bg-button-hover text-button-text "
            />
            <p className="text-center text-sm">
              Don't have an account?{' '}
              <Link
                href={'/register'}
                className="hover:text-link-hover hover:font-bold underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Login;
