import React, { useState, useEffect } from "react";
import { useAddress } from "@meshsdk/react";
import { BrowserWallet } from "@meshsdk/core";
import minterModule from "../utils/minter";
import ImageUpload from "./FinalIpfs.jsx";
import Image from "next/image";
import a from "../assets/image-track/a.png";

function InputField({
  placeholder,
  value,
  onChange,
  className,
  disabled,
  typeT,
}: {
  placeholder: string;
  value: string;
  onChange: Function;
  className: string;
  disabled: boolean;
  typeT: string;
}) {
  return (
    <input
      type={typeT || "text"}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function CheckboxField({ value, onChange }) {
  return (
    <input
      type="checkbox"
      checked={value}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}
export default function HomeListings() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const walletAddress = useAddress();
  const [wallet, setWallet] = useState<BrowserWallet | null>(null);
  const [formState, setFormState] = useState({
    selectedImage: [],
    selectedLabel: "",
    selectedPrice: "",
    selectedDescription: "",
    selectedLocation: "",
    selectedArea: "",
    selectedOwner: "",
    selectedNumber: "",
    selectedCoords: "",
    isFraction: false,
  });
  const [initialFormState, setInitialFormState] = useState(formState);

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const walletInstance = await BrowserWallet.enable("Nami");
        setWallet(walletInstance);
      } catch (error) {
        console.error("Error initializing wallet:", error);
      }
    };

    initializeWallet();
  }, []);
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = () => {
    const {
      selectedLabel,
      selectedOwner,
      selectedPrice,
      selectedLocation,
      selectedArea,
      selectedCoords,
      selectedDescription,
      selectedNumber,
      isFraction,
    } = formState;

    const validations = [
      { condition: !selectedLabel, message: "Token name can't be empty" },
      {
        condition: containsSpecialChars(selectedLabel) === true,
        message: "Token name should not have extra special character.",
      },
      { condition: !selectedLabel, message: "Token name can't be empty" },
      { condition: !selectedOwner, message: "Owner name can't be empty" },
      { condition: !selectedPrice, message: "Price can't be empty" },
      {
        condition: parseFloat(selectedPrice) < 1,
        message: "Price can't be negative or 0",
      },
      { condition: !selectedLocation, message: "Location can't be empty" },
      { condition: !selectedArea, message: "Area can't be empty" },
      { condition: !selectedCoords, message: "Coordinates can't be empty" },
      {
        condition: !selectedDescription,
        message: "Description can't be empty",
      },
      {
        condition: parseFloat(selectedArea) < 0,
        message: "Area can't be negative",
      },
      {
        condition: isFraction === true && !selectedNumber,
        message: "The field can't be empty",
      },
      {
        condition: isFraction === true && parseFloat(selectedNumber) <= 0,
        message: "Negative number is input or zero entered",
      },
      {
        condition: isFraction === true && parseFloat(selectedNumber) <= 1,
        message: "The number should be greater than 1",
      },
      {
        condition: parseFloat(selectedArea) < parseFloat(selectedNumber),
        message: "Area should not be less than 1 Square Ft.",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        alert(validation.message);
        return;
      }
    }
    const clearInputFunctions = () => {
      setFormState({
        selectedImage: [],
        selectedLabel: "",
        selectedPrice: "",
        selectedDescription: "",
        selectedLocation: "",
        selectedArea: "",
        selectedOwner: "",
        selectedNumber: "",
        selectedCoords: "",
        isFraction: false,
      });
    };

    if (wallet && walletAddress !== undefined) {
      minterModule({
        ...formState,
        walletAddress,
        wallet,
      })
        .then((txHash) => {
          alert(`Transaction Hash: ${txHash}`);
          setFormState(initialFormState);
          setIsImageLoading(true);
          clearInputFunctions();
        })
        .catch((error) => {
          alert(`Error: ${error}`);
        });
    } else {
      alert("Wallet not initialized");
    }
  };

  return (
    <>
      {/* main contain */}
      <div className=" flex flex-col items-center justify-center p-2">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            height: "auto",
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
          className="px-12 pb-10 pt-3"
        >
          <div className="border-b border-gray-500  mb-6">
            <h2 className="text-black text-center font-semibold text-5xl leading-loose uppercase tracking-wide">
              Property Tokenization
            </h2>
          </div>
          <div>
            <div className="grid md:grid-cols-2 md:gap-6 ">
              <InputField
                placeholder="Property Name"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formState.selectedLabel}
                disabled={false}
                typeT="text"
                onChange={(value) =>
                  setFormState({ ...formState, selectedLabel: value })
                }
              />
              <InputField
                placeholder="Owner"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formState.selectedOwner}
                disabled={false}
                typeT="text"
                onChange={(value) =>
                  setFormState({ ...formState, selectedOwner: value })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 md:gap-6 ">
              <InputField
                typeT="number"
                placeholder="Price in ₳"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formState.selectedPrice}
                disabled={false}
                onChange={(value) =>
                  setFormState({ ...formState, selectedPrice: value })
                }
              />
              <InputField
                placeholder="Location"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formState.selectedLocation}
                disabled={false}
                typeT="text"
                onChange={(value) =>
                  setFormState({ ...formState, selectedLocation: value })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 md:gap-6 ">
              <InputField
                placeholder="Coordinates"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formState.selectedCoords}
                disabled={false}
                typeT="text"
                onChange={(value) =>
                  setFormState({ ...formState, selectedCoords: value })
                }
              />
              <InputField
                typeT="number"
                disabled={false}
                placeholder="Area [In Square Feet]"
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formState.selectedArea}
                onChange={(value) =>
                  setFormState({ ...formState, selectedArea: value })
                }
              />
            </div>
          </div>
          <div>
            <div className="grid md:grid-cols-2 md:gap-6 ">
              <div>
                <InputField
                  placeholder="Description"
                  disabled={false}
                  typeT="text"
                  className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formState.selectedDescription}
                  onChange={(value) =>
                    setFormState({ ...formState, selectedDescription: value })
                  }
                />

                <InputField
                  typeT="number"
                  placeholder={
                    formState.isFraction
                      ? "Number of Tokens"
                      : "Not Fractionalizing"
                  }
                  className={
                    formState.isFraction
                      ? "my-2 bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      : "my-2 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
                  }
                  value={formState.selectedNumber}
                  disabled={formState.isFraction ? false : true}
                  onChange={(value) =>
                    setFormState({ ...formState, selectedNumber: value })
                  }
                />
                <div className="flex items-center mb-4">
                  <CheckboxField
                    value={formState.isFraction}
                    onChange={(value) =>
                      setFormState({ ...formState, isFraction: value })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Fractionalize NFT
                  </label>
                </div>
              </div>
              <ImageUpload
                setIpfsImg={(images) =>
                  setFormState({ ...formState, selectedImage: images })
                }
                onImageLoadingChange={(loading) => setIsImageLoading(loading)}
                selectedImageF={formState.selectedImage || []}
                setFormStateF={setFormState}
                formStateF={formState}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className={`text-white   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                isImageLoading ? "bg-gray-300" : "bg-blue-700 hover:bg-blue-800"
              }`}
              disabled={isImageLoading}
            >
              Mint NFT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
