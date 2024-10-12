import React from 'react';

const StatCard = ({ text1, data1, text2, data2 }: { text1: string, data1: number, text2: string, data2: number }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-2 grid-cols-1 px-3 w-full">
      <div
        className="group w-full rounded-lg bg-primary p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_theme(colors.secondary.DEFAULT)]"
      >
        <p className="text-text-light text-2xl">{data1}</p>
        <p className="text-text-light text-sm">{text1}</p>
      </div>

      <div
        className="group w-full rounded-lg bg-secondary-dark p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_theme(colors.primary.light)]"
      >
        <p className="text-text-light text-2xl">{data2}</p>
        <p className="text-text-light text-sm">{text2}</p>
      </div>
    </div>
  );
};

export default StatCard;
