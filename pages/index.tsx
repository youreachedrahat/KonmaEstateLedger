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
        <Maps />
        <HomeListings />
        <CommunityBoard />
        {connected ? <MarketPlace /> : <></>}
      </div>

      <GlowingBlob />
    </>
  );
}
