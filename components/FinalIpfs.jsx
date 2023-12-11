import React, { useState } from "react";
import axios from "axios";

function ImageUpload({
  setIpfsImg,
  onImageLoadingChange,
  selectedImageF,
  setFormStateF,
  formStateF,
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [Loader2, setLoader2] = useState(false);
  const PINATA_API_KEY = "67adc6d6359dd8bdba85";  //"7f4879edd415003ea82d";
  const PINATA_API_SECRET =
    "6f904e617f87b0090a8ef6b86836187ad61e8447d89d8a742eb8d6beb86c8f44";   //"80ff126ee6cb00f395df7f708c889f95ac41289a011b19f88e752b092b2ae7e4";
  const [file, setFile] = useState(null);

  async function handleFileSelect(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setLoader2(true);
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_API_SECRET,
            },
          }
        );
        if (response.data) {
          setIpfsImg(["https://ipfs.io/ipfs/", `${response.data.IpfsHash}`]);
          if(selectedImageF[1]){
            setLoader2(false);
          }
        }
        // Handle the response here, which contains information about the uploaded file
        console.log("Pinata Response:", response.data);
      } catch (error) {
        // Handle any errors that may occur during the upload
        console.error("Error uploading to Pinata:", error);
      }
    } else {
      setFormStateF({ ...formStateF, selectedImage: [] });
    }
  }

  const handleImageLoad = () => {
    setIsImageLoading(false);
    onImageLoadingChange(false);
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={handleFileSelect}
      />
      <div className="w-full ">
        {selectedImageF[1] ? (
          <>
            {" "}
            <img
              src={`https://ipfs.io/ipfs/${selectedImageF[1]}`}
              alt="IPFS Image"
              className="h-36 w-autp m-4 rounded-md border-blue-300 border-2"
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <>
            {Loader2 ? (
              <p className="m-4">IPFS Image Loading [Please Wait ...]</p>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
