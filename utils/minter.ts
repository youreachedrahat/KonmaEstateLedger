import { BrowserWallet, Transaction, ForgeScript } from "@meshsdk/core";
import type from "@meshsdk/core";
import { Mint, AssetMetadata } from "@meshsdk/core";
import arrayToObject from "./ArrayToObj";

interface MinterParams {
  selectedImage: Array<string>;
  selectedLabel: string;
  selectedPrice: string;
  selectedDescription: string;
  selectedLocation: string;
  selectedArea: string;
  selectedOwner: string;
  selectedNumber: string;
  selectedCoords: string;
  walletAddress: string;
  wallet: BrowserWallet;
}

async function minterModule({
  selectedImage,
  selectedLabel,
  selectedPrice,
  selectedDescription,
  selectedLocation,
  selectedArea,
  selectedOwner,
  selectedNumber,
  selectedCoords,
  walletAddress,
  wallet,
}: MinterParams): Promise<string> {
  try {
    let TokenObject: {
      Name: string;
      Price: string;
      image: Array<string>;
      Desc: string;
      Location: string;
      Area: String;
      Owner: string;
      LandCoordinates: string;
    }[] = []; // Specifying the type explicitly here
    let counter = parseInt(selectedNumber.toString());

    // Checking NFT is single or Fractionalized
    if (selectedNumber) {
      // Price Distribution for Fractionalized NFT's ------------------------------>
      let updatedPrice =
        parseInt(selectedArea.toString()) / parseInt(selectedNumber.toString());
      let updatedArea =
        parseInt(selectedPrice.toString()) /
        parseInt(selectedNumber.toString());

      for (let i = 0; i < counter; i++) {
        let Obj = {
          Name: `${selectedLabel}_${i}`,
          Price: updatedPrice.toString(),
          image: selectedImage,
          Desc: selectedDescription,
          Location: selectedLocation,
          Area: updatedArea.toString(),
          Owner: selectedOwner,
          LandCoordinates: selectedCoords,
        };
        TokenObject.push(Obj);
      }
    } else {
      let Obj = {
        Name: `${selectedLabel}_0`,
        Price: selectedPrice.toString(),
        image: selectedImage,
        Desc: selectedDescription,
        Location: selectedLocation,
        Area: selectedArea.toString(),
        Owner: selectedOwner,
        LandCoordinates: selectedCoords,
      };
      TokenObject.push(Obj);
    }

    // Creating Recipients module for a single account holder i.e Ecsrow Holder -------------------------------->
    // Here we will create one by one NFT and transfer as there is only one use Receiver of created NFTs,
    // const networkId = 0;
    // const blockfrostKey = "BLOCKFROST_KEY_HERE";
    // const blockchainProvider = new BlockfrostProvider(blockfrostKey);

    const objOfObjs = arrayToObject(TokenObject);
    console.log(objOfObjs);

    // Creating NFT Minting Transaction -------------------------------->
    const forgingScript = ForgeScript.withOneSignature(walletAddress);
    const tx = new Transaction({ initiator: wallet });
    if (selectedNumber) {
      for (let k = 0; k < parseInt(selectedNumber); k++) {
        const recipientAddress =
        process.env.NEXT_PUBLIC_COMMUNITY || "";
        const NFTObj = TokenObject[k];
        const assetName = NFTObj.Name;
        const assetMetadata: AssetMetadata = TokenObject[k];
        const asset: Mint = {
          assetName: assetName,
          assetQuantity: "1",
          metadata: assetMetadata,
          label: "721",
          recipient: recipientAddress,
        };
        tx.mintAsset(forgingScript, asset);
      }
    } else {
      const recipientAddress =
      process.env.NEXT_PUBLIC_COMMUNITY || "";
      const NFTObj = TokenObject[0];
      const assetName = NFTObj.Name;
      const assetMetadata: AssetMetadata = TokenObject[0];
      const asset: Mint = {
        assetName: assetName,
        assetQuantity: "1",
        metadata: assetMetadata,
        label: "721",
        recipient: recipientAddress,
      };
      tx.mintAsset(forgingScript, asset);
    }

    // Finally, let's sign and submit the transaction:
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx, false);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Successful Transaction", txHash);
    return txHash;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Optionally re-throw the error if needed
  }
}

export default minterModule;