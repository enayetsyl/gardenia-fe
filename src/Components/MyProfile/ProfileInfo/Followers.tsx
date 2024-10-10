'use client';
import CardBone from '@/Components/Shared/CardBone';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '@/Components/Shared/CustomButton';
import Modal from 'react-modal';
import followerImage1 from '../../../../public/user-placeholder-image.jpg';
import followerImage2 from '../../../../public/user-profile-image-2.jpg';
import followerImage3 from '../../../../public/user-profile-image-3.jpg';
import { StaticImageData } from 'next/image';
import { useUser } from '@/hooks/user.hook';
import { useGetFollowersQuery } from '@/lib/api/userApi';
import { User } from '@/type';

type Follower = {
  name: string;
  photo: StaticImageData;
};
// Dummy data for followers
const followersData: Follower[] = [
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
  const {user} = useUser();
  const {data: followers, isLoading} = useGetFollowersQuery({userId: user?._id as string});

  console.log('followers', followers);
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
        <p className="text-sm text-gray-500 mb-2 ">
          {followers?.data?.length ?? 0} followers
        </p>
        <div className="grid grid-cols-3 gap-2 h-full">
          {followers?.data?.slice(0, 6).map((follower) => (
            <div
              key={follower?._id}
              className="rounded-xl border p-2 bg-background hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center "
            >
              <Image
                src={follower?.userImage || followerImage1}
                alt={follower?.name}
                width={150}
                height={150}
                className="rounded-lg object-cover flex-1"
              />
              <p className="text-xs text-start mt-2 font-semibold">
                {follower?.name}
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
            {followers?.data?.map((follower, index) => (
              <div
                key={index}
                className="rounded-xl border p-2 bg-background hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center "
              >
                <Image
                  src={follower?.userImage || followerImage1}
                  alt={follower?.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover flex-1"
                />
                <p className="text-xs text-start mt-2 font-semibold">
                  {follower?.name}
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
