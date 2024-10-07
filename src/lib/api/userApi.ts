// ... existing imports ...
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import Cookies from 'js-cookie';
import { User } from '@/type';

export interface UserResponse {
  success: boolean;
  data: {
    user: User,
  };
  message: string;
  statusCode: number;
}



export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadUserImage: builder.mutation<UserResponse, { userId: string; image: File }>({
      query: ({ userId, image }) => {
        const formData = new FormData();
        formData.append('image', image);

        return {
          url: `/users/upload-image/${userId}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadUserImageMutation } = userApi;
