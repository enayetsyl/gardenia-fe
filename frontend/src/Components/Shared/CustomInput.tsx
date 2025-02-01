import { CustomInputProps } from '@/type';

const CustomInput: React.FC<CustomInputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  name,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      className={`px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-border-focus focus:border-border-focus ${className}`}
    />
  );
};

export default CustomInput;
