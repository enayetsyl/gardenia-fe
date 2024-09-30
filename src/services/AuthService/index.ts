'use server';

import axiosInstance from '@/lib/AxiosInstance';
import { ForgetPasswordProps, LoginUser, RegisterUser } from '@/type';
import { cookies } from 'next/headers';

export const registerUser = async (userData: RegisterUser) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', userData);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      cookies().set('refreshToken', data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error?.message || 'An unknown error occurred');
  }
};

export const loginUser = async (userData: LoginUser) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData);
    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      cookies().set('refreshToken', data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgetPassword = async (formData: ForgetPasswordProps) => {
  try {
    const { data } = await axiosInstance.post(
      '/auth/forget-password',
      formData
    );
    return data;
  } catch (error: any) {
    throw new Error(error?.message || 'An unknown error occurred');
  }
};

export const logout = async () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get('refreshToken')?.value;

    const res = await axiosInstance({
      url: '/auth/refresh-token',
      method: 'POST',
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to get new access token');
  }
};
