import React, { ReactNode, useState } from "react";
import { Modal } from "./modal";
import { useAccount } from "wagmi";

export const ImageGenerationSection = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const { isConnected } = useAccount();

  const generateImages = async () => {
    if (!prompt) {
      alert("Enter a prompt!");
      return 0;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/generateImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
      const data = await response.json();
      console.log(data);
      setImages(data);
      console.log(images);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(prompt);
    generateImages();
  };

  const handleImageSelection = (url: string) => {
    setSelectedImage(url);
    console.log(selectedImage);
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-lg m-auto bubblesFont mt-12">
      <form
        className="bg-sky-300 shadow-md rounded-xl p-2 m-2"
        onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <label
            className="block text-slate-700 text-xl font-bold mb-2"
            htmlFor="username">
            Enter Prompt
          </label>
          <input
            className="bg-slate-200 text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="A Bored Ape playing bass on Moon"
          />
          <div className="p-2">
            <p className="p-1">
              Hint: Try to be descriptive and include stuff like the background,
              art style, etc
            </p>

            <p>
              Ex- "A happy cat chilling on a sunny tropical island in cartoon
              NFT style"
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={loading || !isConnected}
            className="group disabled:bg-blue-300 disabled:hover:bg-blue-300 bg-blue-500 hover:bg-blue-700 text-white font-bold text-2xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            {loading ? "Loading..." : "Generate!"}
            <span
              className="group-hover:opacity-80 transition-opacity bg-slate-700 px-1  text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
              {isConnected
                ? "get images"
                : "Connect your wallet to generate images"}
            </span>
          </button>
        </div>
      </form>
      {images && !loading ? (
        <div className="flex gap-4 my-4">
          {images.map((img: any, i: number) => {
            return (
              <div key={i}>
                <img
                  className="rounded-lg outline outline-4 hover:outline-4 hover:outline-blue-700 hover:cursor-pointer hover:scale-105"
                  src={`${img.url}`}
                  onClick={() => handleImageSelection(img.url)}></img>
              </div>
            );
          })}
          <Modal isOpen={modalOpen} onClose={closeModal} url={selectedImage} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
