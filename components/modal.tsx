import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { abi, address } from "../constants";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, url }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const { address: userAddress } = useAccount();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: address,
    abi: abi,
    functionName: "safeMint",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || !url) {
      alert("Please ensure all fields are filled!");
      return 0;
    }
    setIsMinting(true);
    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: JSON.stringify(url),
    });
    const { IpfsHash: imgHash } = await response.json();
    const metadata = {
      url: `ipfs://${imgHash}`,
      name,
      description,
    };
    const pinRes = await fetch("/api/uploadMetadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });
    const { IpfsHash: metadataHash } = await pinRes.json();
    const tokenUri = `ipfs://${metadataHash}`;
    console.log(tokenUri);
    if (userAddress) {
      write({
        args: [userAddress, tokenUri],
      });
    }
    setIsMinting(isLoading);
  };

  return !isSuccess && !isLoading ? (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "invisible"
      }`}>
      <div className="space-y-2 outline-2 outline bg-gradient-to-r from-sky-400 to-cyan-300 p-6 rounded shadow-lg">
        <h2 className="text-3xl mb-4">Let's Mint!</h2>
        <img
          className="rounded-lg outline outline-2"
          src={url}
          alt="selected nft"
        />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xl block mb-2">
              What should we call it?
            </label>
            <input
              type="text"
              className="border rounded-lg w-full px-3 py-2"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-xl block mb-2">
              Describe it a little bit...
            </label>
            <input
              type="text"
              className="border rounded-lg w-full px-3 py-2"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button
            disabled={isMinting || !write}
            type="submit"
            className="disabled:opacity-50 enabled:active:scale-95 enabled:hover:bg-opacity-80 text-xl px-4 py-2 bg-blue-500 text-white rounded">
            {isMinting ? "Minting..." : "Mint"}
          </button>
          {!isMinting && (
            <button
              className="active:scale-95 hover:opacity-80 px-4 py-2 bg-red-500 text-white rounded ml-2"
              onClick={onClose}>
              Close
            </button>
          )}
        </form>
      </div>
    </div>
  ) : (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "invisible"
      }`}>
      <div className="space-y-2 outline-2 outline bg-gradient-to-r from-sky-400 to-cyan-300 p-6 rounded shadow-lg">
        <h2 className="text-3xl mb-4">NFT Minted!! 🎉🎉</h2>
        <img
          className="rounded-lg outline outline-2"
          src={url}
          alt="selected nft"
        />
        <Link href={`https://testnets.opensea.io/collection/aitoken-1`}>
          {"Click to view your NFT!! 🔥🔥"}
        </Link>
        {!isMinting && (
          <button
            className=" active:scale-95 hover:opacity-80 px-4 py-2 bg-red-500 text-white rounded ml-2"
            onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};
