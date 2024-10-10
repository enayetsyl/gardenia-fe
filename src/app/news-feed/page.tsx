'use client'
import PostCard from "@/Components/ProfilePost/PostCard"
import CustomContainer from "@/Components/Shared/CustomContainer"
import Loading from "@/Components/Shared/Loading"
import { useGetNewsFeedQuery } from "@/lib/api/postApi"
import { NewsFeed as NewsFeedType } from "@/type"
const NewsFeed = () => {
  const {data:newsFeed, isLoading: isNewsFeedLoading} = useGetNewsFeedQuery()

  const sortedNewsFeed = newsFeed?.data
  ? [...newsFeed.data].sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()) : []
  
  if(isNewsFeedLoading) return <Loading/>

  return (
    <div>
      <CustomContainer>

     
      <div className='pt-10 space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
      {sortedNewsFeed?.map((post:NewsFeedType) => {
          return (
            <PostCard
              key={post?._id}
              postId={post?._id}
              userImage={post?.userId?.userImage}
              userName={post?.userId?.name || 'Unknown User'}
              postTime={post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown Date'}
              category={post.category}
              content={post.content}
              title={post.title}
              media={post.images && post.images.length > 0 ? { type: 'image', url: post.images[0] } : undefined}
              link={post.link}
              isPremium={post.isPremium}
              upvoteCount={post.upvoteCount || 0}
              upvotedBy={post.upvotedBy || []}
              userId={post.userId}
              updateTime={post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Unknown Date'}
              comments={post.comments || []}
              favoritedBy={post.favoritedBy || []}
              favoriteCount={post.favoriteCount || 0}
            />
          );
        })}
      </div>
      </CustomContainer>
    </div>
  )
}

export default NewsFeed
