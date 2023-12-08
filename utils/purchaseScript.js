import { Transaction, BrowserWallet, KoiosProvider } from "@meshsdk/core";
import unlockScript from "../utils/unlockScript";

async function sendLovelaceToEscrow(wallet, escrowAddress, lovelaceAmount) {
  const tx = new Transaction({ initiator: wallet }).sendLovelace(
    escrowAddress,
    lovelaceAmount.toString()
  );
  const unsignedTx = await tx.build();
  const signedTx = await wallet.signTx(unsignedTx, false);
  return wallet.submitTx(signedTx);
}

async function sendNFTFromEscrow(wallet, userWalletAddress, nftObject) {
  const tx = new Transaction({ initiator: wallet }).sendAssets(
    userWalletAddress,
    [
      {
        unit: nftObject.unit,
        quantity: "1",
      },
    ]
  );
  const unsignedTx = await tx.build();
  const signedTx = await wallet.signTx(unsignedTx);
  return wallet.submitTx(signedTx);
}

async function purchaseScript(NftObject,wallet) {
  try {
    const koiosProvider = new KoiosProvider("preprod");
    const wallet = await BrowserWallet.enable("nami");

    // Sending Price amount to Escrow Wallet
    const lovelaceAmount = parseInt(NftObject.Price) * 1000000;
    const escrowAddress = process.env.NEXT_PUBLIC_ESCORWALLET;

    const txHash1 = await sendLovelaceToEscrow(
      wallet,
      escrowAddress,
      lovelaceAmount
    );

    if (txHash1) {
      console.log("Success NFT transaction", txHash1);
      alert("Ran into Some Problem, Please Try Again after sometime")
      unlockScript(NftObject,wallet);
      // Sending NFT from Escrow Wallet to Investor's wallet
      // const userWalletAddress = (await wallet.getUsedAddresses())[0];
      // const txHash2 = await sendNFTFromEscrow(wallet, userWalletAddress, NftObject);

      // if (txHash2) {
      //   console.log("Success NFT transaction", txHash2);
      // }
    }
  } catch (err) {
    console.error(err);
  }
}

export default purchaseScript;
