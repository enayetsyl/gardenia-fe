import { CustomButtonProps } from '@/type';

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
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
      className={`px-4 py-2 rounded transition duration-800 disabled:bg-gray-400  hover:animate-button-hover cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
