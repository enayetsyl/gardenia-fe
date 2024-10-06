const SeeMoreButton = ({text} : {text: string}) => {
  return (
    <div>
      <button className="border text-text-light duration-300 relative group cursor-pointer overflow-hidden h-16 w-48 rounded-md bg-primary-dark p-2 font-extrabold hover:bg-primary">
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-secondary"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-secondary-dark"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-primary-light"></div>
        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-primary"></div>
        <p className="z-10 absolute bottom-2 left-2">{text}</p>
      </button>
    </div>
  )
}

export default SeeMoreButton