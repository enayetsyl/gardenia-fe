import React, { useState } from 'react';
import Image from 'next/image';

interface ImageToggleProps {
  src: string;
  alt: string;
  size?: number;
}

const ImageToggle: React.FC<ImageToggleProps> = ({ src, alt, size = 100 }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="image-toggle" style={{ width: size, height: size }}>
      <input
        type="checkbox"
        checked={isToggled}
        onChange={() => setIsToggled(!isToggled)}
        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />
      <span className={`button ${isToggled ? 'toggled' : ''}`}>
        <Image src={src} alt={alt} width={size * 0.8} height={size * 0.8} className="rounded-full" />
      </span>
    </div>
  );
};

export default ImageToggle;