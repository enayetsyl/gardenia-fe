import { ReactNode } from 'react';

export type CustomInputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
};

export type CustomButtonProps = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export type APIError = {
  success: boolean;
  message: string;
  errorSources: ErrorSource[];
  err: Err;
  stack: string;
};

export type ErrorSource = {
  path: string;
  message: string;
};

export type Err = {
  statusCode: number;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type ForgetPasswordProps = {
  email: string;
};
