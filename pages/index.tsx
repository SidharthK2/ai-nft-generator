import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AI NFT Generator App</title>
        <meta content="Generate custom NFTs using AI" name="description" />
        <link href="/ape.png" rel="icon" />
      </Head>

      <main>
        <div>Hi There!</div>
        <ConnectButton />
      </main>

      <footer>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
