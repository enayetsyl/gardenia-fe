'use client';
import CardBone from '@/Components/Shared/CardBone';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '@/Components/Shared/CustomButton';
import Modal from 'react-modal';
import followerImage1 from '../../../../public/user-profile-image-1.webp';
import followerImage2 from '../../../../public/user-profile-image-2.jpg';
import followerImage3 from '../../../../public/user-profile-image-3.jpg';

// Dummy data for followers
const followersData = [
  { name: 'Digontha Das', photo: followerImage1 },
  { name: 'নাঈম মুক্তাকিম', photo: followerImage2 },
  { name: 'Al Emran', photo: followerImage3 },
  { name: 'Md Robiul Munshi', photo: followerImage1 },
  { name: 'Golam Morshed', photo: followerImage2 },
  { name: 'Jabir Ahmed', photo: followerImage3 },
  { name: 'MD Mahamudul Hasan', photo: followerImage1 },
  { name: 'Shajahan Ahmed', photo: followerImage2 },
  { name: 'Azim Sumon', photo: followerImage3 },
];

const Followers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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

  return (
    <div>
      <CardBone>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Followers</h1>
          <CustomButton
            text="See All Followers"
            type="button"
            onClick={handleOpenModal}
            className="text-primary-light text-lg"
          />
        </div>
        <p className="text-sm text-gray-500 mb-2">361 followers</p>
        <div className="grid grid-cols-3 gap-2 h-full">
          {followersData.slice(0, 6).map((follower, index) => (
            <div
              key={index}
              className="rounded-xl border p-2 bg-background hover:bg-gray-100 cursor-pointer flex flex-col items-start "
            >
              <Image
                src={follower.photo}
                alt={follower.name}
                width={150}
                height={150}
                className="rounded-lg object-cover flex-1"
              />
              <p className="text-xs text-start mt-2 font-semibold">
                {follower.name}
              </p>
            </div>
          ))}
        </div>
      </CardBone>

      {/* Modal to display all followers */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="All Followers"
        className="fixed inset-0 flex items-center justify-center p-10 bg-black bg-opacity-50 z-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-30"
      >
        <div className="relative bg-white p-6 rounded-lg max-w-3xl w-full h-[90vh] overflow-y-auto">
          <FaTimes
            className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer z-40"
            onClick={handleCloseModal}
          />
          <h2 className="text-xl font-bold mb-4">All Followers</h2>
          <div className="grid grid-cols-3 gap-4 py-4">
            {followersData.map((follower, index) => (
              <div
                key={index}
                className="rounded-xl border p-2 bg-background hover:bg-gray-100 cursor-pointer flex flex-col items-start "
              >
                <Image
                  src={follower.photo}
                  alt={follower.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover flex-1"
                />
                <p className="text-xs text-start mt-2 font-semibold">
                  {follower.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Followers;
