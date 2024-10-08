import React from 'react'

const LikeButton = ({
  onClick,
  likes,
  isLiked,
}: {
  onClick: () => void,
  likes: number,
  isLiked: boolean
}) => {
  return (
    <div
      className="overflow-x-visible relative w-10 h-10 overflow-y-clip group text-center cursor-pointer"
      onClick={onClick}
    >
      {
        isLiked ? (
          <div
        className="flex justify-center items-center w-10 h-10 rounded-full bg-button-bg transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-white "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26.463"
          height="26.647"
          viewBox="0 0 26.463 26.647"
        >
      <g id="Grupo_3793" data-name="Grupo 3793" transform="translate(1.5 1.5)">
        <path
          id="Trazado_28219"
          data-name="Trazado 28219"
          d="M7,10V24.188"
          transform="translate(-1.088 -0.541)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          id="Trazado_28220"
          data-name="Trazado 28220"
          d="M17.37,6.587l-1.182,4.871h6.893a2.365,2.365,0,0,1,2.27,3.027L22.6,23.944a2.365,2.365,0,0,1-2.27,1.7H4.365A2.365,2.365,0,0,1,2,23.282V13.823a2.365,2.365,0,0,1,2.365-2.365H7.628a2.365,2.365,0,0,0,2.116-1.312L13.823,2A3.7,3.7,0,0,1,17.37,6.587Z"
          transform="translate(-2 -2)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  </div>
    ) : (
      <div
    className="flex justify-center items-center w-10 h-10 rounded-full bg-background-dark transition-all duration-300 absolute top-0 group-hover:scale-[.60] group-hover:origin-top text-white "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26.463"
      height="26.647"
      viewBox="0 0 26.463 26.647"
    >
      <g id="Grupo_3793" data-name="Grupo 3793" transform="translate(1.5 1.5)">
        <path
          id="Trazado_28219"
          data-name="Trazado 28219"
          d="M7,10V24.188"
          transform="translate(-1.088 -0.541)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          id="Trazado_28220"
          data-name="Trazado 28220"
          d="M17.37,6.587l-1.182,4.871h6.893a2.365,2.365,0,0,1,2.27,3.027L22.6,23.944a2.365,2.365,0,0,1-2.27,1.7H4.365A2.365,2.365,0,0,1,2,23.282V13.823a2.365,2.365,0,0,1,2.365-2.365H7.628a2.365,2.365,0,0,0,2.116-1.312L13.823,2A3.7,3.7,0,0,1,17.37,6.587Z"
          transform="translate(-2 -2)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  </div>
    )
  }
  <div
    className="absolute text-black font-bold -bottom-10 left-1/2 text-xs text-center  whitespace-nowrap transition-all duration-300 transform -translate-x-1/2 group-hover:bottom-0"
  >
    Like ({likes})
  </div>
</div>

  )
}

export default LikeButton
