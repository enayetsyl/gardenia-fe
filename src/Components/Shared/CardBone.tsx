import { ReactNode } from 'react';

interface CardBoneProps {
  children: ReactNode;
}

const CardBone = ({ children}: CardBoneProps ) => {
  return (
    <div className="rounded-lg p-4 bg-background shadow-2xl">{children}</div>
  );
};

export default CardBone;
