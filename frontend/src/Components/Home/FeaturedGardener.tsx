import { gardeners } from '@/constant';
import Image from 'next/image';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import CustomContainer from '../Shared/CustomContainer';

// Sample data for featured gardeners


const FeaturedGardeners = () => {
  return (
    <div className="bg-white py-10">
      <CustomContainer>
      <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent pt-20 pb-10 ">
        Featured Gardeners
      </h1>
      <div className="flex flex-wrap justify-center">
        {gardeners.map((gardener) => (
          <div key={gardener.id} className="w-80 p-4 m-4 bg-background-dark rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex items-center">
              <Image
                src={gardener.profileImage}
                alt={`${gardener.name}'s profile`}
                className="w-20 h-20 rounded-full border-2 border-x-border-focus"
                width={100}
                height={100}
              />
              {gardener.isVerified && (
                <span className="ml-2 text-text-primary">
                  <FaCheckCircle/>
                   Verified
                </span>
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold ">{gardener.name}</h3>
            <p className="text-text-primary mt-2">{gardener.bio}</p>
          </div>
        ))}
      </div>
      </CustomContainer>
    </div>
  );
};

export default FeaturedGardeners;
