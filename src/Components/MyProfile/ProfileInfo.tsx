import React from 'react';
import Intro from './ProfileInfo/Intro';
import ProfilePhotos from './ProfileInfo/ProfilePhotos';
import Friends from './ProfileInfo/Friends';
import LifeEvent from './ProfileInfo/LifeEvent';

const ProfileInfo = () => {
  return (
    <div className="p-4 space-y-3">
      <Intro></Intro>
      <ProfilePhotos></ProfilePhotos>
      <Friends></Friends>
      <LifeEvent></LifeEvent>
    </div>
  );
};

export default ProfileInfo;
