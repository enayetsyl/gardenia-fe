import ProfileHeader from '@/Components/MyProfile/ProfileHeader';
import ProfileInfo from '@/Components/MyProfile/ProfileInfo';
import ProfilePostSection from '@/Components/MyProfile/ProfilePostSection';
import CustomContainer from '@/Components/Shared/CustomContainer';
import React from 'react';

const MyProfile = () => {
  return (
    <div className="bg-background-light min-h-screen">
      <ProfileHeader />
      <CustomContainer>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-5">
            <ProfileInfo />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ProfilePostSection />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default MyProfile;
