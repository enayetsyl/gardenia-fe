'use client';
import CardBone from '@/Components/Shared/CardBone';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '@/Components/Shared/CustomButton';
import Modal from 'react-modal';
import photos1 from '../../../../public/garden-1.jpg';
import photos2 from '../../../../public/garden-2.jpg';
import photos3 from '../../../../public/garden-3.jpg';
import photos4 from '../../../../public/garden-4.jpg';
import EnlargedImage from '@/Components/Shared/EnlargedImage';

function ProfilePhotos() {
  const photos = [photos1, photos2, photos3, photos4];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnlargeImageOpen, setIsEnlargeImageOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Check if the element exists before setting the app element
    const appElement = document.getElementById('__next');
    if (appElement) {
      Modal.setAppElement('#__next');
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEnlargeImage = (index: number) => {
    setCurrentImageIndex(index);
    setZoomLevel(1);
    setIsEnlargeImageOpen(true);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    setZoomLevel(1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setZoomLevel(1);
  };

  const handleFullScreen = () => {
    const element = document.getElementById('enlarge-image');
    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  return (
    <div>
      <CardBone>
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-lg">Photos</h1>
          <CustomButton
            text="See All Photos"
            type="button"
            onClick={handleOpenModal}
            className="text-primary-light text-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 h-full">
          {photos.slice(0, 3).map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              width={150}
              height={80}
              className="rounded-xl border p-4 bg-background hover:bg-gray-100 h-full w-full cursor-pointer object-cover"
              onClick={() => handleOpenEnlargeImage(index)}
            />
          ))}
        </div>
      </CardBone>

      {/* Modal to display all photos */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="All Photos"
        className="fixed inset-0 flex items-center justify-center p-10 bg-black bg-opacity-50 z-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-30"
      >
        <div className="relative bg-white p-6 rounded-lg max-w-3xl w-full h-[90vh] overflow-y-auto">
          {' '}
          {/* Set height to 90vh and make content scrollable */}
          {/* Close Icon */}
          {/* Close Icon */}
          <FaTimes
            className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer z-40"
            onClick={handleCloseModal}
          />
          <h2 className="text-xl font-bold mb-4">All Photos</h2>
          <div className="grid grid-cols-3 gap-4 py-4">
            {' '}
            {/* Added gap and padding */}
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                width={150}
                height={80}
                className="rounded-xl border p-4 bg-background hover:bg-gray-100 h-full w-full cursor-pointer object-cover"
                onClick={() => handleOpenEnlargeImage(index)} 
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* EnlargeImage to display the enlarged image */}
      {isEnlargeImageOpen  && (
        <EnlargedImage
          image={photos[currentImageIndex]}
          onClose={() => setIsEnlargeImageOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFullScreen={handleFullScreen}
          className="fixed inset-0 z-50"
        />
      )}
    </div>
  );
}

export default ProfilePhotos;
