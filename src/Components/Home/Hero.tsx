import Image from 'next/image';
import heroImage from '../../../public/heroImage.webp';
import Link from 'next/link';
const Hero = () => {
  return (
    <div>
      <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          alt="A vibrant garden setup with plants, flowers, and gardening tools"
          src={heroImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-5 py-2.5 rounded-md dropDown">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
          Grow Your Knowledge, Grow Your Garden.
          </h1>
        </div>
        <Link href='/login' className='absolute bottom-2 lg:bottom-10 left-1/2 transform -translate-x-1/2 bg-secondary-dark hover:bg-secondary text-button-text px-10 py-3 rounded-lg font-semibold'>
        Get Started
        </Link>
       
      </div>
    </div>
  )
}

export default Hero

