'use client';
import { useGetNewsFeedQuery } from '@/lib/api/postApi';
import CustomContainer from '../Shared/CustomContainer';
import SeeMoreButton from './SeeMoreButton';
import NewsFeedLoading from './NewsFeedLoading';
import PostCard from '../ProfilePost/PostCard';
import Link from 'next/link';
import { NewsFeed as NewsFeedType } from '@/type';

const NewsFeed = () => {
  const { data: newsFeed, isLoading: isNewsFeedLoading } =
    useGetNewsFeedQuery();

  const sortedNewsFeed = newsFeed?.data
    ? [...newsFeed.data].sort(
        (a, b) =>
          new Date(b.updatedAt || 0).getTime() -
          new Date(a.updatedAt || 0).getTime()
      )
    : [];

  return (
    <div className="bg-background-dark">
      <CustomContainer>
        <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
          News Feed
        </h1>

        <div className=" py-5">
          {isNewsFeedLoading ? (
            <div className="relative h-80 py-10">
              <NewsFeedLoading />
            </div>
          ) : (
            <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {sortedNewsFeed?.slice(0, 6).map((post: NewsFeedType) => {
                return (
                  <PostCard
                    key={post?._id}
                    postId={post?._id}
                    userImage={post?.userId?.userImage}
                    userName={post?.userId?.name || 'Unknown User'}
                    postTime={
                      post.createdAt
                        ? new Date(post.createdAt).toLocaleString()
                        : 'Unknown Date'
                    }
                    category={post.category}
                    content={post.content}
                    title={post.title}
                    media={
                      post.images && post.images.length > 0
                        ? { type: 'image', url: post.images[0] }
                        : undefined
                    }
                    link={post.link}
                    isPremium={post.isPremium}
                    upvoteCount={post.upvoteCount || 0}
                    upvotedBy={post.upvotedBy || []}
                    userId={post.userId}
                    updateTime={
                      post.updatedAt
                        ? new Date(post.updatedAt).toLocaleString()
                        : 'Unknown Date'
                    }
                    comments={post.comments || []}
                    favoritedBy={post.favoritedBy || []}
                    favoriteCount={post.favoriteCount || 0}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-center py-5">
          <Link href="/news-feed">
            <SeeMoreButton text="View More" />
          </Link>
        </div>
      </CustomContainer>
    </div>
  );
};

export default NewsFeed;
