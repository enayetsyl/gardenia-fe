'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiCamera } from 'react-icons/fi';
import profilePhoto1 from '../../../public/user-profile-image-1.webp';
const ProfileImage = () => {
  const [profilePhoto, setProfilePhoto] = useState(profilePhoto1); // Default profile photo URL

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfilePhoto(reader.result as unknown as StaticImageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-32 h-32   ">
      {/* Profile Photo */}
      <Image
        src={profilePhoto}
        alt="Profile Photo"
        layout="fill"
        objectFit="cover"
        className="w-32 h-32 rounded-full  border-4 border-white "
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
