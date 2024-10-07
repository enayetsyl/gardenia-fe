import Hero from '@/Components/Home/Hero';
import GardeningTips from '@/Components/Home/GardeningTips';
import NewsFeed from '@/Components/Home/NewsFeed';
import Quotes from '@/Components/Home/Quotes';
import JoinCommunities from '@/Components/Home/JoinCommunities';
import FeaturedGardeners from '@/Components/Home/FeaturedGardener';
import SocialMediaButton from '@/Components/Home/SocialMediaButton';
const Home = () => {
  return (
    <div className="">
      <Hero/>
      <GardeningTips/>
      <NewsFeed/>
      <Quotes/> 
      <JoinCommunities/>
      <FeaturedGardeners/>
      <SocialMediaButton/>
    </div>
  );
};

export default Home;
