// lib/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import Cookies from 'js-cookie';
export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

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
          console.error('Error during registration:', error);
        }
      },
    }),
    loginUser: builder.mutation<AuthResponse, RegisterUser>({
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
  }),
});

// Export hooks for usage in functional components
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
