'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiCamera } from 'react-icons/fi';
import profilePhoto1 from '../../../public/user-profile-image-1.webp';
import { StaticImageData } from 'next/image';

const ProfileImage = () => {
  const [profilePhoto, setProfilePhoto] = useState<StaticImageData | string>(profilePhoto1); // Default profile photo URL

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setProfilePhoto(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-32 h-32">
      {/* Profile Photo */}
      <Image
        src={profilePhoto}
        alt="Profile Photo"
        width={128}
        height={128}
        className="rounded-full border-4 border-white"
      />

      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer z-20"
        onChange={handleProfilePhotoChange}
      />
      {/* Camera Icon */}
      <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full cursor-pointer border-2 border-gray-300 flex items-center justify-center z-20">
        <FiCamera color="#4B5563" size={16} />
      </div>
    </div>
  );
};

export default ProfileImage;
