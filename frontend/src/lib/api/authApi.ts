// lib/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import Cookies from 'js-cookie';
import { ForgetPasswordProps, LoginUser, RegisterUser, ResetPasswordProps, User } from '@/type';
import { setUser } from '../features/UserState/UserSlice';
// import { forgetPassword } from '@/services/AuthService';

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  message: string;
}
export interface UserResponse {
  success: boolean;
  data: User;
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
      onQueryStarted: async (_, { queryFulfilled }) => {
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
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            Cookies.set('accessToken', data.data.accessToken);
            Cookies.set('refreshToken', data.data.refreshToken);
            dispatch(setUser(data.data.user));
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
      onQueryStarted: async (_, { queryFulfilled }) => {
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
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          // console.error('Error during password reset:', error);
        }
      },
    }),
    getCurrentUser: builder.query<UserResponse, string>({
      query: (userId) => `/auth/me/${userId}`,
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setUser(data.data));
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
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
  useGetCurrentUserQuery, // Add this new export
} = authApi;
