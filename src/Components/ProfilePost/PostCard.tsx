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
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/lib/api/postApi';
import { useUser } from '@/hooks/user.hook';
import toast from 'react-hot-toast';
import { User } from '@/type';
import CreatePost from './CreatePost';
import { useGetCurrentUserQuery } from '@/lib/api/authApi';
import {
  useFollowUserMutation,
  useGetProfilePhotosQuery,
  useUnfollowUserMutation,
} from '@/lib/api/userApi';

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
  userId: User;
  updateTime: string;
  comments: LocalComment[];
  favoritedBy: string[];
  favoriteCount: number;
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
  favoritedBy,
  favoriteCount,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { user } = useUser();
  const { refetch } = useGetNewsFeedQuery();
  const { refetch: refetchProfile } = useGetPostsQuery(user?._id as string);
  const { refetch: currentUserRefetch } = useGetCurrentUserQuery(
    user?._id as string
  );
  const { refetch: refetchNewsFeed } = useGetNewsFeedQuery();
  const { refetch: refetchProfilePhotos } = useGetProfilePhotosQuery({
    userId: user?._id as string,
  });
  const [deletePost] = useDeletePostMutation();
  const [upvotePost] = useUpvotePostMutation();
  const [removeUpvote] = useRemoveUpvoteMutation();
  const [addComment] = useAddCommentMutation();
  const [addFavorite, { isLoading: isAddingFavorite }] =
    useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemovingFavorite }] =
    useRemoveFavoriteMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const isLiked = user && upvotedBy?.includes(user?._id || '');
  const isFavorited = user && favoritedBy?.includes(user?._id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(upvoteCount);
  const [localFavoritesCount, setLocalFavoritesCount] = useState(favoriteCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [openCommentModal, setOpenCommentModal] = useState<string | null>(null);
  const [isHoveringUsername, setIsHoveringUsername] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const shouldHideContent = isPremium && (!user || !user.isVerified);

  useEffect(() => {
    if (user && user.followingId?.includes(userId._id || '')) {
      setIsFollowing(true);
    }
  }, [user, userId._id]);

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
      return;
    }
    try {
      if (isLiked) {
        await removeUpvote({ postId, userId: user._id || '' }).unwrap();
        setLocalLikeCount((prev) => prev - 1);
        refetch();
        currentUserRefetch();
        refetchProfilePhotos();
        refetchNewsFeed();
      } else {
        await upvotePost({ postId, userId: user._id || '' }).unwrap();
        setLocalLikeCount((prev) => prev + 1);
        refetch();
        currentUserRefetch();
        refetchProfilePhotos();
        refetchNewsFeed();
      }
    } catch (error) {
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
        refetchNewsFeed();
        refetchProfilePhotos();
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleCommentClick = () => {
    setIsCommentOpen(true);
  };

  const handleFavorite = async () => {
    // setFavorites(favorites + 1);
    if (!user || !postId) {
      toast.error('You must be logged in to add a post in your favorites');
      return;
    }
    try {
      if (isFavorited) {
        await removeFavorite({ postId, userId: user._id || '' }).unwrap();
        setLocalFavoritesCount((prev) => prev - 1);
        toast.success('Post removed from favorites');
        refetch();
        currentUserRefetch();
        refetchProfile();
        refetchProfilePhotos();
        refetchNewsFeed();
      } else {
        await addFavorite({ postId, userId: user._id || '' }).unwrap();
        setLocalFavoritesCount((prev) => prev + 1);
        refetch();
        currentUserRefetch();
        refetchProfile();
        refetchProfilePhotos();
        refetchNewsFeed();
        toast.success('Post added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorites:', error);
      // Optionally, show an error message to the user
    }
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
      refetchNewsFeed();
      refetchProfilePhotos();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error deleting post');
    }
  };

  const handleCommentEdit = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
    setIsCommentOpen(true);
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteComment({ postId: postId as string, commentId }).unwrap();
      toast.success('Comment deleted successfully');
      refetch();
      refetchProfile();
      refetchNewsFeed();
      refetchProfilePhotos();
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const handleCommentUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommentId || !editedCommentContent.trim()) return;

    try {
      await updateComment({
        postId: postId as string,
        commentId: editingCommentId,
        content: editedCommentContent.trim(),
      }).unwrap();
      toast.success('Comment updated successfully');
      setEditingCommentId(null);
      setEditedCommentContent('');
      refetch();
      refetchProfile();
      refetchNewsFeed();
      refetchProfilePhotos();
    } catch (error) {
      toast.error('Failed to update comment');
    }
  };

  const toggleCommentModal = (commentId: string) => {
    setOpenCommentModal((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleFollowUser = async () => {
    if (!user || !userId) {
      toast.error('You must be logged in to follow a user');
      return;
    }

    try {
      if (isFollowing) {
        await unfollowUser({
          followerId: user._id || '',
          followedId: userId._id || '',
        }).unwrap();
        refetch();
        refetchProfile();
        refetchNewsFeed();
        refetchProfilePhotos();
        toast.success(`You have unfollowed ${userName}`);
        setIsFollowing(false);
      } else {
        await followUser({
          followerId: user._id || '',
          followedId: userId._id || '',
        }).unwrap();
        refetch();
        refetchProfile();
        refetchNewsFeed();
        refetchProfilePhotos();
        toast.success(`You are now following ${userName}`);
        setIsFollowing(true);
      }
    } catch (error) {
      toast.error('An error occurred while following/unfollowing the user');
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHoveringUsername(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoveringUsername(false);
    }, 300);
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
        {shouldHideContent ? (
          <p className="text-center text-secondary-dark py-5">
            This post is premium content. Please subscribe to view this content.
          </p>
        ) : (
          <>
            <div className="">
              {media ? (
                <div className="mb-4 flex justify-center items-center">
                  {media.type === 'image' ? (
                    <div className="relative w-full aspect-video">
                      {' '}
                      {/* 16:9 aspect ratio */}
                      <Image
                        src={media.url}
                        alt="Post media"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video">
                      {' '}
                      {/* 16:9 aspect ratio */}
                      <video
                        src={media.url}
                        controls
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4 flex justify-center items-center">
                  <div className="relative w-full aspect-video bg-gray-200 rounded"></div>
                </div>
              )}
            </div>

            <p className="mb-4 h-[3rem] overflow-hidden text-ellipsis whitespace-normal">
              {content}
            </p>

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
          </>
        )}

        <div className="flex items-center mb-4">
          <Image
            src={userImage}
            alt={userName}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="font-bold cursor-pointer">{userName}</h3>
            <div className="text-sm text-gray-500">
              {postTime} · {category}
            </div>
            {isHoveringUsername && user?._id !== userId._id && (
              <div className="absolute top-full left-0 mt-1 bg-background-dark border rounded shadow-lg z-10 p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <Image
                      src={userId.userImage}
                      alt={userId.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <h3 className="font-bold">{userId.name}</h3>
                  </div>
                  <CustomButton
                    text={isFollowing ? 'Unfollow' : 'Follow'}
                    className={`px-3 py-1 ${
                      isFollowing
                        ? 'bg-secondary-dark text-white'
                        : 'bg-button-bg text-white'
                    } hover:bg-opacity-75 rounded-lg cursor-pointer`}
                    onClick={handleFollowUser}
                  />
                </div>
              </div>
            )}
          </div>
          {typeof userId === 'object' && userId._id === user?._id && (
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

        <div className="flex items-center space-x-8 mb-4">
          <LikeButton
            onClick={handleLike}
            likes={localLikeCount}
            isLiked={isLiked || false}
          />
          <CommentButton
            onClick={handleCommentClick}
            comments={comments.length}
          />
          {userId?._id !== user?._id && (
            <FavoriteButton
              onClick={handleFavorite}
              favorites={localFavoritesCount}
              isFavorited={isFavorited || false}
              isLoading={isAddingFavorite || isRemovingFavorite}
            />
          )}
        </div>

        {isCommentOpen && (
          <form
            onSubmit={
              editingCommentId ? handleCommentUpdate : handleCommentSubmit
            }
            className="flex items-center"
          >
            <CustomInput
              value={editingCommentId ? editedCommentContent : newComment}
              onChange={(e) =>
                editingCommentId
                  ? setEditedCommentContent(e.target.value)
                  : setNewComment(e.target.value)
              }
              placeholder={
                editingCommentId ? 'Edit your comment...' : 'Write a comment...'
              }
              className="flex-grow mr-2 p-2 border rounded-lg"
            />
            <CustomButton
              type="submit"
              text={editingCommentId ? 'Update' : 'Post'}
              className="bg-button-bg hover:bg-button-hover text-button-text px-4 py-2 rounded-lg"
            />
            {editingCommentId && (
              <CustomButton
                type="button"
                text="Cancel"
                onClick={() => {
                  setEditingCommentId(null);
                  setEditedCommentContent('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg ml-2"
              />
            )}
          </form>
        )}
        <div className="mt-4 space-y-3">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="flex justify-start items-start gap-2 relative"
            >
              <div className="">
                <Image
                  src={comment.userId.userImage}
                  alt={comment.userId.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow">
                <p className="font-bold">{comment.userId.name}</p>
                <p>{comment.content}</p>
              </div>
              {user?._id === comment.userId._id && (
                <div className="relative">
                  <button
                    className="text-xl font-bold"
                    onClick={() => toggleCommentModal(comment._id)}
                  >
                    ...
                  </button>
                  {openCommentModal === comment._id && (
                    <div className="absolute top-6 right-0 bg-background-dark border rounded shadow-lg z-10 p-2">
                      <ul className="flex flex-col gap-2">
                        <CustomButton
                          text="Edit"
                          className="px-5 py-2 bg-button-bg text-button-text hover:bg-button-hover rounded-lg cursor-pointer w-full"
                          onClick={() => {
                            handleCommentEdit(comment._id, comment.content);
                            toggleCommentModal(comment._id);
                          }}
                        />
                        <CustomButton
                          text="Delete"
                          className="px-5 py-2 bg-button-bg text-button-text hover:bg-button-hover rounded-lg cursor-pointer w-full"
                          onClick={() => {
                            handleCommentDelete(comment._id);
                            toggleCommentModal(comment._id);
                          }}
                        />
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </CardBone>
  );
};

export default PostCard;
