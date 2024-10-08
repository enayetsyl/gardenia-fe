'use client';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import coverPhoto1 from '../../../public/cover-photo-1.jpg';
import { useUser } from '@/hooks/user.hook';
import { useUploadCoverImageMutation } from '@/lib/api/userApi';
import toast from 'react-hot-toast';

const CoverPhotoSection = () => {
  const { user, refetchUser } = useUser();
  

  const [uploadCoverImage] = useUploadCoverImageMutation();

  const [coverPhoto, setCoverPhoto] = useState<StaticImageData | string>(user?.coverImage || coverPhoto1);

  const [isEditing, setIsEditing] = useState(false);

  const handleCoverPhotoChange = async(
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user?._id) {
      toast.error('Please select a file and login to upload');
      return;
  }

  try {
    const result = await uploadCoverImage({ userId: user._id as string, image: file }).unwrap();
    if (result?.data?.coverImage) {
      setCoverPhoto(result.data.coverImage);
      await refetchUser();
      setIsEditing(false);
      toast.success('Cover photo updated successfully');
    } else {
      toast.error('Failed to update cover photo');
    }
  } catch (error) {
      toast.error('Failed to update cover photo');
    }
  };

  return (
    <div className="relative w-full h-64">
      {/* Cover Photo */}
      <Image
        src={user?.coverImage || coverPhoto}
        alt="Cover Photo"
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-md"
      />

      {/* Edit Cover Photo Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? '' : 'Edit Cover Photo'}
        </button>
      </div>

      {/* File Input for Uploading New Cover Photo */}
      {isEditing && (
        <div className="absolute bottom-4 left-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
            className="text-white"
          />
        </div>
      )}
    </div>
  );
};

export default CoverPhotoSection;
