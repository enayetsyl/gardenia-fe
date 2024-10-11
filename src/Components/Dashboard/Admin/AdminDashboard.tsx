import Image from 'next/image'
import adminDashboard from '../../../../public/admin-dashboard.webp'
import { User } from '@/type';

const AdminDashboard = ({user}: {user: User}) => {
  return (
    <div>
      <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          alt="cover image"
          src={adminDashboard}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-5 py-2.5 rounded-md dropDown">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
      </div>
      User Dashboard
    </div>
  )
}

export default AdminDashboard
