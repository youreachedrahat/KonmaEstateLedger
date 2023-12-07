import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
//Custom
import Button from '@mui/material/Button';

import { useWallet } from "@meshsdk/react";
import { KoiosProvider } from "@meshsdk/core";
import axios from "axios";
import assetFetcherBF1 from "./assetFetcherBF1";
import { useAssets } from "@meshsdk/react";
import purchaseScript from "../utils/purchaseScript";
import CommunityModal from "./CommunityModal"

// Defined Functions
import listAssets from "../utils/listAssets";


export default function EnhancedTable() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const koiosProvider = new KoiosProvider("preprod");
  const { connected, wallet, disconnect } = useWallet();
  const [NFTData, setNFTData] = useState();
  const [finaData, setFinaData] = useState();
  const [walletAddress, updateWalletAddress] = useState("");
  const assets = useAssets();
  function createData(name, Unit, Amount, Location, Status) {
    return { name, Unit, Amount, Location, Status };
  }

  const handleOpen = () => setOpen(true);

  const SyntaxSetter = (Data) => {
    console.log(",,,,,", Data);
    let TempArray = [];
    Data.map((Item) => {
      TempArray.push(
        createData(
          `${Item.Name}`,
          `${Item.policyId}.${Item.assetName}`,
          Item.Price,
          `${Item.Location} | ${Item.Area} Sq.Ft`,
          "Temp"
        )
      );
    });
    console.log("----->",TempArray);
    return TempArray;
  };

  const lockNFTFunction=(NFTLock)=>{
    // console.log("EEE",NFTLock);
    listAssets(wallet,NFTLock.Unit,NFTLock.Amount).then((hash)=>{
      console.log("Asset has been added into Marketplace",hash);
    }).catch((e)=>{
      console.log("EEE",e);
    });
  }
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
      const data = await assetFetcherBF1(response.data);
      setNFTData(SyntaxSetter(data));
    } catch (error) {
      console.error("An error occurred while fetching assets:", error);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    async function load() {
      updateWalletAddress(process.env.NEXT_PUBLIC_ESCORWALLET);
    }
    if (connected && walletAddress === "") {
      load();
    }
  }, [connected, walletAddress]);
  useEffect(() => {
    if (loading) {
      handleMetadataWithBlockFrost();
    }
  }, [loading]);

  return (
    <>
      {!connected || loading ? (
        <>Warning : <span style={{color:"yellow"}}>Connect your wallet !
       </span>
       
       <CommunityModal
        open={open}
        setOpen={setOpen}
        />
        </>

      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NFT | Owner Name</TableCell>
                <TableCell align="right">Tx Hash / Unit</TableCell>
                <TableCell align="right">Proposed Amount | NFT</TableCell>
                <TableCell align="right">Location | Desc</TableCell>
                <TableCell align="right">Documents</TableCell>
                <TableCell align="right">Accept | Reject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {NFTData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.Unit}</TableCell>
                  <TableCell align="right">{row.Amount} ADA</TableCell>
                  <TableCell align="right">{row.Location}</TableCell>
                  <TableCell  style={{backgroundColor:" yellow", color:"blue", textAlign:"center"}} onClick={()=>{alert("Not Applicable")}} align="right">View Document</TableCell>                 
                  <button style={{backgroundColor:" yellow", color:"blue", textAlign:"center"}} 
                   onClick={() => {
  handleOpen();
  lockNFTFunction(row);
}}  align="center" >Accept</button>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
      )}
    </>
  );
}
