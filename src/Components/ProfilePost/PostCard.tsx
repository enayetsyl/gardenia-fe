'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import CardBone from '../Shared/CardBone';
import CustomInput from '../Shared/CustomInput';
import CustomButton from '../Shared/CustomButton';
import Link from 'next/link';
import LikeButton from '../Shared/LikeButton';

interface PostCardProps {
  userImage: string;
  userName: string;
  postTime: string;
  category: string;
  content?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  link?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  userImage,
  userName,
  postTime,
  category,
  content,
  media,
  link
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <CardBone>
        <div className=" p-4 mb-4">
        <div className="flex items-center mb-4">
          <Image src={userImage} alt={userName} width={40} height={40} className="rounded-full mr-3" />
          <div>
            <h3 className="font-bold">{userName}</h3>
            <div className="text-sm text-gray-500">
              {postTime} · {category}
            </div>
          </div>
        </div>
        
        <p className="mb-4">{content}</p>
        
        {media && (
          <div className="mb-4">
            {media.type === 'image' ? (
              <Image src={media.url} alt="Post media" width={500} height={300} className="rounded-lg" />
            ) : (
              <video src={media.url} controls className="w-full rounded-lg" />
            )}
          </div>
        )}
        
        {link && (
          <Link href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 block">
            {link}
          </Link>
        )}
        
        <div className="flex space-x-4 mb-4">
          <LikeButton 
          onClick={handleLike} 
          likes={likes}
          />
          {/* <button onClick={handleLike} className="flex items-center text-gray-500 hover:text-blue-500">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Like ({likes})
          </button> */}
          <button className="flex items-center text-gray-500 hover:text-blue-500">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Comment
          </button>
        </div>
        
        <div className="mb-4">
          {comments.map((comment, index) => (
            <p key={index} className="text-sm text-gray-700 mb-2">{comment}</p>
          ))}
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
      </div>
      
      </CardBone>
  );
};

export default PostCard;