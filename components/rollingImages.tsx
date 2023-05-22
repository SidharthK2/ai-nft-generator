import React from "react";

export const RollingImages = () => {
  return (
    <div className="flex items-center justify-center h-56 p-2 my-8 gap-10">
      <img
        className="outline outline-8 rounded-3xl bg-slate-200 -rotate-12 p-1"
        src="/assets/rainbowpuke.png"
        alt="puke"
        width={200}
      />
      <img
        className="outline outline-8 rounded-3xl bg-slate-200 -translate-y-6 p-1"
        src="/assets/pepe.png"
        alt="pepe"
        width={200}
      />
      <img
        className="outline outline-8 rounded-3xl bg-slate-200 rotate-12 p-1"
        src="/assets/icecream.png"
        alt="icecream"
        width={200}
      />
    </div>
  );
};
