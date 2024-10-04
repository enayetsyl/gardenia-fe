"use client"
import React from 'react';
import CreatePost from '../ProfilePost/CreatePost';
import PostCard from '../ProfilePost/PostCard';
import userImage from '../../../public/user-profile-image-1.webp'
import image1 from '../../../public/garden-1.jpg'
import { StaticImageData } from 'next/image';

const ProfilePostSection: React.FC = () => {
 

  const userImageSrc = typeof userImage === 'string' ? userImage : userImage.src;

  return (
    <div>
      <CreatePost />
      <div className='pt-10 space-y-5'>
      <PostCard
        userImage={userImageSrc}
        userName="John Doe"
        postTime="2 hours ago"
        category="Gardening"
        content="Delve into the fascinating world of Polymorphism in Object-Oriented Programming with my latest blog post! Explore practical examples illustrating how methods can exhibit diverse behaviors based on context, fostering versatility and efficiency in software development."
        
      />
     
      <PostCard
        userImage={userImageSrc}
        userName="John Doe"
        postTime="4 hours ago"
        category="Forestry"
        media={{
          type: 'image',
          url: image1.src
        }}
      />
      <PostCard
        userImage={userImageSrc}
        userName="John Doe"
        postTime="4 hours ago"
        category="Forestry"
       link="https://medium.com/@enayetflweb/demystifying-static-memory-in-object-oriented-programming-8482fa434985"
      />
      </div>
    </div>
  );
};

export default ProfilePostSection;
