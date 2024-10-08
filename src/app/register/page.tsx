'use client';

import CustomButton from '@/Components/Shared/CustomButton';
import CustomContainer from '@/Components/Shared/CustomContainer';
import CustomInput from '@/Components/Shared/CustomInput';
import { useAuth } from '@/hooks/auth.hook';
import { RegisterUser } from '@/type';
import Link from 'next/link';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState<RegisterUser>({
    name: '',
    email: '',
    password: '',
  });

  const { handleRegister, isRegisterLoading } = useAuth();

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(formData);
  };

  return (
    <div className="bg-background-dark">
      <CustomContainer>
        <div className="flex justify-center items-center min-h-screen">
          <form
            onSubmit={handleRegisterUser}
            className="flex flex-col gap-5 w-[400px] border-2 border-white p-10 shadow-2xl border-dotted rounded-lg"
          >
            <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
              Register
            </h1>

            <CustomInput
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border border-gray-300 p-2 rounded-md"
            />
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

            <CustomButton
              type="submit"
              text={isRegisterLoading ? 'Registering...' : 'Register'}
              disabled={isRegisterLoading}
              className="bg-button-bg hover:bg-button-hover text-button-text "
            />

            <p className="text-center text-sm">
              Already have an account.
              <Link
                href={'/login'}
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

export default Register;
