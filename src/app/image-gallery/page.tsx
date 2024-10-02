import { Gallery } from 'next-gallery';
import garden1 from '../../../public/garden-1.jpg';
import garden2 from '../../../public/garden-2.jpg';
import garden3 from '../../../public/garden-3.jpg';
import garden4 from '../../../public/garden-4.jpg';
import garden5 from '../../../public/garden-5.jpg';
import garden6 from '../../../public/garden-6.jpg';
import garden7 from '../../../public/garden-7.jpg';
import garden8 from '../../../public/garden-8.jpg';
import garden9 from '../../../public/garden-9.jpg';
import garden10 from '../../../public/garden-10.jpg';
import garden11 from '../../../public/garden-11.jpg';
import garden12 from '../../../public/garden-12.jpg';
import garden13 from '../../../public/garden-13.jpg';
import garden14 from '../../../public/garden-14.jpg';
import garden15 from '../../../public/garden-15.jpg';
import garden16 from '../../../public/garden-16.jpg';
import garden17 from '../../../public/garden-17.jpg';
import garden18 from '../../../public/garden-18.jpg';
import garden19 from '../../../public/garden-19.jpg';
import garden20 from '../../../public/garden-20.jpg';
import garden21 from '../../../public/garden-21.jpg';
import garden22 from '../../../public/garden-22.jpg';
import garden23 from '../../../public/garden-23.jpg';
import garden24 from '../../../public/garden-24.jpg';
import garden25 from '../../../public/garden-25.jpg';
import garden26 from '../../../public/garden-26.jpg';
import garden27 from '../../../public/garden-27.jpg';
import garden28 from '../../../public/garden-28.jpg';
import garden29 from '../../../public/garden-29.jpg';
import garden30 from '../../../public/garden-30.jpg';
import garden31 from '../../../public/garden-31.jpg';
import garden32 from '../../../public/garden-32.jpg';
import garden33 from '../../../public/garden-33.jpg';
import garden34 from '../../../public/garden-34.jpg';
import garden35 from '../../../public/garden-35.jpg';
import garden36 from '../../../public/garden-36.jpg';
import garden37 from '../../../public/garden-37.jpg';
import garden38 from '../../../public/garden-38.jpg';
import garden39 from '../../../public/garden-39.jpg';

const images = [
  { src: garden1, aspect_ratio: 16 / 9 },
  { src: garden20, aspect_ratio: 4 / 3 },
  { src: garden3, aspect_ratio: 9 / 16 },
  { src: garden4, aspect_ratio: 9 / 16 },
  { src: garden5, aspect_ratio: 21 / 9 },
  { src: garden6, aspect_ratio: 4 / 3 },
  { src: garden7, aspect_ratio: 4 / 3 },
  { src: garden8, aspect_ratio: 9 / 16 },
  { src: garden9, aspect_ratio: 9 / 16 },
  { src: garden10, aspect_ratio: 9 / 16 },
  { src: garden11, aspect_ratio: 9 / 16 },
  { src: garden12, aspect_ratio: 21 / 9 },
  { src: garden13, aspect_ratio: 4 / 3 },
  { src: garden14, aspect_ratio: 4 / 3 },
  { src: garden15, aspect_ratio: 4 / 3 },
  { src: garden16, aspect_ratio: 4 / 3 },
  { src: garden17, aspect_ratio: 21 / 9 },
  { src: garden18, aspect_ratio: 21 / 9 },
  { src: garden19, aspect_ratio: 9 / 16 },
  { src: garden20, aspect_ratio: 4 / 3 },
  { src: garden21, aspect_ratio: 9 / 16 },
  { src: garden22, aspect_ratio: 4 / 3 },
  { src: garden23, aspect_ratio: 21 / 9 },
  { src: garden24, aspect_ratio: 9 / 16 },
  { src: garden25, aspect_ratio: 21 / 9 },
  { src: garden26, aspect_ratio: 4 / 3 },
  { src: garden27, aspect_ratio: 4 / 3 },
  { src: garden28, aspect_ratio: 9 / 16 },
  { src: garden29, aspect_ratio: 9 / 16 },
  { src: garden30, aspect_ratio: 9 / 16 },
  { src: garden31, aspect_ratio: 9 / 16 },
  { src: garden32, aspect_ratio: 21 / 9 },
  { src: garden33, aspect_ratio: 4 / 3 },
  { src: garden34, aspect_ratio: 4 / 3 },
  { src: garden35, aspect_ratio: 4 / 3 },
  { src: garden36, aspect_ratio: 4 / 3 },
  { src: garden37, aspect_ratio: 21 / 9 },
  { src: garden38, aspect_ratio: 21 / 9 },
  { src: garden39, aspect_ratio: 9 / 16 },
];
const widths = [500, 1000, 1600];
const ratios = [2.2, 4, 6, 8];

const ImageGallery = () => {
  return (
    <div className="bg-background-dark">
      <h1 className="text-center text-h1 lg:text-h1-lg font-bold bg-gradient-heading bg-clip-text text-transparent py-20">
        Forgot Password?
      </h1>

      <div className="flex flex-col gap-5 max-w-4xl mx-auto ">
        <Gallery
          {...{ images, widths, ratios }}
          lastRowBehavior="match-previous"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
