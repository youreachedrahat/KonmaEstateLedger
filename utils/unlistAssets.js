import { BasicMarketplace } from "@meshsdk/contracts";
import { KoiosProvider } from "@meshsdk/core";

const unlistAssets = async (wallet, unit, price) => {
  const blockchainProvider = new KoiosProvider("preprod");
  const sellerAddress = process.env.NEXT_PUBLIC_ESCORWALLET;
  const marketplace = new BasicMarketplace({
    fetcher: blockchainProvider,
    initiator: wallet,
    network: "preprod",
    signer: wallet,
    submitter: blockchainProvider,
    percentage: 1000000, // 100%
    owner: sellerAddress,
  });

  const txHash = await marketplace.purchaseAsset(sellerAddress, unit, price);

  return txHash;
};
export default unlistAssets;
