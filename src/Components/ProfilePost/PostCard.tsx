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

interface PostCardProps {
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
}

const PostCard: React.FC<PostCardProps> = ({
  userImage,
  userName,
  postTime,
  category,
  content,
  title,
  media,
  link,
  isPremium,
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [favorites, setFavorites] = useState(0);
  const handleLike = () => {
    setLikes(likes + 1);
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
          <LikeButton onClick={handleLike} likes={likes} />
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
