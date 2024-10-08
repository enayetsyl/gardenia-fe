import { useGetNewsFeedQuery, useGetPostsQuery } from "@/lib/api/postApi"

export const usePost = () => {
  const {data:newsFeed, isLoading:isNewsFeedLoading} = useGetNewsFeedQuery()
  return {newsFeed, isNewsFeedLoading}
  
}

