'use client';
import React from 'react';
import CoverPhotoSection from './CoverPhotoSection';
import ProfileImage from './ProfileImage';
import CustomContainer from '../Shared/CustomContainer';
import CustomButton from '../Shared/CustomButton';
import VerifiedButton from './VerifiedButton';
import { useUser } from '@/hooks/user.hook';
import { useGetUpvotesQuery } from '@/lib/api/postApi';

const ProfileHeader = () => {
  const { user } = useUser();
  const { data : upvotes } = useGetUpvotesQuery(user?._id as string);
  console.log('upvotes', upvotes);
  console.log('user', user);
  return (
    <div>
      <CoverPhotoSection />
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 py-10">
          <div className="flex flex-col lg:flex-row justify-start items-center gap-10">
            <ProfileImage />
            <h2 className="font-bold text-h2 lg:text-h2-lg">{user?.name}</h2>
          </div>

          <div>
            {user?.isVerified && (
              <VerifiedButton />
            ) }
            {
              upvotes?.data && !user?.isVerified  && (
                <CustomButton
                text="Verify Profile"
                // onClick={() => {}}
                type="button"
                className="bg-button-bg text-button-text px-4 py-2 hover:bg-button-hover"
              />
              )
            }
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ProfileHeader;
