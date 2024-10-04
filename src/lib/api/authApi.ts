// lib/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import Cookies from 'js-cookie';
import { ForgetPasswordProps, LoginUser, RegisterUser, ResetPasswordProps } from '@/type';
// import { forgetPassword } from '@/services/AuthService';

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    prepareHeaders: (headers) => {
      // Get the access token from cookies if it exists
      const token = Cookies.get('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterUser>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            Cookies.set('accessToken', data.data.accessToken);
            Cookies.set('refreshToken', data.data.refreshToken);
          }
        } catch (error) {
          // console.error('Error during registration:', error);
        }
      },
    }),
    loginUser: builder.mutation<AuthResponse, LoginUser>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            Cookies.set('accessToken', data.data.accessToken);
            Cookies.set('refreshToken', data.data.refreshToken);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      },
    }),
    forgetPassword: builder.mutation<AuthResponse, ForgetPasswordProps>({
      query: (formData) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: formData,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Handle success if needed
        } catch (error) {
          console.error('Error during password reset:', error);
        }
      },
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordProps>({
      query: ({ id, token, password }) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: { id, token, password },
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          // console.error('Error during password reset:', error);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
