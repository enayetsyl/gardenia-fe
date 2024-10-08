import envConfig from "@/config/envConfig";
import { Post } from "@/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

export interface PostResponse {
  success: boolean;
  data: Post[];
  message: string;
}

export type CreatePostRequest = FormData;

export const postApi = createApi({ 
  reducerPath: 'postApi',
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
    getPosts: builder.query<PostResponse, string>({
      query: (userId) => `/posts/getPosts/${userId}`,
    }),
    getUpvotes: builder.query<PostResponse, string>({
      query: (userId) => `/posts/getUpvote/${userId}`, 
    }),
    createPost: builder.mutation<PostResponse, CreatePostRequest>({
      query: (postData) => ({
        url: '/posts/create',
        method: 'POST',
        body: postData,
        formData: true, 
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetUpvotesQuery, useCreatePostMutation } = postApi;
