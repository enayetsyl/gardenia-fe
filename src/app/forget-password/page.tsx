'use client';
import CustomButton from '@/Components/Shared/CustomButton';
import CustomContainer from '@/Components/Shared/CustomContainer';
import CustomInput from '@/Components/Shared/CustomInput';
import { useAuth } from '@/hooks/auth.hook';
import { ForgetPasswordProps } from '@/type';
import Link from 'next/link';
import { useState } from 'react';

const ForgetPassword = () => {
  const [formData, setFormData] = useState<ForgetPasswordProps>({
    email: '',
  });

  const { handleForgetPassword, isForgetPasswordLogin } = useAuth();

  const handleUserForgetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form data', formData);
    handleForgetPassword(formData);
  };

  return (
    <div className="bg-background-dark">
      <CustomContainer>
        <div className="flex justify-center items-center min-h-screen">
          <form
            onSubmit={handleUserForgetPassword}
            className="flex flex-col gap-5 w-[400px] border-2 border-white p-10 shadow-2xl border-dotted rounded-lg"
          >
            <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
              Forgot Password?
            </h1>

            <p className="text-center pb-5">
              Enter your email to reset password
            </p>

            <CustomInput
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md"
            />

            <CustomButton
              type="submit"
              text="Next"
              disabled={isForgetPasswordLogin}
              className="bg-button-bg hover:bg-button-hover text-button-text"
            />

            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="hover:text-link-hover hover:font-bold underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ForgetPassword;
