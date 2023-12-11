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
  // console.log("api state",process.env.NEXT_PUBLIC_PINATA_API_KEY,process.env.NEXT_PUBLIC_PINATA_SECRET_KEY);
  const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
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
          setIpfsImg(["https://ipfs.io/ipfs/", ${response.data.IpfsHash}]);
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
              src={https://ipfs.io/ipfs/${selectedImageF[1]}}
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
