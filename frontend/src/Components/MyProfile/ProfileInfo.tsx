import React from 'react';
import Intro from './ProfileInfo/Intro';
import ProfilePhotos from './ProfileInfo/ProfilePhotos';
import Friends from './ProfileInfo/Followers';
import FavoritePosts from './ProfileInfo/FavoritePosts';

const ProfileInfo = () => {
  return (
    <div className="space-y-3">
      <Intro></Intro>
      <ProfilePhotos></ProfilePhotos>
      <Friends></Friends>
      <FavoritePosts></FavoritePosts>
    </div>
  );
};

export default ProfileInfo;
