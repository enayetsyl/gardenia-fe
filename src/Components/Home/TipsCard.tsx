import './TipsCard.css';
import Image from 'next/image';
import { GardeningTip } from '@/type';

const TipsCard = ({ imageLink, frontheading, backDetails }: GardeningTip) => {
  return (
    <div className="w-full">
      <div className="flip-card w-full !min-h-[260px] h-[260px]">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="w-full h-[50%] overflow-hidden rounded-t-[14px]">
              <Image
                src={imageLink}
                alt="Gardening Tip"
                className="w-full h-full object-cover"
                height={600}
                width={500}
              />
            </div>
            <p className="title pt-7">Gardening Tip</p>
            <p className="text-sm pt-0.5 italic opacity-75 text-black">
              {frontheading}
            </p>
          </div>
          <div className="flip-card-back p-4">
            <p className="title pt-2">Tip Details</p>
            <p className="text-sm pt-1 px-1 text-justify">{backDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsCard;
