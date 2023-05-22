import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { abi, address } from "../constants";
import Header from "../components/Header";
import { RollingImages } from "../components/rollingImages";
import { ImageGenerationSection } from "../components/imageGenerationSection";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="bg-scroll bg-bg_img">
      <Head>
        <title>AI NFT Generator App</title>
        <meta content="Generate custom NFTs using AI" name="description" />
        <link href="/assets/ape.png" rel="icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@700&family=Shantell+Sans:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className=" min-h-screen min-w-full">
        <Header />
        <RollingImages />
        <ImageGenerationSection />
      </main>

      <footer className="text-center text-xl">
        <a
          href="https://github.com/SidharthK2"
          rel="noopener noreferrer"
          target="_blank">
          © 2023 SidharthK2
        </a>
      </footer>
    </div>
  );
};

export default Home;
