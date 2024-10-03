import React from 'react';
import { CustomButtonProps } from '@/type';

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded transition duration-800 disabled:bg-gray-400 hover:animate-button-hover cursor-pointer flex items-center justify-center ${className}`}
    >
      {icon && <span className={text ? 'mr-2' : ''}>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default CustomButton;
