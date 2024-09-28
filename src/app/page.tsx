import Counter from '@/Components/Counter';
import ResetButton from '@/Components/ResetButton';
import Result from '@/Components/Result';
import React from 'react';

const page = () => {
  return (
    <div className="w-screen flex flex-col gap-10 mt-10 items-center">
      <h1 className="text-center font-bold text-2xl text-gray-600">
        Redux Counter
      </h1>
      <div className="flex flex-col gap-4 items-center">
        <h1>Component 1</h1>
        <Counter />
        <Result />
      </div>
      <ResetButton />
    </div>
  );
};

export default page;
