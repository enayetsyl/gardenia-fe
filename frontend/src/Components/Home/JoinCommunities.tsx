import Link from 'next/link';
import React from 'react';
import CustomButton from '../Shared/CustomButton';
import { FaComment, FaThumbsUp, FaUserPlus } from 'react-icons/fa6';

const JoinCommunities = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background-dark py-10 lg:py-20">
      <h1 className="text-center text-h2 lg:text-h2-lg font-bold bg-gradient-heading bg-clip-text text-transparent  pb-10 ">
        Join Our Community
      </h1>
      <div className="flex flex-wrap justify-around w-full max-w-4xl">
        {/* Upvoting */}
        <div className="w-1/3 p-4 text-center">
          <div className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl pointer-events-none flex items-center justify-center">
            <FaThumbsUp className="text-green-600 text-3xl" />
          </div>
          <h3 className="mt-2 text-lg font-semibold">Upvote</h3>
          <p className="text-text-primary text-sm">
            Support and highlight the best tips!
          </p>
        </div>

        {/* Following */}
        <div className="w-1/3 p-4 text-center">
          <div className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl pointer-events-none flex items-center justify-center">
            <FaUserPlus className="text-green-600 text-3xl" />
          </div>
          <h3 className="mt-2 text-lg font-semibold">Follow</h3>
          <p className="text-text-primary text-sm">
            Stay updated with expert gardeners.
          </p>
        </div>

        {/* Commenting */}
        <div className="w-1/3 p-4 text-center">
          <div className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl pointer-events-none flex items-center justify-center">
            <FaComment className="text-green-600 text-3xl" />
          </div>
          <h3 className="mt-2 text-lg font-semibold">Comment</h3>
          <p className="text-text-primary text-sm">Share your thoughts with others.</p>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/login">
        <CustomButton
          text="Join Our Community"
          type="button"
          className="mt-6 px-8 py-3 bg-button-bg hover:bg-button-hover text-button-text  font-bold rounded "
        />
      </Link>
    </div>
  );
};

export default JoinCommunities;
