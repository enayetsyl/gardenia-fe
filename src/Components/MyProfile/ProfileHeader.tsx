import React from 'react';
import CoverPhotoSection from './CoverPhotoSection';
import ProfileImage from './ProfileImage';
import CustomContainer from '../Shared/CustomContainer';

const ProfileHeader = () => {
  return (
    <div>
      <CoverPhotoSection />
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-start items-center gap-10 py-10">
          <ProfileImage />
          <h2 className="font-bold text-h2 lg:text-h2-lg">User Name</h2>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ProfileHeader;
