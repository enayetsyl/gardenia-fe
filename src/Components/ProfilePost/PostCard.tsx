'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CardBone from '../Shared/CardBone';
import CustomInput from '../Shared/CustomInput';
import CustomButton from '../Shared/CustomButton';
import Link from 'next/link';
import LikeButton from '../Shared/LikeButton';
import CommentButton from '../Shared/CommentButton';
import FavoriteButton from '../Shared/FavoriteButton';
import { useUpvotePostMutation, useRemoveUpvoteMutation, useGetNewsFeedQuery } from '@/lib/api/postApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store'; // Make sure this path is correct
import { useAuth } from '@/hooks/auth.hook';
import { useUser } from '@/hooks/user.hook';

interface PostCardProps {
  postId?: string;
  userImage: string;
  userName: string;
  postTime: string;
  category: string;
  content?: string;
  title?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  link?: string;
  isPremium?: boolean;
  upvoteCount: number;
  upvotedBy: string[];
}

const PostCard: React.FC<PostCardProps> = ({
  postId,
  userImage,
  userName,
  postTime,
  category,
  content,
  title,
  media,
  link,
  isPremium,
  upvoteCount,
  upvotedBy,
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [favorites, setFavorites] = useState(0);
  const [upvotePost] = useUpvotePostMutation();
  const [removeUpvote] = useRemoveUpvoteMutation();
  const { user } = useUser();
  const {refetch}= useGetNewsFeedQuery()

  const isLiked = user && upvotedBy?.includes(user?._id);
  const [localLikeCount, setLocalLikeCount] = useState(upvoteCount);

  const handleLike = async () => {
  
    if (!user || !postId) {
      console.error('User or postId is undefined', { user, postId });
      return;
    }
    try {
      if (isLiked) {
        await removeUpvote({ postId, userId: user._id }).unwrap();
        setLocalLikeCount((prev) => prev - 1);
        refetch()
      } else {
        await upvotePost({ postId, userId: user._id }).unwrap();
        setLocalLikeCount((prev) => prev + 1);
        refetch()
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleCommentSubmit = () => {
  };

  const handleFavorite = () => {
    setFavorites(favorites + 1);
  };
  return (
    <CardBone>
      <div className=" p-4 mb-4">
        <div className="flex items-center mb-4">
          <Image
            src={userImage}
            alt={userName}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold">{userName}</h3>
            <div className="text-sm text-gray-500">
              {postTime} · {category}
            </div>
          </div>
        </div>

        <p className="mb-4">{content}</p>

        {media && (
          <div className="mb-4 flex justify-center items-center">
            {media.type === 'image' ? (
              <Image
                src={media.url}
                alt="Post media"
                width={500}
                height={300}
                className="rounded-lg"
              />
            ) : (
              <video src={media.url} controls className="w-full rounded-lg" />
            )}
          </div>
        )}

        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mb-4 block"
          >
            {link}
          </Link>
        )}

        <div className="flex justify-center items-center space-x-8 mb-4">
          <LikeButton onClick={handleLike} likes={localLikeCount} isLiked={isLiked || false} />
          <CommentButton
            onClick={handleCommentSubmit}
            comments={comments.length}
          />
          <FavoriteButton onClick={handleFavorite} favorites={favorites} />
        </div>

        <form onSubmit={handleCommentSubmit} className="flex items-center">
          <CustomInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow mr-2 p-2 border rounded-lg"
          />
          <CustomButton
            type="submit"
            text="Post"
            className="bg-button-bg hover:bg-button-hover text-button-text px-4 py-2 rounded-lg"
          />
        </form>
        <div className="mt-4">
          {comments.map((comment, index) => (
            <p key={index} className="text-sm text-gray-700 mb-2">
              {comment}
            </p>
          ))}
        </div>
      </div>
    </CardBone>
  );
};

export default PostCard;
