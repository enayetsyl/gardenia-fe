import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';

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
  text?: string;
  icon?: ReactNode;
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
  id?: string;
  email: string;
};

export type ResetPasswordProps = {
  id?: string;
  token?: string;
  password: string;
};



export type GardeningTip = {
  imageLink: StaticImageData;
  frontheading: string;
  backDetails: string;
};

export type GardeningQuote = {
  quote: string;
  by: string;
}

export type Gardener = {
  id: number;
  name: string;
  bio: string;
  profileImage: StaticImageData;
  isVerified: boolean;
};

export interface NavItem {
  name: string;
  path: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  userImage: string;
  coverImage: string;
  passwordChangedAt: string;
  isVerified: boolean;
}

export type Comment = {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type Post = {
  _id?: string; 
  title?: string;
  content?: string;
  images?: string[];
  category: string;
  isPremium?: boolean;
  userId: string;
  upvoteCount?: number; 
  upvotedBy?: string[]; 
  comments?: Comment[]; 
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NewsFeed = {
  _id: string;
  title: string;
  content: string;
  images: string[];
  category: string;
  isPremium: boolean;
  userId: User;
  upvoteCount: number;
  upvotedBy: string[];
  comments: Comment[];
  link: string;
  createdAt: string;
  updatedAt: string;
}

