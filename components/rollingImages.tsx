import React from "react";
import Image from "next/image";

export const RollingImages = () => {
  return (
    <div className="flex items-center justify-center h-fit p-4 my-6 gap-16">
      <div className="outline outline-2 rounded-xl backdrop-blur-lg -rotate-12 p-1">
        <Image
          src="/assets/rainbowpuke.png"
          alt="puke"
          height={220}
          width={200}
          objectFit="contain"
        />
      </div>
      <div className="outline outline-2 rounded-3xl backdrop-blur-lg -translate-y-6 p-1">
        <Image src="/assets/pepe.png" alt="pepe" height={200} width={200} />
      </div>
      <div className="outline outline-2 rounded-3xl backdrop-blur-lg rotate-12 p-1">
        <Image
          src="/assets/icecream.png"
          alt="icecream"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};
