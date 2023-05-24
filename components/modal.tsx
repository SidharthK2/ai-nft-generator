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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("name:", name);
    console.log("desc:", description);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "invisible"
      }`}>
      <div className="space-y-2 outline-2 outline bg-gradient-to-r from-sky-400 to-cyan-300 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Let's Mint!</h2>
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
            type="submit"
            className="active:scale-95 hover:bg-opacity-80 text-xl px-4 py-2 bg-blue-500 text-white rounded">
            Mint
          </button>
          <button
            className="active:scale-95 hover:opacity-80 px-4 py-2 bg-red-500 text-white rounded ml-2"
            onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};
