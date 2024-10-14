import { auth } from '@/auth';
import Image from 'next/image';
import React from 'react';
import background from '../../../public/images/homepage-bg.jpg';

const FarmerHome = async () => {
  const session = await auth();
  console.log("Session", session);

  return (
    <>
      <div className="min-h-screen bg-[#65a765] relative">
        {/* Hero Text Container */}
        <div className="flex flex-col justify-center items-center h-[30vh]">
          <h1 className="text-white text-4xl font-extrabold tracking-tight lg:text-5xl z-10">
            Turning Carbon into Capital
          </h1>
        </div>

        {/* Background Image */}
        <div className="relative w-full h-[50vh]">
          <Image
            src={background}
            alt='Background Image'
            layout="fill"
            objectFit="cover"
            className="top-0 left-0 z-0 shadow-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default FarmerHome;
