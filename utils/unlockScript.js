import {
  Transaction,
  BrowserWallet,
  KoiosProvider,
  resolveDataHash,
} from "@meshsdk/core";
const unlockScript = async (nftObject, wallet) => {
  try {
    console.log("nftObject", nftObject.unit, wallet);
    async function _getAssetUtxo({ scriptAddress, asset, datum }) {
      const koios = new KoiosProvider("preprod");

      const utxos = await koios.fetchAddressUTxOs(scriptAddress, asset);

      const dataHash = resolveDataHash(datum);

      let utxo = utxos.find((utxo) => {
        return utxo.output.dataHash == dataHash;
      });

      return utxo;
    }

    // fetch input UTXO
    const assetUtxo = await _getAssetUtxo({
      scriptAddress: process.env.NEXT_PUBLIC_ESCORWALLET,
      asset: nftObject.unit,
      datum: "supersecret",
    });

    // get wallet change address
    const address = await wallet.getChangeAddress();

    // create the unlock asset transaction
    const tx = new Transaction({ initiator: wallet })
      .redeemValue({
        value: assetUtxo,
        script: {
          version: "V1",
          code: "4e4d01000033222220051200120011",
        },
        datum: "supersecret",
      })
      .sendValue(address, assetUtxo) // address is recipient address
      .setRequiredSigners([address]);

    const unsignedTx = await tx.build();
    // note that the partial sign is set to true
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    if (txHash) {
      console.log("Success NFT transaction 2", txHash);
    }
  } catch (e) {
    console.log("Error", e);
    alert("Error--------->", e);
  }
};
export default unlockScript;
