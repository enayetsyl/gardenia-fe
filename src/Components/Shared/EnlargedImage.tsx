import Image from "next/image";
import { FaSearchMinus, FaSearchPlus, FaTimes } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaExpand } from "react-icons/fa6";


const EnlargedImage = ({ image, onClose, onNext, onPrev, zoomLevel, onZoomIn, onZoomOut, onFullScreen }) => {
  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-[9999]">
      <div className="relative w-full h-full">
        {/* Top-right controls */}
        <div className="absolute top-4 right-4 flex gap-4 text-white text-2xl">
          <FaSearchPlus onClick={onZoomIn} className="cursor-pointer" />
          <FaSearchMinus onClick={onZoomOut} className="cursor-pointer" />
          <FaExpand onClick={onFullScreen} className="cursor-pointer" />
          <FaTimes onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Navigation controls */}
        <button onClick={onPrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl">
          <FaArrowLeft />
        </button>
        <button onClick={onNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl">
          <FaArrowRight />
        </button>

        {/* Image */}
        <div id="lightbox-image" className="flex justify-center items-center h-full">
          <Image
            src={image}
            alt="Enlarged"
            height={600 * zoomLevel}
            width={800 * zoomLevel}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default EnlargedImage

