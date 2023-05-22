import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount, useConnect, useEnsName } from "wagmi";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      <Head>
        <title>AI NFT Generator App</title>
        <meta content="Generate custom NFTs using AI" name="description" />
        <link href="/ape.png" rel="icon" />
      </Head>

      <main>
        <div className="text-blue-500">Hi {address || "fren"}</div>
        <ConnectButton />
      </main>

      <footer>
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
