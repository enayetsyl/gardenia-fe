import { gardeningTips } from '@/constant';
import TipsCard from './TipsCard';
import CustomContainer from '../Shared/CustomContainer';
import SeeMoreButton from './SeeMoreButton';
import Link from 'next/link';

const GardeningTips = () => {
  return (
    <div>
      <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10">
        Gardening Tips
      </h1>

      <CustomContainer>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gardeningTips.map((tip) => (
            <TipsCard
              key={tip.frontheading}
              imageLink={tip.imageLink}
              frontheading={tip.frontheading}
              backDetails={tip.backDetails}
            />
          ))}
        </div>

        <div className="flex justify-center py-10">
          <Link href="/news-feed">
            <SeeMoreButton text="Explore Tips" />
          </Link>
        </div>
      </CustomContainer>
    </div>
  );
};

export default GardeningTips;
