"use client"
import React from 'react';
import CreatePost from '../ProfilePost/CreatePost';
import PostCard from '../ProfilePost/PostCard';
import userImage from '../../../public/user-profile-image-1.webp'
import image1 from '../../../public/garden-1.jpg'
import { useUser } from '@/hooks/user.hook';
import { useGetPostsQuery } from '@/lib/api/postApi';

const ProfilePostSection: React.FC = () => {
  const {user} = useUser();
  const userImageSrc = typeof userImage === 'string' ? userImage : userImage.src;
  const {data: posts, isLoading} = useGetPostsQuery(user?._id as string);
  if (isLoading) return <div>Loading...</div>;
  console.log('user inside profile post section', user);

  // Sort posts based on updatedAt field
  const sortedPosts = posts?.data
    ? [...posts.data].sort((a, b) =>
        new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
      )
    : [];

  return (
    <div>
      <CreatePost />
      <div className='pt-10 space-y-5'>
        {sortedPosts?.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            userImage={userImageSrc}
            userName={user?.name || 'Unknown User'}
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
          />  
        ))}
      </div>
    </div>
  );
};

export default ProfilePostSection;
