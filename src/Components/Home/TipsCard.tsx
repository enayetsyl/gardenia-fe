import './TipsCard.css';
import Image from 'next/image';
import { GardeningTip } from '@/type';

const TipsCard = ({ imageLink, frontheading, backDetails }: GardeningTip) => {
  return (
    <div className="tips-card-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className='w-full h-[50%] overflow-hidden rounded-t-[14px]'>
              <Image
                src={imageLink}
                alt="Gardening Tip"
                className="w-full h-full object-cover"
                height={600}
                width={500}
              />
            </div>
            <p className="title pt-2 bg-gradient-heading bg-clip-text text-transparent">Gardening Tip</p>
            <p className='text-sm pt-1'>{frontheading}</p>
          </div>
          <div className="flip-card-back">
            <p className="title pt-2 ">Tip Details</p>
            <p className='text-sm pt-1 px-1 text-justify'>
              {backDetails}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsCard;
