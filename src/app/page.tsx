'use client'
import Loading from '@/Components/Shared/Loading';
import React, { useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-screen flex flex-col gap-10 mt-10 items-center">
    <Loading/>
    </div>
  );
};

export default Home;
