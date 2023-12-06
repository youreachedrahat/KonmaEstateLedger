import { BasicMarketplace } from "@meshsdk/contracts";
import { BlockfrostProvider } from "@meshsdk/core";

const listAssets = async (wallet, unit, price) => {
  const blockfrostProvider = new BlockfrostProvider(
    "preprodh8AhUcex5pgRRPgV7UvnOTsDfjnriLe3"
  );
  const marketplace = new BasicMarketplace({
    fetcher: blockfrostProvider,
    initiator: wallet,
    network: "preprod",
    signer: wallet,
    submitter: blockfrostProvider,
    percentage: 25000, // 2.5%
    owner: process.env.NEXT_PUBLIC_COMMUNITY,
  });

  const sellerAddress = (await wallet.getUsedAddresses())[0];
  if (sellerAddress) {
    console.log("sellerAddress----->",sellerAddress,unit, parseInt(price));
    marketplace
      .listAsset(sellerAddress, unit, parseInt(price))
      .then((dataTx) => {
        return dataTx;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
};
export default listAssets;
