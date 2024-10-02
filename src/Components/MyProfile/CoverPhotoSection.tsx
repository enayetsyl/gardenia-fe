'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import coverPhoto1 from '../../../public/cover-photo-1.jpg';
import coverPhoto2 from '../../../public/cover-photo-2.jpg';
import coverPhoto3 from '../../../public/cover-photo-3.jpg';

const CoverPhotoSection = () => {
  const [coverPhoto, setCoverPhoto] = useState(coverPhoto1); // Replace with your default cover photo URL
  const [isEditing, setIsEditing] = useState(false);

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-64">
      {/* Cover Photo */}
      <Image
        src={coverPhoto}
        alt="Cover Photo"
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />

      {/* Edit Cover Photo Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? 'Cancel' : 'Edit Cover Photo'}
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
