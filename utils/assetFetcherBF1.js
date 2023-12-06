import axios from "axios";

const getAssetDetails = async (assetName) => {
  const assetDetailsResponse = await axios.get(`https://cardano-preprod.blockfrost.io/api/v0/assets/${assetName}`, {
    headers: {
      project_id: "preprodh8AhUcex5pgRRPgV7UvnOTsDfjnriLe3",
    },
  });
  const assetData = assetDetailsResponse.data;
  return {
    Area: assetData.onchain_metadata.Area,
    Desc: assetData.onchain_metadata.Desc,
    ImageLink: assetData.onchain_metadata.ImageLink,
    LandCoordinates: assetData.onchain_metadata.LandCoordinates,
    Location: assetData.onchain_metadata.Location,
    Name: assetData.onchain_metadata.Name,
    Owner: assetData.onchain_metadata.Owner,
    Price: assetData.onchain_metadata.Price,
    assetName: assetData.asset_name,
    fingerprint: assetData.fingerprint,
    policyId: assetData.policy_id,
    quantity: assetData.quantity,
    unit: assetData.asset,
  };
};

const assetFetcherBF1 = async (rawAssetArray) => {
  const promises = rawAssetArray.map(async (item) => {
    try {
      const assetAddressResponse = await axios.get(`https://cardano-preprod.blockfrost.io/api/v0/assets/${item.asset}/addresses`, {
        headers: {
          project_id: "preprodh8AhUcex5pgRRPgV7UvnOTsDfjnriLe3",
        },
      });

      if (assetAddressResponse.data[0]?.address === process.env.NEXT_PUBLIC_COMMUNITY) {
        return getAssetDetails(item.asset);
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error fetching asset ${item.asset}:`, error);
      return null;
    }
  });

  const assets = await Promise.all(promises);
  return assets.filter(asset => asset !== null);
};

export default assetFetcherBF1;
