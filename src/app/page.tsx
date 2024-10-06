import Hero from '@/Components/Home/Hero';
import GardeningTips from '@/Components/Home/GardeningTips';
import NewsFeed from '@/Components/Home/NewsFeed';
import Quotes from '@/Components/Home/Quotes';

const Home = () => {
  return (
    <div className="">
      <Hero/>
      <GardeningTips/>
      <NewsFeed/>
      <Quotes/> 
    </div>
  );
};

export default Home;
