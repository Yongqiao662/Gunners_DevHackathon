// SPDX-License-Identifier: MIT

const { ethers } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Replace with your contract's address after deployment
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  const FreshChainNFTFactory = await ethers.getContractFactory("FreshChainNFT");
  
  const nftContract = new ethers.Contract(contractAddress, FreshChainNFTFactory.interface, deployer);

 //  for Product ID 1:
  //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreibz5kfy2hei7rheucrp4qgrs6pnwxsfibvrub25cgnuddlcjmykdq"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
  //let productName = "Organic Avocados";
  //let origin = "California, USA";
  //let initialLocation = "Avocado Grove";

  

  //  for Product ID 2 
   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreigxfumfn6uu4ggaq5rewx5zm4ekpt6jxqilesbn3m32ty4gkz57xi"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   //let productName = "Fresh Salmon";
   //let origin = "Norway";
   //let initialLocation = "Norwegian Fjords";

   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreifuyvz3czw5p4l7azlh6fvwzgbzztuspr7ig4wqrdjup2nreegb2y"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   //let productName = "Organic Blueberries";
   //let origin = "Mexico";
   //let initialLocation = "Norwegian Fjords";

   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreibvfqv6pbv3qqqjjje76p3c7q5tuzok3vpe3jr75gcujeoljdooga"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   //let productName = "Grass-Fed Beef";
   //let origin = "Argentina";
   //let initialLocation = "Norwegian Fjords";

   //let tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreiah2pgrkhdr5xbkukiwnks5zpx3itm36ncbbwb6ex5jxoopr6upii"; // <-- REPLACE WITH ACTUAL CID FROM PINATA
   //let productName = "Organic Almonds";
   //let origin = "Spain";
   //let initialLocation = "Norwegian Fjords";

  console.log(`Minting NFT for "${productName}"...`);


  const tx = await nftContract.createProductBatch(
    productName,
    origin,
    initialLocation,
    tokenURI
  );

  const receipt = await tx.wait();
  
 
  const productCreatedEvent = receipt.logs.find(log => 
    nftContract.interface.parseLog(log)?.name === 'ProductCreated'
  );
  
  const mintedTokenId = productCreatedEvent ? productCreatedEvent.args.tokenId.toString() : 'N/A';

  console.log(`NFT minted successfully! Numeric Token ID: ${mintedTokenId}`);
  console.log(`Transaction Hash: ${tx.hash}`);

  
  const formattedId = await nftContract.getFormattedTokenId(mintedTokenId);
  console.log(`Formatted Token ID: ${formattedId}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });