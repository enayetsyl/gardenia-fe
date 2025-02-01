import React from 'react'

const CommentButton = ({onClick, comments}: {onClick: () => void, comments: number}) => {
  return (
    <div
      className="overflow-x-visible relative w-10 h-10 overflow-y-clip group text-center cursor-pointer"
      onClick={onClick}
    >
      <div
        className="flex justify-center items-center w-10 h-10 rounded-full bg-button-bg transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-white"
      >
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div
        className="absolute text-black font-bold -bottom-10 left-1/2 text-xs text-center whitespace-nowrap transition-all duration-300 transform -translate-x-1/2 group-hover:bottom-0"
      >
        Comment ({comments})
      </div>
    </div>
  )
}

export default CommentButton