import envConfig from "@/config/envConfig";
import { NewsFeed as NewsFeedType, Post } from "@/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

export interface PostResponse {
  success: boolean;
  data: Post[];
  message: string;
}

export interface SinglePostResponse {
  success: boolean;
  data: Post;
  message: string;
}

interface CommentRequest {
  postId: string;
  content: string;
  userId: string;
}

export interface NewsFeedResponse {
  success: boolean;
  data: NewsFeedType[];
  message: string;
}

export type CreatePostRequest = FormData;

interface UpvoteRequest {
  postId: string;
  userId: string;
}

export interface UpdatePostRequest {
  id: string;
  data: FormData;
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
    getUserSpecificPosts: builder.query<PostResponse, string>({
      query: (userId) => `/posts/getUserSpecificPosts/${userId}`,
    }),
    getSinglePost: builder.query<SinglePostResponse, string>({
      query: (postId) => `/posts/getSinglePost/${postId}`,
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
    addFavorite: builder.mutation<PostResponse, UpvoteRequest>({
      query: ({ postId, userId }) => ({
        url: `/posts/addFavorite/${postId}`,
        method: 'POST',
        body: { userId },
      }),
    }),
    removeFavorite: builder.mutation<PostResponse, UpvoteRequest>({
      query: ({ postId, userId }) => ({
        url: `/posts/removeFavorite/${postId}`,
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
    updatePost: builder.mutation<PostResponse, UpdatePostRequest>({
      query: ({ id, data }) => ({
        url: `/posts/update/${id}`,
        method: 'PUT',
        body: data,
        formData: true,
      }),
    }),
    deleteComment: builder.mutation<void, { postId: string; commentId: string }>({
      query: ({ postId, commentId }) => ({
        url: `/posts/delete/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
    updateComment: builder.mutation<void, { postId: string; commentId: string; content: string }>({
      query: ({ postId, commentId, content }) => ({
        url: `/posts/updateComment/${postId}`,
        method: 'PUT',
        body: { content, commentId },
      }),
    }),
    searchAndFilterPosts: builder.query<NewsFeedResponse, { search?: string; category?: string; page?: number }>({
      query: ({ search, category, page }) => ({
        url: '/posts/searchAndFilterPosts',
        params: { search, category, page },
      }),
    }),

  }),
});

export const { useGetPostsQuery, useGetUpvotesQuery, useCreatePostMutation, useGetNewsFeedQuery, useUpvotePostMutation, useRemoveUpvoteMutation, useDeletePostMutation, useAddCommentMutation, useUpdatePostMutation, useDeleteCommentMutation, useUpdateCommentMutation, useAddFavoriteMutation, useRemoveFavoriteMutation, useGetSinglePostQuery, useSearchAndFilterPostsQuery,
useGetUserSpecificPostsQuery

} = postApi;
