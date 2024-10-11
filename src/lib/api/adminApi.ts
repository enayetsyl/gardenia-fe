import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@/config/envConfig';
import Cookies from 'js-cookie';

// Define response interfaces for each of the stats
interface StatsOverviewResponse {
  success: boolean;
  data: {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
    totalPremiumContent: number;
  };
  message: string;
}

interface StatsMonthlyResponse {
  success: boolean;
  data: {
    newUsersThisMonth: number;
    newPostsThisMonth: number;
    newCommentsThisMonth: number;
    newPremiumContentThisMonth: number;
  };
  message: string;
}

interface StatsDailyResponse {
  success: boolean;
  data: {
    dailyNewUsers: { _id: string; newUsers: number }[];
    dailyNewPosts: { _id: string; newPosts: number }[];
    dailyNewComments: { _id: string; newComments: number }[];
    dailyNewPremiumContent: { _id: string; newPremiumContent: number }[];
  };
  message: string;
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseApi, // Base URL for the API
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
    getStatsOverview: builder.query<StatsOverviewResponse, void>({
      query: () => '/admin/stats/overview',
    }),
    getMonthlyStats: builder.query<StatsMonthlyResponse, void>({
      query: () => '/admin/stats/monthly',
    }),
    getDailyStats: builder.query<StatsDailyResponse, { start: string; end: string }>({
      query: ({ start, end }) => `/admin/stats/daily?start=${start}&end=${end}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetStatsOverviewQuery,
  useGetMonthlyStatsQuery,
  useGetDailyStatsQuery,
} = adminApi;
