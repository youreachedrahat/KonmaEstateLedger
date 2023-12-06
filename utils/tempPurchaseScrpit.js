import { BasicMarketplace } from "@meshsdk/contracts";
import { KoiosProvider } from "@meshsdk/core";
import unlockScript from "../utils/unlockScript";
const tempPurchaseScrpit = async (NftObject, walletAddress, wallet) => {
  try {
    const blockchainProvider = new KoiosProvider("preprod");
    const marketplace = new BasicMarketplace({
      fetcher: blockchainProvider,
      initiator: wallet,
      network: "preprod",
      signer: wallet,
      submitter: blockchainProvider,
      percentage: 25000, // 2.5%
      owner: process.env.NEXT_PUBLIC_COMMUNITY,
    });

    const txHash = await marketplace.purchaseAsset(
      process.env.NEXT_PUBLIC_COMMUNITY,
      NftObject.unit,
      parseInt(NftObject.Price) * 1000000
    );
    if (txHash) {
      console.log("tempPurchaseScrpit txHash", txHash);
      unlockScript()
    }
  } catch (e) {
    console.log("tempPurchaseScrpit error", e);
  }
};
export default tempPurchaseScrpit;
