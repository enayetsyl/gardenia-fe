'use client';
import { useState } from 'react';
import Modal from 'react-modal';
import CardBone from '../Shared/CardBone';
import CustomButton from '../Shared/CustomButton';
import userImage from '../../../public/user-profile-image-1.webp';
import Image from 'next/image';

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null);

  // Handler for opening and closing modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handler for file upload
  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    setMedia(file);
  };

  // Handler for post submission
  const handlePostSubmit = () => {
    console.log('Post content:', postContent);
    console.log('Media:', media);
    // Add logic to handle post submission (e.g., saving to database)
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Initial Input Field */}
      <CardBone>
        <div className="flex justify-start items-center gap-3 mb-5">
          <Image
            src={userImage}
            alt="User Profile Image"
            width={40}
            height={30}
            className="rounded-[50%] h-10 w-10 border-2 border-border-focus border-solid"
          />
          <div
            onClick={handleOpenModal}
            className="bg-gray-100 p-2 rounded-3xl cursor-pointer  text-gray-500 flex-1"
          >
            What's on your mind?
          </div>
        </div>
        <hr className="text-slate-800" />
        <div className="flex justify-center items-center gap-5 pt-3">
          <CustomButton
            text="Image"
            type="button"
            onClick={handleOpenModal}
            className="px-10 py-2 hover:bg-gray-300 rounded-lg  text-gray-500"
          />
          <CustomButton
            text="Video"
            type="button"
            onClick={handleOpenModal}
            className="px-10 py-2 hover:bg-gray-300 rounded-lg  text-gray-500"
          />
          <CustomButton
            text="Audio"
            type="button"
            onClick={handleOpenModal}
            className="px-10 py-2 hover:bg-gray-300 rounded-lg  text-gray-500"
          />
        </div>
      </CardBone>

      {/* Modal for Post Creation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-center">Create Post</h2>
            <button onClick={handleCloseModal} className="text-gray-500">
              X
            </button>
          </div>

          {/* Post Content Input */}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-border"
          ></textarea>

          {/* Media Upload Section */}
          <div className="mt-4">
            <label
              htmlFor="media-upload-input"
              className="flex items-center cursor-pointer text-primary"
            >
              <span className="mr-2">Upload Photo/Video</span>
              <input
                id="media-upload-input"
                type="file"
                accept="image/*, video/*, audio/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Display Media Preview */}
          {media && (
            <p className="mt-2 text-sm text-gray-600">
              Uploaded File: {media.name}
            </p>
          )}

          {/* Submit Button */}
          <CustomButton
            onClick={handlePostSubmit}
            text="Post"
            type="button"
            className="px-10 py-2 w-full bg-button-bg text-button-text hover:bg-button-hover rounded-lg mt-5 "
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
