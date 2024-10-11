import Image from 'next/image'
import coverImage from '../../../../public/user-dashboard.webp'
import { User } from '@/type';
import CustomContainer from '@/Components/Shared/CustomContainer';
import Followers from '@/Components/MyProfile/ProfileInfo/Followers';
import FavoritePosts from '@/Components/MyProfile/ProfileInfo/FavoritePosts';
import ProfilePhotos from '@/Components/MyProfile/ProfileInfo/ProfilePhotos';
import UserContent from './UserContent';

const UserDashboard = ({user}: {user: User}) => {
  return (
    <div>
      <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          alt="cover image"
          src={coverImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-5 py-2.5 rounded-md dropDown">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
            Welcome {user?.name}
          </h1>
        </div>
      </div>
      <CustomContainer>
        <div className="grid grid-cols-12 gap-5 py-10">
          <div className="col-span-12 lg:col-span-5">
          <div className="space-y-3">
      <Followers></Followers>
      <FavoritePosts></FavoritePosts>
      <ProfilePhotos></ProfilePhotos>
    </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <UserContent />
          </div>
        </div>
      </CustomContainer>
      
    </div>
  )
}

export default UserDashboard
