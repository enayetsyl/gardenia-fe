// ... existing imports ...
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import Cookies from 'js-cookie';
import { User } from '@/type';

export interface UserResponse {
  success: boolean;
  data: User;
  message: string;
  statusCode: number;
}
export interface FollowersResponse {
  success: boolean;
  data: User[];
  message: string;
  statusCode: number;
}

export interface ProfilePhotosResponse {
  success: boolean;
  data: string[];
  message: string;
  statusCode: number;
}

export interface UpdateUserDetailsRequest {
  userId: string;
  details: {
    study?: string;
    location?: string;
    maritalStatus?: string;
    website?: string;
  };
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
    uploadCoverImage: builder.mutation<UserResponse, { userId: string; image: File }>({
      query: ({ userId, image }) => {
        const formData = new FormData();
        formData.append('image', image);
        return {
          url: `/users/upload-cover-image/${userId}`, 
          method: 'POST',
          body: formData,
        };
      },
    }),
    followUser: builder.mutation<UserResponse, { followerId: string; followedId: string }>({
      query: ({ followerId, followedId }) => ({
        url: '/users/follow',
        method: 'POST',
        body: { followerId, followedId },
      }),
    }),
    getFollowers: builder.query<FollowersResponse, { userId: string }>({
      query: ({ userId }) => `/users/followers/${userId}`,
    }),
    getProfilePhotos: builder.query<ProfilePhotosResponse, { userId: string }>({
      query: ({ userId }) => `/users/profile-photos/${userId}`,
    }),
    updateUserBio: builder.mutation<UserResponse, { userId: string; bio: string }>({
      query: ({ userId, bio }) => ({
        url: `/users/update-bio/${userId}`,
        method: 'PUT',
        body: { bio },
      }),
    }),
    updateUserDetails: builder.mutation<UserResponse, UpdateUserDetailsRequest>({
      query: ({ userId, details }) => ({
        url: `/users/update-details/${userId}`,
        method: 'PUT',
        body: details,
      }),
    }),
  }),
});

export const { useUploadUserImageMutation, useUploadCoverImageMutation, useFollowUserMutation, useGetFollowersQuery, useGetProfilePhotosQuery, useUpdateUserBioMutation, useUpdateUserDetailsMutation, } = userApi;
