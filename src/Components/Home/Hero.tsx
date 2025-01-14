import Image from 'next/image';
import heroImage from '../../../public/heroImage.webp';
import Link from 'next/link';
const Hero = () => {
  return (
    <div>
      <div className="relative min-h-[80vh] z-10 flex flex-col justify-center items-center">
        <Image
          alt="A vibrant garden setup with plants, flowers, and gardening tools"
          src={heroImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" />
        <div className="rounded-md dropDown z-20 flex justify-center items-center max-w-[700px] mb-12">
          <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent">
            Grow Your Knowledge, Grow Your Garden.
          </h1>
        </div>
        <Link
          href="/login"
          className="bg-secondary-dark hover:bg-secondary text-button-text px-10 py-3 rounded font-semibold z-20"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
