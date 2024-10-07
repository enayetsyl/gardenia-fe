'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiCamera } from 'react-icons/fi';
import { StaticImageData } from 'next/image';
import { useUser } from '@/hooks/user.hook';
import { useUploadUserImageMutation } from '@/lib/api/userApi';
import toast from 'react-hot-toast';

const ProfileImage = () => {
  const { user } = useUser(); 
  const [profilePhoto, setProfilePhoto] = useState<StaticImageData | string>(user?.userImage || '');
  const [uploadUserImage] = useUploadUserImageMutation();


  const handleProfilePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    

    if (!file || !user?._id) {
        toast.error('Please select a file and login to upload');
        return;
    }

    try {
        
        const result = await uploadUserImage({ userId: user._id as string, image: file }).unwrap();

        if (result?.data?.user?.userImage) {
            setProfilePhoto(result.data.user.userImage);
            toast.success('Profile photo updated successfully');
        } else {
            toast.error('Failed to update profile photo');
        }
    } catch (error) {
      toast.error('Failed to upload image:');
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
        className="rounded-full border-4 border-white object-cover"
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
