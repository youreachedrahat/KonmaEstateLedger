import { useState, useEffect } from "react";
import { KoiosProvider } from "@meshsdk/core";

function useFetcher(assets) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const koiosProvider = new KoiosProvider("preprod");
  useEffect(() => {
    // Ensure the assets array is not empty
    if (!Array.isArray(assets) || assets.length === 0) {
      setError("Invalid assets array");
      return;
    }

    // Define a function to fetch metadata for a single asset
    const fetchAssetMetadata = async (asset) => {
      try {
        const response = await koiosProvider.fetchAssetMetadata(asset.unit);

        if (response) {
          console.log('response', response);
          const responseData = await response.json();
          setData([...data, response]);
          // return responseData;
        }
      } catch (error) {
        throw error;
      }
    };

    // Use Promise.all to fetch metadata for all assets in parallel
    Promise.all(assets.map((asset) => fetchAssetMetadata(asset)))
      .then((metadataArray) => {
        console.log("done", metadataArray);
        setData(...data, metadataArray);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [assets]);
  return { data, error };
}

export default useFetcher;
