import React, { FC, useState } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, url }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isMinting, setIsMinting] = useState(false);

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
    const { IpfsHash } = await response.json();
    const metadata = {
      url: `ipfs://${IpfsHash}`,
      name,
      description,
    };
    console.dir(metadata);
    const pinRes = await fetch("/api/uploadMetadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    });
    const pinData = await pinRes.json();
    console.log("mtdta: ", pinData);
  };

  return (
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
            disabled={isMinting}
            type="submit"
            className="disabled:opacity-50 enabled:active:scale-95 enabled:hover:bg-opacity-80 text-xl px-4 py-2 bg-blue-500 text-white rounded">
            {isMinting ? "Minting..." : "Mint"}
          </button>
          {/* *** {CHANGE 1 TO IS MINTING BEFORE PUSH}*** */}
          {1 && (
            <button
              className="active:scale-95 hover:opacity-80 px-4 py-2 bg-red-500 text-white rounded ml-2"
              onClick={onClose}>
              Close
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
