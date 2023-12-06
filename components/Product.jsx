import { memo } from "react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWalletList } from '@meshsdk/react';
const Product = () => {
  const navigate = useNavigate();
  const wallets = useWalletList();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");

  const onSubmit =()=>{
    console.log("onSubmit",selectedImage,selectedLabel,selectedDescription,selectedNumber);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "30%",
            height: 'auto',
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: 2,
            paddingBottom:2,
          },
        }}
      >
         <>
      {wallets.map((wallet, i) => {
        return (
          <p key={i}>
            <img src={wallet.icon} style={{ width: '48px' }} />
            <b>{wallet.name}</b>
          </p>
        );
      })}
    </>
        <div>
        <h2 style={{textAlign:'center', color:'blue'}}>Create New NFT</h2>
          <div style={{ marginLeft: "20%" }}>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                width="200"
                height="200"
              />
            )}
          </div>
          <div>
            <input type="text" placeholder="Name of Token"
              value={selectedLabel}
              onChange={(e)=>{
                setSelectedLabel(e.target.value);
              }}
            />
          </div>
          <div>
            <input type="text" placeholder="Description on Token"
              value={selectedDescription}
              onChange={(e)=>{
                setSelectedDescription(e.target.value);
              }}
            />
            <input type="number" placeholder="Number of Tokens"
              sx={{
                marginTop: 2,
                marginLeft: "5%",
                marginRight: "auto",
                width: "90%",
              }}
              value={selectedNumber}
              onChange={(e)=>{
                setSelectedNumber(e.target.value);
              }}
            />
          </div>
          <button
            variant="contained"
            sx={{
              marginTop: 2,
              marginLeft: "5%",
              marginRight: "auto",
            }}
            onClick={()=>{
              onSubmit();
            }}
          >
            Mint NFT
          </button>
        </div>
      </div>
      <h2>Product Page</h2>
      <Link to="/home/services">
        <button onClick={() => {}}>Service Page</button>
      </Link>
    </>
  );
};
export default memo(Product);
