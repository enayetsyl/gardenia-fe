'use client';
import CustomButton from '@/Components/Shared/CustomButton';
import CustomContainer from '@/Components/Shared/CustomContainer';
import CustomInput from '@/Components/Shared/CustomInput';
import { useResetPasswordMutation } from '@/lib/api/authApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ResetPassword = ({
  params,
}: {
  params: { id: string; token: string };
}) => {
 

  const { id, token } = params;

  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetPassword, { isLoading }] =
    useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await resetPassword({ id, token, password }).unwrap();

      toast.success('Password reset successfully!');
      
    } catch (error) {
      // console.error('Failed to reset password:', error);
      toast.success('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="bg-background-dark">
      <CustomContainer>
        <div className="flex justify-center items-center min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-[400px] border-2 border-white p-10 shadow-2xl border-dotted rounded-lg"
          >
            <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
              Reset Password
            </h1>
            <CustomInput
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CustomButton
              type="submit"
              text={isLoading ? 'Resetting...' : 'Reset Password'}
              disabled={isLoading}
              className="bg-button-bg hover:bg-button-hover text-button-text "
            />
          </form>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ResetPassword;
