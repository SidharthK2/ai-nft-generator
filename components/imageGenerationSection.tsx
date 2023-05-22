import React, { useState } from "react";

export const ImageGenerationSection = () => {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div className="w-full max-w-lg m-auto bubblesFont mt-12">
      <form className="bg-sky-300 shadow-md rounded-xl p-2 m-2">
        <div className="mb-4 text-center">
          <label
            className="block text-slate-700 text-xl font-bold mb-2"
            htmlFor="username">
            Enter Prompt
          </label>
          <input
            className="bg-slate-200 text-2xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="A Bored Ape playing bass on Moon"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Generate!
          </button>
        </div>
      </form>
    </div>
  );
};
