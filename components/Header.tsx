import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div className="flex justify-between shantellFont p-2 text-2xl ">
      <div className="flex">
        <div className="text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-500 hover:scale-110">
          DALL-E NFTs
        </div>
        <div className="text-6xl px-4 hover:rotate-180">🤩</div>
      </div>
      <div className="text-lg rounded-xl">
        <ConnectButton />
      </div>
    </div>
  );
}
