'use client';
import React from 'react';
import CreatePost from '../ProfilePost/CreatePost';
import PostCard from '../ProfilePost/PostCard';
import userImage from '../../../public/user-profile-image-1.webp';
import { useUser } from '@/hooks/user.hook';
import { useGetPostsQuery } from '@/lib/api/postApi';
import { User } from '@/type';
import ProfileLoader from './ProfileLoader';

const ProfilePostSection: React.FC = () => {
  const { user } = useUser();
  const userImageSrc =
    typeof userImage === 'string' ? userImage : userImage.src;
  const { data: posts, isLoading } = useGetPostsQuery(user?._id as string);
  // Sort posts based on updatedAt field
  const sortedPosts = posts?.data
    ? [...posts.data].sort(
        (a, b) =>
          new Date(b.updatedAt || 0).getTime() -
          new Date(a.updatedAt || 0).getTime()
      )
    : [];

  return (
    <div>
      <CreatePost />
      {isLoading ? (
        <div className="pt-20">
          <ProfileLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 pt-10 gap-4">
          {sortedPosts?.map((post) => (
            <PostCard
              key={post._id}
              postId={post._id}
              userImage={userImageSrc}
              userName={user?.name || 'Unknown User'}
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
              userId={post.userId as unknown as User}
              updateTime={
                post.updatedAt
                  ? new Date(post.updatedAt).toLocaleString()
                  : 'Unknown Date'
              }
              comments={post.comments || []}
              favoritedBy={post.favoritedBy || []}
              favoriteCount={post.favoriteCount || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePostSection;
