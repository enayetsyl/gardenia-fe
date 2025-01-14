import React from 'react';

const FavoriteButton = ({
  onClick,
  favorites,
  isFavorited,
  isLoading,
}: {
  onClick: () => void;
  favorites: number;
  isFavorited: boolean;
  isLoading: boolean;
}) => {
  return (
    <div
      className={`overflow-x-visible relative w-10 h-10 overflow-y-clip group text-center ${
        isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={onClick}
    >
      {isFavorited ? (
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-button-bg transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      ) : (
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-button-bg transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      )}
      <div className="absolute text-black font-bold -bottom-10 left-1/2 text-xs text-center whitespace-nowrap transition-all duration-300 transform -translate-x-1/2 group-hover:bottom-0">
        Favorite ({favorites})
      </div>
    </div>
  );
};

export default FavoriteButton;
