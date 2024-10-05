'use client'

import { useRouter } from "next/navigation";
import CustomButton from "../Shared/CustomButton";
import CustomContainer from "../Shared/CustomContainer";

const PricingCard = () => {
  const router = useRouter();

  const handleVerifyClick = () => {
    router.push('/payment');
  };
  return (
  <div className="bg-background p-6 rounded-lg shadow-md">
    <h2 className="text-h2 lg:text-h2-lg font-bold text-primary mb-2">$5</h2>
    <p className="text-text-secondary mb-4">
      one-time verification fee
    </p>
    <p className="text-text-secondary mb-4">
      Unlock premium content and get a verified badge on your profile.
    </p>
    <p className="font-semibold text-primary mb-4">Verify once, enjoy premium benefits forever.</p>
    <CustomButton
    text="Verfiy Your Account"
    type="button"
    className="w-full bg-button-bg text-button-text hover:bg-button-hover py-2 px-4"
    onClick={handleVerifyClick}
    />
 
  </div>
)}

const FeatureItem = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center mb-8 lg:mb-0">
    <span className="text-3xl mb-2">{icon}</span>
    <h3 className="text-h3 lg:text-h3-lg font-semibold text-primary mb-2">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);

const PricingSection: React.FC = () => {
  return (
    <section className="bg-background-dark mx-auto px-4 py-12 rounded-lg shadow-2xl">
       <CustomContainer>
      <div className="lg:flex lg:items-start lg:space-x-8">
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <PricingCard />
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-h2 lg:text-h2-lg font-bold text-primary mb-4">Unlock Premium Gardening Content</h2>
          <p className="text-text-secondary mb-6">
            Verify your account to access exclusive gardening tips, guides, and premium content. Share your expertise and gain recognition in our community.
          </p>
          <p className="text-text-secondary mb-8">
            Verification is a one-time process that grants you lifetime access to premium features and a verified badge on your profile.
          </p>
        </div>
      </div>
      <div className="lg:flex lg:justify-between pt-20">
        <FeatureItem 
          icon="🌱"
          title="Contribute for Free"
          description="Start by sharing your gardening knowledge. Create posts and interact with the community without any cost."
        />
        <FeatureItem 
          icon="⭐"
          title="Get Upvotes"
          description="Earn at least one upvote on your posts to become eligible for verification and premium access."
        />
        <FeatureItem 
          icon="🏅"
          title="Verify and Unlock"
          description="Pay a one-time fee to verify your account, unlocking premium content and receiving a verified badge."
        />
      </div>
   </CustomContainer>
    </section>
  );
};

export default PricingSection;