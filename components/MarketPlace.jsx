import { useAssets } from "@meshsdk/react";
import purchaseScript from "../utils/purchaseScript";
import tempPurchaseScrpit from "../utils/tempPurchaseScrpit";
import { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";
import { KoiosProvider } from "@meshsdk/core";

import axios from "axios";
import assetFetcherBF2 from "../utils/assetFetcherBF2";
function MarketPlace() {
  const koiosProvider = new KoiosProvider("preprod");
  const { connected, wallet, disconnect } = useWallet();
  const [NFTData, setNFTData] = useState();
  const [walletAddress, updateWalletAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const assets = useAssets();

  useEffect(() => {
    async function load() {
      updateWalletAddress(process.env.NEXT_PUBLIC_ESCORWALLET);
    }
    if (connected && walletAddress === "") {
      load();
    }
  }, [connected, walletAddress]);

  // Define a function to handle metadata requests with rate limiting
  async function handleMetadataWithBlockFrost() {
    try {
      const response = await axios.get(
        `https://cardano-preprod.blockfrost.io/api/v0/assets/policy/20d268ac20043a08ab03e3446d669929d63b33c3c6bd490a446e83d0`,
        {
          headers: {
            project_id: "preprodh8AhUcex5pgRRPgV7UvnOTsDfjnriLe3", // Replace with your actual project_id token
          },
        }
      );
      const data = await assetFetcherBF2(response.data);
      console.log("Asset Final ----->", data);
      setNFTData(data);
    } catch (error) {
      console.error("An error occurred while fetching assets:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (loading) {
      handleMetadataWithBlockFrost();
    }
  }, [loading]);

  // ---------------------------------- CSS DESIGN --------------------------------------------//
  const CardStyle = {
    height: "auto",
    width: "250px",
    backgroundColor: "#D8B4F8",
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Adding a subtle box shadow
    display: "flex",
    flexDirection: "column", // Making the card content stack vertically
    padding: "20px", // Adding some padding to the card content
  };

  const CardaWrapper = {
    height: "auto",
    width: "96%",
    display: "grid",
    gridTemplateColumns: "auto auto auto auto",
    borderRadius: "15px",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center", // Centering the grid items horizontally
    gap: "30px 20px", // Adding spacing between grid items
    padding: "50px", //
  };

  const DetailsStyle = {
    padding: "10px",
  };

  const DetailItemStyle = {
    margin: "10px 5px",
    marginTop: "10px",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#555",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
    backgroundColor: "#E5CFF7",
    padding: "10px",
    borderRadius: "5px",
    height: "auto",
    width: "auto",
  };
  // ---------------------------------- CSS DESIGN --------------------------------------------//
  function handlePurchase(NftObject) {
    purchaseScript(NftObject, wallet);
  }

  function removeDuplicates(arr) {
    const uniqueObjects = [];
    const seenObjects = new Set();

    for (const obj of arr) {
      // Convert the object to a string for easy comparison
      const objString = JSON.stringify(obj);

      if (!seenObjects.has(objString)) {
        seenObjects.add(objString);
        uniqueObjects.push(obj);
      }
    }

    return uniqueObjects;
  }

  return (
    <>
      <div className="border-b border-gray-100  mt-6 w-[80%] mx-auto">
        <h2 className="text-white text-center font-semibold text-5xl leading-loose uppercase tracking-wide">
          Real Estate MarketPlace
        </h2>
      </div>
      {loading ? (
        <>loading</>
      ) : (
        <>
          {" "}
          <div style={CardaWrapper}>
            {/* <div className="rounded-lg shadow max-w-[278px] max-h-[325px] bg-white">
        <div className="relative w-full aspect-[3/2]">
          <Image
            className="rounded-t-lg object-cover object-center w-full h-full "
            src={c}
            alt=""
          />
        </div>

        <div className="px-3 py-1">
          <div className="flex items-center justify-between">
            <h5 className="font-bold tracking-tight text-gray-900 dark:text-white text-[20px]">
              Quest
            </h5>
            <p className="mr-3 font-bold text-right">x3</p>
          </div>

          <p
            className="my-2 font-normal text-gray-700 dark:text-gray-400 text-[14px]  text-justify h-[40px] overflow-hidden"
            style={{ hyphens: "auto" }}
          >
            nft.Desc lorem ipsum lorem ipsum lorem ipsum
          </p>

          <div className="flex items-center justify-around">
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <span className="text-[16px]">20 ₳</span>
              <p className="text-[#848484] text-[14px] font-medium">Price</p>
              <div className="h-[70%] w-[1px] bg-[#848484] absolute right-0"></div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center cursor-pointer relative">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M480.068-485.385q29.855 0 51.047-21.26 21.192-21.26 21.192-51.115t-21.26-51.047q-21.26-21.192-51.115-21.192t-51.047 21.26q-21.192 21.26-21.192 51.115t21.26 51.047q21.26 21.192 51.115 21.192ZM480-179.461q117.384-105.076 179.654-201.577 62.269-96.5 62.269-169.039 0-109.384-69.5-179.846T480-800.385q-102.923 0-172.423 70.462t-69.5 179.846q0 72.539 62.269 169.039Q362.616-284.537 480-179.461Zm0 79.844Q329.001-230.463 253.539-343.154q-75.461-112.692-75.461-206.923 0-138.46 89.577-224.191Q357.231-859.999 480-859.999t212.345 85.731q89.577 85.731 89.577 224.191 0 94.231-75.461 206.923Q630.999-230.463 480-99.617Zm0-458.075Z" />
                </svg>
              </button>
              <p className="text-[#848484] text-[14px] font-medium">
                Location
              </p>
              <div className="h-[70%] w-[1px] bg-[#848484] absolute right-0"></div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center cursor-pointer">
              <button
                className="cursor-pointer"
                onClick={() => {
                  handlePurchase(nft);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M286.154-97.694q-29.153 0-49.576-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.576-20.423 29.154 0 49.577 20.423t20.423 49.576q0 29.154-20.423 49.577-20.423 20.422-49.577 20.422Zm387.692 0q-29.154 0-49.577-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.577-20.423 29.153 0 49.576 20.423 20.423 20.423 20.423 49.576 0 29.154-20.423 49.577-20.423 20.422-49.576 20.422ZM240.615-730 342-517.692h272.692q3.462 0 6.154-1.731 2.693-1.731 4.616-4.808l107.307-195q2.308-4.231.385-7.5-1.923-3.27-6.539-3.27h-486Zm-28.769-59.998h555.383q24.538 0 37.115 20.884 12.577 20.885 1.192 42.654L677.384-494.309q-9.847 17.308-26.039 26.962-16.192 9.653-35.499 9.653H324l-46.308 84.616q-3.077 4.616-.192 10.001t8.654 5.385h457.691v59.998H286.154q-39.999 0-60.115-34.499-20.115-34.5-1.423-68.884l57.078-102.616-145.539-306.308H60.001v-59.998h113.845l38 80ZM342-517.692h280-280Z" />
                </svg>
              </button>
              <p className="text-[#848484] text-[14px] font-medium">Buy</p>
            </div>
          </div>
        </div>
      </div> */}
            {NFTData.map((nft, index) => {
              if (nft.policyId === process.env.NEXT_PUBLIC_POLICY_ID) {
                if (nft.ImageLink) {
                  return (
                    <div
                      className="rounded-lg shadow max-w-[278px] bg-white"
                      key={nft.Name}
                    >
                      <div className="relative w-full aspect-[3/3]">
                         <img
                          className="rounded-t-lg object-cover w-full h-full nftImage"
                          src={`${nft.ImageLink[0]}${nft.ImageLink[1]}`}
                          alt={nft.Name}
                        /> 
                        <div className="absolute bottom-0 right-0 p-1 bg-[#02040A] text-white text-xs rounded-md">
                          <p>{nft.Area} sqft</p>
                        </div>
                      </div>

                      <div className=" mt-1 mb-0">
                        <div className="px-3">
                          <div className="flex items-center justify-between overflow-hidden">
                            <h5 className="font-bold tracking-tight text-gray-900 dark:text-white text-[20px] leading-none">
                              {/* nft.Name */}
                              {nft.Name}
                            </h5>
                            <p className="mr-3 font-bold text-right">x3</p>
                          </div>
                          <p className="text-[#848484] text-[14px] font-medium my-0">
                            Owner: <span>{nft.Owner}</span>
                          </p>

                          <p
                            className="my-1 font-normal text-gray-700 dark:text-gray-400 text-[14px]  text-justify h-[40px] overflow-hidden"
                            style={{ hyphens: "auto" }}
                          >
                            {nft.Desc}
                          </p>

                          <div className="flex items-center justify-around">
                            <div className="flex-1 flex flex-col items-center justify-center relative">
                              <span className="text-[16px]">{nft.Price} ₳</span>
                              <p className="text-[#848484] text-[14px] font-medium">
                                Price
                              </p>
                              <div className="h-[70%] w-[1px] bg-[#848484] absolute right-0 cursor-auto"></div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center cursor-pointer relative">
                              <button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24"
                                  viewBox="0 -960 960 960"
                                  width="24"
                                >
                                  <path d="M480.068-485.385q29.855 0 51.047-21.26 21.192-21.26 21.192-51.115t-21.26-51.047q-21.26-21.192-51.115-21.192t-51.047 21.26q-21.192 21.26-21.192 51.115t21.26 51.047q21.26 21.192 51.115 21.192ZM480-179.461q117.384-105.076 179.654-201.577 62.269-96.5 62.269-169.039 0-109.384-69.5-179.846T480-800.385q-102.923 0-172.423 70.462t-69.5 179.846q0 72.539 62.269 169.039Q362.616-284.537 480-179.461Zm0 79.844Q329.001-230.463 253.539-343.154q-75.461-112.692-75.461-206.923 0-138.46 89.577-224.191Q357.231-859.999 480-859.999t212.345 85.731q89.577 85.731 89.577 224.191 0 94.231-75.461 206.923Q630.999-230.463 480-99.617Zm0-458.075Z" />
                                </svg>
                              </button>
                              <p className="text-[#848484] text-[14px] font-medium">
                                Location
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex-1 flex flex-col items-center justify-center cursor-pointer bg-orange-700 text-white hover:bg-blue-800 rounded-b-lg"
                          onClick={() => {
                            handlePurchase(nft);
                          }}
                        >
                          <button className="cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                              style={{ fill: "white" }}
                            >
                              <path d="M286.154-97.694q-29.153 0-49.576-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.576-20.423 29.154 0 49.577 20.423t20.423 49.576q0 29.154-20.423 49.577-20.423 20.422-49.577 20.422Zm387.692 0q-29.154 0-49.577-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.577-20.423 29.153 0 49.576 20.423 20.423 20.423 20.423 49.576 0 29.154-20.423 49.577-20.423 20.422-49.576 20.422ZM240.615-730 342-517.692h272.692q3.462 0 6.154-1.731 2.693-1.731 4.616-4.808l107.307-195q2.308-4.231.385-7.5-1.923-3.27-6.539-3.27h-486Zm-28.769-59.998h555.383q24.538 0 37.115 20.884 12.577 20.885 1.192 42.654L677.384-494.309q-9.847 17.308-26.039 26.962-16.192 9.653-35.499 9.653H324l-46.308 84.616q-3.077 4.616-.192 10.001t8.654 5.385h457.691v59.998H286.154q-39.999 0-60.115-34.499-20.115-34.5-1.423-68.884l57.078-102.616-145.539-306.308H60.001v-59.998h113.845l38 80ZM342-517.692h280-280Z" />
                            </svg>
                          </button>
                          <p className="text-[14px] font-medium">Buy</p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return <>Loading.....</>;
                }
              }
            })}
          </div>
        </>
      )}
    </>
  );
}

export default MarketPlace;
