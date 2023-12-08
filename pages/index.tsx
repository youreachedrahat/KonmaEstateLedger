import HomeListings from "@/components/HomeListings";
import Hero from "@/components/Hero";
import MarketPlace from "../components/MarketPlace";
import { useWallet } from "@meshsdk/react";
import GlowingBlob from "../components/GlowingBlob";
import Maps from "../components/Maps";
import CommunityBoard from "../components/CommunityBoard";

export default function Home() {
  const { connected } = useWallet();

  return (
    <>
      <div className="z-10 relative">
        <Hero />
        <div className="w-[80%] mb-5 mx-auto">
          <h2 className="text-white text-center font-semibold text-5xl leading-loose uppercase tracking-wide">
          Global Minting
        </h2>
        <Maps />
        </div>
        <HomeListings />
        <CommunityBoard />
        {connected ? <MarketPlace /> : <></>}
      </div>

      <GlowingBlob />
    </>
  );
}
