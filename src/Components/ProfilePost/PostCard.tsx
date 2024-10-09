'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CardBone from '../Shared/CardBone';
import CustomInput from '../Shared/CustomInput';
import CustomButton from '../Shared/CustomButton';
import Link from 'next/link';
import LikeButton from '../Shared/LikeButton';
import CommentButton from '../Shared/CommentButton';
import FavoriteButton from '../Shared/FavoriteButton';
import {
  useUpvotePostMutation,
  useRemoveUpvoteMutation,
  useGetNewsFeedQuery,
  useDeletePostMutation,
  useGetPostsQuery,
  useAddCommentMutation,
} from '@/lib/api/postApi';
import { useUser } from '@/hooks/user.hook';
import toast from 'react-hot-toast';
import { User } from '@/type';
import CreatePost from './CreatePost';
import { useGetCurrentUserQuery } from '@/lib/api/authApi';

interface LocalComment {
  _id: string;
  content: string;
  postId: string;
  userId: User;
  createdAt: string;
  updatedAt: string;
}

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
  userId: string | User;
  updateTime: string;
  comments: LocalComment[];
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
  userId,
  updateTime,
  comments,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [favorites, setFavorites] = useState(0);
  const [upvotePost] = useUpvotePostMutation();
  const [removeUpvote] = useRemoveUpvoteMutation();
  const { user } = useUser();
  const { refetch } = useGetNewsFeedQuery();
  const { refetch: refetchProfile } = useGetPostsQuery(user?._id as string);
  const [deletePost] = useDeletePostMutation();
  const [addComment] = useAddCommentMutation();
  const { refetch: currentUserRefetch} = useGetCurrentUserQuery(user?._id as string);
  const isLiked = user && upvotedBy?.includes(user?._id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(upvoteCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleLike = async () => {
    if (!user || !postId) {
      toast.error('You must be logged in to like a post');
      console.error('User or postId is undefined', { user, postId });
      return;
    }
    try {
      if (isLiked) {
        await removeUpvote({ postId, userId: user._id || '' }).unwrap();
        setLocalLikeCount((prev) => prev - 1);
        refetch();
        currentUserRefetch();
      } else {
        await upvotePost({ postId, userId: user._id || '' }).unwrap();
        setLocalLikeCount((prev) => prev + 1);
        refetch();
        currentUserRefetch();
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !postId || !newComment.trim()) {
      toast.error('You must be logged in to comment on a post');
      return;
    }

    try {
      const response = await addComment({
        postId,
        content: newComment.trim(),
        userId: user._id || '',
      }).unwrap();
      if (response.success) {
        toast.success('Comment added successfully');
        setNewComment('');
        refetch();
        refetchProfile();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const handleCommentClick = () => {
    setIsCommentOpen(true);
  };

  const handleFavorite = () => {
    setFavorites(favorites + 1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    try {
      await deletePost(postId as string);
      toast.success('Post deleted successfully');
      refetch();
      refetchProfile();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error deleting post');
    }
  };


  return (
    <CardBone>
      {isEditing && (
        <CreatePost
          isEditing={true}
          postToEdit={{
            _id: postId as string,
            title: title || '',
            content: content || '',
            category,
            isPremium: isPremium || false,
            link: link || '',
          }}
          onClose={handleCloseEdit}
        />
      )}
      <div className="p-4 mb-4 relative">
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
          {typeof userId === 'object' && userId._id === user?._id &&  (
            <div className="relative ml-auto">
              <button
                className="text-xl font-bold"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                ...
              </button>
              {isModalOpen && (
                <div
                  ref={modalRef}
                  className="absolute top-4 right-5 ml-2 bg-background-dark border rounded shadow-lg z-10 p-2"
                >
                  <ul className="flex flex-col gap-2">
                    <CustomButton
                      text="Edit"
                      className="px-5 py-2 bg-button-bg text-button-text hover:bg-button-hover rounded-lg cursor-pointer w-full"
                      onClick={handleEdit}
                    />
                    <CustomButton
                      text="Delete"
                      className="px-5 py-2 bg-button-bg text-button-text hover:bg-button-hover rounded-lg cursor-pointer w-full"
                      onClick={handleDelete}
                    />
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mb-4">{content}</p>

        {media && (
          <div className="mb-4 flex justify-center items-center">
            {media.type === 'image' ? (
              <div className="relative w-full aspect-video"> {/* 16:9 aspect ratio */}
              <Image
                src={media.url}
                alt="Post media"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>
            ) : (
              <div className="relative w-full aspect-video"> {/* 16:9 aspect ratio */}
        <video 
          src={media.url} 
          controls 
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
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
          <LikeButton
            onClick={handleLike}
            likes={localLikeCount}
            isLiked={isLiked || false}
          />
          <CommentButton
            onClick={handleCommentClick}
            comments={comments.length}
          />
          <FavoriteButton onClick={handleFavorite} favorites={favorites} />
        </div>

        {isCommentOpen && (
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
        )}
        <div className="mt-4 space-y-3">
          {comments?.map((comment, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <div className="">
                <Image
                  src={comment.userId.userImage}
                  alt={comment.userId.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-bold">{comment.userId.name}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardBone>
  );
};

export default PostCard;
