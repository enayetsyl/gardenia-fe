'use client';
import { useUser } from '@/hooks/user.hook';
import { CreatePostRequest, useCreatePostMutation, useGetPostsQuery } from '@/lib/api/postApi';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CardBone from '../Shared/CardBone';
import CustomButton from '../Shared/CustomButton';
import userImage from '../../../public/user-profile-image-1.webp';
import Image from 'next/image';
import { FaFileAudio, FaImage, FaVideo } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';

const categories: string[] = [
  "Vegetable Gardening",
  "Flower Gardening",
  "Herb Gardening",
  "Fruit Gardening",
  "Indoor Gardening",
  "Landscaping",
  "Succulents & Cacti",
  "Container Gardening",
  "Organic Gardening",
  "Seasonal Gardening"
];

const CreatePost = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);
  const { user } = useUser(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [link, setLink] = useState('');
  const [createPost] = useCreatePostMutation();
  const {refetch} = useGetPostsQuery(user?._id || '')
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handler for image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  // Handler for post submission
  const handlePostSubmit = async () => {
    const formData = new FormData();

    // Append basic post data
    formData.append('category', category);
    formData.append('userId', user?._id || '');
    if (title.trim()) formData.append('title', title.trim());
    if (content.trim()) formData.append('content', content.trim());
    if (link.trim()) formData.append('link', link.trim());
    formData.append('isPremium', isPremium.toString());

    // Append images
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    console.log('FormData created:', formData);

    try {
      const result = await createPost(formData).unwrap();
      console.log('result', result);
      
      if(result.success) {
        setTitle('');
        setContent('');
        setImages([]);
        setCategory('');
        setIsPremium(false);
        setLink('');
        setIsModalOpen(false); 
        refetch()
        toast.success('Post created successfully');
      } else {
        toast.error('Failed to create post');
      }
      
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div>
      {/* Initial Input Field */}
      <CardBone>
        <div className="flex justify-start items-center gap-3 mb-5 pt-2">
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
            icon={<FaImage />}
            type="button"
            onClick={handleOpenModal}
            className="px-2.5 py-3 text-xl bg-primary-light hover:bg-primary rounded-lg  text-white"
          />
          <CustomButton
            icon={<FaVideo />}
            type="button"
            onClick={handleOpenModal}
            className="px-2.5 py-3 text-xl bg-primary-light hover:bg-primary rounded-lg  text-white"
          />
          <CustomButton
            icon={<FaFileAudio />}
            type="button"
            onClick={handleOpenModal}
            className="px-2.5 py-3 text-xl bg-primary-light hover:bg-primary rounded-lg  text-white"
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

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-border mb-4"
          />

          {/* Content Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-border mb-4"
          ></textarea>

          {/* Category Select */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-border mb-4"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Image Upload Section */}
          <div className="mb-4">
            <label
              htmlFor="image-upload-input"
              className="flex items-center cursor-pointer text-primary"
            >
              <span className="mr-2">Upload Images</span>
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Display Image Preview */}
          {images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600 mb-4">
              Uploaded Images: {images.map(img => img.name).join(', ')}
            </p>
          )}

          {/* Link Input */}
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Add a link"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-border mb-4"
          />

          {/* Premium Post Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="premium-checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="premium-checkbox">Premium Post</label>
          </div>

          {/* Submit Button */}
          <CustomButton
            onClick={handlePostSubmit}
            text="Post"
            type="button"
            className="px-10 py-2 w-full bg-button-bg text-button-text hover:bg-button-hover rounded-lg mt-5"
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
