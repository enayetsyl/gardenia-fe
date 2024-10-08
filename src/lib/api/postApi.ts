import envConfig from "@/config/envConfig";
import { NewsFeed, Post } from "@/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

export interface PostResponse {
  success: boolean;
  data: Post[];
  message: string;
}

interface CommentRequest {
  postId: string;
  content: string;
  userId: string;
}

export interface NewsFeedResponse {
  success: boolean;
  data: NewsFeed[];
  message: string;
}

export type CreatePostRequest = FormData;

interface UpvoteRequest {
  postId: string;
  userId: string;
}

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
    getNewsFeed: builder.query<NewsFeedResponse, void>({ 
      query: () => '/posts/getNewsFeed',
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
    upvotePost: builder.mutation<PostResponse, UpvoteRequest>({
      query: ({ postId, userId }) => ({
        url: `/posts/upvote/${postId}`,
        method: 'POST',
        body: { userId },
      }),
    }),
    removeUpvote: builder.mutation<PostResponse, UpvoteRequest>({
      query: ({ postId, userId }) => ({
        url: `/posts/removeUpvote/${postId}`,
        method: 'POST',
        body: { userId },
      }),
    }),
    deletePost: builder.mutation<PostResponse, string>({
      query: (postId) => ({
        url: `/posts/delete/${postId}`,
        method: 'DELETE',
      }),
    }),
    addComment: builder.mutation<PostResponse, CommentRequest>({
      query: ({ postId, content, userId }) => ({
        url: `/posts/addComment/${postId}`,
        method: 'POST',
        body: { content, userId },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetUpvotesQuery, useCreatePostMutation, useGetNewsFeedQuery, useUpvotePostMutation, useRemoveUpvoteMutation, useDeletePostMutation, useAddCommentMutation } = postApi;
