import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import NFTCard from "../components/Cards";

const Services = () => {
  const navigate = useNavigate();
  const NFTData = [
    {
      Name: "Bored Ape Yacht",
      Desc: " Your Bored Ape doubles as your Yacht Club membership card, andgrants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board.",
      Price: "₳ 500",
      Owner: "Mr Jedzyk",
    },
    {
      Name: "Mutant Ape Yacht",
      Desc: "The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.",
      Price: "₳ 1200",
      Owner: "Mr Larva",
    },
    {
      Name: "ChainFaces Arena",
      Desc: " n January of 2022, there was a month long tournament aka The Arena where 17031 ChainFaces entered to compete for a pool of millions of dollars. 12775 heroic faces died in the arena and are now gone forever from the circulating supply. ",
      Price: "₳ 845",
      Owner: "Mr Kenuiya",
    },
    {
      Name: "Facial Kies",
      Desc: "For the 4256 faces that survived, they were awarded with generative scars applied to their face for every 10 rounds they were able to stay in the arena. All code for generation and creation of ChainFaces and the arena exists fully on chain.",
      Price: "₳ 125",
      Owner: "Mr Kahyda",
    },
  ];
  return (
    <>
      <h2>NFT Gallary</h2>
      <div sx={{justifyContent:'space-around', display: "flex", paddingBottom: 3, }}>
        {NFTData.map((Item) => {
          return <NFTCard Name={Item.Name} Desc={Item.Desc} Price={Item.Price} Owner={Item.Owner} key={Item.Name}/>;
        })}
      </div>

      <Link to="/home/product">
        <button onClick={() => {}}>Product Page</button>
      </Link>
    </>
  );
};
export default memo(Services);
