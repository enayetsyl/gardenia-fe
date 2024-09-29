'use client';

import { useAuth } from '@/hooks/auth.hook';
import { useState } from 'react';

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterUser>({
    name: '',
    email: '',
    password: '',
  });

  const { handleRegister, isRegisterLoading } = useAuth();

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form data', formData);
    handleRegister(formData);
  };

  return (
    <div className="flex justify-center items-center my-20">
      <form
        onSubmit={handleRegisterUser}
        className="flex flex-col gap-5 w-[400px]"
      >
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
