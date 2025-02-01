import CardBone from '@/Components/Shared/CardBone';
import React from 'react';
import Bio from './Bio';
import IntroDetails from './IntroDetails';

const Intro = () => {
  return (
    <div>
      <CardBone>
        <h3 className="font-bold text-xl pb-2">Intro</h3>
        <Bio />
        <IntroDetails />
      </CardBone>
    </div>
  );
};

export default Intro;
